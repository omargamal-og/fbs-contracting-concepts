begin;
create type private.application_status as enum ('submitted','in_review','needs_information','shortlisted','interview','hired','approved','rejected','withdrawn');
create type private.document_scan_status as enum ('pending','clean','rejected');
create table private.career_applications (
 id uuid primary key default gen_random_uuid(), job_opening_id uuid references public.job_openings(id),
 full_name text not null check (length(trim(full_name)) > 0), email text not null,
 phone text, subject text, message text, internal_notes text,
 status private.application_status not null default 'submitted' check (status <> 'approved'),
 consent_version text not null, consented_at timestamptz not null, locale text not null references public.languages(code),
 reviewed_by uuid references auth.users(id), status_reason text,
 version integer not null default 1 check (version > 0),
 created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table private.supplier_applications (
 id uuid primary key default gen_random_uuid(), company_name text not null check (length(trim(company_name)) > 0),
 contact_name text not null, email text not null, phone text, category text not null, notes text, internal_notes text,
 status private.application_status not null default 'submitted' check (status not in ('shortlisted','interview','hired')),
 consent_version text not null, consented_at timestamptz not null, locale text not null references public.languages(code),
 reviewed_by uuid references auth.users(id), status_reason text,
 version integer not null default 1 check (version > 0),
 created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create index career_status_idx on private.career_applications(status, created_at);
create index career_job_idx on private.career_applications(job_opening_id);
create index supplier_status_idx on private.supplier_applications(status, created_at);
create table private.application_reviewer_assignments (
 id uuid primary key default gen_random_uuid(),
 career_application_id uuid references private.career_applications(id),
 supplier_application_id uuid references private.supplier_applications(id),
 reviewer_id uuid not null references auth.users(id), assigned_by uuid not null references auth.users(id),
 assigned_at timestamptz not null default now(), revoked_at timestamptz,
 check (num_nonnulls(career_application_id, supplier_application_id) = 1),
 check (revoked_at is null or revoked_at >= assigned_at)
);
create unique index career_active_assignment_idx on private.application_reviewer_assignments(career_application_id) where career_application_id is not null and revoked_at is null;
create unique index supplier_active_assignment_idx on private.application_reviewer_assignments(supplier_application_id) where supplier_application_id is not null and revoked_at is null;
create index assignments_reviewer_idx on private.application_reviewer_assignments(reviewer_id) where revoked_at is null;
create table private.application_documents (
 id uuid primary key default gen_random_uuid(),
 career_application_id uuid references private.career_applications(id),
 supplier_application_id uuid references private.supplier_applications(id),
 bucket_id text not null check (bucket_id in ('career-documents','supplier-documents')),
 object_path text not null, original_filename text not null,
 mime_type text not null check (mime_type in ('application/pdf','application/msword','application/vnd.openxmlformats-officedocument.wordprocessingml.document')),
 byte_size bigint not null check (byte_size between 1 and 5242880),
 scan_status private.document_scan_status not null default 'pending', scanned_at timestamptz,
 created_at timestamptz not null default now(),
 unique (bucket_id, object_path), check (num_nonnulls(career_application_id,supplier_application_id) = 1),
 check ((career_application_id is not null and bucket_id = 'career-documents') or (supplier_application_id is not null and bucket_id = 'supplier-documents')),
 check (scan_status = 'pending' or scanned_at is not null)
);
create index documents_career_idx on private.application_documents(career_application_id);
create index documents_supplier_idx on private.application_documents(supplier_application_id);
create table private.application_status_history (
 id uuid primary key default gen_random_uuid(),
 career_application_id uuid references private.career_applications(id),
 supplier_application_id uuid references private.supplier_applications(id),
 from_status private.application_status, to_status private.application_status not null,
 reviewer_id uuid references auth.users(id), actor_user_id uuid references auth.users(id),
 actor_type text not null check (actor_type in ('staff','server')),
 occurred_at timestamptz not null default now(), reason text,
 check (num_nonnulls(career_application_id,supplier_application_id) = 1)
);
create index history_career_idx on private.application_status_history(career_application_id, occurred_at);
create index history_supplier_idx on private.application_status_history(supplier_application_id, occurred_at);

create function private.can_review_career(application_id uuid) returns boolean
language sql stable security definer set search_path = '' as $$
 select private.has_role(array['administrator']::private.staff_role[])
 or (private.has_role(array['hr_reviewer']::private.staff_role[]) and exists (
 select 1 from private.application_reviewer_assignments a where a.career_application_id = application_id
 and a.reviewer_id = (select auth.uid()) and a.revoked_at is null));
$$;
create function private.can_review_supplier(application_id uuid) returns boolean
language sql stable security definer set search_path = '' as $$
 select private.has_role(array['administrator']::private.staff_role[])
 or (private.has_role(array['procurement_reviewer']::private.staff_role[]) and exists (
 select 1 from private.application_reviewer_assignments a where a.supplier_application_id = application_id
 and a.reviewer_id = (select auth.uid()) and a.revoked_at is null));
$$;
revoke all on function private.can_review_career(uuid), private.can_review_supplier(uuid) from public, anon;
grant execute on function private.can_review_career(uuid), private.can_review_supplier(uuid) to authenticated, service_role;

do $$
declare tbl text;
begin
 foreach tbl in array array['career_applications','supplier_applications','application_reviewer_assignments','application_documents','application_status_history'] loop
   execute format('alter table private.%I enable row level security',tbl);
   execute format('revoke all on private.%I from anon, authenticated',tbl);
   execute format('grant select on private.%I to authenticated',tbl);
   execute format('grant all on private.%I to service_role',tbl);
 end loop;
end;
$$;
create policy career_read on private.career_applications for select to authenticated using (private.can_review_career(id));
create policy supplier_read on private.supplier_applications for select to authenticated using (private.can_review_supplier(id));
create policy assignments_read on private.application_reviewer_assignments for select to authenticated
using (private.has_role(array['administrator']::private.staff_role[])
 or (career_application_id is not null and private.can_review_career(career_application_id))
 or (supplier_application_id is not null and private.can_review_supplier(supplier_application_id)));
create policy documents_read on private.application_documents for select to authenticated
using ((career_application_id is not null and private.can_review_career(career_application_id))
 or (supplier_application_id is not null and private.can_review_supplier(supplier_application_id)));
create policy history_read on private.application_status_history for select to authenticated
using ((career_application_id is not null and private.can_review_career(career_application_id))
 or (supplier_application_id is not null and private.can_review_supplier(supplier_application_id)));

create function private.validate_reviewer_assignment() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
 if not exists (select 1 from private.user_roles r where r.user_id = new.reviewer_id
 and ((new.career_application_id is not null and r.role = 'hr_reviewer')
   or (new.supplier_application_id is not null and r.role = 'procurement_reviewer'))) then
   raise exception 'Reviewer department mismatch' using errcode = '23514';
 end if;
 if not exists (select 1 from private.user_roles r where r.user_id = new.assigned_by and r.role = 'administrator') then
   raise exception 'Administrator assignment required' using errcode = '42501';
 end if;
 return new;
end;
$$;
create trigger validate_assignment before insert or update on private.application_reviewer_assignments for each row execute function private.validate_reviewer_assignment();

-- Database audit backstop, not a public approval RPC. All browser writes stay denied.
create function private.audit_application_change() returns trigger
language plpgsql security definer set search_path = '' as $$
declare is_career boolean := tg_table_name = 'career_applications';
begin
 if tg_op = 'UPDATE' then
   if new.id <> old.id then raise exception 'Application identity is immutable' using errcode = '23514'; end if;
   new.version := old.version + 1;
   new.updated_at := now();
   if new.status is not distinct from old.status then return new; end if;
   if new.reviewed_by is null or nullif(trim(new.status_reason),'') is null then
     raise exception 'Reviewer and reason required for status changes' using errcode = '23514';
   end if;
   if not exists (select 1 from private.application_reviewer_assignments a join private.user_roles r on r.user_id = a.reviewer_id
     where a.reviewer_id = new.reviewed_by and a.revoked_at is null
       and ((is_career and a.career_application_id = new.id and r.role = 'hr_reviewer')
         or (not is_career and a.supplier_application_id = new.id and r.role = 'procurement_reviewer'))) then
     raise exception 'Active department reviewer required' using errcode = '23514';
   end if;
 else
   if new.status <> 'submitted' or new.reviewed_by is not null then
     raise exception 'Applications must start submitted and unreviewed' using errcode = '23514';
   end if;
 end if;
 insert into private.application_status_history(career_application_id,supplier_application_id,from_status,to_status,reviewer_id,actor_user_id,actor_type,reason)
 values (case when is_career then new.id end,case when not is_career then new.id end,
 case when tg_op = 'UPDATE' then old.status end,new.status,new.reviewed_by,auth.uid(),
 case when auth.uid() is null then 'server' else 'staff' end,new.status_reason);
 return new;
end;
$$;
-- AFTER insert is needed for the history foreign key; version/timestamps are BEFORE update.
create trigger career_initial_audit after insert on private.career_applications for each row execute function private.audit_application_change();
create trigger supplier_initial_audit after insert on private.supplier_applications for each row execute function private.audit_application_change();
create trigger career_update_audit before update on private.career_applications for each row execute function private.audit_application_change();
create trigger supplier_update_audit before update on private.supplier_applications for each row execute function private.audit_application_change();
create function private.protect_history() returns trigger
language plpgsql set search_path = '' as $$
begin raise exception 'Application history is append-only' using errcode = '42501'; end;
$$;
create trigger immutable_history before update or delete on private.application_status_history for each row execute function private.protect_history();
revoke all on function private.validate_reviewer_assignment(), private.audit_application_change(), private.protect_history() from public, anon, authenticated;
revoke update, delete, truncate on private.application_status_history from service_role;

-- All buckets are PRIVATE: public=true would bypass download RLS.
insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types) values
 ('site-media','site-media',false,52428800,array['image/jpeg','image/png','image/webp','image/avif','video/mp4','video/webm','application/pdf']),
 ('career-documents','career-documents',false,5242880,array['application/pdf','application/msword','application/vnd.openxmlformats-officedocument.wordprocessingml.document']),
 ('supplier-documents','supplier-documents',false,5242880,array['application/pdf','application/msword','application/vnd.openxmlformats-officedocument.wordprocessingml.document']);

create function private.can_read_site_object(object_name text) returns boolean
language sql stable security definer set search_path = '' as $$
 select exists (select 1 from public.media_assets a where a.object_path = object_name and private.can_read_content(a.id))
 or exists (select 1 from public.media_variants v where v.object_path = object_name and private.can_read_content(v.asset_id));
$$;
create function private.can_upload_site_object(object_name text) returns boolean
language sql stable security definer set search_path = '' as $$
 select exists (select 1 from public.media_assets a join public.content_items c on c.id = a.id
 where a.object_path = object_name and c.publication_status <> 'published' and private.can_edit_content(a.id))
 or exists (select 1 from public.media_variants v join public.content_items c on c.id = v.asset_id
 where v.object_path = object_name and c.publication_status <> 'published' and private.can_edit_content(v.asset_id));
$$;
create function private.can_read_application_object(object_bucket text, object_name text) returns boolean
language sql stable security definer set search_path = '' as $$
 select exists (select 1 from private.application_documents d where d.bucket_id = object_bucket and d.object_path = object_name and d.scan_status = 'clean'
 and ((d.career_application_id is not null and private.can_review_career(d.career_application_id))
   or (d.supplier_application_id is not null and private.can_review_supplier(d.supplier_application_id))));
$$;
revoke all on function private.can_read_site_object(text),private.can_upload_site_object(text),private.can_read_application_object(text,text) from public;
grant execute on function private.can_read_site_object(text),private.can_read_application_object(text,text) to anon, authenticated, service_role;
grant execute on function private.can_upload_site_object(text) to authenticated, service_role;
create policy fbs_site_media_read on storage.objects for select to anon, authenticated
using (bucket_id = 'site-media' and private.can_read_site_object(name));
create policy fbs_site_media_insert on storage.objects for insert to authenticated
with check (bucket_id = 'site-media' and private.can_upload_site_object(name));
create policy fbs_application_document_read on storage.objects for select to authenticated
using (bucket_id in ('career-documents','supplier-documents') and private.can_read_application_object(bucket_id,name));
-- No browser UPDATE/DELETE policy on objects, and no browser application upload policy.
commit;

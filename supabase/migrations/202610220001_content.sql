begin;
create schema if not exists private;
revoke all on schema private from public, anon, authenticated;
grant usage on schema private to anon, authenticated, service_role;

create type public.publication_status as enum ('draft', 'in_review', 'published', 'archived');
create type public.approval_status as enum ('unreviewed', 'approved', 'rejected');
create type public.project_delivery_status as enum ('unspecified', 'planned', 'in_progress', 'completed', 'on_hold');
create type public.content_kind as enum ('site_settings', 'page', 'page_section', 'navigation_item', 'service', 'sector', 'project', 'project_media', 'statistic', 'hero_media', 'news', 'job_opening', 'media_asset');
create type private.staff_role as enum ('administrator', 'content_editor', 'publisher', 'hr_reviewer', 'procurement_reviewer');

create table private.user_roles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role private.staff_role not null,
  assigned_at timestamptz not null default now(),
  assigned_by uuid references auth.users(id)
);
alter table private.user_roles enable row level security;
create function private.has_role(allowed private.staff_role[]) returns boolean
language sql stable security definer set search_path = '' as $$
  select exists (select 1 from private.user_roles r where r.user_id = (select auth.uid()) and r.role = any(allowed));
$$;
revoke all on function private.has_role(private.staff_role[]) from public, anon;
grant execute on function private.has_role(private.staff_role[]) to authenticated, service_role;
create policy own_role_read on private.user_roles for select to authenticated
using (user_id = (select auth.uid()) or private.has_role(array['administrator']::private.staff_role[]));
grant select on private.user_roles to authenticated;
-- Even a logged-in administrator needs a trusted server for role changes.
grant all on private.user_roles to service_role;

create table public.languages (
  code text primary key check (code in ('ar', 'en')),
  direction text not null check (direction in ('rtl', 'ltr')),
  check ((code = 'ar' and direction = 'rtl') or (code = 'en' and direction = 'ltr'))
);
insert into public.languages values ('ar', 'rtl'), ('en', 'ltr');
create table public.content_items (
  id uuid primary key default gen_random_uuid(),
  kind public.content_kind not null,
  slug text not null check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  publication_status public.publication_status not null default 'draft',
  approval_status public.approval_status not null default 'unreviewed',
  approved_by uuid references auth.users(id),
  approved_at timestamptz,
  published_at timestamptz,
  expires_at timestamptz,
  sort_order integer not null default 0 check (sort_order >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (kind, slug), unique (id, kind),
  check (expires_at is null or published_at is null or expires_at > published_at),
  check (approval_status <> 'approved' or (approved_by is not null and approved_at is not null)),
  check (publication_status <> 'published' or (approval_status = 'approved' and published_at is not null))
);
create index content_publication_idx on public.content_items (kind, publication_status, published_at, sort_order);
create table public.content_translations (
  content_id uuid not null references public.content_items(id) on delete cascade,
  language_code text not null references public.languages(code),
  title text not null check (length(trim(title)) > 0),
  summary text, body text, location_label text, alt_text text, seo_title text, seo_description text,
  content jsonb not null default '{}'::jsonb check (jsonb_typeof(content) = 'object'),
  primary key (content_id, language_code)
);


create table public.site_settings (
 id uuid primary key,
 kind public.content_kind not null default 'site_settings' check (kind = 'site_settings'),
 singleton boolean not null default true unique check (singleton),
 contact_email text, contact_phone text,
 default_language text not null default 'en' references public.languages(code),
 social_links jsonb not null default '{}'::jsonb check (jsonb_typeof(social_links) = 'object'),
 foreign key (id, kind) references public.content_items(id, kind) on delete cascade
);

create table public.pages (
 id uuid primary key,
 kind public.content_kind not null default 'page' check (kind = 'page'),
 route_path text not null unique check (route_path = '' or route_path ~ '^[a-z0-9/-]+$'),
 foreign key (id, kind) references public.content_items(id, kind) on delete cascade
);

create table public.page_sections (
 id uuid primary key,
 kind public.content_kind not null default 'page_section' check (kind = 'page_section'),
 page_id uuid not null references public.pages(id), section_key text not null,
 section_type text not null check (section_type in ('hero','introduction','services','sectors','projects','map','statistics','news','editorial','contact')),
 settings jsonb not null default '{}'::jsonb check (jsonb_typeof(settings) = 'object'), unique (page_id, section_key),
 foreign key (id, kind) references public.content_items(id, kind) on delete cascade
);

create table public.navigation_items (
 id uuid primary key,
 kind public.content_kind not null default 'navigation_item' check (kind = 'navigation_item'),
 parent_id uuid references public.navigation_items(id), page_id uuid references public.pages(id),
 external_url text check (external_url ~ '^https://'), check (parent_id is distinct from id), check (page_id is null or external_url is null),
 foreign key (id, kind) references public.content_items(id, kind) on delete cascade
);

create table public.services (
 id uuid primary key,
 kind public.content_kind not null default 'service' check (kind = 'service'),
 foreign key (id, kind) references public.content_items(id, kind) on delete cascade
);

create table public.sectors (
 id uuid primary key,
 kind public.content_kind not null default 'sector' check (kind = 'sector'),
 foreign key (id, kind) references public.content_items(id, kind) on delete cascade
);

create table public.projects (
 id uuid primary key,
 kind public.content_kind not null default 'project' check (kind = 'project'),
 sector_id uuid references public.sectors(id), city_key text,
 delivery_status public.project_delivery_status not null default 'unspecified',
 start_year integer check (start_year between 1900 and 2200), end_year integer check (end_year between 1900 and 2200),
 units_count integer check (units_count >= 0), units_type text check (units_type in ('apartments', 'villas')),
 latitude numeric(9,7) check (latitude between -90 and 90), longitude numeric(10,7) check (longitude between -180 and 180),
 coordinates_verified boolean not null default false,
 location_precision text not null default 'unknown' check (location_precision in ('unknown','city','approximate','site')),
 coordinate_source text,
 check ((latitude is null) = (longitude is null)),
 check (end_year is null or start_year is null or end_year >= start_year),
 check ((units_count is null) = (units_type is null)),
 check (not coordinates_verified or (latitude is not null and nullif(trim(coordinate_source), '') is not null and location_precision <> 'unknown')),
 foreign key (id, kind) references public.content_items(id, kind) on delete cascade
);

create table public.media_assets (
 id uuid primary key,
 kind public.content_kind not null default 'media_asset' check (kind = 'media_asset'),
 media_type text not null check (media_type in ('image','video','document')),
 bucket_id text not null default 'site-media' check (bucket_id = 'site-media'), object_path text, mime_type text,
 width integer check (width > 0), height integer check (height > 0), duration_seconds numeric check (duration_seconds > 0),
 byte_size bigint check (byte_size > 0), unique (bucket_id, object_path),
 check (object_path is null or (split_part(object_path,'/',1) = id::text and length(object_path) > 37)),
 foreign key (id, kind) references public.content_items(id, kind) on delete cascade
);

create table public.project_media (
 id uuid primary key,
 kind public.content_kind not null default 'project_media' check (kind = 'project_media'),
 project_id uuid not null references public.projects(id), asset_id uuid not null references public.media_assets(id),
 media_role text not null default 'gallery' check (media_role in ('cover','gallery','video')), unique (project_id, asset_id, media_role),
 foreign key (id, kind) references public.content_items(id, kind) on delete cascade
);

create table public.statistics (
 id uuid primary key,
 kind public.content_kind not null default 'statistic' check (kind = 'statistic'),
 value numeric not null check (value >= 0), unit text,
 qualifier text not null default 'exact' check (qualifier in ('exact','plus','approximately')),
 display_divisor numeric not null default 1 check (display_divisor > 0), reference_date date,
 foreign key (id, kind) references public.content_items(id, kind) on delete cascade
);

create table public.hero_media (
 id uuid primary key,
 kind public.content_kind not null default 'hero_media' check (kind = 'hero_media'),
 page_id uuid not null references public.pages(id), asset_id uuid not null references public.media_assets(id),
 poster_asset_id uuid references public.media_assets(id), mobile_asset_id uuid references public.media_assets(id),
 focal_point_x numeric not null default 50 check (focal_point_x between 0 and 100),
 focal_point_y numeric not null default 50 check (focal_point_y between 0 and 100),
 foreign key (id, kind) references public.content_items(id, kind) on delete cascade
);

create table public.news (
 id uuid primary key,
 kind public.content_kind not null default 'news' check (kind = 'news'),
 cover_asset_id uuid references public.media_assets(id), article_date date,
 linkedin_original_url text check (linkedin_original_url ~ '^https://(www\.)?linkedin\.com/'),
 foreign key (id, kind) references public.content_items(id, kind) on delete cascade
);

create table public.job_openings (
 id uuid primary key,
 kind public.content_kind not null default 'job_opening' check (kind = 'job_opening'),
 opens_at timestamptz, closes_at timestamptz,
 check (closes_at is null or opens_at is null or closes_at > opens_at),
 foreign key (id, kind) references public.content_items(id, kind) on delete cascade
);

create table public.project_services (
 project_id uuid not null references public.projects(id) on delete cascade,
 service_id uuid not null references public.services(id), primary key (project_id, service_id)
);
create table public.media_variants (
 id uuid primary key default gen_random_uuid(), asset_id uuid not null references public.media_assets(id) on delete cascade,
 variant_key text not null, object_path text not null unique, mime_type text not null,
 width integer check (width > 0), height integer check (height > 0), byte_size bigint check (byte_size > 0), unique (asset_id, variant_key),
 check (split_part(object_path,'/',1) = asset_id::text and length(object_path) > 37)
);
create index page_sections_page_idx on public.page_sections(page_id);
create index navigation_parent_idx on public.navigation_items(parent_id);
create index projects_sector_idx on public.projects(sector_id);
create index projects_city_idx on public.projects(city_key);
create index project_media_project_idx on public.project_media(project_id);
create index project_media_asset_idx on public.project_media(asset_id);
create index hero_media_page_idx on public.hero_media(page_id);
create table private.content_provenance (
 content_id uuid primary key references public.content_items(id) on delete cascade,
 source_reference text not null, source_snapshot jsonb check (source_snapshot is null or jsonb_typeof(source_snapshot) = 'object'), source_page integer check (source_page > 0), evidence_reference text,
 import_key text unique, imported_at timestamptz not null default now(), notes text
);
alter table private.content_provenance enable row level security;

create function private.is_live(item_id uuid) returns boolean
language sql stable security definer set search_path = '' as $$
 select exists (select 1 from public.content_items c where c.id = item_id
 and c.publication_status = 'published' and c.approval_status = 'approved'
 and c.published_at <= now() and (c.expires_at is null or c.expires_at > now()));
$$;
create function private.is_editorial_staff() returns boolean
language sql stable security definer set search_path = '' as $$
 select private.has_role(array['administrator','content_editor','publisher']::private.staff_role[]);
$$;
create function private.can_read_content(item_id uuid) returns boolean
language sql stable security definer set search_path = '' as $$
 select private.is_live(item_id) or private.is_editorial_staff();
$$;
create function private.can_edit_content(item_id uuid) returns boolean
language sql stable security definer set search_path = '' as $$
 select private.has_role(array['administrator','publisher']::private.staff_role[])
 or (private.has_role(array['content_editor']::private.staff_role[]) and exists (
 select 1 from public.content_items c where c.id = item_id
 and c.publication_status in ('draft','in_review') and c.approval_status <> 'approved'));
$$;
revoke all on function private.is_live(uuid), private.is_editorial_staff(), private.can_read_content(uuid), private.can_edit_content(uuid) from public;
grant execute on function private.is_live(uuid), private.can_read_content(uuid) to anon, authenticated, service_role;
grant execute on function private.is_editorial_staff(), private.can_edit_content(uuid) to authenticated, service_role;

create function private.guard_publication() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
 if tg_op = 'UPDATE' and (new.id <> old.id or new.kind <> old.kind) then
   raise exception 'Content identity is immutable' using errcode = '23514';
 end if;
 if current_setting('role', true) = 'authenticated'
 and not private.has_role(array['administrator','publisher']::private.staff_role[]) then
   if tg_op = 'INSERT' then
     if new.approval_status <> 'unreviewed' or new.approved_at is not null or new.approved_by is not null
       or new.published_at is not null or new.publication_status not in ('draft','in_review') then
       raise exception 'Publisher approval required' using errcode = '42501';
     end if;
   elsif new.approval_status is distinct from old.approval_status or new.approved_at is distinct from old.approved_at
      or new.approved_by is distinct from old.approved_by or new.published_at is distinct from old.published_at
      or new.publication_status not in ('draft','in_review') then
     raise exception 'Publisher approval required' using errcode = '42501';
   end if;
 end if;
 if tg_op = 'UPDATE' and old.publication_status = 'published' and new.publication_status = 'published' then
   raise exception 'Unpublish before editing published content' using errcode = '23514';
 end if;
 if tg_op = 'UPDATE' and old.publication_status = 'published' and new.publication_status <> 'published' then
   new.approval_status := 'unreviewed'; new.approved_at := null; new.approved_by := null;
 end if;
 if new.approval_status = 'approved' and current_setting('role', true) = 'authenticated' then
   new.approved_by := auth.uid(); new.approved_at := now();
 end if;
 if new.publication_status = 'published' then
   if (select count(*) from public.content_translations where content_id = new.id and language_code in ('ar','en')) <> 2 then
     raise exception 'Arabic and English translations required' using errcode = '23514';
   end if;
   if not exists (select 1 from private.content_provenance where content_id = new.id and nullif(trim(evidence_reference),'') is not null) then
     raise exception 'Publication evidence required' using errcode = '23514';
   end if;
   if new.kind = 'statistic' and not exists (select 1 from public.statistics where id = new.id and reference_date is not null) then
     raise exception 'Statistic reference date required' using errcode = '23514';
   end if;
   if new.kind = 'media_asset' and not exists (select 1 from public.media_assets where id = new.id and object_path is not null and mime_type is not null) then
     raise exception 'Uploaded media metadata required' using errcode = '23514';
   end if;
   if current_setting('role', true) = 'authenticated' then new.approved_by := auth.uid(); new.approved_at := now(); end if;
 end if;
 new.updated_at := now();
 return new;
end;
$$;
revoke all on function private.guard_publication() from public;
create trigger content_publication_guard before insert or update on public.content_items for each row execute function private.guard_publication();

do $$
declare tbl text;
begin
 foreach tbl in array array['content_items','content_translations','site_settings','pages','page_sections','navigation_items','services','sectors','projects','project_services','media_assets','media_variants','project_media','statistics','hero_media','news','job_openings','languages'] loop
   execute format('alter table public.%I enable row level security',tbl);
   execute format('revoke all on public.%I from public, anon, authenticated',tbl);
   execute format('grant select on public.%I to anon, authenticated',tbl);
   execute format('grant all on public.%I to service_role',tbl);
 end loop;
 foreach tbl in array array['site_settings','pages','page_sections','navigation_items','services','sectors','projects','media_assets','project_media','statistics','hero_media','news','job_openings'] loop
   execute format('create policy content_read on public.%I for select to anon, authenticated using (private.can_read_content(id))',tbl);
   execute format('grant insert, update, delete on public.%I to authenticated',tbl);
   execute format('create policy content_insert on public.%I for insert to authenticated with check (private.can_edit_content(id))',tbl);
   execute format('create policy content_update on public.%I for update to authenticated using (private.can_edit_content(id)) with check (private.can_edit_content(id))',tbl);
   execute format('create policy content_delete on public.%I for delete to authenticated using (private.can_edit_content(id))',tbl);
 end loop;
end;
$$;
create policy languages_read on public.languages for select to anon, authenticated using (true);
create policy content_read on public.content_items for select to anon, authenticated using (private.can_read_content(id));
grant insert, update, delete on public.content_items to authenticated;
create policy content_insert on public.content_items for insert to authenticated with check (private.is_editorial_staff());
create policy content_update on public.content_items for update to authenticated using (private.can_edit_content(id)) with check (private.is_editorial_staff());
create policy content_delete on public.content_items for delete to authenticated using (private.can_edit_content(id));
grant insert, update, delete on public.content_translations to authenticated;
create policy translation_read on public.content_translations for select to anon, authenticated using (private.can_read_content(content_id));
create policy translation_insert on public.content_translations for insert to authenticated with check (private.can_edit_content(content_id));
create policy translation_update on public.content_translations for update to authenticated using (private.can_edit_content(content_id)) with check (private.can_edit_content(content_id));
create policy translation_delete on public.content_translations for delete to authenticated using (private.can_edit_content(content_id));
grant insert, update, delete on public.project_services, public.media_variants to authenticated;
create policy project_services_read on public.project_services for select to anon, authenticated using (private.can_read_content(project_id) and private.can_read_content(service_id));
create policy project_services_write on public.project_services for all to authenticated using (private.can_edit_content(project_id)) with check (private.can_edit_content(project_id));
create policy media_variants_read on public.media_variants for select to anon, authenticated using (private.can_read_content(asset_id));
create policy media_variants_write on public.media_variants for all to authenticated using (private.can_edit_content(asset_id)) with check (private.can_edit_content(asset_id));
grant select, insert, update, delete on private.content_provenance to authenticated;
grant all on private.content_provenance to service_role;
create policy provenance_read on private.content_provenance for select to authenticated using (private.is_editorial_staff());
create policy provenance_write on private.content_provenance for all to authenticated using (private.can_edit_content(content_id)) with check (private.can_edit_content(content_id));
commit;

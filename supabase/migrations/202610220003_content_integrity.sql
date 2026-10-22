begin;
-- Public visibility follows the complete dependency chain, including direct translation reads.
create or replace function private.is_live(item_id uuid) returns boolean
language plpgsql stable security definer set search_path = '' as $$
declare item public.content_items; dependencies_live boolean;
begin
 select * into item from public.content_items where id = item_id;
 if not found or item.publication_status <> 'published' or item.approval_status <> 'approved'
   or item.published_at > now() or item.published_at is null
   or (item.expires_at is not null and item.expires_at <= now()) then return false; end if;
 case item.kind
 when 'page_section' then select private.is_live(page_id) into dependencies_live from public.page_sections where id = item_id;
 when 'navigation_item' then select (parent_id is null or private.is_live(parent_id)) and (page_id is null or private.is_live(page_id)) into dependencies_live from public.navigation_items where id = item_id;
 when 'project' then select sector_id is null or private.is_live(sector_id) into dependencies_live from public.projects where id = item_id;
 when 'project_media' then select private.is_live(project_id) and private.is_live(asset_id) into dependencies_live from public.project_media where id = item_id;
 when 'hero_media' then select private.is_live(page_id) and private.is_live(asset_id) and (poster_asset_id is null or private.is_live(poster_asset_id)) and (mobile_asset_id is null or private.is_live(mobile_asset_id)) into dependencies_live from public.hero_media where id = item_id;
 when 'news' then select cover_asset_id is null or private.is_live(cover_asset_id) into dependencies_live from public.news where id = item_id;
 else dependencies_live := true;
 end case;
 return coalesce(dependencies_live,false);
end;
$$;

create function private.guard_child_content() returns trigger
language plpgsql security definer set search_path = '' as $$
declare old_id uuid; new_id uuid;
begin
 if tg_op <> 'INSERT' then old_id := (to_jsonb(old)->>tg_argv[0])::uuid; end if;
 if tg_op <> 'DELETE' then new_id := (to_jsonb(new)->>tg_argv[0])::uuid; end if;
 if exists (select 1 from public.content_items where id in (old_id,new_id) and publication_status = 'published') then
   raise exception 'Unpublish before changing content details or translations' using errcode = '23514';
 end if;
 if tg_op = 'DELETE' then return old; else return new; end if;
end;
$$;
do $$
declare tbl text;
begin
 foreach tbl in array array['site_settings','pages','page_sections','navigation_items','services','sectors','projects','media_assets','project_media','statistics','hero_media','news','job_openings'] loop
   execute format('create trigger protect_live_details before insert or update or delete on public.%I for each row execute function private.guard_child_content(''id'')',tbl);
 end loop;
end;
$$;
create trigger protect_live_translations before insert or update or delete on public.content_translations for each row execute function private.guard_child_content('content_id');
create trigger protect_live_variants before insert or update or delete on public.media_variants for each row execute function private.guard_child_content('asset_id');
create trigger protect_live_services before insert or update or delete on public.project_services for each row execute function private.guard_child_content('project_id');
create trigger protect_live_provenance before insert or update or delete on private.content_provenance for each row execute function private.guard_child_content('content_id');

create function private.guard_content_delete() returns trigger
language plpgsql set search_path = '' as $$
begin
 if old.publication_status = 'published' then raise exception 'Unpublish before deleting content' using errcode = '23514'; end if;
 return old;
end;
$$;
create trigger protect_live_root before delete on public.content_items for each row execute function private.guard_content_delete();
create function private.guard_navigation_tree() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
 if exists (
   with recursive ancestors as (
     select n.id,n.parent_id,array[n.id] as visited from public.navigation_items n where n.id = new.parent_id
     union all select n.id,n.parent_id,a.visited || n.id from public.navigation_items n join ancestors a on n.id = a.parent_id where not n.id = any(a.visited)
   ) select 1 from ancestors where id = new.id
 ) then raise exception 'Navigation cycle prohibited' using errcode = '23514'; end if;
 return new;
end;
$$;
create trigger navigation_tree_guard before insert or update on public.navigation_items for each row execute function private.guard_navigation_tree();

-- Require the typed detail row before publishing a common content record.
create function private.require_content_details() returns trigger
language plpgsql security definer set search_path = '' as $$
declare tbl text; present boolean;
begin
 if new.publication_status <> 'published' then return new; end if;
 tbl := case new.kind
 when 'page' then 'pages' when 'page_section' then 'page_sections' when 'navigation_item' then 'navigation_items'
 when 'service' then 'services' when 'sector' then 'sectors' when 'project' then 'projects'
 when 'statistic' then 'statistics' when 'job_opening' then 'job_openings' when 'media_asset' then 'media_assets'
 else new.kind::text end;
 execute format('select exists (select 1 from public.%I where id = $1)',tbl) into present using new.id;
 if not present then raise exception 'Typed content details required' using errcode = '23514'; end if;
 if new.kind = 'media_asset' then
   if not exists (select 1 from public.media_assets a join storage.objects o on o.bucket_id = a.bucket_id and o.name = a.object_path where a.id = new.id)
      or exists (select 1 from public.media_variants v where v.asset_id = new.id and not exists (select 1 from storage.objects o where o.bucket_id = 'site-media' and o.name = v.object_path)) then
     raise exception 'Upload all registered media objects before publication' using errcode = '23514';
   end if;
 end if;
 if new.kind = 'hero_media' and exists (
   select 1 from public.hero_media h join public.media_assets a on a.id = h.asset_id
   where h.id = new.id and a.media_type = 'video' and (h.poster_asset_id is null or not exists (
     select 1 from public.media_assets p where p.id = h.poster_asset_id and p.media_type = 'image'))
 ) then raise exception 'Video hero requires an image poster' using errcode = '23514'; end if;
 return new;
end;
$$;
create trigger typed_content_guard before insert or update on public.content_items for each row execute function private.require_content_details();

create table private.content_publication_history (
 id uuid primary key default gen_random_uuid(), content_id uuid not null references public.content_items(id),
 from_status public.publication_status, to_status public.publication_status not null,
 approval_status public.approval_status not null, actor_user_id uuid references auth.users(id),
 occurred_at timestamptz not null default now()
);
alter table private.content_publication_history enable row level security;
grant select on private.content_publication_history to authenticated;
grant select, insert on private.content_publication_history to service_role;
create policy publication_history_read on private.content_publication_history for select to authenticated using (private.is_editorial_staff());
create function private.audit_publication() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
 if tg_op = 'INSERT' or new.publication_status is distinct from old.publication_status or new.approval_status is distinct from old.approval_status then
   insert into private.content_publication_history(content_id,from_status,to_status,approval_status,actor_user_id)
   values(new.id,case when tg_op = 'UPDATE' then old.publication_status end,new.publication_status,new.approval_status,auth.uid());
 end if;
 return new;
end;
$$;
create trigger publication_audit after insert or update on public.content_items for each row execute function private.audit_publication();
create trigger immutable_publication_history before update or delete on private.content_publication_history for each row execute function private.protect_history();
revoke all on function private.guard_child_content(),private.guard_content_delete(),private.guard_navigation_tree(),private.require_content_details(),private.audit_publication() from public,anon,authenticated;
-- Keep shared timestamps accurate when editors change a translation or typed detail.
create function private.touch_content_parent() returns trigger
language plpgsql security definer set search_path = '' as $$
declare old_id uuid; new_id uuid;
begin
 if tg_op <> 'INSERT' then old_id := (to_jsonb(old)->>tg_argv[0])::uuid; end if;
 if tg_op <> 'DELETE' then new_id := (to_jsonb(new)->>tg_argv[0])::uuid; end if;
 update public.content_items set updated_at = now() where id in (old_id,new_id);
 if tg_op = 'DELETE' then return old; else return new; end if;
end;
$$;
do $$
declare tbl text;
begin
 foreach tbl in array array['site_settings','pages','page_sections','navigation_items','services','sectors','projects','media_assets','project_media','statistics','hero_media','news','job_openings'] loop
   execute format('create trigger touch_content after insert or update or delete on public.%I for each row execute function private.touch_content_parent(''id'')',tbl);
 end loop;
end;
$$;
create trigger touch_translation_parent after insert or update or delete on public.content_translations for each row execute function private.touch_content_parent('content_id');
create trigger touch_variant_parent after insert or update or delete on public.media_variants for each row execute function private.touch_content_parent('asset_id');
create trigger touch_service_parent after insert or update or delete on public.project_services for each row execute function private.touch_content_parent('project_id');
revoke all on function private.touch_content_parent() from public,anon,authenticated;
revoke select on public.content_items from anon;
grant select (id,kind,slug,publication_status,approval_status,published_at,expires_at,sort_order) on public.content_items to anon;
commit;

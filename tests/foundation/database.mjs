import fs from 'node:fs/promises'
import { PGlite } from '@electric-sql/pglite'
export async function createDatabase() {
  const db = new PGlite()
  // Catalog stubs only, not Supabase Auth/Storage servers.
  await db.exec(`create role anon nologin; create role authenticated nologin; create role service_role nologin bypassrls;
    create schema auth; create table auth.users(id uuid primary key);
    create function auth.uid() returns uuid language sql stable as $$ select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid $$;
    grant usage on schema auth to anon,authenticated,service_role; grant execute on function auth.uid() to anon,authenticated,service_role;
    create schema storage;
    create table storage.buckets(id text primary key,name text not null,public boolean not null default false,file_size_limit bigint,allowed_mime_types text[]);
    create table storage.objects(id uuid primary key default gen_random_uuid(),bucket_id text not null references storage.buckets(id),name text not null,metadata jsonb default '{}',unique(bucket_id,name));
    alter table storage.objects enable row level security;
    grant usage on schema storage to anon,authenticated,service_role;
    grant select,insert,update,delete on storage.objects to anon,authenticated,service_role;`)
  try {
    const files = (await fs.readdir('supabase/migrations')).filter(file => file.endsWith('.sql')).sort()
    for (const file of files) await db.exec(await fs.readFile('supabase/migrations/' + file,'utf8'))
    await db.exec(await fs.readFile('supabase/seed.sql','utf8'))
    return db
  } catch (error) { await db.close(); throw error }
}
export async function asRole(db, role, userId, action) {
  await db.exec('begin; set local role ' + role + ';')
  await db.query("select set_config('request.jwt.claim.sub',$1,true)",[userId ?? ''])
  try { return await action(db) } finally { await db.exec('rollback;') }
}
export const ids = {
  admin:'00000000-0000-4000-a000-000000000001', editor:'00000000-0000-4000-a000-000000000002',
  publisher:'00000000-0000-4000-a000-000000000003', hr:'00000000-0000-4000-a000-000000000004',
  procurement:'00000000-0000-4000-a000-000000000005', otherHr:'00000000-0000-4000-a000-000000000006',
  unprivileged:'00000000-0000-4000-a000-000000000007',
  career:'10000000-0000-4000-a000-000000000001', supplier:'10000000-0000-4000-a000-000000000002',
  unassignedCareer:'10000000-0000-4000-a000-000000000003',
  page:'20000000-0000-4000-a000-000000000001', media:'20000000-0000-4000-a000-000000000002',
}
export async function fixtures(db) {
  for (const [key,id] of Object.entries(ids).filter(([key]) => ['admin','editor','publisher','hr','procurement','otherHr','unprivileged'].includes(key))) {
    await db.query('insert into auth.users(id) values($1)',[id])
    const role = {admin:'administrator',editor:'content_editor',publisher:'publisher',hr:'hr_reviewer',procurement:'procurement_reviewer',otherHr:'hr_reviewer'}[key]
    if (role) await db.query('insert into private.user_roles(user_id,role) values($1,$2)',[id,role])
  }
  await db.query("insert into private.career_applications(id,full_name,email,internal_notes,consent_version,consented_at,locale) values($1,'Test applicant','career@example.test','HR only','test',now(),'en'),($2,'Unassigned applicant','unassigned@example.test',null,'test',now(),'ar')",[ids.career,ids.unassignedCareer])
  await db.query("insert into private.supplier_applications(id,company_name,contact_name,email,category,internal_notes,consent_version,consented_at,locale) values($1,'Test supplier','Test contact','supplier@example.test','test','Procurement only','test',now(),'en')",[ids.supplier])
  await db.query('insert into private.application_reviewer_assignments(career_application_id,reviewer_id,assigned_by) values($1,$2,$3)',[ids.career,ids.hr,ids.admin])
  await db.query('insert into private.application_reviewer_assignments(supplier_application_id,reviewer_id,assigned_by) values($1,$2,$3)',[ids.supplier,ids.procurement,ids.admin])
  await db.query("insert into private.application_documents(career_application_id,bucket_id,object_path,original_filename,mime_type,byte_size,scan_status,scanned_at) values($1,'career-documents','cv.pdf','CV.pdf','application/pdf',100,'clean',now()),($1,'career-documents','pending.pdf','pending.pdf','application/pdf',100,'pending',null)",[ids.career])
  await db.query("insert into private.application_documents(supplier_application_id,bucket_id,object_path,original_filename,mime_type,byte_size,scan_status,scanned_at) values($1,'supplier-documents','profile.pdf','profile.pdf','application/pdf',100,'clean',now())",[ids.supplier])
  await db.exec("insert into storage.objects(bucket_id,name) values ('career-documents','cv.pdf'),('career-documents','pending.pdf'),('supplier-documents','profile.pdf'),('site-media','20000000-0000-4000-a000-000000000002/released.webp'),('site-media','unregistered.webp')")
  await db.query("insert into public.content_items(id,kind,slug) values($1,'page','test-live-page'),($2,'media_asset','test-live-media')",[ids.page,ids.media])
  await db.query("insert into public.pages(id,route_path) values($1,'test-fixture')",[ids.page])
  await db.query("insert into public.media_assets(id,media_type,object_path,mime_type) values($1,'image','20000000-0000-4000-a000-000000000002/released.webp','image/webp')",[ids.media])
  for (const id of [ids.page,ids.media]) {
    await db.query("insert into public.content_translations(content_id,language_code,title) values($1,'en','Test'),($1,'ar','اختبار')",[id])
    await db.query("insert into private.content_provenance(content_id,source_reference,evidence_reference) values($1,'test fixture','test fixture approval')",[id])
    await db.query("update public.content_items set publication_status='published',approval_status='approved',approved_by=$2,approved_at=now(),published_at=now() where id=$1",[id,ids.admin])
  }
}

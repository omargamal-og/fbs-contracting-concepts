import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import { before, after, test } from 'node:test'
import { createDatabase, fixtures, asRole, ids } from './database.mjs'
import { buildSeed, readSourceLiteral, seedId } from '../../scripts/generate-content-seed.mjs'
let db
before(async () => { db = await createDatabase(); await fixtures(db) })
after(async () => { await db?.close() })
const count = async (connection,table,where = '') => Number((await connection.query('select count(*) as n from ' + table + ' ' + where)).rows[0].n)
const denied = action => assert.rejects(action, error => ['42501','23514'].includes(error.code))

for (const role of ['anon','authenticated']) test(role + ' reads only approved live content without client filters', async () => {
  await asRole(db,role,role === 'anon' ? null : ids.unprivileged,async connection => {
    const rows = (await connection.query('select id,slug from public.content_items')).rows
    assert.deepEqual(rows.map(row => row.slug).sort(),['test-live-media','test-live-page'])
    assert.equal(await count(connection,'public.projects'),0)
    assert.equal(await count(connection,'public.statistics'),0)
    assert.equal(await count(connection,'public.content_translations'),4)
  })
})
test('all application tables have RLS and private is not an exposed API schema', async () => {
  const tables = (await db.query("select n.nspname,c.relname,c.relrowsecurity from pg_class c join pg_namespace n on n.oid=c.relnamespace where n.nspname in ('public','private') and c.relkind='r'")).rows
  assert.ok(tables.length >= 25)
  assert.ok(tables.every(table => table.relrowsecurity))
  const config = await fs.readFile('supabase/config.toml','utf8')
  assert.match(config,/schemas = \["public"\]/)
})
test('anonymous users cannot read private tables, file metadata, or staff approval identities', async () => {
  for (const table of ['career_applications','supplier_applications','application_documents','application_status_history','application_reviewer_assignments','user_roles','content_provenance','content_publication_history']) {
    await denied(() => asRole(db,'anon',null,connection => connection.query('select * from private.' + table)))
  }
  await denied(() => asRole(db,'anon',null,connection => connection.query('select approved_by from public.content_items')))
})
test('anonymous writes are denied on content and private applications', async () => {
  await denied(() => asRole(db,'anon',null,connection => connection.query("insert into public.content_items(kind,slug) values('page','public-write')")))
  await denied(() => asRole(db,'anon',null,connection => connection.query("insert into private.career_applications(full_name,email,consent_version,consented_at,locale) values('test','x@example.test','test',now(),'en')")))
})
test('roles cannot be assigned, escalated, or deleted by browser users including administrators', async () => {
  for (const user of [ids.unprivileged,ids.editor,ids.hr,ids.procurement,ids.admin]) {
    await denied(() => asRole(db,'authenticated',user,connection => connection.query("insert into private.user_roles(user_id,role) values($1,'administrator')",[ids.unprivileged])))
    await denied(() => asRole(db,'authenticated',user,connection => connection.query("update private.user_roles set role='administrator' where user_id=$1",[user])))
    await denied(() => asRole(db,'authenticated',user,connection => connection.query('delete from private.user_roles where user_id=$1',[user])))
  }
})
test('HR sees only assigned career records, career documents, and career history', async () => {
  await asRole(db,'authenticated',ids.hr,async connection => {
    assert.equal(await count(connection,'private.career_applications'),1)
    assert.equal(await count(connection,'private.supplier_applications'),0)
    assert.equal(await count(connection,'private.application_documents'),2)
    assert.equal(await count(connection,'private.application_status_history'),1)
    assert.equal(await count(connection,'private.application_reviewer_assignments'),1)
    assert.equal((await connection.query('select internal_notes from private.career_applications')).rows[0].internal_notes,'HR only')
    assert.equal(await count(connection,'private.content_provenance'),0)
  })
})
test('Procurement sees only assigned supplier records, documents, and history', async () => {
  await asRole(db,'authenticated',ids.procurement,async connection => {
    assert.equal(await count(connection,'private.career_applications'),0)
    assert.equal(await count(connection,'private.supplier_applications'),1)
    assert.equal(await count(connection,'private.application_documents'),1)
    assert.equal(await count(connection,'private.application_status_history'),1)
    assert.equal((await connection.query('select internal_notes from private.supplier_applications')).rows[0].internal_notes,'Procurement only')
  })
})
test('unassigned reviewers and content staff see no submissions or documents', async () => {
  for (const user of [ids.otherHr,ids.editor,ids.publisher,ids.unprivileged]) await asRole(db,'authenticated',user,async connection => {
    for (const table of ['career_applications','supplier_applications','application_documents','application_status_history']) assert.equal(await count(connection,'private.' + table),0)
  })
})
test('reviewer assignment must match department and is server-only', async () => {
  await assert.rejects(() => db.query('insert into private.application_reviewer_assignments(career_application_id,reviewer_id,assigned_by) values($1,$2,$3)',[ids.unassignedCareer,ids.procurement,ids.admin]),{code:'23514'})
  await denied(() => asRole(db,'authenticated',ids.hr,connection => connection.query('insert into private.application_reviewer_assignments(career_application_id,reviewer_id,assigned_by) values($1,$2,$3)',[ids.unassignedCareer,ids.hr,ids.admin])))
})
test('all buckets are private and unknown, quarantined, and cross-department objects are hidden', async () => {
  assert.ok((await db.query('select public from storage.buckets')).rows.every(bucket => bucket.public === false))
  for (const [role,user,expected] of [
    ['anon',null,['20000000-0000-4000-a000-000000000002/released.webp']],
    ['authenticated',ids.hr,['cv.pdf','20000000-0000-4000-a000-000000000002/released.webp']],
    ['authenticated',ids.procurement,['profile.pdf','20000000-0000-4000-a000-000000000002/released.webp']],
    ['authenticated',ids.otherHr,['20000000-0000-4000-a000-000000000002/released.webp']],
  ]) await asRole(db,role,user,async connection => {
    assert.deepEqual((await connection.query('select name from storage.objects order by name')).rows.map(row => row.name),[...expected].sort())
  })
})
test('browser application uploads and overwriting live media are denied', async () => {
  await denied(() => asRole(db,'authenticated',ids.hr,connection => connection.query("insert into storage.objects(bucket_id,name) values('career-documents','new.pdf')")))
  await denied(() => asRole(db,'authenticated',ids.publisher,connection => connection.query("insert into storage.objects(bucket_id,name) values('site-media','20000000-0000-4000-a000-000000000002/released.webp')")))
  await asRole(db,'authenticated',ids.publisher,async connection => {
    assert.equal((await connection.query("update storage.objects set metadata='{}' where name='20000000-0000-4000-a000-000000000002/released.webp'")).affectedRows,0)
  })
})
test('editor can edit draft translations but cannot approve, publish, or modify live content', async () => {
  await asRole(db,'authenticated',ids.editor,async connection => {
    const updated = await connection.query("update public.content_translations set title='Draft edit' where content_id=$1 and language_code='en'",[seedId('project:jawhart-al-sahab-riyadh')])
    assert.equal(updated.affectedRows,1)
    assert.equal((await connection.query("update public.content_translations set title='Live edit' where content_id=$1",[ids.page])).affectedRows,0)
    assert.equal((await connection.query("delete from public.content_items where id=$1",[ids.page])).affectedRows,0)
  })
  await denied(() => asRole(db,'authenticated',ids.editor,connection => connection.query("update public.content_items set approval_status='approved',approved_by=$1,approved_at=now() where id=$2",[ids.editor,seedId('page:home')])))
  await denied(() => asRole(db,'authenticated',ids.editor,connection => connection.query("insert into public.content_items(kind,slug,publication_status,approval_status,approved_by,approved_at,published_at) values('page','editor-bypass','published','approved',$1,now(),now())",[ids.editor])))
})
test('publisher must unpublish before changing live details or translations', async () => {
  await denied(() => asRole(db,'authenticated',ids.publisher,connection => connection.query("update public.content_translations set title='Changed' where content_id=$1",[ids.page])))
  await denied(() => asRole(db,'authenticated',ids.publisher,connection => connection.query("update public.pages set route_path='changed' where id=$1",[ids.page])))
  await denied(() => asRole(db,'authenticated',ids.publisher,connection => connection.query('delete from public.content_items where id=$1',[ids.page])))
  await asRole(db,'authenticated',ids.publisher,async connection => {
    await connection.query("update public.content_items set publication_status='draft' where id=$1",[ids.page])
    await connection.query("update public.content_translations set title='Changed' where content_id=$1 and language_code='en'",[ids.page])
    assert.equal((await connection.query('select approval_status from public.content_items where id=$1',[ids.page])).rows[0].approval_status,'unreviewed')
  })
})
test('publication requires bilingual content, evidence, and statistic reference dates', async () => {
  const home = seedId('page:home')
  await asRole(db,'authenticated',ids.publisher,async connection => {
    await connection.query('delete from public.content_translations where content_id=$1 and language_code=$2',[home,'ar'])
    await connection.query("update private.content_provenance set evidence_reference='test' where content_id=$1",[home])
    await assert.rejects(() => connection.query("update public.content_items set publication_status='published',approval_status='approved',published_at=now() where id=$1",[home]),{code:'23514'})
  })
  await assert.rejects(() => asRole(db,'authenticated',ids.publisher,connection => connection.query("update public.content_items set publication_status='published',approval_status='approved',published_at=now() where id=$1",[home])),{code:'23514'})
  await asRole(db,'authenticated',ids.publisher,async connection => {
    const stat = seedId('statistic:project-value')
    await connection.query("update private.content_provenance set evidence_reference='test' where content_id=$1",[stat])
    await assert.rejects(() => connection.query("update public.content_items set publication_status='published',approval_status='approved',published_at=now() where id=$1",[stat]),{code:'23514'})
  })
})
test('future and expired publications are hidden even when explicitly marked published', async () => {
  for (const expression of ["published_at=now()+interval '1 day'","published_at=now()-interval '2 days',expires_at=now()-interval '1 day'"]) {
    await db.exec('begin;')
    try {
      await db.query("update public.content_items set publication_status='draft' where id=$1",[ids.page])
      await db.query("update public.content_items set publication_status='published',approval_status='approved',approved_by=$2,approved_at=now()," + expression + ' where id=$1',[ids.page,ids.admin])
      await db.exec('set local role anon;')
      assert.equal(await count(db,'public.pages'),0)
    } finally { await db.exec('rollback;') }
  }
})
test('published child translations disappear when their parent page is unpublished', async () => {
  await db.exec('begin;')
  try {
    const section = seedId('page_section:home-company-introduction')
    await db.query("update private.content_provenance set evidence_reference='test' where content_id=$1",[section])
    await db.query("update public.content_items set publication_status='published',approval_status='approved',approved_by=$2,approved_at=now(),published_at=now() where id=$1",[section,ids.admin])
    await db.exec('set local role anon;')
    assert.equal((await db.query('select content_id from public.content_translations where content_id=$1',[section])).rows.length,0)
  } finally { await db.exec('rollback;') }
})
test('application status and history update atomically and browser transitions stay denied', async () => {
  await denied(() => asRole(db,'authenticated',ids.hr,connection => connection.query("update private.career_applications set status='in_review' where id=$1",[ids.career])))
  await asRole(db,'service_role',null,async connection => {
    await connection.query("update private.career_applications set status='in_review',reviewed_by=$2,status_reason='Test review' where id=$1",[ids.career,ids.hr])
    assert.equal((await connection.query('select version from private.career_applications where id=$1',[ids.career])).rows[0].version,2)
    const events = (await connection.query('select from_status,to_status,reviewer_id from private.application_status_history where career_application_id=$1 order by occurred_at',[ids.career])).rows
    assert.equal(events.length,2)
    assert.equal(events[1].from_status,'submitted')
    assert.equal(events[1].to_status,'in_review')
    assert.equal(events[1].reviewer_id,ids.hr)
  })
  assert.equal(await count(db,'private.application_status_history','where career_application_id = ' + "'" + ids.career + "'"),1)
  await assert.rejects(() => asRole(db,'service_role',null,connection => connection.query("update private.career_applications set status='in_review',reviewed_by=$2,status_reason='Wrong department' where id=$1",[ids.career,ids.procurement])),{code:'23514'})
})
test('history is immutable and documents cannot point to both application types', async () => {
  await denied(() => asRole(db,'service_role',null,connection => connection.query("update private.application_status_history set reason='tampered'")))
  await assert.rejects(() => db.query("insert into private.application_documents(career_application_id,supplier_application_id,bucket_id,object_path,original_filename,mime_type,byte_size) values($1,$2,'career-documents','invalid.pdf','invalid.pdf','application/pdf',1)",[ids.career,ids.supplier]),{code:'23514'})
})
test('corporate import preserves exactly eight source projects without fabricated locations', async () => {
  const source = readSourceLiteral('src/contracting/site/data/projects.ts','projects')
  assert.equal(await count(db,'public.projects'),8)
  for (const project of source) {
    const row = (await db.query('select p.*,c.publication_status,c.approval_status,s.source_page from public.projects p join public.content_items c on c.id=p.id join private.content_provenance s on s.content_id=p.id where c.slug=$1',[project.slug])).rows[0]
    assert.equal(row.source_page,project.sourcePage)
    assert.equal(row.latitude,null); assert.equal(row.longitude,null)
    assert.equal(row.coordinates_verified,false); assert.equal(row.delivery_status,'unspecified')
    assert.equal(row.publication_status,'draft'); assert.equal(row.approval_status,'unreviewed')
    assert.equal(row.start_year,project.constructionPeriod?.startYear ?? null)
    assert.equal(row.units_count,project.units?.count ?? null)
  }
  const seed = buildSeed()
  assert.doesNotMatch(seed.sql,/atheelco\.com|mapPosition|cityPositions/)
  assert.equal(await count(db,'public.statistics'),7)
  assert.equal(await count(db,'public.statistics','where reference_date is not null'),0)
})
test('bilingual import has both languages and preserves the original dictionaries privately', async () => {
  const missing = await db.query("select c.id from public.content_items c left join public.content_translations t on t.content_id=c.id group by c.id having count(t.*)<>2")
  assert.equal(missing.rows.length,0)
  const snapshot = (await db.query('select source_snapshot from private.content_provenance where content_id=$1',[seedId('site_settings:corporate-settings')])).rows[0].source_snapshot
  assert.deepEqual(snapshot.en,readSourceLiteral('src/contracting/site/i18n/en.ts','en'))
  assert.deepEqual(snapshot.ar,readSourceLiteral('src/contracting/site/i18n/ar.ts','ar'))
  await assert.rejects(() => db.query("insert into public.content_translations(content_id,language_code,title) values($1,'fr','Test')",[seedId('page:home')]),{code:'23503'})
})
test('seed is reproducible, repeatable, and does not overwrite editorial changes', async () => {
  const expected = buildSeed()
  assert.equal(await fs.readFile('supabase/seed.sql','utf8'),expected.sql)
  assert.equal(await fs.readFile('supabase/seed-manifest.json','utf8'),JSON.stringify(expected.manifest,null,2)+'\n')
  await db.exec('begin;')
  try {
    const project = seedId('project:jawhart-al-sahab-riyadh')
    await db.query("update public.content_translations set title='Reviewed draft' where content_id=$1 and language_code='en'",[project])
    // Seed has its own transaction; remove wrappers so this test can roll back its changes.
    const body = expected.sql.replace(/^begin;$/m,'').replace(/^commit;$/m,'')
    const originalCount = await count(db,'public.content_items')
    await db.exec(body)
    assert.equal(await count(db,'public.content_items'),originalCount)
    assert.equal((await db.query("select title from public.content_translations where content_id=$1 and language_code='en'",[project])).rows[0].title,'Reviewed draft')
  } finally { await db.exec('rollback;') }
  const fresh = await createDatabase()
  try { assert.equal(await count(fresh,'public.content_items'),Object.values(expected.manifest.counts).reduce((sum,value)=>sum+value,0)) }
  finally { await fresh.close() }
})

test('publisher publication records the actual actor and seed reruns preserve published records', async () => {
  const home = seedId('page:home')
  await asRole(db,'authenticated',ids.publisher,async connection => {
    await connection.query("update private.content_provenance set evidence_reference='Test approval evidence' where content_id=$1",[home])
    await connection.query("update public.content_items set publication_status='published',approval_status='approved',published_at=now() where id=$1",[home])
    const row = (await connection.query('select approved_by,approval_status from public.content_items where id=$1',[home])).rows[0]
    assert.equal(row.approved_by,ids.publisher)
    assert.equal(row.approval_status,'approved')
    const history = (await connection.query("select actor_user_id from private.content_publication_history where content_id=$1 and to_status='published'",[home])).rows
    assert.deepEqual(history,[{actor_user_id:ids.publisher}])
    await connection.exec('set local role postgres;')
    await connection.exec(buildSeed().sql.replace(/^begin;$/m,'').replace(/^commit;$/m,''))
    assert.equal((await connection.query('select publication_status from public.content_items where id=$1',[home])).rows[0].publication_status,'published')
  })
})
test('coordinate validation requires paired, bounded values and evidence for verification', async () => {
  const project = seedId('project:jawhart-al-sahab-riyadh')
  for (const change of ['latitude=24','latitude=91,longitude=46','latitude=24,longitude=181','latitude=24,longitude=46,coordinates_verified=true']) {
    await assert.rejects(() => asRole(db,'service_role',null,connection => connection.query('update public.projects set ' + change + ' where id=$1',[project])),{code:'23514'})
  }
  await asRole(db,'service_role',null,async connection => {
    await connection.query("update public.projects set latitude=0,longitude=0,coordinates_verified=true,coordinate_source='Test fixture',location_precision='site' where id=$1",[project])
    assert.equal((await connection.query('select coordinates_verified from public.projects where id=$1',[project])).rows[0].coordinates_verified,true)
  })
})
test('media paths are owned by their content UUID and require an uploaded object before publishing', async () => {
  const asset = seedId('media_asset:existing-home-hero')
  await assert.rejects(() => asRole(db,'service_role',null,connection => connection.query("update public.media_assets set object_path='20000000-0000-4000-a000-000000000002/stolen.webp' where id=$1",[asset])),{code:'23514'})
  await asRole(db,'service_role',null,async connection => {
    await connection.query("update public.media_assets set object_path=$2,mime_type='image/webp' where id=$1",[asset,asset+'/not-uploaded.webp'])
    await connection.query("update private.content_provenance set evidence_reference='Test fixture' where content_id=$1",[asset])
    await assert.rejects(() => connection.query("update public.content_items set publication_status='published',approval_status='approved',approved_at=now(),approved_by=$2,published_at=now() where id=$1",[asset,ids.publisher]),{code:'23514'})
  })
})
test('navigation cycles are rejected before they can break recursive visibility policies', async () => {
  const parent = seedId('navigation_item:about-us')
  const child = seedId('navigation_item:who-we-are')
  await assert.rejects(() => asRole(db,'service_role',null,connection => connection.query('update public.navigation_items set parent_id=$2 where id=$1',[parent,child])),{code:'23514'})
})

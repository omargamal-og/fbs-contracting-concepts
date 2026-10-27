import WebSocket from 'ws'
// Node 20 test compatibility; browser code uses its native WebSocket and opens no realtime channel.
globalThis.WebSocket ??= WebSocket
import assert from 'node:assert/strict'
import { test } from 'node:test'
import { resolveSupabaseConfig } from '../../src/contracting/site/content/config.ts'
import { createPublicContentClient } from '../../src/contracting/site/content/client.ts'
import { getPublicContent, getPublicProjects, getPublicHomepage, getReleasedMediaUrl } from '../../src/contracting/site/content/publicContent.ts'
import { adaptProject, adaptStatistic, adaptSection, adaptHeroMedia } from '../../src/contracting/site/content/adapters.ts'
const config = {url:'https://example.supabase.co',key:'sb_publishable_test_placeholder'}
const item = {id:'00000000-0000-4000-a000-000000000001',kind:'project',slug:'test-project',sort_order:0,publication_status:'published',approval_status:'approved',published_at:'2026-01-01T00:00:00Z',expires_at:null}
const translation = {content_id:item.id,language_code:'ar',title:'مشروع اختبار',summary:null,body:null,location_label:'موقع اختبار',alt_text:null,seo_title:null,seo_description:null,content:{}}
const project = {id:item.id,kind:'project',sector_id:null,city_key:null,delivery_status:'unspecified',start_year:null,end_year:null,units_count:null,units_type:null,latitude:24,longitude:46,coordinates_verified:false,location_precision:'unknown',coordinate_source:null}
function mockClient(handler) {
  const calls = []
  const fetcher = async (input,options) => {
    const url = new URL(typeof input === 'string' ? input : input.url ?? input.toString())
    calls.push({url,options})
    const data = await handler(url,options)
    return data instanceof Response ? data : new Response(JSON.stringify(data),{status:200,headers:{'Content-Type':'application/json'}})
  }
  return {client:createPublicContentClient(config,fetcher),calls}
}
const jwt = role => 'eyJhbGciOiJIUzI1NiJ9.' + Buffer.from(JSON.stringify({role})).toString('base64url') + '.signature'
test('missing credentials are explicitly unavailable and privileged keys are rejected', () => {
  assert.deepEqual(resolveSupabaseConfig({}),{status:'unavailable',reason:'not_configured'})
  for (const key of ['sb_secret_test',jwt('service_role'),jwt('authenticated'),'invalid']) {
    assert.equal(resolveSupabaseConfig({VITE_SUPABASE_URL:config.url,VITE_SUPABASE_PUBLISHABLE_KEY:key}).status,'error')
  }
  for (const key of [config.key,jwt('anon')]) assert.equal(resolveSupabaseConfig({VITE_SUPABASE_URL:config.url,VITE_SUPABASE_PUBLISHABLE_KEY:key}).status,'ready')
  assert.equal(resolveSupabaseConfig({VITE_SUPABASE_URL:'http://example.com',VITE_SUPABASE_PUBLISHABLE_KEY:config.key}).status,'error')
  assert.equal(resolveSupabaseConfig({VITE_SUPABASE_URL:'http://127.0.0.1:54321',VITE_SUPABASE_PUBLISHABLE_KEY:config.key}).status,'ready')
})
test('public content uses explicit publication filters, requested language, and anonymous credentials', async () => {
  const {client,calls} = mockClient(url => {
    if (url.pathname.endsWith('/content_items')) return [item]
    if (url.pathname.endsWith('/content_translations')) return [translation]
    if (url.pathname.endsWith('/projects')) return [project]
    throw new Error('Unexpected path: '+url.pathname)
  })
  const result = await getPublicProjects({language:'ar'},client)
  assert.equal(result.status,'ready')
  assert.equal(result.data[0].translation.title,translation.title)
  const root = calls.find(call=>call.url.pathname.endsWith('/content_items'))
  assert.equal(root.url.searchParams.get('publication_status'),'eq.published')
  assert.equal(root.url.searchParams.get('approval_status'),'eq.approved')
  assert.equal(root.url.searchParams.get('kind'),'eq.project')
  assert.ok(!root.url.searchParams.get('select').includes('approved_by'))
  assert.equal(calls.find(call=>call.url.pathname.endsWith('/content_translations')).url.searchParams.get('language_code'),'eq.ar')
  assert.ok(calls.every(call => new Headers(call.options.headers).get('apikey') === config.key))
  assert.deepEqual((await client.auth.getSession()).data.session,null)
})
test('empty published collections and incomplete translations are unavailable without invented fallback', async () => {
  const empty = mockClient(()=>[])
  assert.deepEqual(await getPublicProjects({language:'en'},empty.client),{status:'unavailable',reason:'empty'})
  assert.equal(empty.calls.length,1)
  const noTranslation = mockClient(url => url.pathname.endsWith('/content_items') ? [item] : url.pathname.endsWith('/projects') ? [project] : [])
  assert.deepEqual(await getPublicProjects({language:'ar'},noTranslation.client),{status:'unavailable',reason:'empty'})
})
test('transport errors are explicit and do not expose backend response details', async () => {
  const {client} = mockClient(()=>new Response(JSON.stringify({message:'sensitive backend information',code:'500'}),{status:500,headers:{'Content-Type':'application/json'}}))
  const result = await getPublicProjects({language:'en'},client)
  assert.equal(result.status,'error')
  assert.equal(result.retryable,true)
  assert.doesNotMatch(result.message,/sensitive/)
})
test('public collections page beyond the first response without truncation', async () => {
  const roots = Array.from({length:101},(_,index)=>({...item,id:'id-'+index,slug:'test-'+index}))
  const {client,calls} = mockClient(url=>{
    const offset = Number(url.searchParams.get('offset') ?? 0)
    if (url.pathname.endsWith('/content_items')) return roots.slice(offset,offset+100)
    const idFilter = url.searchParams.get(url.pathname.endsWith('/projects') ? 'id' : 'content_id')
    const ids = idFilter.slice(4,-1).split(',')
    return ids.map(id=>url.pathname.endsWith('/projects') ? {...project,id} : {...translation,content_id:id})
  })
  const result = await getPublicProjects({language:'ar'},client)
  assert.equal(result.status,'ready')
  assert.equal(result.data.length,101)
  assert.equal(calls.filter(call=>call.url.pathname.endsWith('/content_items')).length,2)
})
test('homepage is unavailable unless an approved home page exists', async () => {
  const {client} = mockClient(url=>url.pathname.endsWith('/content_items') ? [{...item,kind:'page'}] : url.pathname.endsWith('/pages') ? [{id:item.id,kind:'page',route_path:'other-page'}] : [translation])
  assert.deepEqual(await getPublicHomepage({language:'ar'},client),{status:'unavailable',reason:'empty'})
})
test('homepage loader keeps empty optional sections explicit without changing the existing homepage', async () => {
  const {client} = mockClient(url=>url.pathname.endsWith('/content_items') ? url.searchParams.get('kind') === 'eq.page' ? [{...item,kind:'page'}] : [] : url.pathname.endsWith('/pages') ? [{id:item.id,kind:'page',route_path:''}] : [translation])
  const result = await getPublicHomepage({language:'ar'},client)
  assert.equal(result.status,'ready')
  for (const key of ['sections','hero','statistics','projects','services','sectors','news']) assert.deepEqual(result.data[key],[])
})
test('adapters do not manufacture coordinates, dates, units, or hero media', () => {
  const row = {item,translation,details:project}
  const adapted = adaptProject(row)
  assert.equal(adapted.coordinates,null)
  assert.equal(adapted.constructionPeriod,null)
  assert.equal(adapted.units,null)
  assert.equal(adapted.name,translation.title)
  assert.deepEqual(adaptProject({...row,details:{...project,coordinates_verified:true,location_precision:'site'}}).coordinates,{latitude:24,longitude:46,precision:'site'})
  assert.equal(adaptStatistic({item,translation,details:{value:100,unit:'m²',qualifier:'plus',reference_date:'2026-01-01',display_divisor:1}}).referenceDate,'2026-01-01')
  assert.equal(adaptSection({item,translation,details:{section_key:'intro',section_type:'introduction',settings:{}}}).title,translation.title)
  assert.equal(adaptHeroMedia({item,translation,details:{asset_id:'asset',poster_asset_id:null,mobile_asset_id:null,focal_point_x:50,focal_point_y:50}}).posterAssetId,null)
})
test('released assets use short-lived signed URLs, never a public bucket URL', async () => {
  const asset = {item,translation,details:{id:item.id,kind:'media_asset',bucket_id:'site-media',object_path:item.id+'/test.webp'}}
  const {client,calls} = mockClient(()=>({signedURL:'/object/sign/site-media/test.webp?token=test'}))
  assert.equal((await getReleasedMediaUrl(asset,client)).status,'ready')
  assert.ok(calls[0].url.pathname.includes('/object/sign/site-media/'))
  assert.equal(JSON.parse(calls[0].options.body).expiresIn,60)
  assert.deepEqual(await getReleasedMediaUrl({...asset,details:{...asset.details,object_path:null}},client),{status:'unavailable',reason:'empty'})
})
test('content lookup supports every declared entity through the common publication boundary', async () => {
  const {client} = mockClient(()=>[])
  for (const kind of ['site_settings','page','page_section','navigation_item','service','sector','project','project_media','statistic','hero_media','news','job_opening','media_asset']) {
    assert.equal((await getPublicContent(kind,{language:'en'},client)).status,'unavailable')
  }
})

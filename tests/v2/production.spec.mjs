/* global document, MediaRecorder */

import { test, expect } from '@playwright/test'
import fs from 'node:fs/promises'
const api='https://fbs-ui-test.invalid/**'
function records() {
  const roots=[],translations=[],tables={}
  const add=(kind,table,slug,title,details={},extra={})=>{
    const id='30000000-0000-4000-a000-'+String(roots.length+1).padStart(12,'0')
    roots.push({id,kind,slug,publication_status:'published',approval_status:'approved',published_at:'2026-01-01T00:00:00Z',expires_at:null,sort_order:roots.length})
    translations.push({content_id:id,language_code:'en',title,summary:null,body:null,location_label:null,alt_text:null,seo_title:null,seo_description:null,content:{},...extra})
    ;(tables[table]??=[]).push({id,kind,...details})
    return id
  }
  const page=add('page','pages','home','Test home',{route_path:''})
  add('page_section','page_sections','hero','Approved test headline',{page_id:page,section_key:'hero',section_type:'hero',settings:{}},{summary:'Published test introduction.'})
  add('service','services','test-service','Published test service')
  const asset=add('media_asset','media_assets','test-image','Test image',{media_type:'image',bucket_id:'site-media',object_path:'test/image.webp',mime_type:'image/webp',width:1600,height:900})
  add('hero_media','hero_media','test-hero','Test hero',{page_id:page,asset_id:asset,poster_asset_id:null,mobile_asset_id:null,focal_point_x:50,focal_point_y:50})
  const project=add('project','projects','published-test-project','Published test project',{sector_id:null,city_key:null,delivery_status:'unspecified',start_year:null,end_year:null,units_count:null,units_type:null,latitude:null,longitude:null,coordinates_verified:false,location_precision:'unknown',coordinate_source:null},{location_label:'Test location'})
  add('project_media','project_media','test-gallery','Test gallery',{project_id:project,asset_id:asset,media_role:'cover'})
  add('statistic','statistics','test-approved-stat','Approved test metric',{value:12,unit:null,qualifier:'exact',display_divisor:1,reference_date:'2026-01-01'})
  add('news','news','approved-test-article','Approved test article',{cover_asset_id:asset,article_date:'2026-10-01',linkedin_original_url:'https://www.linkedin.com/posts/test-post'},{summary:'Approved test excerpt.',body:'Approved test article body.'})
  return {roots,translations,tables,page,asset}
}
async function mockPublished(page,data,video=false,videoBody) {
  if(video){
    const id='30000000-0000-4000-a000-000000000100'
    data.roots.push({id,kind:'media_asset',slug:'test-film',publication_status:'published',approval_status:'approved',published_at:'2026-01-01',expires_at:null,sort_order:100})
    data.translations.push({content_id:id,language_code:'en',title:'Test video',summary:null,body:null,location_label:null,alt_text:null,content:{}})
    data.tables.media_assets.push({id,kind:'media_asset',media_type:'video',bucket_id:'site-media',object_path:'test/video.webm',mime_type:'video/webm',width:1600,height:900})
    data.tables.hero_media[0].poster_asset_id=data.asset
    data.tables.hero_media[0].asset_id=id
  }
  await page.route(api,async route=>{
    const url=new URL(route.request().url())
    if(url.pathname.includes('/storage/v1/object/sign/')){
      if(route.request().method()==='POST')return route.fulfill({json:{signedURL:'/object/sign/'+url.pathname.split('/object/sign/')[1]+'?token=synthetic'}})
      if(url.pathname.endsWith('video.webm')&&videoBody)return route.fulfill({contentType:'video/webm',body:videoBody})
      return route.fulfill({contentType:'image/svg+xml',body:'<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900"><rect width="1600" height="900" fill="#164b6b"/></svg>'})
    }
    const table=url.pathname.split('/').at(-1)
    if(table==='content_items'){
      const kind=url.searchParams.get('kind')?.slice(3)
      return route.fulfill({json:data.roots.filter(row=>row.kind===kind&&row.publication_status==='published'&&row.approval_status==='approved')})
    }
    if(table==='content_translations'){
      const ids=url.searchParams.get('content_id').slice(4,-1).split(',')
      return route.fulfill({json:data.translations.filter(row=>ids.includes(row.content_id)&&row.language_code===url.searchParams.get('language_code').slice(3))})
    }
    const ids=url.searchParams.get('id')?.slice(4,-1).split(',')
    return route.fulfill({json:(data.tables[table]??[]).filter(row=>!ids||ids.includes(row.id))})
  })
}
test.use({reducedMotion:'reduce'})
test('production omits development fixtures when no published content exists',async({page})=>{
  await page.route(api,route=>route.fulfill({json:[]}))
  await page.goto('/contracting/v2?presentation=1&lang=en')
  await expect(page.locator('.v2-content-status')).toContainText('Content is being prepared')
  await expect(page.locator('.v2-preview-banner')).toHaveCount(0)
  await expect(page.locator('.v2-statistics')).toHaveCount(0)
  await expect(page.locator('.v2-project-feature')).toHaveCount(0)
  await expect(page.locator('.v2-hero img')).toHaveCount(0)
  await expect(page.locator('.v2-map-marker')).toHaveCount(0)
  expect(await page.locator('body').innerText()).not.toMatch(/Jawhart|Nozol|1\.2B|3,000/)
  const files=await fs.readdir(test.info().config.metadata.productionDir+'/assets')
  expect(files.some(file=>file.startsWith('fixtures.development'))).toBe(false)
})
test('production handles backend failures without publishing fixtures or crashing',async({page})=>{
  const errors=[];page.on('pageerror',error=>errors.push(error.message))
  await page.route(api,route=>route.fulfill({status:503,json:{message:'test outage'}}))
  await page.goto('/contracting/v2?lang=en')
  await expect(page.locator('.v2-content-status')).toContainText('temporarily unavailable',{timeout:12000})
  await expect(page.locator('.v2-preview-banner')).toHaveCount(0)
  await expect(page.locator('h1')).toContainText('FBS')
  await expect(page.getByRole('button',{name:'Try again'})).toBeVisible()
  expect(errors).toEqual([])
})
test('production renders published models, signed media, news details, and original-post links',async({page})=>{
  const data=records();await mockPublished(page,data)
  await page.goto('/contracting/v2?lang=en')
  await expect(page.locator('h1')).toHaveText('Approved test headline')
  await expect(page.locator('.v2-preview-banner')).toHaveCount(0)
  await expect(page.locator('.v2-content-status')).toHaveCount(0)
  await expect(page.locator('.v2-statistics')).toContainText('Approved test metric')
  await expect(page.locator('.v2-project-editorial')).toContainText('Published test project')
  await expect(page.locator('#v2-news')).toContainText('Approved test excerpt.')
  await expect(page.locator('.v2-hero img')).toHaveAttribute('src',/storage\/v1\/object\/sign/)
  await expect(page.locator('.v2-map-marker')).toHaveCount(0)
  await page.locator('#v2-news').getByRole('link',{name:'Read article'}).click()
  await expect(page).toHaveURL(/news\/approved-test-article/)
  await expect(page.locator('.v2-article-copy')).toContainText('Approved test article body.')
  await expect(page.getByRole('link',{name:/Original LinkedIn post/})).toHaveAttribute('href','https://www.linkedin.com/posts/test-post')
})
test('reduced motion shows a video poster without creating autoplay video or media controls',async({page})=>{
  await mockPublished(page,records(),true)
  await page.goto('/contracting/v2?lang=en')
  await expect(page.locator('h1')).toHaveText('Approved test headline')
  await expect(page.locator('.v2-hero img')).toBeVisible()
  await expect(page.locator('.v2-hero video')).toHaveCount(0)
  await expect(page.getByRole('button',{name:'Pause background video'})).toHaveCount(0)
  await expect(page.locator('.v2-still-indicator')).toContainText('Static view')
})


test('video supports autoplay, pause, mute, multiple films, and offscreen suspension',async({page})=>{
  await page.emulateMedia({reducedMotion:'no-preference'})
  await page.goto('/')
  // Generate a tiny geometric test film locally; no external or company media is used.
  const bytes=await page.evaluate(async()=>{
    const canvas=document.createElement('canvas');canvas.width=320;canvas.height=180
    const ctx=canvas.getContext('2d'),stream=canvas.captureStream(8)
    const recorder=new MediaRecorder(stream,{mimeType:'video/webm;codecs=vp8'}),chunks=[]
    recorder.ondataavailable=event=>chunks.push(event.data)
    const finished=new Promise(resolve=>{recorder.onstop=async()=>resolve(Array.from(new Uint8Array(await new Blob(chunks,{type:'video/webm'}).arrayBuffer())))})
    recorder.start()
    let frame=0;const timer=setInterval(()=>{ctx.fillStyle=frame++%2?'#123c58':'#164b6b';ctx.fillRect(0,0,320,180)},125)
    await new Promise(resolve=>setTimeout(resolve,2500))
    clearInterval(timer);recorder.stop();stream.getTracks().forEach(track=>track.stop())
    return finished
  })
  const data=records()
  data.tables.hero_media.push({...data.tables.hero_media[0],id:'30000000-0000-4000-a000-000000000101'})
  data.roots.push({...data.roots.find(row=>row.kind==='hero_media'),id:'30000000-0000-4000-a000-000000000101',slug:'test-hero-two'})
  data.translations.push({...data.translations.find(row=>row.title==='Test hero'),content_id:'30000000-0000-4000-a000-000000000101'})
  await mockPublished(page,data,true,Buffer.from(bytes))
  // The second film uses the same test video, with its own independent playback element.
  data.tables.hero_media[1].asset_id=data.tables.hero_media[0].asset_id
  data.tables.hero_media[1].poster_asset_id=data.asset
  await page.goto('/contracting/v2?lang=en')
  const video=page.locator('.v2-film.is-active video')
  await expect(video).toHaveJSProperty('paused',false)
  await expect(video).toHaveJSProperty('muted',true)
  await page.getByRole('button',{name:'Pause background video'}).click()
  await expect(video).toHaveJSProperty('paused',true)
  await page.getByRole('button',{name:'Unmute background video'}).click()
  await expect(video).toHaveJSProperty('muted',false)
  await page.getByRole('button',{name:'Next background film'}).click()
  await expect(page.locator('.v2-film-dots button').nth(1)).toHaveAttribute('aria-pressed','true')
  await page.getByRole('button',{name:'Play background video'}).click()
  await expect(video).toHaveJSProperty('paused',false)
  await page.locator('#v2-connect').scrollIntoViewIfNeeded()
  await expect(page.locator('.v2-hero video').first()).toHaveJSProperty('paused',true)
  await expect(page.locator('.v2-hero video').nth(1)).toHaveJSProperty('paused',true)
})

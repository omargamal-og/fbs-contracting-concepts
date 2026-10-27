import { test, expect } from '@playwright/test'
import fs from 'node:fs/promises'
const api='https://fbs-v3-test.invalid/**'
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
      return route.fulfill({json:data.roots.filter(row=>row.kind===kind)})
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
test('production never falls back to preview projects, unapproved statistics or news',async({page})=>{
 const data=records();for(const row of data.roots){if(row.kind!=='page'){row.publication_status='draft';row.approval_status='unreviewed'}}await mockPublished(page,data);await page.goto('/contracting/v3?lang=en');await expect(page.locator('.v3-project-unavailable')).toBeVisible();await expect(page.locator('.v3-project-preview')).toHaveCount(0);await expect(page.locator('.v3-statistics')).toHaveCount(0);await expect(page.locator('.v3-news-list')).toHaveCount(0);await expect(page.locator('.v3-news-empty')).toContainText('No articles are currently published on this website.');expect(await page.locator('body').innerText()).not.toMatch(/Published test project|Approved test metric|Approved test article|Jawhart|1\.2B/);const files=await fs.readdir(test.info().config.metadata.productionDir+'/assets');expect(files.some(file=>file.startsWith('developmentProjects'))).toBe(false)
})

test('local review metrics and their draft fixture are excluded from the production build',async({page})=>{
 await mockPublished(page,records());await page.goto('/contracting/v3?lang=en')
 await expect(page.locator('.v3-review-statistics,#v3-impact-review-note')).toHaveCount(0)
 const files=await fs.readdir(test.info().config.metadata.productionDir+'/assets')
 expect(files.some(file=>file.includes('reviewStatistics'))).toBe(false)
})

test('direct V3 project URLs do not expose drafts or development portfolio data in production',async({page})=>{
 const data=records();for(const row of data.roots){if(row.kind==='project'){row.publication_status='draft';row.approval_status='unreviewed'}}
 await mockPublished(page,data);await page.goto('/contracting/v3/projects/published-test-project?lang=en')
 await expect(page.getByRole('heading',{name:'Project not available'})).toBeVisible();await expect(page.locator('#v3-project-detail-title')).toHaveCount(0)
 expect(await page.locator('body').innerText()).not.toMatch(/Published test project|Jawhart|Nozol|Company-profile preview/)
 await expect(page.locator('.v3-map-canvas')).toHaveCount(0)
})
test('approved published records render statistics, signed project media and news detail',async({page})=>{
 const data=records();await mockPublished(page,data);await page.goto('/contracting/v3?lang=en');await expect(page.locator('.v3-statistics')).toContainText('Approved test metric');await expect(page.locator('.v3-project-info h3')).toHaveText('Published test project');await page.locator('#v3-projects').scrollIntoViewIfNeeded();await expect(page.locator('.v3-featured-visual img')).toHaveAttribute('src',/storage\/v1\/object\/sign/);await page.getByRole('link',{name:'Project details: Published test project'}).click();await expect(page.locator('#v3-project-detail-title')).toHaveText('Published test project');await page.goBack();await page.locator('#v3-news').getByRole('button',{name:'Read article'}).click();await expect(page.locator('.v3-article-body')).toContainText('Approved test article body.');await expect(page.locator('dialog[open]').getByRole('link',{name:'Original LinkedIn post'})).toHaveAttribute('href','https://www.linkedin.com/posts/test-post');await expect(page.locator('.v3-project-preview')).toHaveCount(0)
})
test('an approved statistic still needs a reporting reference date',async({page})=>{
 const data=records();data.tables.statistics[0].reference_date=null;await mockPublished(page,data);await page.goto('/contracting/v3?lang=en');await expect(page.locator('.v3-news-list')).toBeVisible();await expect(page.locator('.v3-statistics')).toHaveCount(0);await expect(page.locator('.v3-impact-narrative')).toContainText('Plan with perspective.')
})
test('outages keep the complete shell usable and provide bounded retry',async({page})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.route(api,route=>route.fulfill({status:503,json:{message:'test outage'}}));await page.goto('/contracting/v3?lang=en');await expect(page.locator('.v3-content-notice')).toContainText('temporarily unavailable',{timeout:12000});await expect(page.getByRole('button',{name:'Try again'})).toBeVisible();await expect(page.locator('h1')).toBeVisible();await expect(page.locator('.v3-statistics')).toHaveCount(0);await expect(page.locator('.v3-project-preview')).toHaveCount(0);expect(errors).toEqual([])
})

test('published menu news is latest-first, keeps two cards for one record and returns focus after reading',async({page})=>{
 const data=records();await mockPublished(page,data);await page.goto('/contracting/v3?lang=en');await expect(page.locator('.v3-news-list')).toBeVisible();await page.locator('[data-v3-group=news]').click();await expect(page.locator('.v3-menu-card')).toHaveCount(2);await page.locator('.v3-menu-card').first().click();await expect(page.locator('#v3-dialog-title')).toHaveText('Approved test article');await expect(page.locator('dialog[open]').getByRole('link',{name:'Original LinkedIn post'})).toBeVisible();await page.keyboard.press('Escape');await expect(page.locator('[data-v3-group=news]')).toBeFocused()
 const newsRoot=data.roots.find(row=>row.kind==='news'),translation=data.translations.find(row=>row.content_id===newsRoot.id),record=data.tables.news[0]
 for(const [suffix,title,date] of [['201','Earlier approved update','2026-09-01'],['202','Latest approved update','2026-10-20']]){const id='30000000-0000-4000-a000-000000000'+suffix;data.roots.push({...newsRoot,id,slug:suffix,sort_order:50});data.translations.push({...translation,content_id:id,title});data.tables.news.push({...record,id,article_date:date})}
 await page.reload();await expect(page.locator('.v3-news-list h3').first()).toHaveText('Latest approved update');await page.locator('[data-v3-group=news]').click();await expect(page.locator('.v3-menu-card')).toHaveCount(3);await expect(page.locator('.v3-menu-card strong')).toHaveText(['Latest approved update','Approved test article','Earlier approved update']);await page.locator('.v3-menu-groups button').first().click();await expect(page.locator('.v3-menu-card strong')).toHaveText(['Our Team','Latest approved update','Approved test article'])
 await page.setViewportSize({width:1150,height:900});await page.locator('.v3-menu-groups button').nth(3).click();await page.locator('.v3-menu-card').first().click();await expect(page.locator('#v3-dialog-title')).toHaveText('Latest approved update');await page.keyboard.press('Escape');await expect(page.locator('.v3-mobile-toggle')).toBeFocused()
})

test('3D city panel uses approved CMS city keys, filters real categories and opens project details',async({page})=>{
 const data=records(),projectRoot=data.roots.find(row=>row.kind==='project'),projectTranslation=data.translations.find(row=>row.content_id===projectRoot.id),first=data.tables.projects[0]
 const sectorIds=['30000000-0000-4000-a000-000000000301','30000000-0000-4000-a000-000000000302']
 data.tables.sectors=[]
 for(const [index,id] of sectorIds.entries()){
  data.roots.push({...projectRoot,id,kind:'sector',slug:'sector-'+index});data.translations.push({...projectTranslation,content_id:id,title:['Residential fixture','Commercial fixture'][index]});data.tables.sectors.push({id,kind:'sector'})
 }
 first.city_key='riyadh';first.sector_id=sectorIds[0]
 const secondId='30000000-0000-4000-a000-000000000303'
 data.roots.push({...projectRoot,id:secondId,slug:'second-city-project'});data.translations.push({...projectTranslation,content_id:secondId,title:'Second approved city fixture'});data.tables.projects.push({...first,id:secondId,sector_id:sectorIds[1]})
 const draftId='30000000-0000-4000-a000-000000000304'
 data.roots.push({...projectRoot,id:draftId,slug:'unapproved-city-project',approval_status:'unreviewed',publication_status:'draft'});data.translations.push({...projectTranslation,content_id:draftId,title:'Unapproved city fixture'});data.tables.projects.push({...first,id:draftId})
 await mockPublished(page,data);await page.goto('/contracting/v3?lang=en');await page.locator('#v3-map').scrollIntoViewIfNeeded()
 await expect(page.locator('.v3-map-canvas')).toHaveAttribute('data-state','ready',{timeout:20000});await expect(page.locator('.v3-map-projects article')).toHaveCount(1);await expect(page.locator('.v3-map-project-switch')).toContainText('01 / 02')
 await expect(page.locator('.v3-map-projects article').first().locator('img')).toHaveAttribute('src',/storage\/v1\/object\/sign/)
 await page.locator('.v3-map-filter select').selectOption({label:'Commercial fixture'});await expect(page.locator('.v3-map-projects article')).toHaveCount(1);await expect(page.locator('.v3-map-projects')).toContainText('Second approved city fixture')
 await page.locator('.v3-map-projects a').click();await expect(page.locator('#v3-project-detail-title')).toHaveText('Second approved city fixture');await page.goBack();await page.locator('#v3-map').scrollIntoViewIfNeeded()
 await page.locator('.v3-map-cities button').nth(1).click();await expect(page.locator('.v3-map-projects article')).toHaveCount(0);await expect(page.locator('.v3-map-panel')).toContainText('No published projects for this city')
 expect(await page.locator('#v3-map').innerText()).not.toContain('Unapproved city fixture')
})

test('news composition supports a lead and three supporting verified records; metrics use their divisor',async({page})=>{
 const data=records(),newsRoot=data.roots.find(row=>row.kind==='news'),translation=data.translations.find(row=>row.content_id===newsRoot.id),record=data.tables.news[0]
 for(let index=1;index<=3;index++){const id='30000000-0000-4000-a000-'+String(400+index).padStart(12,'0');data.roots.push({...newsRoot,id,slug:'news-'+index});data.translations.push({...translation,content_id:id,title:'Approved news fixture '+index});data.tables.news.push({...record,id,article_date:'2026-10-0'+(index+1)})}
 data.tables.statistics[0].value=1200000000;data.tables.statistics[0].display_divisor=1000000000
 await mockPublished(page,data);await page.goto('/contracting/v3?lang=en');await expect(page.locator('.v3-statistics dd')).toContainText('1.2B');await expect(page.locator('.v3-statistics small')).toContainText('2026-01-01')
 await page.locator('#v3-news').scrollIntoViewIfNeeded();await expect(page.locator('.v3-news-list article')).toHaveCount(4);await expect(page.locator('.v3-news-list article img')).toHaveCount(4)
 const lead=await page.locator('.v3-news-list .v3-news-image').first().boundingBox(),support=await page.locator('.v3-news-list .v3-news-image').nth(1).boundingBox();expect(lead.width).toBeGreaterThan(support.width*2)
 await expect(page.locator('.v3-news-all')).toHaveAttribute('href','https://www.linkedin.com/company/fbs-contracting/')
})

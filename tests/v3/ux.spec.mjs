/* global document, window */
import { test, expect } from '@playwright/test'
async function ready(page,lang='en'){await page.goto('/contracting/v3?lang='+lang);await expect(page.locator('.v3-project-card [data-project-link]').first()).toBeVisible();await expect(page.locator('h1')).toHaveCSS('opacity','1')}
const y=page=>page.evaluate(()=>window.scrollY)
for(const language of ['en','ar'])test('direct and reloaded '+language+' starts at hero after content and video settle',async({page})=>{
 await page.goto('/contracting/v3?lang='+language);await expect(page.locator('#v3-title')).toBeVisible();await expect.poll(()=>y(page)).toBe(0)
 await page.waitForFunction(()=>Array.from(document.querySelectorAll('video')).some(video=>video.readyState>=2));await expect(page.locator('.v3-project-card [data-project-link]').first()).toBeVisible();await page.waitForTimeout(3200);expect(await y(page)).toBe(0)
 await page.evaluate(()=>window.scrollTo({top:1200,behavior:'instant'}));await page.reload();await expect(page.locator('.v3-project-card [data-project-link]').first()).toBeVisible();await page.waitForTimeout(2500);expect(await y(page)).toBe(0)
 // Once the user scrolls, later media/ScrollTrigger work must not reset the view.
 await page.evaluate(()=>window.scrollTo({top:650,behavior:'instant'}));await page.waitForTimeout(1800);expect(await y(page)).toBe(650)
})
test('stale About hash cannot replay through language reload or browser reload',async({page})=>{
 await page.goto('/contracting/v3?lang=en#v3-company');await expect(page.locator('.v3-project-card [data-project-link]').first()).toBeVisible();await expect.poll(()=>y(page)).toBeGreaterThan(500)
 await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));await page.locator('.v3-language').click();await expect(page.locator('.fbs-v3')).toHaveAttribute('lang','ar');await page.waitForTimeout(1800);expect(await y(page)).toBe(0)
 await page.evaluate(()=>window.scrollTo({top:1250,behavior:'instant'}));await page.locator('.v3-language').click();await expect(page.locator('.fbs-v3')).toHaveAttribute('lang','en');await page.waitForTimeout(1800);expect(await y(page)).toBe(1250)
 await page.reload();await expect(page.locator('.v3-project-card [data-project-link]').first()).toBeVisible();await page.waitForTimeout(1500);expect(await y(page)).toBe(0)
})
test('intentional and repeated anchors work, with Back and Forward scroll positions',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});await ready(page);await page.locator('.v3-hero-copy a').click();await expect(page).toHaveURL(/#v3-company$/);await expect.poll(()=>page.locator('#v3-company').evaluate(node=>Math.round(node.getBoundingClientRect().top))).toBe(110)
 await page.evaluate(()=>window.scrollTo({top:1350,behavior:'instant'}));await page.locator('[data-v3-group=approach]').click();await page.locator('.v3-menu-links a').first().click();await expect(page).toHaveURL(/#v3-expertise$/);const expertise=await y(page);expect(expertise).toBeGreaterThan(2000)
 await page.goBack();await expect.poll(()=>y(page)).toBe(1350);await page.goForward();await expect.poll(()=>y(page)).toBe(expertise)
 await page.evaluate(()=>window.scrollTo({top:300,behavior:'instant'}));await page.locator('[data-v3-group=approach]').click();await page.locator('.v3-menu-links a').first().click();await expect.poll(()=>y(page)).toBe(expertise)
})
for(const [width,height,language] of [[1440,1000,'en'],[1440,900,'ar'],[1280,720,'ar'],[1024,768,'en'],[768,1024,'ar'],[390,844,'en'],[390,844,'ar'],[320,568,'ar'],[844,390,'ar']])test('geometry remains separated '+width+'x'+height+' '+language,async({page})=>{
 await page.setViewportSize({width,height});await page.emulateMedia({reducedMotion:'reduce'});await ready(page,language)
 const errors=await page.evaluate(()=>{
  const failures=[],rect=selector=>document.querySelector(selector).getBoundingClientRect(),overlap=(a,b)=>Math.min(a.right,b.right)>Math.max(a.left,b.left)+1&&Math.min(a.bottom,b.bottom)>Math.max(a.top,b.top)+1
  const sections=Array.from(document.querySelectorAll('.v3-main>section'))
  if(rect('#v3-company').top<rect('#v3-hero').bottom)failures.push('company overlaps hero')
  sections.forEach((section,index)=>{const box=section.getBoundingClientRect();if(section.classList.contains('v3-section')&&box.width>window.innerWidth+1)failures.push('section exceeds viewport');if(index&&box.top<sections[index-1].getBoundingClientRect().bottom-1)failures.push('section boundary '+section.id)})
  if(overlap(rect('.v3-hero-copy a'),rect('.v3-hero-bottom')))failures.push('hero CTA/player')
  if(overlap(rect('.v3-hero-bottom'),rect('.v3-stock-note')))failures.push('player/credit')
  const logo=rect('.v3-nav .v3-logo');const brandEdge=document.documentElement.dir==='rtl'?window.innerWidth-logo.right:logo.x;if(brandEdge>36||brandEdge<12)failures.push('logo edge')
  document.querySelectorAll('.v3-nav-inner button').forEach(button=>{if(button.getClientRects().length&&overlap(button.getBoundingClientRect(),logo))failures.push('logo/control')})
  if(document.documentElement.scrollWidth>window.innerWidth)failures.push('page overflow')
  return failures
 });expect(errors).toEqual([])
 for(const id of ['v3-company','v3-expertise','v3-projects','v3-sustainability','v3-news','v3-connect']){await page.locator('#'+id).scrollIntoViewIfNeeded();expect(await page.evaluate(()=>document.documentElement.scrollWidth-window.innerWidth)).toBe(0)}
 const image=await page.locator('.v3-featured-visual').first().boundingBox(),info=await page.locator('.v3-project-info').first().boundingBox();expect(info.y).toBeGreaterThanOrEqual(image.y);expect(info.y+info.height).toBeLessThanOrEqual(image.y+image.height+1)
})
test('every desktop menu has relevant cards, News is primary and the hover bridge stays open',async({page})=>{
 await ready(page)
 for(const [group,expected] of [['company',2],['projects',2],['news',2],['more',3]]){
  await page.locator('[data-v3-group='+group+']').hover();await expect(page.locator('.v3-menu-card')).toHaveCount(expected);await expect(page.locator('.v3-menu-primary h2')).toHaveText(group.charAt(0).toUpperCase()+group.slice(1));await page.waitForTimeout(650)
  const box=await page.locator('.v3-menu').boundingBox();await page.mouse.move(box.x+box.width/2,box.y-5);await page.waitForTimeout(400);await expect(page.locator('.v3-menu')).toBeVisible();await page.locator('.v3-menu-primary h2').hover()
 }
 await expect(page.locator('.v3-menu-card')).toHaveCount(3);await page.keyboard.press('Escape');await expect(page.locator('.v3-menu')).toHaveCount(0);await expect(page.locator('[data-v3-group=more]')).toBeFocused()
})
test('Arabic touch menu exposes all navigation groups and useful News fallbacks',async({page})=>{
 await page.setViewportSize({width:390,height:844});await ready(page,'ar');await page.locator('.v3-mobile-toggle').click();await page.locator('.v3-menu-groups button').nth(3).click();await expect(page.locator('.v3-menu-primary h2')).toHaveText('الأخبار');await expect(page.locator('.v3-menu-card')).toHaveCount(2);await expect(page.locator('.v3-menu-card').first()).toContainText('بعد اعتمادها');await page.keyboard.press('Escape');await expect(page.locator('.v3-mobile-toggle')).toBeFocused();await expect(page.locator('[data-v3-page]')).toHaveJSProperty('inert',false)
})
test('ambient accents move in view and pause offscreen and when the document is hidden',async({page})=>{
 await ready(page);await page.locator('.v3-service-scene').scrollIntoViewIfNeeded();const accent=page.locator('[data-v3-ambient=orbit]');await expect(accent).toHaveAttribute('data-ambient-state','running');const before=await accent.getAttribute('transform');await page.waitForTimeout(700);expect(await accent.getAttribute('transform')).not.toBe(before)
 await page.evaluate(()=>{Object.defineProperty(document,'hidden',{configurable:true,value:true});document.dispatchEvent(new Event('visibilitychange'))});await expect(accent).toHaveAttribute('data-ambient-state','paused');const paused=await accent.getAttribute('transform');await page.waitForTimeout(400);expect(await accent.getAttribute('transform')).toBe(paused)
 await page.evaluate(()=>{Object.defineProperty(document,'hidden',{configurable:true,value:false});document.dispatchEvent(new Event('visibilitychange'))});await expect(accent).toHaveAttribute('data-ambient-state','running');await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));await expect(accent).toHaveAttribute('data-ambient-state','paused')
})
test('reduced motion and constrained devices do not run ambient loops',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});await ready(page);await page.locator('.v3-service-scene').scrollIntoViewIfNeeded();await expect(page.locator('[data-ambient-state=running]')).toHaveCount(0);await expect(page.locator('video')).toHaveCount(0)
 await page.emulateMedia({reducedMotion:'no-preference'});await page.addInitScript(()=>Object.defineProperty(navigator,'hardwareConcurrency',{value:2}));await ready(page);await page.locator('.v3-service-scene').scrollIntoViewIfNeeded();await expect(page.locator('[data-v3-ambient=orbit]')).toHaveAttribute('data-ambient-state','disabled')
})
test('Arabic card rail supports native touch scrolling, Home/End and RTL arrows',async({page})=>{
 await page.setViewportSize({width:390,height:844});await page.emulateMedia({reducedMotion:'reduce'});await ready(page,'ar');await page.locator('#v3-projects').scrollIntoViewIfNeeded()
 const rail=page.locator('.v3-project-card-rail'),buttons=page.locator('.v3-project-card [data-project-link]')
 await buttons.first().focus();const y=await page.evaluate(()=>window.scrollY);await page.keyboard.press('End');await expect(buttons.last()).toBeFocused();expect(await rail.evaluate(node=>node.scrollLeft)).toBeLessThan(0)
 await page.keyboard.press('Home');await expect(buttons.first()).toBeFocused();await page.keyboard.press('ArrowLeft');await expect(buttons.nth(1)).toBeFocused();expect(await page.evaluate(()=>window.scrollY)).toBe(y)
 await buttons.nth(1).click();await expect(page.locator('#v3-project-detail-title')).toBeVisible();await page.goBack();await expect(buttons.nth(1)).toBeVisible()
})

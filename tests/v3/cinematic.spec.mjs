/* global document, window, getComputedStyle */
import { test, expect } from '@playwright/test'
import fs from 'node:fs/promises'
const base='/contracting/v3'
async function ready(page,lang='en'){await page.goto(base+'?lang='+lang);await expect(page.locator('.fbs-v3')).toBeVisible();await expect(page.locator('.v3-hero h1')).toHaveCSS('opacity','1')}
async function brandAligned(page){const box=await page.locator('.v3-nav .v3-logo').boundingBox(),rtl=await page.locator('.fbs-v3').getAttribute('dir')==='rtl',edge=rtl?page.viewportSize().width-box.x-box.width:box.x;expect(edge).toBeLessThanOrEqual(36);expect(edge).toBeGreaterThanOrEqual(12)}
const activeVideo=page=>page.locator('.v3-film.is-active video')
test('official language-aligned logo and transparent to white navbar',async({page})=>{
 await ready(page);await brandAligned(page)
 await expect(page.locator('.v3-logo img')).toHaveAttribute('src',/fbs-contracting-english-navbar.png/)
 await expect(page.locator('.v3-nav')).not.toHaveClass(/is-scrolled/)
 await expect(page.locator('.v3-nav')).toHaveCSS('color','rgb(255, 255, 255)')
 await page.locator('#v3-company').scrollIntoViewIfNeeded()
 await expect(page.locator('.v3-nav')).toHaveClass(/is-scrolled/)
 await expect(page.locator('.v3-nav')).toHaveCSS('color','rgb(8, 47, 77)')
 expect(await page.locator('.v3-nav').evaluate(node=>getComputedStyle(node,'::before').backgroundColor)).toContain('255, 255, 255')
 await brandAligned(page)
})
test('all three licensed MP4s decode and support previous, next, pause, resume, and crossfades',async({page})=>{
 const errors=[];page.on('pageerror',error=>errors.push(error.message));await ready(page)
 const films=page.locator('.v3-film')
 for(let index=0;index<3;index++){
  if(index)await page.getByRole('button',{name:'Select scene 0'+(index+1)}).click()
  await expect(activeVideo(page)).toHaveJSProperty('paused',false)
  await expect.poll(()=>activeVideo(page).evaluate(v=>v.currentTime)).toBeGreaterThan(0.2)
  await expect(activeVideo(page)).toHaveJSProperty('muted',true)
  expect(await activeVideo(page).evaluate(v=>v.videoWidth)).toBe(1600)
  expect(await activeVideo(page).evaluate(v=>v.error)).toBeNull()
  if(index){const opacity=Number(await films.nth(index).evaluate(node=>getComputedStyle(node).opacity));expect(opacity).toBeGreaterThan(0);expect(opacity).toBeLessThanOrEqual(1)}
 }
 await page.getByRole('button',{name:'Previous scene'}).click();await expect(films.nth(1)).toHaveClass(/is-active/)
 await page.getByRole('button',{name:'Next scene'}).click();await expect(films.nth(2)).toHaveClass(/is-active/)
 await page.getByRole('button',{name:'Pause videos'}).click();await expect(activeVideo(page)).toHaveJSProperty('paused',true)
 const time=await activeVideo(page).evaluate(v=>v.currentTime);await page.waitForTimeout(600);expect(await activeVideo(page).evaluate(v=>v.currentTime)).toBe(time)
 await page.getByRole('button',{name:'Play videos'}).click();await expect(activeVideo(page)).toHaveJSProperty('paused',false)
 expect(errors).toEqual([])
})
test('automatic sequence plays scenes 01 then 02 then 03 then loops',async({page})=>{
 await ready(page)
 for(const scene of ['01','02','03','01']){await expect(page.locator('.v3-film.is-active')).toHaveAttribute('data-scene',scene,{timeout:12000});await expect.poll(()=>activeVideo(page).evaluate(v=>v.currentTime)).toBeGreaterThan(0.2);await expect(activeVideo(page)).toHaveJSProperty('paused',false)}
})
test('full-width menu supports hover, click, focus trap, Escape and language',async({page})=>{
 await ready(page);const trigger=page.locator('[data-v3-group=company]');await trigger.hover();await expect(page.getByRole('dialog')).toBeVisible();await trigger.click();await expect(page.getByRole('dialog')).toBeVisible()
 await expect(page.locator('[data-v3-page]')).toHaveJSProperty('inert',true)
 for(let i=0;i<18;i++){await page.keyboard.press('Tab');expect(await page.evaluate(()=>!!document.activeElement.closest('.v3-nav'))).toBe(true)}
 await page.keyboard.press('Escape');await expect(page.getByRole('dialog')).toHaveCount(0);await expect(trigger).toBeFocused()
 await trigger.focus();await page.keyboard.press('ArrowDown');await expect(page.locator('.v3-panel-close')).toBeFocused()
 await page.keyboard.press('Escape');await page.locator('.v3-language').click();await expect(page.locator('html')).toHaveAttribute('dir','rtl');await brandAligned(page);await expect(page.getByRole('dialog')).toHaveCount(0)
 await page.reload();await expect(page.locator('.fbs-v3')).toHaveAttribute('lang','ar')
})
test('one persistent photograph stays fixed and visible at both reveal moments',async({page})=>{
 await ready(page);const layer=page.locator('.v3-persistent-image'),image=layer.locator('img');await expect(layer).toHaveCSS('position','fixed');await expect(layer.locator('video')).toHaveCount(0);await expect(layer).toHaveCount(1)
 const source=await image.getAttribute('src')
 for(const id of ['v3-image-reveal-one','v3-image-reveal-two']){
  await page.locator('#'+id).scrollIntoViewIfNeeded();await expect.poll(()=>layer.evaluate(node=>Number(getComputedStyle(node).opacity))).toBeGreaterThan(0.6)
  expect(await image.getAttribute('src')).toBe(source);const box=await layer.boundingBox();expect(box.y).toBe(0);expect(box.height).toBe(page.viewportSize().height)
  await page.waitForTimeout(900);await page.screenshot({path:'artifacts/v3/'+id+'.png'})
 }
 await expect(page.locator('.v3-persistent-image')).toHaveCSS('z-index','0');await expect(page.locator('.v3-page')).toHaveCSS('z-index','1')
})
for(const [width,lang] of [[1440,'en'],[1440,'ar'],[768,'en'],[390,'en'],[390,'ar'],[320,'ar']])test('responsive '+width+' '+lang,async({page})=>{
 await page.setViewportSize({width,height:900});await ready(page,lang);await brandAligned(page)
 expect(await page.evaluate(()=>document.documentElement.scrollWidth-window.innerWidth)).toBe(0)
 if(width<768){await expect(page.locator('.v3-hero video')).toHaveCount(0);await expect(page.locator('.v3-film.is-active img')).toBeVisible();await page.locator('.v3-mobile-toggle').click();await expect(page.getByRole('dialog')).toBeVisible();await page.locator('.v3-panel-close').click();await expect(page.getByRole('dialog')).toHaveCount(0)}
 await page.screenshot({path:'artifacts/v3/hero-'+width+'-'+lang+'.png'})
 await page.locator('#v3-image-reveal-two').scrollIntoViewIfNeeded();expect(await page.evaluate(()=>document.documentElement.scrollWidth-window.innerWidth)).toBe(0)
})
test('reduced motion creates posters without requesting autoplay videos',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});const requests=[];page.on('request',r=>{if(r.url().endsWith('.mp4'))requests.push(r.url())});await ready(page);await expect(page.locator('.v3-hero video')).toHaveCount(0);await expect(page.getByRole('button',{name:'Pause videos'})).toHaveCount(0);await expect(page.locator('.v3-scene-name')).toHaveText('Still view');await page.getByRole('button',{name:'Next scene'}).click();await expect(page.locator('.v3-film.is-active')).toHaveAttribute('data-scene','02');expect(requests).toEqual([])
})
test('offscreen hero pauses all actual video playback and resumes on return',async({page})=>{
 await ready(page);await expect(activeVideo(page)).toHaveJSProperty('paused',false);await page.locator('#v3-expertise').scrollIntoViewIfNeeded();await expect.poll(()=>page.locator('.v3-hero video').evaluateAll(v=>v.every(node=>node.paused))).toBe(true);await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));await expect(activeVideo(page)).toHaveJSProperty('paused',false)
})
test('media assets are local real files and unrelated routes remain mounted',async({page})=>{
 const dir='public/contracting/v3/media';for(const file of ['hero-01-high-rise.mp4','hero-02-engineers.mp4','hero-03-excavator.mp4']){const bytes=await fs.readFile(dir+'/'+file);expect(bytes.length).toBeGreaterThan(100000);expect(bytes.subarray(4,8).toString()).toBe('ftyp')}
 await ready(page);await page.locator('[data-v3-group=more]').click();await page.locator('.v3-menu-links').getByRole('link',{name:'Contact FBS',exact:true}).click();await expect(page).toHaveURL(/contracting\/build\/contact/);await expect(page.locator('h1')).toBeVisible();await expect(page.locator('[data-v3-page]')).toHaveCount(0);await expect(page.locator('body')).not.toHaveCSS('overflow','hidden')
})

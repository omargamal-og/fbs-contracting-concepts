/* global document, window, HTMLCanvasElement */
import {test,expect} from '@playwright/test'

async function ready(page,language='en') {
 await page.goto('/contracting/v3?lang='+language)
 await page.locator('#v3-map').scrollIntoViewIfNeeded()
 await expect(page.locator('.v3-map-canvas')).toHaveAttribute('data-state','ready',{timeout:20000})
}
for(const language of ['en','ar'])test(`real 3D map selection, keyboard, reset and idle rendering ${language}`,async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});await ready(page,language)
 const canvas=page.locator('.v3-map-canvas')
 await expect(canvas.locator('canvas')).toHaveCount(1)
 await expect(page.locator('.v3-map-cities button')).toHaveCount(5)
 await expect(page.locator('.v3-map-projects article')).toHaveCount(1)
 await expect(page.locator('.v3-map-filter')).toHaveCount(0)
 await page.locator('.v3-map-cities button').nth(1).click()
 await expect(page.locator('.v3-map-panel h3')).toHaveText(language==='en'?'Jeddah':'جدة')
 await expect(canvas).toHaveAttribute('data-camera-city','jeddah')
 const count=await canvas.getAttribute('data-render-count');await page.waitForTimeout(250);expect(await canvas.getAttribute('data-render-count')).toBe(count)
 await page.locator('.v3-map-toggle').click();await expect(canvas).toBeFocused();await expect(canvas).toHaveAttribute('data-map-interacting','true')
 await page.keyboard.press('ArrowLeft');expect(Number(await canvas.getAttribute('data-render-count'))).toBeGreaterThan(Number(count))
 await page.keyboard.press('+');await page.keyboard.press('0');await expect(canvas).toHaveAttribute('data-camera-city','')
 await page.keyboard.press('Escape');await expect(page.locator('.v3-map-toggle')).toBeFocused();await expect(canvas).toHaveAttribute('data-map-interacting','false')
 await page.locator('.v3-map-pin').nth(4).click();await expect(page.locator('.v3-map-panel h3')).toHaveText(language==='en'?'Tabuk':'تبوك')
 const y=await page.evaluate(()=>window.scrollY);await page.locator('.v3-map-cities button').first().click();expect(Math.abs(await page.evaluate(()=>window.scrollY)-y)).toBeLessThan(2)
 await page.locator('#v3-connect').scrollIntoViewIfNeeded();await expect(canvas).toHaveAttribute('data-map-active','false')
 const offscreen=await canvas.getAttribute('data-render-count');await page.waitForTimeout(250);expect(await canvas.getAttribute('data-render-count')).toBe(offscreen)
})

test('WebGL failure keeps a text-based city selection and honest project panel',async({page})=>{
 await page.addInitScript(()=>{const original=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(type,...args){if(type==='webgl2'||type==='webgl'||type==='experimental-webgl')return null;return original.call(this,type,...args)}})
 await page.goto('/contracting/v3?lang=en');await page.locator('#v3-map').scrollIntoViewIfNeeded()
 await expect(page.locator('.v3-map-canvas')).toHaveAttribute('data-state','fallback')
 await expect(page.locator('.v3-map-status')).toContainText('3D view unavailable')
 await expect(page.locator('.v3-map-canvas canvas')).toHaveCount(0)
 await page.locator('.v3-map-cities button').nth(2).click();await expect(page.locator('.v3-map-panel h3')).toHaveText('Madinah')
 await expect(page.locator('.v3-map-project-status')).toContainText('approval pending')
 await expect(page.locator('.v3-map-toggle')).toHaveCount(0)
})

test('context loss switches to the usable city fallback',async({page})=>{
 await ready(page);await page.locator('.v3-map-canvas canvas').evaluate(canvas=>canvas.dispatchEvent(new Event('webglcontextlost',{cancelable:true})))
 await expect(page.locator('.v3-map-canvas')).toHaveAttribute('data-state','fallback')
 await page.locator('.v3-map-cities button').last().click();await expect(page.locator('.v3-map-panel h3')).toHaveText('Tabuk')
})

test('map fly-to pauses while the document is hidden and resumes without an idle loop',async({page})=>{
 await ready(page);await page.waitForTimeout(1100)
 const canvas=page.locator('.v3-map-canvas')
 await page.evaluate(()=>{Object.defineProperty(document,'hidden',{configurable:true,get:()=>true});document.dispatchEvent(new Event('visibilitychange'))})
 const before=await canvas.getAttribute('data-render-count');await page.locator('.v3-map-cities button').last().click();await page.waitForTimeout(200);expect(await canvas.getAttribute('data-render-count')).toBe(before)
 await page.evaluate(()=>{Object.defineProperty(document,'hidden',{configurable:true,get:()=>false});document.dispatchEvent(new Event('visibilitychange'))})
 await expect.poll(async()=>Number(await canvas.getAttribute('data-render-count'))).toBeGreaterThan(Number(before))
 await page.locator('.v3-map-ambient').click();await page.waitForTimeout(1100);const idle=await canvas.getAttribute('data-render-count');await page.waitForTimeout(250);expect(await canvas.getAttribute('data-render-count')).toBe(idle)
})

test('native mobile touch orbits and pinch-zooms without moving the page; navigation disposes canvas',async({browser})=>{
 const context=await browser.newContext({baseURL:test.info().project.use.baseURL,viewport:{width:390,height:844},isMobile:true,hasTouch:true,reducedMotion:'reduce'}),page=await context.newPage(),errors=[]
 page.on('pageerror',error=>errors.push(error.message))
 try{
  await ready(page,'ar');await page.locator('.v3-map-toggle').click()
  const canvas=page.locator('.v3-map-canvas'),box=await canvas.boundingBox(),x=box.x+box.width*.72,y=Math.max(150,Math.min(650,box.y+box.height*.7)),client=await context.newCDPSession(page)
  const count=Number(await canvas.getAttribute('data-render-count')),scroll=await page.evaluate(()=>window.scrollY)
  await client.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x,y}]})
  for(let step=1;step<=5;step++)await client.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:x+step*14,y:y+step*4}]})
  await client.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]})
  expect(Number(await canvas.getAttribute('data-render-count'))).toBeGreaterThan(count)
  const rotated=Number(await canvas.getAttribute('data-render-count'))
  await client.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:x-35,y},{x:x+35,y}]})
  await client.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:x-65,y},{x:x+65,y}]})
  await client.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]})
  expect(Number(await canvas.getAttribute('data-render-count'))).toBeGreaterThan(rotated)
  expect(Math.abs(await page.evaluate(()=>window.scrollY)-scroll)).toBeLessThan(2)
  await page.locator('#v3-connect a').first().click();await expect(page).toHaveURL(/contact\?lang=ar/);await expect(page.locator('.v3-map-canvas canvas')).toHaveCount(0);expect(errors).toEqual([])
 }finally{await context.close()}
})

test('mobile and tablet city controls, compact news and narrative remain usable in both languages',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'})
 for(const language of ['en','ar']){
  await ready(page,language)
  for(const width of [320,390,768,1024]){
   await page.setViewportSize({width,height:900});await page.locator('#v3-map').scrollIntoViewIfNeeded()
   await page.locator('.v3-map-cities button').nth(3).click();await expect(page.locator('.v3-map-panel h3')).toHaveText(language==='en'?'Taif':'الطائف')
   expect(await page.evaluate(()=>Math.max(0,document.documentElement.scrollWidth-window.innerWidth))).toBe(0)
   const news=await page.locator('#v3-news').boundingBox();expect(news.height).toBeLessThan(750)
  }
  await expect(page.locator('.v3-review-statistics>div')).toHaveCount(7);await expect(page.locator('.v3-statistics')).toHaveCount(0)
  for(const link of await page.locator('#v3-connect a,#v3-sustainability a,#v3-service-panel a').all())expect(await link.getAttribute('href')).toContain('lang='+language)
  await expect(page.locator('.v3-news-empty img')).toHaveCount(1)
 }
})

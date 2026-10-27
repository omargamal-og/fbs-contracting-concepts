/* global document, window, HTMLCanvasElement */
import {chromium,expect} from '@playwright/test'
import fs from 'node:fs/promises'
const out='artifacts/v3/world/final',errors=[],checks=[]
await fs.mkdir(out,{recursive:true})
const browser=await chromium.launch({channel:'chrome',headless:false})
const shot=async(page,name)=>{await page.mouse.move(0,0);await page.waitForTimeout(700);await page.locator('#v3-map').screenshot({path:`${out}/${name}.png`,animations:'disabled',style:'.v3-nav,.v3-skip{visibility:hidden}'})}
async function ranges(page,language,width){
 await page.emulateMedia({reducedMotion:'reduce'});const canvas=page.locator('.v3-map-canvas');await expect(canvas).toHaveAttribute('data-map-ambient','reduced');await page.locator('.v3-map-toggle').click()
 const controls=page.locator('.v3-map-tools>div button')
 for(const [name,dx,dy,zoom]of [['far-low',0,-1000,3],['near-overhead',0,1000,2],['left',1000,0,3],['right',-1000,0,3]]){
  await controls.last().click();await canvas.scrollIntoViewIfNeeded();const box=await canvas.boundingBox()
  const point=await page.evaluate(box=>{for(const rx of [.88,.12,.7,.3])for(const ry of [.24,.7,.45]){const x=box.x+box.width*rx,y=box.y+box.height*ry;if(document.elementFromPoint(x,y)?.tagName==='CANVAS')return{x,y}}},box)
  expect(point,'bare canvas drag target').toBeTruthy();await page.mouse.move(point.x,point.y);await page.mouse.down();await page.mouse.move(point.x+dx,point.y+dy,{steps:12});await page.mouse.up()
  for(let index=0;index<8;index++)await controls.nth(zoom).click()
  await shot(page,`range-${name}-${language}-${width}`)
 }
 await controls.last().click();await canvas.focus();await page.keyboard.press('Escape');await page.emulateMedia({reducedMotion:'no-preference'});await expect(canvas).toHaveAttribute('data-map-ambient','running')
}
async function review(language,width,height){
 const context=await browser.newContext({viewport:{width,height},isMobile:width<500,hasTouch:width<1000}),page=await context.newPage()
 page.on('pageerror',error=>errors.push(error.message));page.on('console',message=>{if(message.type()==='error')errors.push(message.text())})
 await page.goto('http://127.0.0.1:5173/contracting/v3?lang='+language)
 const canvas=page.locator('.v3-map-canvas');await canvas.scrollIntoViewIfNeeded();await expect(canvas).toHaveAttribute('data-state','ready');await page.waitForTimeout(1600)
 await shot(page,`map-${language}-${width}`)
 await canvas.scrollIntoViewIfNeeded();await expect(canvas).toHaveAttribute('data-map-ambient','running');const first=Number(await canvas.getAttribute('data-render-count'));await page.waitForTimeout(1200);const ambientFrames=Number(await canvas.getAttribute('data-render-count'))-first;expect(ambientFrames).toBeGreaterThan(5)
 await page.locator('.v3-map-cities button').nth(1).click();await page.waitForTimeout(1200);await shot(page,`selected-${language}-${width}`)
 await page.locator('.v3-map-ambient').click();await expect(canvas).toHaveAttribute('data-map-ambient','paused');const frozen=await canvas.getAttribute('data-render-count');await page.waitForTimeout(350);expect(await canvas.getAttribute('data-render-count')).toBe(frozen)
 await page.locator('.v3-map-ambient').click();await page.locator('.v3-map-toggle').click();await page.keyboard.press('ArrowLeft');await page.waitForTimeout(1000);await page.keyboard.press('+');await page.waitForTimeout(1000);await page.keyboard.press('0');await page.waitForTimeout(1000);await page.keyboard.press('Escape')
 const title=await page.locator('.v3-map-projects h4').innerText();await page.locator('.v3-map-projects a').click();await expect(page.locator('#v3-project-detail-title')).toHaveText(title)
 await page.goBack();await canvas.scrollIntoViewIfNeeded();await expect(canvas).toHaveAttribute('data-state','ready')
 if(width===768||width===1024)await ranges(page,language,width)
 await page.emulateMedia({reducedMotion:'reduce'});await expect(canvas).toHaveAttribute('data-map-ambient','reduced');await page.waitForTimeout(400);const staticCount=await canvas.getAttribute('data-render-count');await page.waitForTimeout(300);expect(await canvas.getAttribute('data-render-count')).toBe(staticCount)
 const measure=await page.evaluate(()=>({overflow:Math.max(0,document.documentElement.scrollWidth-window.innerWidth),broken:[...document.querySelectorAll('#v3-map img')].filter(img=>!img.complete||!img.naturalWidth).map(img=>img.currentSrc)}))
 checks.push({language,width,...measure,ambientFrames,keyboardControls:true,pauseResume:true,reducedMotion:true,projectNavigation:true})
 if(width===1440){
  await page.emulateMedia({reducedMotion:'no-preference'})
  for(const id of ['v3-impact','v3-company','v3-image-reveal-one','v3-expertise','v3-projects','v3-image-reveal-two','v3-sustainability','v3-news','v3-connect']){await page.locator('#'+id).scrollIntoViewIfNeeded();await page.waitForTimeout(id==='v3-impact'?2600:400)}
  await canvas.scrollIntoViewIfNeeded();await page.waitForTimeout(1200);await page.screenshot({path:`${out}/homepage-${language}-${width}.png`,fullPage:true,animations:'disabled',style:'.v3-nav,.v3-skip{visibility:hidden}'})
 }
 await context.close()
}
async function recording(){
 const context=await browser.newContext({viewport:{width:1440,height:1100},recordVideo:{dir:out+'/video',size:{width:1440,height:1100}}}),page=await context.newPage()
 page.on('pageerror',error=>errors.push(error.message))
 await page.goto('http://127.0.0.1:5173/contracting/v3?lang=en');const canvas=page.locator('.v3-map-canvas');await canvas.scrollIntoViewIfNeeded();await expect(canvas).toHaveAttribute('data-state','ready');await page.mouse.move(0,0);await page.waitForTimeout(4500)
 await page.locator('.v3-map-cities button').nth(1).click();await page.waitForTimeout(1700);await page.locator('.v3-map-cities button').first().click();await page.waitForTimeout(1400);await page.locator('.v3-map-project-switch button').last().click();await page.waitForTimeout(1400)
 await page.locator('.v3-map-toggle').click();const box=await canvas.boundingBox();await page.mouse.move(box.x+box.width*.88,box.y+box.height*.24);await page.mouse.down();await page.mouse.move(box.x+box.width*.88+100,box.y+box.height*.24+35,{steps:24});await page.mouse.up();await page.waitForTimeout(1200)
 await canvas.focus();await page.keyboard.press('+');await page.waitForTimeout(1400);await page.keyboard.press('0');await page.waitForTimeout(1400);await page.keyboard.press('Escape');await page.locator('.v3-map-ambient').click();await page.waitForTimeout(1000);await page.locator('.v3-map-ambient').click();await page.mouse.move(0,0);await page.waitForTimeout(2200)
 const video=page.video();await context.close();await video.saveAs(out+'/map-interactions.webm')
}
try{
 if(!process.argv.includes('--media-only'))for(const [language,width,height] of [['en',1440,1100],['ar',1440,1100],['en',1024,1100],['ar',1024,1100],['en',768,1024],['ar',768,1024],['en',390,844],['ar',390,844],['en',320,1000],['ar',320,1000]])await review(language,width,height)
 await recording()
 const context=await browser.newContext({viewport:{width:390,height:844}}),page=await context.newPage()
 await page.addInitScript(()=>{const original=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(type,...args){return /webgl/.test(type)?null:original.call(this,type,...args)}})
 await page.goto('http://127.0.0.1:5173/contracting/v3?lang=ar');await page.locator('.v3-map-canvas').scrollIntoViewIfNeeded();await expect(page.locator('.v3-map-canvas')).toHaveAttribute('data-state','fallback')
 await page.locator('.v3-map-projects img').scrollIntoViewIfNeeded();await expect(page.locator('.v3-map-projects img')).toHaveJSProperty('complete',true);expect(await page.locator('.v3-map-projects img').evaluate(img=>img.naturalWidth)).toBeGreaterThan(0)
 await page.locator('.v3-map-canvas').scrollIntoViewIfNeeded();await shot(page,'fallback-ar-390');await context.close()
}finally{await browser.close()}
await fs.writeFile(out+(checks.length?'/browser-review.json':'/media-review.json'),JSON.stringify({errors,checks,content:'DEV project previews are labeled pending approval. Project positions are city references, not site coordinates.'},null,2))
if(errors.length||checks.some(item=>item.overflow||item.broken.length))throw new Error('Browser review failed')
console.log('Saved regional map screenshots and interaction recording to '+out)

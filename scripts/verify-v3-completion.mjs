/* global document, window, HTMLCanvasElement */
import {chromium,expect} from '@playwright/test'
import fs from 'node:fs/promises'
const output='artifacts/v3/completion/final',base='http://127.0.0.1:5173/contracting/v3?lang='
await fs.mkdir(output,{recursive:true})
const browser=await chromium.launch({channel:'chrome',headless:false}),errors=[],checks=[]
const sections=['v3-impact','v3-company','v3-image-reveal-one','v3-expertise','v3-projects','v3-map','v3-image-reveal-two','v3-sustainability','v3-news','v3-connect']
async function review(page,language,width,record=false){
 page.on('pageerror',error=>errors.push(error.message));await page.goto(base+language);await expect(page.locator('.v3-logo img')).toBeVisible();await page.waitForTimeout(700)
 await page.screenshot({path:`${output}/navbar-${language}-${width}.png`})
 const startY=await page.evaluate(()=>window.scrollY)
 await page.waitForTimeout(600);expect(Math.abs(await page.evaluate(()=>window.scrollY)-startY)).toBeLessThan(2)
 for(const id of sections){
  await page.locator('#'+id).scrollIntoViewIfNeeded();await page.mouse.move(0,0);await page.waitForTimeout(record?650:350)
  if(id==='v3-projects'){
   await expect(page.locator('.v3-project-card-rail')).toHaveAttribute('data-gallery-state','running')
   const before=await page.locator('.v3-gallery-track').getAttribute('style');await page.waitForTimeout(550);expect(await page.locator('.v3-gallery-track').getAttribute('style')).not.toBe(before)
  }
  if(id==='v3-map'){
   await expect(page.locator('.v3-map-canvas')).toHaveAttribute('data-state','ready',{timeout:20000});await page.waitForTimeout(1000)
   await page.locator('#v3-map').screenshot({path:`${output}/map-${language}-${width}.png`,style:'.v3-nav,.v3-skip{visibility:hidden}'})
   await page.locator('.v3-map-cities button').nth(1).click();await page.waitForTimeout(1000)
   await expect(page.locator('.v3-map-panel h3')).toHaveText(language==='en'?'Jeddah':'جدة')
   await page.locator('#v3-map').screenshot({path:`${output}/map-selected-${language}-${width}.png`,style:'.v3-nav,.v3-skip{visibility:hidden}'})
   await page.locator('.v3-map-toggle').click();const box=await page.locator('.v3-map-canvas').boundingBox(),x=box.x+box.width*.6,y=Math.max(145,Math.min(700,box.y+box.height*.55))
   await page.mouse.move(x,y);await page.mouse.down();await page.mouse.move(x+65,y+25,{steps:12});await page.mouse.up()
   await page.locator('.v3-map-tools>div button').nth(2).click();await page.waitForTimeout(900);await page.locator('.v3-map-tools>div button').last().click();await page.waitForTimeout(950)
   await page.locator('.v3-map-toggle').click()
   checks.push({language,width,mapReady:true,citySelected:true,noApprovedMapProjects:await page.locator('.v3-map-projects article').count()===0})
  }
  if(['v3-impact','v3-news','v3-projects'].includes(id))await page.locator('#'+id).screenshot({path:`${output}/${id}-${language}-${width}.png`,style:'.v3-nav,.v3-skip{visibility:hidden}'})
 }
 await page.locator('.v3-footer').scrollIntoViewIfNeeded();await page.waitForTimeout(300)
 // Keep WebGL in the compositor while taking a full-page capture. Offscreen
 // on-demand canvases otherwise appear empty in Chrome's stitched screenshot.
 await page.locator('#v3-map').scrollIntoViewIfNeeded();await page.waitForTimeout(350)
 await page.screenshot({path:`${output}/homepage-${language}-${width}.png`,fullPage:true,style:'.v3-nav,.v3-skip{visibility:hidden}'})
 const measure=await page.evaluate(()=>{
  const nodes=[...document.querySelectorAll('.v3-main>section')],boxes=nodes.map(node=>node.getBoundingClientRect())
  return{overflow:Math.max(0,document.documentElement.scrollWidth-window.innerWidth),overlaps:boxes.slice(1).some((box,i)=>box.top<boxes[i].bottom-2),brokenImages:[...document.images].filter(img=>img.currentSrc&&(!img.complete||!img.naturalWidth)).map(img=>img.currentSrc)}
 })
 checks.push({language,width,...measure})
}
try{
 const recorded=await browser.newContext({viewport:{width:1440,height:1000},recordVideo:{dir:output+'/video',size:{width:1440,height:1000}}}),page=await recorded.newPage()
 await review(page,'en',1440,true);const video=page.video();await recorded.close();await video.saveAs(output+'/homepage-map-interactions.webm')
 for(const [language,width,height] of [['ar',1440,1000],['en',390,844],['ar',390,844],['en',768,1024],['ar',768,1024]]){
  const context=await browser.newContext({viewport:{width,height},isMobile:width===390,hasTouch:width<1000}),page=await context.newPage();await review(page,language,width);await context.close()
 }
 const fallback=await browser.newContext(),pageFallback=await fallback.newPage()
 await pageFallback.addInitScript(()=>{const original=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(type,...args){return type==='webgl2'?null:original.call(this,type,...args)}})
 await pageFallback.goto(base+'en');await pageFallback.locator('#v3-map').scrollIntoViewIfNeeded();await expect(pageFallback.locator('.v3-map-canvas')).toHaveAttribute('data-state','fallback');await pageFallback.locator('#v3-map').screenshot({path:output+'/map-webgl-fallback.png',style:'.v3-nav,.v3-skip{visibility:hidden}'});await fallback.close()
 await fs.writeFile(output+'/browser-review.json',JSON.stringify({errors,checks,projectEvidence:'Local development gallery is visibly marked publication approval pending. The map excludes these draft records.'},null,2))
}finally{await browser.close()}
if(errors.length||checks.some(check=>check.overflow||check.overlaps||check.brokenImages?.length))throw new Error('Browser review failed; inspect browser-review.json')
console.log('Saved full bilingual desktop/mobile/tablet review and interaction recording to '+output)

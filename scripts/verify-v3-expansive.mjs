/* global document, window */
import {chromium} from '@playwright/test'
import fs from 'node:fs/promises'
const output='artifacts/v3/expansive/after'
await fs.mkdir(output,{recursive:true})
const browser=await chromium.launch({channel:'chrome',headless:false}),errors=[],checks=[]
const desktop=await browser.newContext({viewport:{width:1440,height:1000},recordVideo:{dir:output+'/video',size:{width:1440,height:1000}}}),page=await desktop.newPage()
page.on('pageerror',error=>errors.push(error.message))
const wait=()=>page.waitForTimeout(900)
const shot=name=>page.screenshot({path:output+'/'+name+'.png'})
const sections=['v3-impact','v3-company','v3-image-reveal-one','v3-expertise','v3-projects','v3-image-reveal-two','v3-sustainability','v3-news','v3-connect']
try{
 for(const language of ['en','ar']){
  await page.goto('http://127.0.0.1:5173/contracting/v3?lang='+language);await page.locator('#v3-company h2').waitFor();await wait();await shot('navbar-'+language)
  const geometry=await page.evaluate(()=>{const n=document.querySelector('.v3-primary-nav').getBoundingClientRect(),h=document.querySelector('.v3-nav-inner').getBoundingClientRect();return{centerError:Math.abs(n.x+n.width/2-h.x-h.width/2),navItems:document.querySelectorAll('.v3-primary-nav>button').length}})
  await page.locator('[data-v3-group=approach]').hover();await wait();await shot('approach-menu-'+language)
  await page.keyboard.press('Escape');await page.waitForTimeout(650);await page.locator('[data-v3-group=company]').hover();await wait();await shot('company-menu-'+language)
  await page.keyboard.press('Escape');await page.waitForTimeout(650);await page.locator('[data-v3-group=more]').click();await page.locator('[data-v3-subgroup=governance]').click();await wait();await shot('governance-'+language)
  await page.keyboard.press('Escape');await page.waitForTimeout(400);await page.locator('[data-v3-group=login]').click();await wait();await shot('login-'+language);await page.keyboard.press('Escape');await page.waitForTimeout(400)
  let filmPlaying=false,galleryMoving=false
  for(const id of sections){
   await page.locator('#'+id).scrollIntoViewIfNeeded();await page.mouse.move(0,0);await page.waitForTimeout(1400)
   await page.locator('#'+id).screenshot({path:`${output}/${id}-${language}.png`,style:'.v3-nav{visibility:hidden}'})
   if(id==='v3-expertise'){filmPlaying=await page.locator('.v3-process-film video').evaluateAll(nodes=>nodes.some(video=>!video.paused&&video.currentTime>0));await page.locator('.v3-film-control').click();await page.waitForTimeout(350);await page.locator('.v3-film-control').click()}
   if(id==='v3-projects'){
    const before=await page.locator('.v3-gallery-track').getAttribute('style');await page.waitForTimeout(650);galleryMoving=before!==await page.locator('.v3-gallery-track').getAttribute('style')
    const box=await page.locator('.v3-project-card-rail').boundingBox(),x=box.x+box.width/2,y=box.y+160
    await page.mouse.move(x,y);await page.mouse.down();await page.mouse.move(x+(language==='ar'?200:-200),y,{steps:12});await page.mouse.up();await page.mouse.move(0,0)
   }
  }
  await page.locator('.v3-footer').scrollIntoViewIfNeeded();await wait();await page.locator('.v3-footer').screenshot({path:`${output}/footer-${language}.png`,style:'.v3-nav{visibility:hidden}'})
  await page.screenshot({path:`${output}/homepage-${language}.png`,fullPage:true})
  checks.push({language,width:1440,...geometry,filmPlaying,galleryMoving,overflow:await page.evaluate(()=>Math.max(0,document.documentElement.scrollWidth-window.innerWidth))})
 }
 const video=page.video();await desktop.close();if(video)await video.saveAs(output+'/desktop-interactions.webm')
 for(const language of ['en','ar']){
  const context=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true}),mobile=await context.newPage()
  mobile.on('pageerror',error=>errors.push(error.message));await mobile.goto('http://127.0.0.1:5173/contracting/v3?lang='+language);await mobile.locator('#v3-company h2').waitFor();await mobile.waitForTimeout(900);await mobile.screenshot({path:`${output}/navbar-${language}-mobile.png`})
  await mobile.locator('.v3-mobile-toggle').click();await mobile.locator('.v3-menu-groups button').nth(1).click();await mobile.waitForTimeout(700);await mobile.screenshot({path:`${output}/approach-menu-${language}-mobile.png`});await mobile.keyboard.press('Escape');await mobile.waitForTimeout(450)
  for(const id of sections){await mobile.locator('#'+id).scrollIntoViewIfNeeded();await mobile.waitForTimeout(1100)}
  await mobile.locator('.v3-footer').scrollIntoViewIfNeeded();await mobile.screenshot({path:`${output}/homepage-${language}-mobile.png`,fullPage:true});await mobile.locator('.v3-footer').screenshot({path:`${output}/footer-${language}-mobile.png`,style:'.v3-nav{visibility:hidden}'})
  checks.push({language,width:390,overflow:await mobile.evaluate(()=>Math.max(0,document.documentElement.scrollWidth-window.innerWidth)),videoFallback:await mobile.locator('video').count()===0})
  await context.close()
 }
 await fs.writeFile(output+'/browser-review.json',JSON.stringify({errors,checks},null,2))
}finally{await browser.close()}
console.log('Saved final screenshots and recording to '+output)
if(errors.length||checks.some(check=>check.overflow||check.centerError>1||check.filmPlaying===false||check.galleryMoving===false||check.videoFallback===false))throw new Error('Browser review failed; inspect browser-review.json')

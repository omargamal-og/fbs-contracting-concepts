/* global document, window */
import { chromium } from '@playwright/test'
import fs from 'node:fs/promises'
const output='artifacts/v3/loop',base='http://127.0.0.1:5173/contracting/v3?lang='
await fs.mkdir(output,{recursive:true})
const browser=await chromium.launch({channel:'chrome',headless:false}),errors=[],checks=[]
const desktop=await browser.newContext({viewport:{width:1440,height:1000},recordVideo:{dir:output+'/video',size:{width:1440,height:1000}}})
const page=await desktop.newPage()
page.on('pageerror',error=>errors.push(error.message))
const wait=()=>page.waitForTimeout(700),shot=name=>page.screenshot({path:output+'/'+name+'.png'})
try{
 for(const language of ['en','ar']){
  await page.goto(base+language);await page.locator('[data-gallery-original] button').first().waitFor();await wait();await shot('navbar-'+language+'-desktop')
  const geometry=await page.evaluate(()=>{const b=document.querySelector('.v3-logo').getBoundingClientRect(),n=document.querySelector('.v3-primary-nav').getBoundingClientRect(),h=document.querySelector('.v3-nav-inner').getBoundingClientRect();return{brandEdge:document.documentElement.dir==='rtl'?window.innerWidth-b.right:b.left,centerError:Math.abs(n.x+n.width/2-h.x-h.width/2)}})
  await page.locator('[data-v3-group=governance]').hover();await wait();await shot('governance-'+language+'-desktop');await page.keyboard.press('Escape');await page.waitForTimeout(500)
  await page.locator('[data-v3-group=login]').click();await wait();await shot('login-'+language+'-desktop');await page.keyboard.press('Escape');await page.waitForTimeout(500)
  await page.locator('#v3-projects').scrollIntoViewIfNeeded();await page.mouse.move(0,0);await page.waitForTimeout(2400);await shot('projects-'+language+'-desktop')
  const first=await page.locator('.v3-gallery-track').getAttribute('style');await page.waitForTimeout(1000);const moved=first!==await page.locator('.v3-gallery-track').getAttribute('style')
  await page.locator('.v3-gallery-play').click();await page.mouse.move(0,0);await wait();await shot('projects-'+language+'-paused')
  const paused=await page.locator('.v3-gallery-track').getAttribute('style');await wait();const held=paused===await page.locator('.v3-gallery-track').getAttribute('style')
  await page.locator('.v3-gallery-play').click();await page.mouse.move(0,0);await page.waitForTimeout(1200)
  const box=await page.locator('.v3-project-card-rail').boundingBox(),x=box.x+box.width/2,y=box.y+150
  await page.mouse.move(x,y);await page.mouse.down();await page.mouse.move(x+(language==='ar'?230:-230),y,{steps:15});await page.mouse.up();await page.waitForTimeout(650)
  await page.keyboard.press('Tab');await page.locator('[data-gallery-original] button').nth(1).focus();await page.keyboard.press(language==='ar'?'ArrowLeft':'ArrowRight');await wait();await shot('projects-'+language+'-keyboard')
  await page.locator('[data-gallery-original] button').nth(2).press('Enter');await wait();await shot('project-detail-'+language);await page.keyboard.press('Escape')
  await page.locator('[data-v3-group=login]').focus();await page.mouse.move(0,0);await wait()
  const other=await desktop.newPage();await other.goto('about:blank');await other.bringToFront();await page.waitForTimeout(500)
  const actualHidden=await page.evaluate(()=>document.hidden),hiddenState=await page.locator('.v3-project-card-rail').getAttribute('data-gallery-state')
  await other.close();await page.bringToFront();await wait()
  checks.push({language,width:1440,...geometry,moved,held,actualHidden,hiddenState,overflow:await page.evaluate(()=>Math.max(0,document.documentElement.scrollWidth-window.innerWidth))})
 }
 const video=page.video();await desktop.close();if(video)await video.saveAs(output+'/desktop-interactions.webm')
 for(const [label,width,height] of [['tablet',1024,900],['mobile',390,844]])for(const language of ['en','ar']){
  const context=await browser.newContext({viewport:{width,height},isMobile:label==='mobile',hasTouch:true}),mobile=await context.newPage()
  mobile.on('pageerror',error=>errors.push(error.message))
  await mobile.goto(base+language);await mobile.locator('[data-gallery-original] button').first().waitFor();await mobile.waitForTimeout(1000)
  await mobile.screenshot({path:output+'/navbar-'+language+'-'+label+'.png'})
  await mobile.locator('.v3-mobile-toggle').click();await mobile.waitForTimeout(650);await mobile.screenshot({path:output+'/menu-'+language+'-'+label+'.png'})
  await mobile.locator('.v3-menu-groups button').nth(4).click();await mobile.waitForTimeout(600);await mobile.screenshot({path:output+'/governance-'+language+'-'+label+'.png'})
  await mobile.locator('.v3-mobile-login').click();await mobile.waitForTimeout(600);await mobile.screenshot({path:output+'/login-'+language+'-'+label+'.png'})
  await mobile.keyboard.press('Escape');await mobile.waitForTimeout(500);await mobile.locator('#v3-projects').scrollIntoViewIfNeeded();await mobile.waitForTimeout(1500)
  await mobile.locator('#v3-projects').screenshot({path:output+'/projects-'+language+'-'+label+'.png',style:'.v3-nav{visibility:hidden}'})
  checks.push({language,width,overflow:await mobile.evaluate(()=>Math.max(0,document.documentElement.scrollWidth-window.innerWidth))})
  await context.close()
 }
 await fs.writeFile(output+'/browser-review.json',JSON.stringify({errors,checks},null,2))
}finally{await browser.close()}
console.log('Saved fresh review evidence in '+output)
if(errors.length||checks.some(check=>check.overflow||check.centerError>1||check.moved===false||check.held===false))throw new Error('Browser review found an error; inspect browser-review.json')

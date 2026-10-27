/* global document, window, HTMLCanvasElement */
import {chromium,expect} from '@playwright/test'
import fs from 'node:fs/promises'
import path from 'node:path'
import {spawnSync} from 'node:child_process'

const out='artifacts/v3/diorama/final',errors=[],checks=[],base='http://127.0.0.1:5173'
await fs.mkdir(out,{recursive:true})
const browser=await chromium.launch({channel:'chrome',headless:false})
const wait=page=>page.waitForTimeout(1100)
async function open(context,language){
 const page=await context.newPage();page.on('pageerror',error=>errors.push(error.message));page.on('console',message=>{if(message.type()==='error')errors.push(message.text())})
 await page.goto(base+'/contracting/v3?lang='+language);const canvas=page.locator('.v3-map-canvas');await canvas.scrollIntoViewIfNeeded();await expect(canvas).toHaveAttribute('data-state','ready',{timeout:20000})
 await page.locator('.v3-map-projects img').scrollIntoViewIfNeeded();await expect(page.locator('.v3-map-projects img')).toHaveJSProperty('complete',true);await canvas.scrollIntoViewIfNeeded();await page.mouse.move(0,0);await wait(page);return page
}
async function shot(page,name){await page.mouse.move(0,0);await wait(page);await page.locator('#v3-map').screenshot({path:`${out}/${name}.png`,animations:'disabled',style:'.v3-nav,.v3-skip{visibility:hidden}'})}
async function review(language,width,height){
 const context=await browser.newContext({viewport:{width,height},reducedMotion:'reduce',hasTouch:width<1000,isMobile:width<500}),page=await open(context,language),canvas=page.locator('.v3-map-canvas')
 await page.screenshot({path:`${out}/viewport-${language}-${width}.png`,animations:'disabled'});await shot(page,`section-${language}-${width}`)
 await page.locator('.v3-map-cities button').nth(1).click();await shot(page,`selected-${language}-${width}`)
 await page.locator('.v3-map-toggle').click();const controls=page.locator('.v3-map-tools>div button')
 if(width===1440||width===390){
  for(const[name,index]of[['left',0],['right',1],['near',2],['far',3]]){await controls.last().click();for(let count=0;count<8;count++)await controls.nth(index).click();await shot(page,`range-${name}-${language}-${width}`)}
 }
 await controls.last().click();await canvas.focus();await page.keyboard.press('Escape')
 const title=await page.locator('.v3-map-projects h4').innerText();await page.locator('.v3-map-projects a').click();await expect(page.locator('#v3-project-detail-title')).toHaveText(title);await page.goBack();await canvas.scrollIntoViewIfNeeded();await expect(canvas).toHaveAttribute('data-state','ready')
 await page.emulateMedia({reducedMotion:'no-preference'});await expect(canvas).toHaveAttribute('data-map-ambient','running');await wait(page);const count=Number(await canvas.getAttribute('data-render-count'));await page.waitForTimeout(1200)
 const frames=Number(await canvas.getAttribute('data-render-count'))-count,setupMs=Number(await canvas.getAttribute('data-map-setup-ms')),triangles=Number(await canvas.getAttribute('data-map-triangles')),drawCalls=Number(await canvas.getAttribute('data-map-draw-calls'))
 await page.locator('.v3-map-ambient').click();await expect(canvas).toHaveAttribute('data-map-ambient','paused');const frozen=await canvas.getAttribute('data-render-count');await page.waitForTimeout(350);expect(await canvas.getAttribute('data-render-count')).toBe(frozen)
 const measure=await page.evaluate(()=>({overflow:Math.max(0,document.documentElement.scrollWidth-window.innerWidth),broken:[...document.querySelectorAll('#v3-map img')].filter(image=>!image.complete||!image.naturalWidth).map(image=>image.currentSrc)}))
 checks.push({language,width,height,framesIn1200Ms:frames,setupMs,triangles,drawCalls,...measure,projectRoute:true,reducedMotion:true,pause:true,singleProjectPanel:await page.locator('[data-map-project-panel]').count()===1})
 await fs.writeFile(out+'/browser-review.json',JSON.stringify({errors,checks},null,2))
 await context.close()
}
async function recording(idle){
 const context=await browser.newContext({viewport:{width:1440,height:1100},recordVideo:{dir:out+'/raw-video',size:{width:1440,height:1100}}}),page=await open(context,'en'),canvas=page.locator('.v3-map-canvas')
 if(idle){
  const positions=[],frames=[]
  for(let second=0;second<16;second++){
   positions.push(await canvas.getAttribute('data-map-bounds'));frames.push(Number(await canvas.getAttribute('data-render-count')));await page.waitForTimeout(1000)
  }
  await fs.writeFile(out+'/idle-samples.json',JSON.stringify({noInput:true,seconds:16,bounds:positions,renderCounts:frames},null,2))
 }else{
  await page.locator('.v3-map-cities button').nth(1).click();await page.waitForTimeout(1700);await page.locator('.v3-map-cities button').first().click();await page.waitForTimeout(1400);await page.locator('.v3-map-project-switch button').last().click();await page.waitForTimeout(1300)
  await page.locator('.v3-map-toggle').click();await canvas.focus();await page.keyboard.press('ArrowLeft');await wait(page);await page.keyboard.press('+');await wait(page);await page.keyboard.press('0');await wait(page);await page.keyboard.press('Escape')
  await page.locator('.v3-map-ambient').click();await page.waitForTimeout(800);await page.locator('.v3-map-ambient').click();await page.mouse.move(0,0);await page.waitForTimeout(1500)
 }
 const video=page.video();await context.close();await video.saveAs(out+(idle?'/idle-raw.webm':'/interactions.webm'))
 if(idle){
  const folders=(await fs.readdir(path.join(process.env.LOCALAPPDATA,'ms-playwright'))).filter(name=>name.startsWith('ffmpeg-')).sort(),ffmpeg=path.join(process.env.LOCALAPPDATA,'ms-playwright',folders.at(-1),'ffmpeg-win64.exe')
  const result=spawnSync(ffmpeg,['-y','-sseof','-16','-i',out+'/idle-raw.webm','-t','16','-an','-c:v','libvpx-vp9','-b:v','1800k','-deadline','realtime','-cpu-used','4',out+'/idle-continuous-16s.webm'],{encoding:'utf8',windowsHide:true})
  if(result.status!==0)throw Error('Idle video trim failed: '+result.stderr)
 }
}
async function matchedCamera(){
 const context=await browser.newContext({viewport:{width:1440,height:1100},reducedMotion:'reduce'})
 // Review-only replay of the recorded baseline camera pose. No application file
 // or user-facing camera preset is changed; the normal final screenshots use production code.
 await context.route('**/src/contracting/site/v3/map/createSaudiScene.ts*',async route=>{
  const response=await route.fetch();let body=await response.text()
  expect(body).toContain('new THREE.Vector3(2.5, 23, 23)')
  body=body.replace('new THREE.Vector3(2.5, 23, 23)','new THREE.Vector3(5.5, 20.5, 19.5)').replace('new THREE.Vector3(-.7, .25, -.5)','new THREE.Vector3(-.7, .35, -.5)').replace('controls.minDistance = 30.5','controls.minDistance = 12')
  await route.fulfill({response,body})
 })
 const page=await open(context,'en');await page.screenshot({path:out+'/matched-baseline-pose-en-1440.png',animations:'disabled'});await context.close()
}
try{
 if(process.argv.includes('--comparison-only')){await matchedCamera();await browser.close();process.exit(0)}
 for(const[language,width,height]of[['en',1440,1100],['ar',1440,1100],['en',1024,1100],['ar',1024,1100],['en',768,1024],['ar',768,1024],['en',390,844],['ar',390,844],['en',320,1000],['ar',320,1000]])await review(language,width,height)
 await recording(true);await recording(false);await matchedCamera()
 const context=await browser.newContext({viewport:{width:390,height:844}}),page=await context.newPage()
 await page.addInitScript(()=>{const original=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(type,...args){return /webgl/.test(type)?null:original.call(this,type,...args)}})
 await page.goto(base+'/contracting/v3?lang=ar');await page.locator('.v3-map-canvas').scrollIntoViewIfNeeded();await expect(page.locator('.v3-map-canvas')).toHaveAttribute('data-state','fallback');await page.locator('.v3-map-projects img').scrollIntoViewIfNeeded();await page.waitForTimeout(800);await shot(page,'fallback-ar-390');await context.close()
}finally{await browser.close()}
await fs.writeFile(out+'/browser-review.json',JSON.stringify({errors,checks},null,2))
if(errors.length||checks.some(check=>check.overflow||check.broken.length||check.framesIn1200Ms<5))throw Error('Diorama review failed')
console.log('Saved final diorama screenshots, a continuous 16s idle recording and separate interaction recording.')

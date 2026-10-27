/* global document, window, DOMMatrixReadOnly, getComputedStyle */
import {chromium,expect} from '@playwright/test'
import fs from 'node:fs/promises'
const out='artifacts/v3/signature/after',base='http://127.0.0.1:5173',errors=[],checks=[]
await fs.mkdir(out,{recursive:true})
const browser=await chromium.launch({channel:'chrome',headless:false})
const style='.v3-nav,.v3-skip{visibility:hidden}',wait=page=>page.waitForTimeout(1100)
const phase=page=>page.locator('.v3-gallery-track').evaluate(node=>Math.abs(new DOMMatrixReadOnly(getComputedStyle(node).transform).m41))
async function review(language,width,height,record=false){
 const context=await browser.newContext({viewport:{width,height},isMobile:width<500,hasTouch:width<1000,...(record?{recordVideo:{dir:out+'/video',size:{width,height}}}:{})}),page=await context.newPage()
 page.on('pageerror',error=>errors.push(error.message))
 await page.goto(base+'/contracting/v3?lang='+language);await expect(page.locator('.v3-logo img')).toBeVisible();await page.waitForTimeout(700)
 await page.screenshot({path:`${out}/navbar-${language}-${width}.png`})
 for(const id of ['v3-impact','v3-company','v3-image-reveal-one','v3-expertise']){await page.locator('#'+id).scrollIntoViewIfNeeded();await page.waitForTimeout(id==='v3-impact'?2600:400)}
 await page.locator('#v3-projects').scrollIntoViewIfNeeded();const heading=await page.locator('#v3-projects h2').boundingBox();await page.mouse.move(heading.x+30,heading.y+20)
 await expect(page.locator('.v3-project-card-rail')).toHaveAttribute('data-gallery-state','running');const before=await phase(page);await page.waitForTimeout(650);expect(await phase(page)).not.toBe(before)
 await page.locator('#v3-projects').screenshot({path:`${out}/gallery-${language}-${width}.png`,style})
 const card=page.locator('[data-gallery-original] .v3-project-card').nth(width<500?0:1),box=await card.boundingBox(),x=Math.max(35,Math.min(width-35,box.x+box.width*.6)),y=box.y+150
 await page.mouse.move(x,y);await expect(page.locator('.v3-project-card-rail')).toHaveAttribute('data-gallery-state','paused');await page.waitForTimeout(700)
 await page.locator('#v3-projects').screenshot({path:`${out}/gallery-hover-${language}-${width}.png`,style})
 const link=card.locator('[data-project-link]'),title=await card.locator('h3').innerText();await link.click({position:{x:width<500?130:180,y:150}})
 await expect(page.locator('#v3-project-detail-title')).toHaveText(title);await page.screenshot({path:`${out}/project-detail-${language}-${width}.png`,fullPage:true})
 await page.goBack();await page.locator('#v3-map').scrollIntoViewIfNeeded();const canvas=page.locator('.v3-map-canvas');await expect(canvas).toHaveAttribute('data-state','ready');await wait(page)
 await page.locator('#v3-map').screenshot({path:`${out}/map-${language}-${width}.png`,style})
 await canvas.scrollIntoViewIfNeeded();await expect(canvas).toHaveAttribute('data-map-ambient','running');const first=Number(await canvas.getAttribute('data-render-count'));await page.waitForTimeout(650);const ambientFrames=Number(await canvas.getAttribute('data-render-count'))-first;expect(ambientFrames).toBeGreaterThan(5)
 await page.locator('.v3-map-cities button').nth(1).click();await wait(page);await expect(page.locator('.v3-map-projects h4')).toHaveText(language==='en'?'Nozol Khayala':'نزل خيالا')
 await page.locator('#v3-map').screenshot({path:`${out}/map-selected-${language}-${width}.png`,style})
 await page.locator('.v3-map-ambient').click();await expect(canvas).toHaveAttribute('data-map-ambient','paused');await page.waitForTimeout(200);const frozen=await canvas.getAttribute('data-render-count');await page.waitForTimeout(250);expect(await canvas.getAttribute('data-render-count')).toBe(frozen)
 await page.locator('.v3-map-ambient').click();await page.locator('.v3-map-toggle').click();await page.keyboard.press('ArrowLeft');await wait(page);await page.keyboard.press('+');await wait(page);await page.keyboard.press('0');await wait(page);await page.keyboard.press('Escape')
 await page.locator('.v3-map-cities button').first().click();await wait(page);await page.locator('.v3-map-project-switch button').last().click();await wait(page)
 for(const id of ['v3-image-reveal-two','v3-sustainability','v3-news','v3-connect']){await page.locator('#'+id).scrollIntoViewIfNeeded();await page.waitForTimeout(450)}
 await page.locator('.v3-footer').scrollIntoViewIfNeeded();await page.waitForTimeout(300)
 await canvas.scrollIntoViewIfNeeded();await page.waitForTimeout(350);await page.screenshot({path:`${out}/homepage-${language}-${width}.png`,fullPage:true,style})
 const measure=await page.evaluate(()=>({overflow:Math.max(0,document.documentElement.scrollWidth-window.innerWidth),broken:[...document.images].filter(img=>img.currentSrc&&(!img.complete||!img.naturalWidth)).map(img=>img.currentSrc)}))
 checks.push({language,width,...measure,ambientFrames,projectRouteWorks:true,cardOnlyHover:true,previewClearlyLabeled:await page.locator('.v3-map-review-notice').count()===1})
 const video=record?page.video():undefined;await context.close();if(video)await video.saveAs(out+'/map-gallery-interactions.webm')
}
try{for(const [language,width,height] of [['en',1440,1000],['ar',1440,1000],['en',390,844],['ar',390,844],['en',768,1024],['ar',320,1000]])await review(language,width,height,language==='en'&&width===1440)}finally{await browser.close()}
await fs.writeFile(out+'/browser-review.json',JSON.stringify({errors,checks,content:'Local project previews retain publication-approval-pending labels. All map pins are city-level reference points.'},null,2))
if(errors.length||checks.some(check=>check.overflow||check.broken.length))throw new Error('Browser review failed')
console.log('Saved signature map/gallery screenshots, route captures and interaction recording to '+out)

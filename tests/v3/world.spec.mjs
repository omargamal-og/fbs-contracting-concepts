/* global document, window, DOMMatrixReadOnly, getComputedStyle */
import {test,expect} from '@playwright/test'
import fs from 'node:fs/promises'
import {createHash} from 'node:crypto'

test('regional context preserves the pinned geographic source geometry',async()=>{
 const manifest=JSON.parse(await fs.readFile('docs/media/v3-world-environment.json','utf8'))
 const context=JSON.parse(await fs.readFile('src/contracting/site/v3/geography/regional-context.json','utf8'))
 expect(context.features).toHaveLength(17)
 for(const feature of context.features){
  const original=manifest.asset.geometryHashes.find(item=>item.id===feature.properties.id)
  expect(original,feature.properties.id).toBeTruthy()
  expect(createHash('sha256').update(JSON.stringify(feature.geometry)).digest('hex')).toBe(original.geometrySha256)
 }
})

for(const language of ['en','ar'])for(const width of [320,390,768,1024,1440])test(`regional scene ${language} at ${width}px keeps its overlays inside the canvas`,async({page})=>{
 const errors=[];page.on('pageerror',error=>errors.push(error.message));page.on('console',message=>{if(message.type()==='error')errors.push(message.text())})
 await page.setViewportSize({width,height:1100});await page.goto('/contracting/v3?lang='+language)
 const canvas=page.locator('.v3-map-canvas');await canvas.scrollIntoViewIfNeeded();await expect(canvas).toHaveAttribute('data-state','ready');await page.waitForTimeout(1200)
 await expect(page.locator('.v3-map-model-note')).toContainText(language==='en'?'illustrative':'\u062a\u0648\u0636\u064a\u062d\u064a\u0629')
 await expect(page.locator('.v3-map-panel h3')).toContainText(language==='en'?'Riyadh':'الرياض')
 const stage=await canvas.boundingBox()
 for(const selector of ['.v3-map-cities','.v3-map-ambient','.v3-map-tools']){
  const box=await page.locator(selector).boundingBox();expect(box.x).toBeGreaterThanOrEqual(stage.x);expect(box.x+box.width).toBeLessThanOrEqual(stage.x+stage.width+1)
  expect(box.y).toBeGreaterThanOrEqual(stage.y);expect(box.y+box.height).toBeLessThanOrEqual(stage.y+stage.height+1)
 }
 const bounds=JSON.parse(await canvas.getAttribute('data-map-bounds'));expect(bounds[0]).toBeGreaterThan(10);expect(bounds[2]).toBeLessThan(stage.width-10);expect(bounds[1]).toBeGreaterThan(100);expect(bounds[3]).toBeLessThan(stage.height-70)
 await expect(page.locator('.v3-map-projects article')).toHaveCount(1);await expect(page.locator('.v3-map-callout')).toHaveCount(0)

 expect(await page.evaluate(()=>document.documentElement.scrollWidth-window.innerWidth)).toBe(0)
 expect(errors).toEqual([])
})

test('idle camera drifts gently and explicit pause freezes the projected city positions',async({page})=>{
 await page.goto('/contracting/v3?lang=en');const canvas=page.locator('.v3-map-canvas');await canvas.scrollIntoViewIfNeeded();await expect(canvas).toHaveAttribute('data-state','ready');await page.waitForTimeout(1400)
 const x=()=>page.locator('.v3-map-pin').first().evaluate(node=>new DOMMatrixReadOnly(getComputedStyle(node).transform).m41)
 const before=await x();await page.waitForTimeout(1300);const movement=Math.abs(await x()-before)
 expect(movement).toBeGreaterThan(.05);expect(movement).toBeLessThan(25)
 await page.locator('.v3-map-ambient').click();await expect(canvas).toHaveAttribute('data-map-ambient','paused');const still=await x();await page.waitForTimeout(350);expect(await x()).toBe(still)
})

for(const language of ['en','ar'])for(const width of [320,390,768])test(`city names stay separate at the far low camera limit ${language} ${width}`,async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});await page.setViewportSize({width,height:1100});await page.goto('/contracting/v3?lang='+language)
 const canvas=page.locator('.v3-map-canvas');await canvas.scrollIntoViewIfNeeded();await expect(canvas).toHaveAttribute('data-state','ready');await page.locator('.v3-map-toggle').click()
 const box=await canvas.boundingBox(),x=box.x+box.width*.88,y=box.y+box.height*.24
 await page.mouse.move(x,y);await page.mouse.down();await page.mouse.move(x,y-1000,{steps:12});await page.mouse.up()
 for(let index=0;index<8;index++)await page.locator('.v3-map-tools>div button').nth(3).click()
 const overlaps=await page.locator('.v3-map-pin:not(.is-condensed)').evaluateAll(nodes=>{
  const boxes=nodes.filter(node=>getComputedStyle(node).visibility==='visible').map(node=>node.getBoundingClientRect())
  return boxes.flatMap((a,index)=>boxes.slice(index+1).filter(b=>Math.min(a.right,b.right)>Math.max(a.left,b.left)&&Math.min(a.bottom,b.bottom)>Math.max(a.top,b.top)))
 })
 expect(overlaps).toEqual([]);await expect(page.locator('.v3-map-pin.is-selected')).not.toHaveClass(/is-condensed/)
 const condensed=page.locator('.v3-map-pin.is-condensed').first()
 if(await condensed.count()){
  const city=await condensed.getAttribute('title');await condensed.click();await expect(page.locator('.v3-map-panel h3')).toHaveText(city)
 }
 await page.locator('.v3-map-tools>div button').last().click();await canvas.focus();await page.keyboard.press('Escape');await expect(page.locator('.v3-map-toggle')).toBeFocused()
})

for(const language of ['en','ar'])for(const width of [320,768,1440])test(`complete country stays framed through camera controls ${language} ${width}`,async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});await page.setViewportSize({width,height:1100});await page.goto('/contracting/v3?lang='+language)
 const canvas=page.locator('.v3-map-canvas');await canvas.scrollIntoViewIfNeeded();await expect(canvas).toHaveAttribute('data-state','ready');const stage=await canvas.boundingBox(),controls=page.locator('.v3-map-tools>div button')
 for(const index of[0,1,2,3]){
  await controls.last().click();for(let count=0;count<8;count++)await controls.nth(index).click()
  const bounds=JSON.parse(await canvas.getAttribute('data-map-bounds'));expect(bounds[0]).toBeGreaterThan(10);expect(bounds[2]).toBeLessThan(stage.width-10);expect(bounds[1]).toBeGreaterThan(100);expect(bounds[3]).toBeLessThan(stage.height-70)
  if(width===1440){const panel=await page.locator('[data-map-project-panel]').boundingBox();if(language==='en')expect(stage.x+bounds[2]).toBeLessThan(panel.x-15);else expect(stage.x+bounds[0]).toBeGreaterThan(panel.x+panel.width+15)}
 }
})

test('ambient camera resumes from the current pose after manual inactivity',async({page})=>{
 await page.goto('/contracting/v3?lang=en');const canvas=page.locator('.v3-map-canvas');await canvas.scrollIntoViewIfNeeded();await expect(canvas).toHaveAttribute('data-state','ready');await page.waitForTimeout(1100)
 await page.locator('.v3-map-toggle').click();await page.keyboard.press('ArrowLeft');await page.waitForTimeout(1100);await expect(canvas).toHaveAttribute('data-map-ambient','paused')
 const frozen=await canvas.getAttribute('data-render-count');await page.waitForTimeout(250);expect(await canvas.getAttribute('data-render-count')).toBe(frozen)
 await expect(canvas).toHaveAttribute('data-map-ambient','running',{timeout:5000});await expect(canvas).toHaveAttribute('data-map-interacting','true')
 const before=JSON.parse(await canvas.getAttribute('data-map-bounds'));await page.waitForTimeout(250);const after=JSON.parse(await canvas.getAttribute('data-map-bounds'));expect(Math.max(...after.map((value,index)=>Math.abs(value-before[index])))).toBeLessThan(5)
})

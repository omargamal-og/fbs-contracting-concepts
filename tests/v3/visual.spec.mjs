/* global document, window */
import {test,expect} from '@playwright/test'
const raw=[1200000000,15,3000,800000,30,200000,2000]
for(const language of ['en','ar'])test(`local ${language} review uses seven stored draft values with an explicit notice`,async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});await page.goto('/contracting/v3?lang='+language)
 await expect(page.locator('.v3-review-statistics>div')).toHaveCount(7)
 expect(await page.locator('[data-metric-value]').evaluateAll(nodes=>nodes.map(node=>Number(node.dataset.metricValue)))).toEqual(raw)
 await page.locator('#v3-impact').scrollIntoViewIfNeeded()
 await expect(page.locator('#v3-impact-review-note')).toHaveText(language==='en'?'Preliminary figures — subject to confirmation':'أرقام مبدئية — خاضعة للتأكيد')
 await expect(page.locator('#v3-impact-review-note')).toBeVisible()
 await expect(page.locator('#v3-hero [data-metric-value]')).toHaveCount(0)
 await expect(page.locator('.v3-statistics')).toHaveCount(0)
 for(const width of [320,390,768,1440]){
  await page.setViewportSize({width,height:1000});expect(await page.evaluate(()=>Math.max(0,document.documentElement.scrollWidth-window.innerWidth))).toBe(0)
  const figures=await page.locator('.v3-review-statistics dd').evaluateAll(nodes=>nodes.map(node=>({width:node.clientWidth,scroll:node.scrollWidth})))
  expect(figures.every(value=>value.scroll<=value.width+1)).toBe(true)
 }
})

test('new stock imagery remains labeled and occupies its intended composition',async({page})=>{
 await page.goto('/contracting/v3?lang=en')
 for(const selector of ['.v3-company-visual','.v3-sustainability-image','.v3-news-review-image','.v3-closing-visual']){
  await page.locator(selector).scrollIntoViewIfNeeded();const image=page.locator(selector+' img')
  await expect(image).toBeVisible();await expect.poll(()=>image.evaluate(node=>node.complete&&node.naturalWidth>0)).toBe(true)
  const box=await image.boundingBox();expect(box.height).toBeGreaterThan(150)
  await expect(page.locator(selector+' .v3-visual-label')).toContainText('Not an FBS project')
 }
 await expect(page.locator('.v3-news-list article')).toHaveCount(0)
 await expect(page.locator('.v3-news-empty a')).toHaveAttribute('href','https://www.linkedin.com/company/fbs-contracting/')
})

test('review counter motion pauses when scrolled offscreen',async({page})=>{
 await page.goto('/contracting/v3?lang=en');await expect(page.locator('.v3-review-statistics')).toBeVisible();await page.locator('#v3-impact').scrollIntoViewIfNeeded()
 await page.waitForTimeout(180);await page.locator('#v3-map').scrollIntoViewIfNeeded();await page.waitForTimeout(150)
 const numbers=await page.locator('[data-metric-number]').allTextContents();await page.waitForTimeout(300);expect(await page.locator('[data-metric-number]').allTextContents()).toEqual(numbers)
 await page.locator('#v3-impact').scrollIntoViewIfNeeded();await expect.poll(()=>page.locator('[data-metric-number]').first().innerText()).toBe('1.2')
})

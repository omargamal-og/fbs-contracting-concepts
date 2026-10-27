/* global document, window, requestAnimationFrame, DOMMatrixReadOnly, getComputedStyle */
import { test, expect } from '@playwright/test'
const rail = '.v3-project-card-rail', track = '.v3-gallery-track'
const phase = page => page.locator(track).evaluate(node => Math.abs(new DOMMatrixReadOnly(getComputedStyle(node).transform).m41))
async function ready(page, language = 'en') {
 await page.goto('/contracting/v3?lang=' + language)
 await expect(page.locator('[data-gallery-original] [data-project-link]').first()).toBeVisible()
}
async function running(page, language) {
 await ready(page, language); await page.locator('#v3-projects').scrollIntoViewIfNeeded(); await page.mouse.move(0, 0)
 await expect(page.locator(rail)).toHaveAttribute('data-gallery-state', 'running')
 await expect(page.locator('#v3-projects .v3-section-top')).toHaveCSS('transform','none')
}
for (const language of ['en', 'ar']) {
 test(`gallery ${language} starts in view, moves at constant speed, pauses on hover/focus, and resumes`, async ({ page }) => {
  await ready(page, language); await expect(page.locator(rail)).toHaveAttribute('data-gallery-state', 'offscreen')
  await page.locator('#v3-projects').scrollIntoViewIfNeeded(); await page.mouse.move(0, 0); await expect(page.locator(rail)).toHaveAttribute('data-gallery-state', 'running')
  const a = await phase(page); await page.waitForTimeout(700); const b = await phase(page); await page.waitForTimeout(700); const c = await phase(page)
  expect(b - a).toBeGreaterThan(25); expect(b - a).toBeLessThan(45); expect(Math.abs((c - b) - (b - a))).toBeLessThan(8)
  const signed = await page.locator(track).evaluate(node => new DOMMatrixReadOnly(getComputedStyle(node).transform).m41)
  expect(language === 'ar' ? signed > 0 : signed < 0).toBe(true)
  const hoverBox=await page.locator('.v3-project-card').nth(1).boundingBox();await page.mouse.move(hoverBox.x+hoverBox.width/2,hoverBox.y+150); await expect(page.locator(rail)).toHaveAttribute('data-gallery-state', 'paused')
  const hover = await phase(page); await page.waitForTimeout(250); expect(await phase(page)).toBe(hover)
  await page.mouse.move(0, 0); await expect(page.locator(rail)).toHaveAttribute('data-gallery-state', 'running')
  await page.keyboard.press('Tab'); await page.locator('[data-gallery-original] [data-project-link]').first().focus()
  await expect(page.locator(rail)).toHaveAttribute('data-gallery-state', 'paused'); const focused = await phase(page)
  await page.waitForTimeout(250); expect(await phase(page)).toBe(focused)
  await page.locator('[data-v3-group=login]').focus(); await expect(page.locator(rail)).toHaveAttribute('data-gallery-state', 'running')
 })
 test(`gallery ${language} Play/Pause, offscreen and hidden-tab gating`, async ({ page }) => {
  await running(page, language)
  await page.locator('.v3-gallery-play').click(); await page.mouse.move(0, 0)
  await expect(page.locator('.v3-gallery-play')).toHaveAttribute('aria-pressed', 'true')
  const before = await phase(page); await page.waitForTimeout(250); expect(await phase(page)).toBe(before)
  await page.locator('.v3-gallery-play').click(); await page.mouse.move(0, 0)
  await expect(page.locator(rail)).toHaveAttribute('data-gallery-state', 'running')
  await page.evaluate(() => { Object.defineProperty(document, 'hidden', { configurable: true, value: true }); document.dispatchEvent(new Event('visibilitychange')) })
  await expect(page.locator(rail)).toHaveAttribute('data-gallery-state', 'hidden')
  const hidden = await phase(page); await page.waitForTimeout(250); expect(await phase(page)).toBe(hidden)
  await page.evaluate(() => { Object.defineProperty(document, 'hidden', { configurable: true, value: false }); document.dispatchEvent(new Event('visibilitychange')) })
  await expect(page.locator(rail)).toHaveAttribute('data-gallery-state', 'running')
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' })); await expect(page.locator(rail)).toHaveAttribute('data-gallery-state', 'offscreen')
  const offscreen = await phase(page); await page.waitForTimeout(250); expect(await phase(page)).toBe(offscreen)
 })
 test(`gallery ${language} wraps the loop boundary with no visible jump or blank gap`, async ({ page }) => {
  await running(page, language)
  await page.evaluate(() => {
   window.gallerySeams = []
   const node = document.querySelector('.v3-gallery-track'), period = Number(node.dataset.galleryPeriod)
   let previous = Math.abs(new DOMMatrixReadOnly(getComputedStyle(node).transform).m41)
   function sample() {
    const next = Math.abs(new DOMMatrixReadOnly(getComputedStyle(node).transform).m41)
    if (previous > period - 5 && next < 5) {
     const bounds = document.querySelector('.v3-project-card-rail').getBoundingClientRect()
     const cards = Array.from(node.querySelectorAll('.v3-project-card')).map(card => card.getBoundingClientRect()).filter(card => card.right > bounds.left && card.left < bounds.right).sort((a,b) => a.left-b.left)
     window.gallerySeams.push({ delta: period - previous + next, covered: cards[0].left <= bounds.left && cards.at(-1).right >= bounds.right, largestGap: Math.max(...cards.slice(1).map((card,i) => card.left - cards[i].right)) })
    }
    previous = next; requestAnimationFrame(sample)
   }
   requestAnimationFrame(sample)
  })
  const period = Number(await page.locator(track).getAttribute('data-gallery-period'))
  const box=await page.locator(rail).boundingBox(),x=box.x+box.width/2,y=box.y+180
  await page.mouse.move(x,y);const before=await phase(page),distance=period-12-before
  await page.mouse.down();await page.mouse.move(x+(language==='ar'?20:-20),y);await page.mouse.move(x+(language==='ar'?distance:-distance),y,{steps:5});await page.mouse.up();await page.mouse.move(0,0)
  await expect.poll(()=>page.evaluate(()=>window.gallerySeams.length)).toBeGreaterThanOrEqual(1)
  const seams = await page.evaluate(() => window.gallerySeams)
  expect(seams.length).toBeGreaterThanOrEqual(1)
  for (const seam of seams) { expect(seam.delta).toBeLessThan(4); expect(seam.covered).toBe(true); expect(seam.largestGap).toBeLessThanOrEqual(25) }
 })
 test(`gallery ${language} drag suppresses activation, repeated cards remain clickable and unannounced`, async ({ page }) => {
  await running(page, language)
  const original = page.locator('[data-gallery-original] [data-project-link]'), count = await original.count()
  await expect(page.locator('[data-gallery-copy] button,[data-gallery-copy] a:not([tabindex="-1"]),[data-gallery-copy] [tabindex="0"]')).toHaveCount(0)
  await expect(page.locator('[data-gallery-copy]').first()).toHaveAttribute('aria-hidden', 'true')
  const box = await page.locator(rail).boundingBox(), x = box.x + box.width / 2, y = box.y + 180
  await page.mouse.move(x, y); const before = await phase(page); await page.mouse.down(); await page.mouse.move(x + (language === 'ar' ? 250 : -250), y, { steps: 10 }); await page.mouse.up()
  expect(Math.abs(await phase(page) - before)).toBeGreaterThan(200); await expect(page.locator('dialog')).toHaveCount(0)
  await page.waitForTimeout(550)
  // Navigate to the last original; a visual repeat of the first then fills the next slot.
  await page.keyboard.press('Tab'); await original.last().focus(); await page.keyboard.press('End')
  const repeat = page.locator('[data-gallery-copy]').first().locator('.v3-project-card').first(), title = await repeat.locator('h3').textContent()
  const repeatBox=await repeat.boundingBox();await page.mouse.move(repeatBox.x+80,repeatBox.y+140);await page.waitForTimeout(650);await repeat.click({ position: { x: 80, y: 140 } }); await expect(page.locator('#v3-project-detail-title')).toHaveText(title)
  await page.goBack();await expect(original.first()).toBeVisible()
  expect(await page.getByRole('link', { name: language === 'en' ? /^Project details:/ : /^تفاصيل المشروع:/ }).count()).toBe(count)
 })
 test(`reduced-motion ${language} has one stationary set with manual keyboard navigation`, async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' }); await ready(page, language); await page.locator('#v3-projects').scrollIntoViewIfNeeded()
  await expect(page.locator('[data-gallery-copy]')).toHaveCount(0); await expect(page.locator('.v3-gallery-play')).toHaveCount(0)
  await expect(page.locator(rail)).toHaveAttribute('data-gallery-state', 'reduced')
  const buttons = page.locator('[data-gallery-original] [data-project-link]'); await buttons.first().focus(); const y = await page.evaluate(() => window.scrollY)
  await page.keyboard.press('End'); await expect(buttons.last()).toBeFocused(); await page.keyboard.press('Home'); await expect(buttons.first()).toBeFocused()
  await page.keyboard.press(language === 'ar' ? 'ArrowLeft' : 'ArrowRight'); await expect(buttons.nth(1)).toBeFocused()
  expect(await page.evaluate(() => window.scrollY)).toBe(y)
 })
 test(`moving gallery accepts real ${language} touch input and pauses during contact`, async ({ browser }) => {
  const context=await browser.newContext({baseURL:test.info().project.use.baseURL,viewport:{width:390,height:844},isMobile:true,hasTouch:true})
  const page=await context.newPage()
  try{
   await ready(page,language);await page.locator('#v3-projects').scrollIntoViewIfNeeded();await expect(page.locator(rail)).toHaveAttribute('data-gallery-state','running')
   const box=await page.locator(rail).boundingBox(),y=Math.min(700,box.y+180),x=language==='ar'?70:300,client=await context.newCDPSession(page)
   await client.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x,y}]});await expect(page.locator(rail)).toHaveAttribute('data-gallery-state','paused')
   const before=await phase(page);await page.waitForTimeout(150);expect(await phase(page)).toBe(before)
   for(let distance=25;distance<=175;distance+=25)await client.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:x+distance*(language==='ar'?1:-1),y}]})
   await client.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]})
   expect(await phase(page)-before).toBeGreaterThan(120);await expect(page.locator('dialog')).toHaveCount(0);await expect(page.locator(rail)).toHaveAttribute('data-gallery-state','running')
  }finally{await context.close()}
 })
}
for (const width of [1440,1280,1024,390,320]) test('language switch updates brand placement, image source and proportions '+width, async ({ page }) => {
 await page.setViewportSize({width,height:900});await page.emulateMedia({reducedMotion:'reduce'});await ready(page)
 const logo=page.locator('.v3-logo'),image=logo.locator('img'),english=await image.getAttribute('src')
 await expect(image).toHaveAttribute('src',/fbs-contracting-english-navbar.png/)
 await expect.poll(()=>image.evaluate(node=>node.naturalWidth)).toBe(372)
 const englishBox=await image.boundingBox();expect(englishBox.x).toBeLessThan(40)
 const navbarHeight=await page.locator('.v3-nav-inner').evaluate(node=>node.getBoundingClientRect().height)
 const scrollPosition=await page.evaluate(()=>window.scrollY)
 await page.route('**/fbs-contracting-arabic-navbar.png',async route=>{await new Promise(resolve=>setTimeout(resolve,250));await route.continue()})
 await page.locator('.v3-language').click()
 await expect(image).toHaveAttribute('src',/fbs-contracting-arabic-navbar.png/)
 const reservedBox=await image.boundingBox()
 await expect.poll(()=>image.evaluate(node=>node.naturalWidth)).toBe(2025)
 const arabicBox=await image.boundingBox();expect(width-arabicBox.x-arabicBox.width).toBeLessThan(40)
 expect(Math.abs(reservedBox.width-arabicBox.width)).toBeLessThan(0.1)
 expect(Math.abs(reservedBox.height-arabicBox.height)).toBeLessThan(0.1)
 expect(await page.locator('.v3-nav-inner').evaluate(node=>node.getBoundingClientRect().height)).toBe(navbarHeight)
 expect(await page.evaluate(()=>window.scrollY)).toBe(scrollPosition)
 expect(Math.abs(englishBox.height-arabicBox.height)).toBeLessThan(0.1)
 expect(Math.abs(englishBox.width/englishBox.height-372/42)).toBeLessThan(0.01)
 expect(Math.abs(arabicBox.width/arabicBox.height-2025/255)).toBeLessThan(0.01)
 if(width<1280){await page.locator('.v3-mobile-toggle').click();await expect(page.locator('.v3-menu')).toBeVisible();await expect(image).toHaveAttribute('src',/fbs-contracting-arabic-navbar.png/);await page.keyboard.press('Escape')}
 else{const center=await page.evaluate(()=>{const n=document.querySelector('.v3-primary-nav').getBoundingClientRect(),h=document.querySelector('.v3-nav-inner').getBoundingClientRect();return Math.abs(n.x+n.width/2-h.x-h.width/2)});expect(center).toBeLessThan(1)}
 expect(await page.evaluate(()=>Math.max(0,document.documentElement.scrollWidth-window.innerWidth))).toBe(0)
 await page.locator('.v3-language').click();await expect(image).toHaveAttribute('src',english)
})

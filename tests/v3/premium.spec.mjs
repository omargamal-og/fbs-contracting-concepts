/* global window, document, getComputedStyle */
import { test, expect } from '@playwright/test'

async function ready(page, language = 'en') {
 await page.goto('/contracting/v3?lang=' + language)
 await expect(page.locator('.v3-project-card').first()).toBeVisible()
}
for (const language of ['en', 'ar']) {
 for (const width of [320, 390, 768, 1024, 1181, 1279, 1280, 1440, 1600]) {
  test(`premium navigation geometry ${language} ${width}`, async ({ page }) => {
   await page.emulateMedia({ reducedMotion: 'reduce' }); await page.setViewportSize({ width, height: 900 }); await ready(page, language)
   const geometry = await page.evaluate(() => {
    const logo = document.querySelector('.v3-nav .v3-logo').getBoundingClientRect()
    const controls = Array.from(document.querySelectorAll('.v3-nav-inner button')).filter(node => node.getClientRects().length)
    const nav=document.querySelector('.v3-primary-nav').getBoundingClientRect(),header=document.querySelector('.v3-nav-inner').getBoundingClientRect()
    return { logoX: document.documentElement.dir==='rtl'?window.innerWidth-logo.right:logo.left, centerError:Math.abs(nav.x+nav.width/2-header.x-header.width/2), overflow: Math.max(0, document.documentElement.scrollWidth - window.innerWidth),
     overlap: controls.some(node => { const b = node.getBoundingClientRect(); return b.left < logo.right && b.right > logo.left }),
     controlsInside: controls.every(node => { const b = node.getBoundingClientRect(); return b.left >= 0 && b.right <= window.innerWidth }) }
   })
   expect(geometry.logoX).toBeGreaterThanOrEqual(12); expect(geometry.logoX).toBeLessThanOrEqual(36)
   expect(geometry.overflow).toBe(0); expect(geometry.overlap).toBe(false); expect(geometry.controlsInside).toBe(true)
   if(width>=1280)expect(geometry.centerError).toBeLessThan(1)
   if (width < 1280) {
    await page.locator('.v3-mobile-toggle').click()
    await expect(page.locator('.v3-menu-groups button')).toHaveCount(6)
    await page.locator('.v3-menu-groups button').nth(4).click()
   } else await page.locator('[data-v3-group=more]').click()
   await page.locator('[data-v3-subgroup=governance]').click()
   await expect(page.locator('.v3-policy-row')).toHaveCount(5)
   expect(await page.evaluate(() => Math.max(0, document.documentElement.scrollWidth - window.innerWidth))).toBe(0)
   if (width === 390) { await page.locator('.v3-mobile-login').focus(); await page.keyboard.press('Enter'); await expect(page.locator('.v3-panel-close')).toBeFocused(); await page.keyboard.press('Escape'); await expect(page.locator('.v3-mobile-toggle')).toBeFocused() }
   await page.keyboard.press('Escape'); await page.locator('[data-v3-group=login]').click()
   await expect(page.locator('.v3-login-option')).toHaveCount(3)
   const box = await page.locator('.v3-login-menu').boundingBox(); expect(box.x).toBeGreaterThanOrEqual(0); expect(box.x + box.width).toBeLessThanOrEqual(width)
  })
 }
 test(`governance and Login are honest about availability ${language}`, async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' }); await ready(page, language)
  await page.evaluate(() => window.scrollTo({ top: 700, behavior: 'instant' }))
  const before = await page.evaluate(() => window.scrollY)
  await page.locator('[data-v3-group=more]').click();await page.locator('[data-v3-subgroup=governance]').click()
  await expect(page.locator('.v3-policy-row')).toHaveCount(5)
  await expect(page.locator('.v3-policy-row a')).toHaveCount(0)
  await expect(page.locator('.v3-policy-note')).toContainText(language === 'en' ? 'not yet available' : 'غير متاحة')
  for (const link of await page.locator('.v3-menu-card').all()) expect(await link.getAttribute('href')).toContain('lang=' + language)
  await page.keyboard.press('Escape'); await expect(page.locator('[data-v3-group=more]')).toBeFocused()
  expect(await page.evaluate(() => window.scrollY)).toBe(before)
  await page.locator('[data-v3-group=login]').click()
  await expect(page.locator('.v3-login-option span')).toHaveText(Array(3).fill(language === 'en' ? 'Portal unavailable' : 'البوابة غير متاحة'))
  await expect(page.locator('.v3-login-menu input')).toHaveCount(0)
  await expect(page.locator('.v3-login-option a')).toHaveCount(2)
  expect(await page.locator('.v3-login-option a').first().getAttribute('href')).toBe('/contracting/build/careers?lang=' + language)
  await page.locator('.v3-menu-scrim').click({ position: { x: 20, y: 650 } })
  await expect(page.locator('.v3-login-menu')).toHaveCount(0); expect(await page.evaluate(() => window.scrollY)).toBe(before)
 })
 test(`large equal gallery cards, keyboard, mouse drag and stable scroll ${language}`, async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' }); await page.setViewportSize({ width: 1600, height: 1000 }); await ready(page, language)
  await page.locator('#v3-projects').scrollIntoViewIfNeeded()
  const cards = page.locator('.v3-project-card'), buttons = cards.locator('[data-project-link]'), rail = page.locator('.v3-project-card-rail')
  const dimensions = await cards.evaluateAll(nodes => nodes.map(node => ({ width: node.getBoundingClientRect().width, height: node.getBoundingClientRect().height })))
  expect(new Set(dimensions.map(box => Math.round(box.width))).size).toBe(1); expect(new Set(dimensions.map(box => Math.round(box.height))).size).toBe(1)
  const count = await rail.evaluate(node => { const b = node.getBoundingClientRect(); return Array.from(node.querySelectorAll('.v3-project-card')).filter(card => { const c = card.getBoundingClientRect(); return c.left >= b.left - 2 && c.right <= b.right + 2 }).length })
  expect(count).toBe(3)
  const before = await page.evaluate(() => window.scrollY)
  await buttons.first().focus(); await page.keyboard.press(language === 'ar' ? 'ArrowLeft' : 'ArrowRight'); await expect(buttons.nth(1)).toBeFocused()
  expect(await page.evaluate(() => window.scrollY)).toBe(before)
  await page.keyboard.press('End'); await expect(buttons.last()).toBeFocused(); await page.keyboard.press('Home'); await expect(buttons.first()).toBeFocused()
  const box = await cards.first().locator('.v3-featured-visual').boundingBox()
  const x = box.x + box.width / 2, y = box.y + box.height / 2
  await page.mouse.move(x, y); await page.mouse.down(); await page.mouse.move(x + (language === 'ar' ? 350 : -350), y, { steps: 12 }); await page.mouse.up()
  await expect.poll(() => rail.evaluate(node => Math.abs(node.scrollLeft))).toBeGreaterThan(100)
  expect(await page.evaluate(() => window.scrollY)).toBe(before)
 })
}

test('native Arabic touch swipe advances cards without horizontal page overflow', async ({ browser }) => {
 const context = await browser.newContext({ baseURL: test.info().project.use.baseURL, viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, reducedMotion: 'reduce' })
 const page = await context.newPage()
 try {
  await ready(page, 'ar'); await page.locator('#v3-projects').scrollIntoViewIfNeeded()
  const rail = page.locator('.v3-project-card-rail'), box = await rail.boundingBox(), client = await context.newCDPSession(page)
  const y = Math.min(700, box.y + 140)
  await client.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: 70, y }] })
  for (let x = 90; x <= 300; x += 30) await client.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x, y }] })
  await client.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] })
  await expect.poll(() => rail.evaluate(node => node.scrollLeft)).toBeLessThan(-50)
  expect(await page.evaluate(() => Math.max(0, document.documentElement.scrollWidth - window.innerWidth))).toBe(0)
 } finally { await context.close() }
})

test('About drawing and staggered text resolve, then motion cleans up', async ({ page }) => {
 await ready(page); await page.locator('#v3-company').scrollIntoViewIfNeeded()
 await expect.poll(() => page.locator('.v3-company-drawing path').evaluate(node => Number.parseFloat(getComputedStyle(node).strokeDashoffset))).toBe(0)
 await expect(page.locator('.v3-company-heading h2')).toHaveCSS('opacity', '1')
 await page.locator('.v3-company-copy a').click(); await expect(page).toHaveURL(/\/contracting\/build\/about\/who-we-are\?lang=en/)
 await expect(page.locator('body')).not.toHaveCSS('overflow', 'hidden')
})

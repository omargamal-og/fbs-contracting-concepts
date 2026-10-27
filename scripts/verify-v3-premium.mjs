/* global window, document */
import { chromium } from '@playwright/test'
import fs from 'node:fs/promises'

const output = 'artifacts/v3/premium'
await fs.mkdir(output, { recursive: true })
const browser = await chromium.launch({ channel: 'chrome', headless: false })
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, recordVideo: { dir: output + '/video', size: { width: 1440, height: 1000 } } })
const page = await context.newPage(), errors = [], checks = {}
page.on('pageerror', error => errors.push(error.message))
const shot = name => page.screenshot({ path: output + '/' + name + '.png' })
const settle = () => page.waitForTimeout(1000)
try {
 await page.goto('http://127.0.0.1:5173/contracting/v3?lang=en')
 await page.locator('.v3-project-card').first().waitFor()
 await settle(); await shot('navbar-en-desktop')
 const navX = await page.locator('[data-v3-group=company]').evaluate(node => node.getBoundingClientRect().x)
 await page.locator('[data-v3-group=company]').hover(); await settle(); await shot('company-mega-menu')
 checks.menuNavbarShift = await page.locator('[data-v3-group=company]').evaluate(node => node.getBoundingClientRect().x) - navX
 await page.locator('[data-v3-group=governance]').hover(); await settle(); await shot('governance-mega-menu')
 await page.keyboard.press('Escape'); await page.waitForTimeout(700)
 await page.locator('[data-v3-group=login]').click(); await settle(); await shot('login-dropdown')
 await page.keyboard.press('Escape'); await page.waitForTimeout(500)
 for (const id of ['v3-company', 'v3-expertise', 'v3-projects', 'v3-sustainability', 'v3-news', 'v3-connect']) {
  await page.locator('#' + id).scrollIntoViewIfNeeded(); await page.waitForTimeout(1500)
  await shot(id)
  if (id === 'v3-projects') {
   await page.getByRole('button', { name: 'Next project', exact: true }).click(); await settle()
   await page.locator('.v3-project-card button').nth(1).click(); await settle(); await shot('project-details')
   await page.keyboard.press('Escape'); await page.waitForTimeout(500)
  }
 }
 await page.screenshot({ path: output + '/homepage-en-desktop.png', fullPage: true })
 await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' })); await settle()
 await page.locator('.v3-language').click(); await settle(); await shot('navbar-ar-desktop')
 await page.locator('[data-v3-group=governance]').click(); await settle(); await shot('governance-ar-desktop')
 await page.keyboard.press('Escape'); await page.waitForTimeout(500)
 for (const id of ['v3-company', 'v3-expertise', 'v3-projects', 'v3-sustainability', 'v3-news', 'v3-connect']) { await page.locator('#' + id).scrollIntoViewIfNeeded(); await settle() }
 await page.screenshot({ path: output + '/homepage-ar-desktop.png', fullPage: true })
 await page.setViewportSize({ width: 390, height: 844 }); await page.goto('http://127.0.0.1:5173/contracting/v3?lang=en'); await settle(); await shot('navbar-en-mobile')
 await page.locator('.v3-mobile-toggle').click(); await settle(); await shot('navigation-en-mobile'); await page.keyboard.press('Escape'); await page.waitForTimeout(500)
 await page.goto('http://127.0.0.1:5173/contracting/v3?lang=ar')
 await page.setViewportSize({ width: 390, height: 844 }); await page.reload(); await settle(); await shot('navbar-ar-mobile')
 await page.locator('.v3-mobile-toggle').click(); await settle(); await shot('navigation-ar-mobile')
 await page.locator('.v3-menu-groups button').filter({ hasText: 'حوكمة الشركات' }).click(); await settle(); await shot('governance-ar-mobile')
 await page.locator('.v3-mobile-login').click(); await settle(); await shot('login-ar-mobile')
 await page.keyboard.press('Escape'); await page.waitForTimeout(500)
 for (const id of ['v3-company', 'v3-expertise', 'v3-projects', 'v3-sustainability', 'v3-news', 'v3-connect']) { await page.locator('#' + id).scrollIntoViewIfNeeded(); await settle(); if (id === 'v3-company' || id === 'v3-projects') await page.locator('#' + id).screenshot({ path: output + '/' + id + '-ar-mobile.png', style: '.v3-nav{visibility:hidden}' }) }
 await page.screenshot({ path: output + '/homepage-ar-mobile.png', fullPage: true })
 await fs.writeFile(output + '/browser-review.json', JSON.stringify({ errors, ...checks, horizontalOverflow: await page.evaluate(() => Math.max(0, document.documentElement.scrollWidth - window.innerWidth)) }, null, 2))
} finally {
 const video = page.video(); await context.close()
 if (video) await video.saveAs(output + '/desktop-mobile-interactions.webm')
 await browser.close()
}
console.log('Saved browser captures to ' + output)
if (errors.length) throw new Error(errors.join('\n'))

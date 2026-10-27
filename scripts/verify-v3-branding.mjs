/* global document, window */
import { chromium } from '@playwright/test'
import fs from 'node:fs/promises'

const output = 'artifacts/v3/branding-resumed'
await fs.mkdir(output, { recursive: true })
const browser = await chromium.launch({ channel: 'chrome', headless: false })
const measurements = [], errors = []
try {
 for (const [label, width, height] of [['desktop', 1440, 900], ['mobile', 390, 844]]) {
  const page = await browser.newPage({ viewport: { width, height }, reducedMotion: 'reduce' })
  page.on('pageerror', error => errors.push(error.message))
  await page.goto('http://127.0.0.1:5173/contracting/v3?lang=en')
  const languageMeasurements = []
  for (const language of ['en', 'ar']) {
   if (language === 'ar') await page.locator('.v3-language').click()
   const expected = language === 'ar' ? 'fbs-contracting-arabic-navbar.png' : 'fbs-contracting-english-navbar.png'
   await page.waitForFunction(name => {
    const image = document.querySelector('.v3-logo img')
    return image?.getAttribute('src').endsWith(name) && image.complete && image.naturalWidth > 0
   }, expected)
   const entry = await page.evaluate(() => {
    const image = document.querySelector('.v3-logo img'), box = image.getBoundingClientRect()
    const header = document.querySelector('.v3-nav-inner').getBoundingClientRect(), nav = document.querySelector('.v3-primary-nav').getBoundingClientRect()
    const rtl = document.documentElement.dir === 'rtl'
    return { language: document.documentElement.lang, source: image.getAttribute('src'), footerSource: document.querySelector('.v3-footer-brand img').getAttribute('src'),
     x: box.x, width: box.width, height: box.height, naturalWidth: image.naturalWidth, naturalHeight: image.naturalHeight,
     brandEdge: rtl ? header.right - box.right : box.left - header.left,
     centerError: nav.width ? Math.abs(nav.x + nav.width / 2 - header.x - header.width / 2) : null,
     headerHeight: header.height, scrollY: window.scrollY, overflow: Math.max(0, document.documentElement.scrollWidth - window.innerWidth) }
   })
   const asset = await page.request.get('http://127.0.0.1:5173' + entry.source)
   entry.httpStatus = asset.status(); entry.viewport = label
   measurements.push(entry); languageMeasurements.push(entry)
   await page.screenshot({ path: `${output}/navbar-${language}-${label}.png` })
   await page.locator(width < 1280 ? '.v3-mobile-toggle' : '[data-v3-group=company]').click()
   await page.screenshot({ path: `${output}/menu-${language}-${label}.png` })
   const openBox = await page.locator('.v3-logo img').boundingBox()
   entry.menuLogoShift = Math.abs(openBox.x - entry.x)
   await page.keyboard.press('Escape')
  }
  if (Math.abs(languageMeasurements[0].height - languageMeasurements[1].height) > 0.1 || languageMeasurements[0].headerHeight !== languageMeasurements[1].headerHeight) throw new Error('Language switch changed logo or header height')
  await page.locator('.v3-language').click()
  if (!(await page.locator('.v3-logo img').getAttribute('src')).endsWith('fbs-contracting-english-navbar.png')) throw new Error('English source was not restored')
  await page.close()
 }
} finally { await browser.close() }
await fs.writeFile(output + '/review.json', JSON.stringify({ errors, measurements }, null, 2))
if (errors.length || measurements.some(entry => entry.overflow || entry.httpStatus !== 200 || entry.centerError > 1 || entry.menuLogoShift > 0.1 || entry.source !== entry.footerSource || Math.abs(entry.width / entry.height - entry.naturalWidth / entry.naturalHeight) > 0.01)) throw new Error('Branding browser verification failed; inspect review.json')
console.log('Verified desktop/mobile English and Arabic branding; saved fresh screenshots to ' + output)

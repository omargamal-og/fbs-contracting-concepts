/* global document, window */
import {test,expect} from '@playwright/test'

async function ready(page,language='en'){
 await page.goto('/contracting/v3?lang='+language)
 await expect(page.locator('.v3-logo img')).toBeVisible()
}
for(const language of ['en','ar'])test(`image-led Approach and More navigation ${language}`,async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});await ready(page,language)
 await expect(page.locator('.v3-primary-nav>button')).toHaveCount(5)
 await page.locator('[data-v3-group=approach]').click()
 await expect(page.locator('.v3-approach-card')).toHaveCount(6)
 await expect(page.locator('.v3-approach-card img')).toHaveCount(6)
 for(const card of await page.locator('.v3-approach-card').all())expect(await card.getAttribute('href')).toContain('lang='+language)
 await expect(page.locator('.v3-approach-capabilities>a')).toHaveCount(5)
 await page.keyboard.press('Escape');await expect(page.locator('[data-v3-group=approach]')).toBeFocused()
 await page.locator('[data-v3-group=more]').click();await page.locator('[data-v3-subgroup=governance]').click()
 await expect(page.locator('.v3-policy-row')).toHaveCount(5)
 await page.keyboard.press('Escape');await expect(page.locator('[data-v3-group=more]')).toBeFocused()
 await page.setViewportSize({width:390,height:844});await page.locator('.v3-mobile-toggle').click();await page.locator('.v3-menu-groups button').nth(1).click()
 await expect(page.locator('.v3-approach-card')).toHaveCount(6)
 expect(await page.evaluate(()=>Math.max(0,document.documentElement.scrollWidth-window.innerWidth))).toBe(0)
 await page.locator('.v3-approach-card').nth(2).click();await expect(page).toHaveURL(/sustainability\/continuous-improvement\?lang=/)
 await expect(page.locator('h1')).toBeVisible();await expect(page.locator('body')).not.toHaveCSS('overflow','hidden')
})

test('impact follows the hero; expansive sections stay within the viewport',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});await ready(page)
 await expect(page.locator('.v3-main>section').first()).toHaveAttribute('id','v3-impact')
 for(const width of [1600,1280,1024,390,320]){
  await page.setViewportSize({width,height:900})
  for(const id of ['v3-company','v3-expertise','v3-projects','v3-sustainability','v3-news']){
   const box=await page.locator('#'+id).boundingBox();expect(Math.abs(box.width-width)).toBeLessThan(1)
  }
  expect(await page.evaluate(()=>Math.max(0,document.documentElement.scrollWidth-window.innerWidth))).toBe(0)
 }
 await expect(page.locator('.v3-statistics')).toHaveCount(0)
 await expect(page.locator('.v3-news-list article')).toHaveCount(0)
})

test('selective illustrative film plays in view, pauses offscreen, and has still fallbacks',async({page})=>{
 await ready(page);await page.locator('.v3-service-scene').scrollIntoViewIfNeeded()
 const video=page.locator('.v3-process-film video')
 await expect(video).toBeVisible();await expect(video).toHaveJSProperty('paused',false)
 await expect.poll(()=>video.evaluate(node=>node.currentTime)).toBeGreaterThan(0.1)
 await page.locator('.v3-film-control').click();await expect(video).toHaveJSProperty('paused',true)
 await page.locator('.v3-film-control').click();await expect(video).toHaveJSProperty('paused',false)
 await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));await expect(video).toHaveCount(0)
 await page.emulateMedia({reducedMotion:'reduce'});await page.locator('.v3-service-scene').scrollIntoViewIfNeeded();await expect(video).toHaveCount(0);await expect(page.locator('.v3-process-film img')).toBeVisible()
 await page.emulateMedia({reducedMotion:'no-preference'});await page.setViewportSize({width:390,height:844});await expect(video).toHaveCount(0)
})

test('hero changes scenes at approximately 4.8 seconds without changing the source files',async({page})=>{
 await ready(page);const first=page.locator('.v3-film.is-active video');await expect(first).toHaveJSProperty('paused',false)
 const start=await page.evaluate(()=>performance.now())
 await expect(page.locator('.v3-film.is-active')).toHaveAttribute('data-scene','02',{timeout:6500})
 const elapsed=await page.evaluate(()=>performance.now())-start
 expect(elapsed).toBeGreaterThan(3700);expect(elapsed).toBeLessThan(6000)
 await expect(page.locator('.v3-film.is-active video')).toHaveJSProperty('paused',false)
 await expect(page.locator('.v3-film.is-active img')).toHaveAttribute('src',/hero-02-poster.jpg/)
})

test('footer uses official LinkedIn, authentic icon and honest policy/contact availability',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});await ready(page)
 const social=page.locator('.v3-footer-socials a').first()
 await expect(social).toHaveAttribute('href','https://www.linkedin.com/company/fbs-contracting/')
 await expect(social.locator('svg path')).toHaveCount(1)
 await expect(page.locator('.v3-footer-socials a')).toHaveCount(1)
 await social.hover();await expect(social).toHaveCSS('color','rgb(10, 102, 194)')
 await expect(page.locator('.v3-footer-contact a')).toHaveAttribute('href',/\/contracting\/build\/contact\?lang=en/)
 await expect(page.locator('.v3-footer a[href*=faisalsaedanco],.v3-footer a[href*=binsaedan]')).toHaveCount(0)
 await page.locator('.v3-footer-governance summary').click();await expect(page.locator('.v3-footer-governance li')).toHaveCount(5)
 await expect(page.locator('.v3-footer-governance li a')).toHaveCount(0)
})

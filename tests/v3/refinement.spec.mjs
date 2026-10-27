/* global document, window, getComputedStyle */
import { test, expect } from '@playwright/test'
async function ready(page,lang='en'){await page.goto('/contracting/v3?lang='+lang);await expect(page.locator('.v3-project-card [data-project-link]').first()).toBeVisible()}
test('complete expansive homepage keeps impact and news approval-safe',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});await ready(page)
 for(const id of ['v3-company','v3-impact','v3-expertise','v3-projects','v3-sustainability','v3-news','v3-connect']){await expect(page.locator('#'+id+' .v3-shell')).toHaveCount(1);expect(Number.parseFloat(await page.locator('#'+id+' .v3-shell').evaluate(node=>getComputedStyle(node).borderRadius))).toBe(0)}
 await expect(page.locator('.v3-project-preview').first()).toContainText('Publication approval pending');await expect(page.locator('.v3-statistics')).toHaveCount(0);await expect(page.locator('.v3-news-list article')).toHaveCount(0);await expect(page.locator('#v3-impact')).toContainText('Preliminary figures \u2014 subject to confirmation');await expect(page.locator('#v3-news')).toContainText('No articles are currently published on this website.');await expect(page.locator('#v3-hero .v3-statistics')).toHaveCount(0)
})
test('expertise hover and keyboard focus change its image and selected story',async({page})=>{
 await ready(page);const tabs=page.locator('#v3-expertise [role=tab]'),image=page.locator('.v3-service-scene img');await page.locator('#v3-expertise').scrollIntoViewIfNeeded();await expect(tabs).toHaveCount(5);const first=await image.getAttribute('src');await tabs.nth(1).hover();await expect(tabs.nth(1)).toHaveAttribute('aria-selected','true');await expect(page.locator('.v3-service-story h3')).toHaveText('Land Development');expect(await image.getAttribute('src')).not.toBe(first)
 await tabs.nth(1).focus();await page.keyboard.press('ArrowDown');await expect(tabs.nth(2)).toBeFocused();await expect(page.locator('.v3-service-story h3')).toHaveText('Design Management');await page.keyboard.press('End');await expect(tabs.last()).toHaveAttribute('aria-selected','true')
})
test('project cards support arrows, keyboard, details and modal focus restoration',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});await ready(page);await page.locator('#v3-projects').scrollIntoViewIfNeeded()
 const buttons=page.locator('.v3-project-card [data-project-link]');await expect(page.locator('.v3-project-info h3').first()).toHaveText('Jawhart Al-Sahab')
 const before=await page.locator('.v3-project-card-rail').evaluate(node=>node.scrollLeft)
 await page.locator('#v3-projects').getByRole('button',{name:'Next project',exact:true}).click();await expect.poll(()=>page.locator('.v3-project-card-rail').evaluate(node=>node.scrollLeft)).toBeGreaterThan(before)
 const trigger=buttons.nth(1);await trigger.click();await expect(page.locator('#v3-project-detail-title')).toHaveText('Nozol Khayala');await page.goBack();await expect(trigger).toBeVisible()
 await expect(page.locator('body')).not.toHaveCSS('overflow','hidden');await trigger.focus();await page.keyboard.press('ArrowRight');await expect(buttons.nth(2)).toBeFocused()
})

test('new menu has contextual cards, rounded shell and an animated close',async({page})=>{
 await ready(page);const trigger=page.locator('[data-v3-group=company]');await trigger.click();await expect(page.locator('.v3-menu-primary h2')).toHaveText('Company');await expect(page.locator('.v3-menu-card')).toHaveCount(2);await expect(page.locator('.v3-menu-card-visual img').first()).toBeVisible();await expect(page.locator('.v3-menu')).toHaveCSS('border-radius','20px');await page.keyboard.press('Escape');await expect.poll(()=>page.locator('.v3-menu').evaluateAll(nodes=>nodes.length?Number(getComputedStyle(nodes[0]).opacity):0)).toBeLessThan(0.9);await expect(page.getByRole('dialog')).toHaveCount(0);await expect(trigger).toBeFocused();await expect(page.locator('[data-v3-page]')).toHaveJSProperty('inert',false)
})
test('normal-motion GSAP scopes and modal page state clean up on legacy navigation',async({page})=>{
 await ready(page);await page.locator('#v3-expertise').scrollIntoViewIfNeeded();expect(await page.evaluate(async()=>{const module=await import('/src/contracting/site/v2/motion/gsap.ts');return module.ScrollTrigger.getAll().length})).toBeGreaterThan(0);await page.locator('[data-v3-group=company]').click();await page.locator('.v3-menu-links').getByRole('link',{name:'Who We Are'}).click();await expect(page).toHaveURL(/contracting\/build\/about\/who-we-are/);await expect(page.locator('.fbs-v3')).toHaveCount(0);expect(await page.evaluate(async()=>{const module=await import('/src/contracting/site/v2/motion/gsap.ts');return module.ScrollTrigger.getAll().length})).toBe(0);await expect(page.locator('body')).not.toHaveCSS('overflow','hidden')
})
for(const [width,language] of [[768,'en'],[390,'ar'],[320,'ar']])test('complete page overflow and touch menu '+width+' '+language,async({page})=>{
 await page.setViewportSize({width,height:900});await page.emulateMedia({reducedMotion:'reduce'});await ready(page,language);for(const id of ['v3-company','v3-expertise','v3-projects','v3-image-reveal-two','v3-news','v3-connect']){await page.locator('#'+id).scrollIntoViewIfNeeded();expect(await page.evaluate(()=>document.documentElement.scrollWidth-window.innerWidth)).toBe(0)}await page.locator('.v3-mobile-toggle').click();await expect(page.getByRole('dialog')).toBeVisible();expect(await page.evaluate(()=>document.documentElement.scrollWidth-window.innerWidth)).toBe(0);await page.keyboard.press('Escape');await expect(page.getByRole('dialog')).toHaveCount(0)
})

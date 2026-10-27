# V3 Phase 3 — homepage refinement and motion upgrade

Review the updated homepage at **/contracting/v3?lang=en** or **/contracting/v3?lang=ar** after running npm run dev. The route is unchanged. The current work is ready for visual review; automated verification is not company visual acceptance.

The initial dirty Git state was retained. No files under the existing /contracting/build or V2 implementations, archived concepts, routing definitions, or Supabase foundation were changed in this milestone. A SHA-256 comparison checked 182 preserved source/foundation/test files with zero differences. The three working MP4 files also match their existing provenance hashes. No dependency installation, commit, push, merge, database write, or deployment was performed.

## Major design changes

The below-hero page has been rebuilt as a complete bright composition using only the existing seven approved FBS colors. White shells use 28–32px radii, while selected major media surfaces and the hero transition use larger radii. The official logo remains precisely centered independently of navigation widths.

| Area | New composition and behavior |
| --- | --- |
| Hero | Two-line company-profile headline, balanced directional overlay, stronger subtitle contrast, pill CTA with inset icon, refined player spacing, animated scene labels, and rounded transition into the first shell. The original three clips, sequencing, manual controls, pause, mobile/data-saving posters, reduced motion, hidden-tab and offscreen behavior remain. |
| Who we are | Spacious asymmetric white shell with company copy, large rounded construction photograph, subtle mask reveal/parallax, and a restrained outlined CTA. The stock image is labeled. |
| Our impact | Compact standalone horizontal section. Approved published values animate when available; otherwise an intentional empty state appears without sample metrics. |
| Image continuity | Two deliberate open windows between white shells expose the same single fixed photograph. Translucent rounded captions and adjacent overlapping compositions create depth without pinning or scroll hijacking. |
| Expertise | Profile-approved service names become keyboard-operated interactive rows. Hover, click or focus selects the corresponding image and story. Arrow/Home/End keys are supported; the selected row and image transition together. Published service descriptions are displayed when supplied. |
| Featured projects | One large rounded image stage with next/previous controls, roving keyboard tabs, image transitions, hover zoom, a location/name panel, and accessible project-detail dialogs. Existing company-profile projects appear only as explicitly labeled development previews until approved publication exists. |
| Sustainability | An image-led white composition combines the existing sustainability copy, a clear CTA, and a separate Vision 2030 note. Supporting imagery remains labeled stock. |
| News | Published approved news can show date, cover image, excerpt, an article dialog and an optional original LinkedIn link. With no approved news, a clear corporate empty state appears. No invented story or live LinkedIn synchronization is included. |
| Closing and footer | Large conversation CTA balanced with compact careers/supplier links; a bright, simplified footer completes the page. Existing supporting-page routes remain in use. |
| Mega navigation | Full-width rounded white panel with a category rail, large group heading, supporting description, grouped links and contextual project imagery. Hover/click, keyboard, Escape, touch, mobile groups, focus trapping/restoration, backdrop dismissal and a refined close animation are included. |

The page intentionally includes no live map, illustrative pins, new coordinates, certifications, achievements, or sample business statistics. Existing map data/contracts and routes remain intact for the next dedicated milestone.

## Motion changes

The new V3 motion module shares easing/duration tokens across section and interaction motion: power3.out, roughly 0.8-second entrances, 0.5-second content changes, and short stagger offsets. Hero and menu use the same vocabulary.

- Section entrances and staggered content use small vertical offsets with visible fades.
- Rounded image masks open into their final crop; selected desktop images have restrained scroll-linked parallax.
- Expertise switches image and story with scoped horizontal/vertical fades.
- Project changes animate the new image and information panel; hover adds a gentle image zoom.
- Menu entrance staggers links and reveals the contextual image. Closing fades/slides the panel before removing modal state and restoring focus.
- Scene captions transition independently while the preserved videos crossfade.
- Buttons, row arrows, project tabs, and links have short purposeful micro-interactions.
- ScrollTrigger and GSAP contexts revert on content/language/route changes. A browser test verifies no V3 ScrollTriggers survive navigation to an existing corporate page.

Reduced motion keeps content visible, removes these motion effects and uses hero posters. Mobile also uses posters below 768px; native scrolling and manually selected scenes remain available. The fixed photograph uses its existing smaller mobile derivative and remains a static layer under reduced motion.

## Content publication boundary

V3 now has its own controller hook, reusing the existing typed getPublicHomepage and approved-content adapters without editing V2 or the foundation. The published content supplies company sections, services, projects, galleries/media, news, statistics and sustainability/vision copy. RLS remains authoritative and the existing explicit publication checks remain active.

Development-only project presentation is isolated in developmentProjects.ts and imported only behind import.meta.env.DEV when content is unavailable. The module contains no statistics or news. It uses existing company-profile project names/images, excludes unverified project facts/coordinates, and labels the showcase and menu image as pending publication approval. Production builds do not import this fixture module or substitute these projects. Legacy routes retain their own original static content and assets.

Statistics require a published/approved model and a reporting reference date; the V3 section also checks the source and date before displaying values. News is taken only from the published model. Outages are bounded to eight seconds and produce a retry option without breaking the page or exposing backend details. Media delivery uses the existing signed released-media boundary and viewport-based lazy delivery. There are no applicant/supplier queries or writes.

Project/news details open in native modal dialogs within V3. They do not create new routing requirements. Escape, background dismissal, scroll-lock cleanup and focus restoration were checked. A development StrictMode effect-cycle issue found during testing was corrected so project dialogs remain open after their initial lifecycle setup.

## Verification — 23 October 2026

| Check | Final result |
| --- | --- |
| npm run typecheck | Passed |
| npm run lint | Passed |
| npm run test:foundation | 36 passed |
| npm run test:v2 | 6 passed |
| npm run test:ui | 17 passed; V2/build/concept regressions |
| npm run test:v3 | 26 passed: 22 development interaction checks and 4 production publication/outage checks |
| npm run content:seed:check | Passed; seed unchanged |
| npm run build | Passed; existing application/Mapbox bundle-size warnings remain |
| Preserved-file comparison | 182 unchanged source/foundation/test files |
| Working video hash comparison | All three unchanged |

Total: **85 passing automated tests**, plus source/build/seed checks. New production browser checks build into an ignored unique directory and intercept a synthetic Supabase endpoint. They verify draft/unapproved exclusion, absence of V3 preview chunks, published signed media/statistics/news dialogs, missing statistic reporting dates, and bounded outage handling. No real Supabase project was contacted or modified for these checks.

Real Chrome playback checks still verify decoded 1600px media, advancing currentTime, pause/resume, manual selection and the automatic 01→02→03→01 sequence. Responsive checks cover 1440, 768, 390 and 320px widths, including Arabic RTL. No horizontal overflow or uncaught page errors were observed in the final visual capture.

## Screenshots and recording

All review artifacts are local and ignored under artifacts/v3/phase3/:

- [English hero / transparent navbar](../artifacts/v3/phase3/hero-scene-01.png), [second video](../artifacts/v3/phase3/hero-scene-02.png), [third video](../artifacts/v3/phase3/hero-scene-03.png), [Arabic hero](../artifacts/v3/phase3/hero-ar.png).
- [Scrolled white navbar and Who we are](../artifacts/v3/phase3/v3-company.png).
- [Rounded mega menu](../artifacts/v3/phase3/mega-menu.png), [Arabic mobile menu](../artifacts/v3/phase3/mobile-ar-menu.png).
- [Expertise](../artifacts/v3/phase3/v3-expertise.png), [hover/focus interaction](../artifacts/v3/phase3/expertise-interaction.png).
- [Featured projects](../artifacts/v3/phase3/v3-projects.png), [project transition](../artifacts/v3/phase3/project-transition.png), [project details](../artifacts/v3/phase3/project-details.png).
- [First fixed-image reveal](../artifacts/v3/phase3/v3-image-reveal-one.png), [second fixed-image reveal](../artifacts/v3/phase3/v3-image-reveal-two.png).
- [Sustainability](../artifacts/v3/phase3/v3-sustainability.png), [news empty state](../artifacts/v3/phase3/v3-news.png), [closing CTA](../artifacts/v3/phase3/v3-connect.png).
- [Native full desktop screenshot](../artifacts/v3/phase3/desktop-full.png), [desktop scroll composite](../artifacts/v3/phase3/desktop-scroll-composite.png).
- [Full English mobile](../artifacts/v3/phase3/mobile-en-full.png), [full Arabic mobile](../artifacts/v3/phase3/mobile-ar-full.png), [tablet](../artifacts/v3/phase3/tablet-full.png).
- [Arabic mobile company section](../artifacts/v3/phase3/mobile-ar-v3-company.png), [expertise](../artifacts/v3/phase3/mobile-ar-v3-expertise.png), [projects](../artifacts/v3/phase3/mobile-ar-v3-projects.png).
- [Interaction recording — MP4](../artifacts/v3/phase3/interactions.mp4), [WebM](../artifacts/v3/phase3/interactions.webm).

The recording shows actual video switching, scrolling, service hover, project selection/dialogs, menu entrance/exit and the language switch. Viewport screenshots and the recording are the evidence for the fixed image: Chromium native full-page capture renders viewport-fixed backgrounds only in its captured viewport. The separately labeled scroll composite stitches actual viewport captures with the repeated fixed header cropped after the first segment; it does not change application styles or add imagery to the page.

Desktop, Arabic hero/menu, key section viewports, mobile sections, and complete-page compositions were visually inspected. This is implementation review, not company visual sign-off or a full accessibility/cross-browser certification.

## Exact file inventory for this milestone

Modified:

1. src/contracting/site/v3/V3Preview.tsx
2. src/contracting/site/v3/CenteredNavigation.tsx
3. src/contracting/site/v3/CinematicHero.tsx
4. src/contracting/site/v3/content.ts
5. src/contracting/site/v3/styles.css
6. tests/v3/cinematic.spec.mjs
7. playwright.v3.config.mjs
8. README.md

Created:

1. src/contracting/site/v3/HomeSections.tsx
2. src/contracting/site/v3/Image.tsx
3. src/contracting/site/v3/motion.ts
4. src/contracting/site/v3/useHomepageContent.ts
5. src/contracting/site/v3/developmentProjects.ts
6. tests/v3/refinement.spec.mjs
7. tests/v3/publication.spec.mjs
8. public/contracting/v3/media/company-collaboration.webp
9. public/contracting/v3/media/expertise-groundwork.webp
10. public/contracting/v3/media/construction-structure.webp
11. docs/media/v3-phase3-derivatives.json
12. docs/v3-phase3-refinement.md

The three new WebP stills were extracted from already licensed V3 footage, not generated or represented as company project photography. Their source clip, frame offset, width, byte size and SHA-256 are in [the derivative record](media/v3-phase3-derivatives.json); original asset/license provenance remains in [the existing media record](media/v3-media-provenance.json). Approved service names were checked against page 17 of the existing official English company profile. No new application dependencies were added.

## Remaining external inputs and verification limits

No known broken interaction remains in the verified Chrome paths. The following remain external or deliberately deferred:

- Company visual/content approval of this refinement and rights/approval for production project photography. Local project previews remain visibly pending and excluded from V3 production fallback.
- A configured live Supabase project, reviewed bilingual records, approved statistics with evidence/reporting dates, approved news and released media. Live storage/RLS/network integration was not exercised; foundation tests and intercepted production UI tests cover the local boundary.
- Company-approved replacements for the labeled licensed stock material if desired. The original videos are intact and their existing license documentation is preserved.
- Real Safari/iOS/Firefox/device verification. Reduced-motion and mobile layouts were exercised in Chrome.
- Future approved LinkedIn server integration; current news supports only approved records and optional original-post links.
- The dedicated 3D Saudi Arabia map milestone, verified coordinates, and external map-service setup. No live map or geographic behavior is claimed here.
- Existing Vite development-tool audit finding and legacy bundle-size warnings remain release follow-ups; they were not silently addressed through an unrelated dependency upgrade.

For review, run npm run dev, open either V3 language URL, inspect both image windows while scrolling, hover/focus expertise rows, use project controls/details, and open/close the navigation with pointer and keyboard. npm run test:v3 repeats the dedicated Chrome checks. V2 and /contracting/build remain available at their existing URLs.

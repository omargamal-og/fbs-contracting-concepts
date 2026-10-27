# V3 critical UX fixes and interaction upgrade

Preview: run npm run dev, then open /contracting/v3?lang=en or /contracting/v3?lang=ar. This milestone changes the existing V3 preview only, apart from a narrow V3 exemption in the shared ScrollToTop component. No commit, push, merge, deployment, dependency installation, database mutation or final map implementation was performed.

## Scroll investigation and exact fix

A fresh bare V3 URL already stayed at scrollY 0 in the initial Chrome trace; the reported bare-path jump was not reproduced in that clean session. A related, concrete failure was reproduced: open #v3-company, scroll back to the hero without clearing the URL hash, then switch language. The old implementation moved from scrollY 0 to 768.

The page's hash effect depended on both location.hash and content.status. Language changes reset the content request, so loading/completion replayed the old About anchor. Mega-menu links also had their own delayed scrollIntoView call, in addition to router/native anchor behavior. The shared ScrollToTop component reset every pathname change and could override V3 history restoration. No GSAP pin spacers, initial autofocus, or video geometry shift caused the reproduced jump.

The new useV3Scroll hook owns V3 navigation scroll after the lazy page mounts:

- Fresh bare navigation starts at the hero. Browser refresh starts at the hero, including a retained hash; a fresh intentional deep link honors its section anchor.
- Search-only language replacements keep the viewport position and never replay an old hash when content completes.
- Explicit anchors run once per navigation, including repeated selections of the same anchor. Target offsets respect the fixed header's CSS scroll margin. Window scrolling avoids scrollIntoView being suppressed while the menu's inert page state is released.
- Back/Forward restores session positions by router location key, with a bounded 100-entry map. Scroll listeners record positions; they do not move the window. Native restoration is manual only while V3 owns the route, and is restored on cleanup.
- Native same-page anchors are routed through the same handler. The duplicate timeout scroll calls were removed. Content, media and ScrollTrigger refreshes do not initiate navigation scroll.
- Menu focus restoration uses preventScroll. ArrowDown enters the menu links even if the group was already hover-open; Escape also works when hover opened a menu without moving focus into the header.

A subsequent regression exposed 38px of native browser scroll anchoring during bilingual text reflow. V3 disables overflow-anchor so text changes do not compensate the user's scroll position. The stale-anchor/language/reload regression then passed three consecutive repetitions, and is included in the complete suite.

Diagnostic evidence: [before scroll trace](../artifacts/v3/ux/before-scroll-trace.json), [reproduced stale anchor](../artifacts/v3/ux/before-stale-anchor.json), and [regression tests](../tests/v3/ux.spec.mjs).

## Layout and navigation

| Correction | Result |
| --- | --- |
| Oversized shells at large widths | Main shells and content are bounded to 1320px with responsive gutters. |
| First section's negative margin | Company begins after the hero with a positive section gap. |
| Hero controls competing with fixed-height copy | Copy, player and footage credit occupy separate grid rows; short viewports grow naturally. |
| Inconsistent oversized content | Balanced clamp headings, controlled section spacing, reduced company/sustainability image minimums and more compact service rows. |
| Project metadata covering photography | Metadata is a separate white row below the image, including mobile. |
| Long project-name pills | Thumbnail rail shows compact secondary navigation and scrolls within itself. |
| Button padding reset | Shared button specificity now preserves CTA padding for actual button elements. |
| Full-height empty mobile menu | Floating sheet fits its content and scrolls within the available viewport. |

The official logo remains at the exact viewport midpoint independently of unequal groups. Company/Expertise and Projects/News/Connect sit closer on either side; language stays at the outer edge. Below 1101px the compact menu trigger replaces desktop groups before they can collide. Transparent video navigation and translucent white scrolled navigation remain. Geometry checks cover English/Arabic, desktop, tablet, narrow mobile and short landscape views.

## Mega menus and content sources

MegaMenuCard is reusable and supports contextual icons, approved media, page links and article actions. White floating shells use official-color highlights, compact two/three-card layouts, staggered entrances, media masks, hover/focus states and a hover bridge. Mobile exposes all five groups, with keyboard trapping, Escape, backdrop dismissal and scroll-lock cleanup.

| Menu | Cards and navigation |
| --- | --- |
| Company | Existing corporate pages; Team/Values cards when news is absent, or Team plus up to two latest approved news records. |
| Expertise | Existing capabilities, sustainability and continuity routes; up to three capability cards from published service titles/descriptions, falling back to the existing profile-derived bilingual service names. |
| Projects | Residential/commercial category cards and existing category routes. No fabricated city filter: V3's current view model has a location label rather than a structured city-browsing destination. Real locations remain visible in project metadata. |
| News | Separate primary menu. Up to three approved articles, sorted newest-first by article date. A single article gets a useful second navigation card; no records gets useful News/Company links. Articles open real published detail content and optional validated original LinkedIn links. |
| Connect | Careers, Suppliers and Contact cards leading to existing functional routes. |

Company news and homepage news share the V3 published adapter. Drafts never become menu news. Menu article dialogs return focus to the News trigger or mobile menu button when closed. The existing company dictionaries, profile-derived services, approved content adapter and route inventory remain the source of company information. New wording is interface/editorial copy, with no invented company results or achievements.

## Ambient motion and project showcase

The centralized motion module adds a slow 24-second expertise line orbit and two restrained 5-second yoyo line details in the fixed-image reveals. These are selected lightweight SVG/transform accents, not loops on every section. IntersectionObserver pauses each accent offscreen; document visibility pauses them in hidden tabs. Ambient loops are disabled under reduced motion, data saving, reported CPU/memory constraints, or low battery when the optional Battery API is available. Optional listeners, observers, tweens and battery handlers are removed on cleanup. Existing ScrollTriggers and GSAP contexts still revert on content/language/route changes. Reduced motion leaves content visible and uses hero posters.

FeaturedProjects is now a dedicated component: one large rounded image, stable metadata/CTA below it, next/previous controls, a current/total indicator and a compact thumbnail rail. Image and copy transitions share motion tokens. Selection follows project IDs; keyboard arrows adapt to RTL, Home/End jump within the rail, and horizontal touch swipes change projects without capturing vertical scrolling. The rail scrolls itself to reveal selection. Detail dialogs retain Escape and focus restoration.

Published projects and signed media are preferred. When the backend is unavailable, existing company-profile projects appear only in explicitly labeled development previews. Production excludes these fixtures and shows an honest unavailable state. No project imagery, delivery claims, statistics or coordinates were invented. The three original hero videos, official logo and single fixed photograph are unchanged.

## Content completeness and missing inputs

All expected sections remain: hero, company introduction, separate approved impact/statistics, both fixed-image reveals, expertise, projects, sustainability/Vision 2030, news, Contact/Careers/Suppliers CTA and footer. Existing corporate/category/contact/careers/supplier routes are retained. English and Arabic UI copy covers the new News menu and all added interactions.

The current local environment has no approved live CMS response. Impact and news therefore show explicit publication-pending states; there are no placeholder figures or invented articles. Development projects use the existing profile material and carry the pending-publication notice. Production tests use clearly synthetic intercepted data, not company assertions. New company-approved project publication/photography, approved figures with evidence/reporting dates, approved bilingual news, released media and a configured Supabase deployment are still needed for live content. Stock media remains labeled and documented in the existing provenance files. Careers/supplier destinations are existing routes; this task does not claim new submission/reviewer workflows. LinkedIn ingestion, Mapbox credentials and the final 3D map remain deferred.

## Verification — 23 October 2026

| Check | Final result |
| --- | --- |
| npm run test:foundation | 36 passed |
| npm run test:v2 | 6 passed |
| npm run test:ui | 17 passed, including preserved corporate/concept routes |
| npm run test:v3 | 45 passed: 40 development and 5 production |
| npm run lint / npm run typecheck | Passed, no lint warnings |
| npm run content:seed:check | Passed |
| npm run build | Passed; existing large application/Mapbox chunk warnings remain |

Total: **104 passing automated tests** across the four suites. The stale-anchor/language regression also passed three consecutive targeted repetitions. The final recording is 29.8 seconds. Desktop, tablet, English/Arabic mobile, key menus/sections and the complete scroll composition were visually inspected.

The test suite covers fresh/reloaded hero positioning after media/content settle, stale hashes, language reflow, intentional/repeated anchors, history positions, nine layout geometry combinations, every menu, hover gaps, keyboard/Escape, mobile/RTL, real video playback/sequencing, project details/swipes, motion lifecycle, reduced motion and publication boundaries.

The document-hidden event is simulated for the ambient lifecycle test, and touch gestures are dispatched in Chrome. This is not physical mobile or battery-device certification. Production tests intercept a synthetic Supabase endpoint and do not validate a live deployment.

## Review artifacts

All screenshots and recordings are ignored local artifacts under artifacts/v3/ux/:

- [Initial hero](../artifacts/v3/ux/hero-initial.png), [second video](../artifacts/v3/ux/hero-scene-02.png), [third video](../artifacts/v3/ux/hero-scene-03.png), [Arabic hero](../artifacts/v3/ux/hero-ar.png).
- [Scrolled navigation](../artifacts/v3/ux/navbar-scrolled.png), [Company menu](../artifacts/v3/ux/mega-company.png), [News menu](../artifacts/v3/ux/mega-news.png).
- [Expertise](../artifacts/v3/ux/expertise.png), [selected expertise](../artifacts/v3/ux/expertise-selected.png), [projects](../artifacts/v3/ux/projects.png), [next project](../artifacts/v3/ux/projects-next.png), [project details](../artifacts/v3/ux/project-details.png).
- [Fixed-image reveal](../artifacts/v3/ux/fixed-image-reveal.png), [second reveal](../artifacts/v3/ux/v3-image-reveal-two.png), [sustainability](../artifacts/v3/ux/v3-sustainability.png), [news](../artifacts/v3/ux/v3-news.png), [closing](../artifacts/v3/ux/v3-connect.png).
- [Native full desktop](../artifacts/v3/ux/desktop-full-native.png), [desktop scroll composite](../artifacts/v3/ux/desktop-scroll-composite.png), [capture metadata](../artifacts/v3/ux/visual-capture.json).
- [Arabic mobile hero](../artifacts/v3/ux/mobile-ar-hero.png), [Arabic mobile full page](../artifacts/v3/ux/mobile-ar-full.png), [Arabic mobile News menu](../artifacts/v3/ux/mobile-ar-news-menu.png), [Arabic mobile projects](../artifacts/v3/ux/mobile-ar-v3-projects.png), [tablet full page](../artifacts/v3/ux/tablet-full.png). Separate English mobile and tablet section screenshots are in the same folder.
- [Interaction recording MP4](../artifacts/v3/ux/interactions.mp4), [WebM](../artifacts/v3/ux/interactions.webm).

The recording shows actual hero video switching, menus, scrolling, expertise selection, project navigation/details and the language change. Native full-page Chrome screenshots render fixed backgrounds only in their current viewport. The separately labeled scroll composite stitches actual reduced-motion viewport captures and crops repeated header rows; no application imagery/styles are replaced. Viewport screenshots show the fixed photograph correctly. Capture reported no uncaught page errors. Automated geometry and visual review found no accidental section overlaps in the checked sizes.

## Exact file inventory

Modified in this task:

- src/contracting/core/components/ScrollToTop.tsx — exempt only V3 from the shared reset.
- src/contracting/site/v3/V3Preview.tsx — scroll owner, project component and menu article focus return.
- src/contracting/site/v3/CenteredNavigation.tsx — five menus, cards and interaction/focus fixes.
- src/contracting/site/v3/HomeSections.tsx — extract project showcase; add selected ambient details.
- src/contracting/site/v3/content.ts — bilingual News menu introduction.
- src/contracting/site/v3/motion.ts — centralized ambient motion and cleanup.
- src/contracting/site/v3/styles.css — navigation, menu, hero, showcase and responsive sizing fixes.
- src/contracting/site/v3/useHomepageContent.ts — published news sorted by article date.
- tests/v3/refinement.spec.mjs — menu expectations updated for contextual cards.
- tests/v3/publication.spec.mjs — production published-menu article/order/focus checks.
- README.md — link to this handover.

Created:

- src/contracting/site/v3/useV3Scroll.ts
- src/contracting/site/v3/MegaMenuCard.tsx
- src/contracting/site/v3/FeaturedProjects.tsx
- tests/v3/ux.spec.mjs
- docs/v3-ux-upgrade.md

The pre-task snapshot compared 193 existing source/foundation/V2-test files: 185 unchanged, eight intentionally modified above, none missing. V2, build/concept source, route definitions, Supabase files and existing preserved tests were unchanged. [Comparison evidence](../artifacts/v3/ux/preservation-check.json). All three original video hashes match the existing provenance. Existing dirty work was preserved. No application assets or dependencies were added.

Remaining verification limits: real Safari/iOS/Firefox/devices, live CMS/storage integration, company visual/content acceptance and actual deployment environment. Existing large legacy/application/Mapbox bundle warnings remain; this milestone did not change their imports or implement the deferred map.

# V3 premium homepage and navigation upgrade

Latest design evidence: [V3 major visual quality upgrade](v3-visual-quality-upgrade.md), with before/after map and homepage captures and the explicitly labeled local preliminary figures.

Latest milestone: [V3 homepage completion and resumed stabilization](v3-homepage-completion.md), including the functional Saudi 3D map, compact News, nonnumeric Impact and final verification. The no-map scope below describes the earlier revision.

Completed 2026-10-25 in the existing `/contracting/v3` implementation. Review `/contracting/v3?lang=en` and `/contracting/v3?lang=ar`.

This is the current report. The [previous navigation and logo report](v3-premium-navigation-homepage.md) remains an audit of the earlier milestone. No commit, push, merge, deployment, database migration, or external publication was performed.

## What changed

The homepage now uses edge-reaching image compositions, quieter typography, a selective construction film, architectural project cards, an editorial news area, and a comprehensive bilingual footer. The navigation has five primary groups, with a distinct image-led Approach menu. The official language-specific logo files and centered navigation remain intact.

The single router, existing route definitions, Supabase clients and publication boundaries, V2, legacy concepts, three hero video files, fixed architectural background, and unrelated dirty working-tree changes were preserved. No 3D map was added. A source snapshot taken before this revision is in [before-source/v3](../artifacts/v3/expansive/before-source/v3/).

## Navigation architecture

| Visible item | Contents / destination |
| --- | --- |
| Company | Existing Who We Are, Our Team, Vision & Mission, and Core Values routes; illustrative image cards |
| Approach | Introductory column, five existing capabilities, six image cards linking to Expertise, Core Values/Safety, Continuous Improvement, Environmental Responsibility, Training, and Risk Assessment & Management |
| Projects | Existing residential and commercial routes and image cards |
| News | Published news context and the homepage news section |
| More | Governance availability, Careers, Suppliers, Contact |
| Login | Preserved unified portal availability menu and actual public application links |
| Language | Actual English/Arabic source-image switch, localized routes and RTL layout |

Approach uses a compact capability list beside a three-by-two image grid on desktop. On mobile it becomes a scrollable layout with a return-to-navigation control. Company, Projects, News, and More retain distinct contextual compositions. Governance remains available under More and in the footer; unavailable policy documents are labeled rather than linked to invented pages.

The five capabilities come from the existing FBS service copy or published CMS services: Feasibility Study, Land Development, Design Management, Construction Works, and Maintenance & Operations. New menu categories describe existing pages; no unsupported Engineering, EPC, or ethics certification claim was added. Safety links to the existing Core Values page rather than an invented safety route.

The navbar retains equal outer grid columns, centering the main group across the entire width. English branding stays left and Arabic branding stays right; utilities occupy the opposite edge. At widths below 1280px it uses the mobile layout. Both logo images retain explicit intrinsic dimensions and aspect ratios, including during delayed image decoding and language switching. No logo artwork or crop asset was changed in this revision.

## Homepage behavior

- Impact is the first section below the hero. Only published, dated approved statistics can render; the seven draft figures remain hidden. When none are approved, the section provides an availability state without invented numbers.
- About and Sustainability pair full-width backgrounds with large image areas and constrained readable text. Expertise has a larger image/story composition and existing service tabs. Existing GSAP reveals, drawing/parallax details, fixed background, and reveal windows remain; reduced-motion behavior is retained.
- The Expertise film reuses the existing 1,798,366-byte `hero-02-engineers.mp4`. It loads in view on desktop, has a visible translated pause/play control, and stops offscreen or when the document is hidden. Mobile, reduced-motion and data-saving settings use the still image. No new video file was downloaded.
- Project cards are approximately 340–480px wide on desktop, with large photographs, inset information plates, rounded architectural corners, restrained metadata, and subtle hover depth/zoom. Partial cards remain visible at the rail edges. Images use proportional covering rather than stretching.
- The existing constant-speed loop engine is preserved: viewport-triggered motion, RTL direction, seamless cycle wrapping, pause on hover and keyboard focus, pointer/touch drag with click suppression, visible pause/play, keyboard controls, offscreen/document-hidden suspension, and a stationary manually navigable reduced-motion gallery. Visual repeats remain hidden from assistive technology and have no duplicate tab stops. Signed-media subscriptions remain shared across repeats.
- News supports published CMS images, dates, titles, excerpts, a detail view, and a validated source-post link. With no published records, it shows an explicit availability state and the official LinkedIn link. No sample news is represented as company news.
- Hero scene transitions now begin at approximately 4.8 seconds, with the existing 1.1-second crossfade. Previously the 8/10-second source durations produced longer scene intervals. All three video files, poster fallbacks, controls, and reduced-motion handling remain intact.
- The footer includes the actual language logo, localized navigation, Careers/Suppliers, governance availability, contact information when published, the official LinkedIn account, copyright, and return-to-top. Additional recognized social accounts can come from published CMS settings. Authentic platform silhouettes use platform-color hover states, as specifically requested; other interface colors use the FBS palette.

## Media and approved-content boundaries

No new bitmap or video asset was created, recolored, or downloaded in this revision. Existing Pexels footage, derived stills, and the licensed fixed-background photograph are reused with explicit illustrative-stock captions. Approach Safety and People cards use CSS framing of existing stills; source pixels are unchanged. Competitor imagery and branding from the supplied reference screenshot were not copied.

Sources and usage are recorded in [v3-expansive-sources.json](media/v3-expansive-sources.json), with the existing [media provenance](media/v3-media-provenance.json), [still derivatives](media/v3-phase3-derivatives.json), and [logo crop audit](media/v3-navbar-logos.json).

The user-specified [FBS Contracting LinkedIn page](https://www.linkedin.com/company/fbs-contracting/) was inspected through available public search results. Individual dated posts, original media rights, and reliable permalinks were not sufficiently verified for importing news. No posts were imported and no automatic LinkedIn integration is claimed. The CMS-ready manual presentation is complete.

Production project rendering still uses published approved records and their configured media. The pre-existing local development company-profile project preview remains visibly labeled as awaiting publication approval; its records were not promoted to approved production content. Stock construction images are not presented as FBS project or team photography.

No new contact details or social account URLs were invented. With no published local contact settings, the footer points to the existing Contact route. Unverified legacy parent/group social URLs are not reused as FBS Contracting accounts. Missing policies and unavailable authentication portals retain honest availability states.

## Actual validation

| Command / review | Result |
| --- | --- |
| `npm run lint` | Passed |
| `npm run typecheck` | Passed |
| `npm run test:v3` | 92 passed |
| `npm run test:foundation` | 36 passed, including PGlite SQL/RLS and content regressions |
| `npm run test:v2` | 6 passed |
| `npm run build` | Passed; existing large shared/Mapbox chunk warning remains |
| `node scripts/verify-v3-expansive.mjs` | Passed in headed Chrome; screenshots and recording saved |
| Source-file hash audit | Three hero video hashes and both cropped logo hashes match existing manifests |

The automated V3 suite covers English/Arabic desktop, tablet and mobile breakpoints including 320, 390, 768, 1024, 1181, 1279, 1280, 1440 and 1600px, plus landscape. Coverage includes logo source/placement and delayed decode, centered navigation and menus, localized navigation, route/body-lock cleanup, no page overflow or automatic scroll jumps, nonoverlapping sections, real media decoding/timing, film pause/fallbacks, gallery cycle boundaries and interactions, CDP touch gestures, reduced motion, and published/draft content gates. Existing tests were updated for the simplified navigation and new footer; new upgrade-specific tests cover the new behavior.

The headed capture measured desktop navigation-center error at 0px English and 0.0078125px Arabic. Both desktop languages had five primary items, a playing in-view film and moving gallery, and zero horizontal overflow. Both 390px mobile languages had zero horizontal overflow and a still-film fallback. The capture reported no browser errors: [browser-review.json](../artifacts/v3/expansive/after/browser-review.json). Final saved desktop and mobile screenshots were visually reviewed.

Document-hidden suspension was checked through simulated visibility events. Physical-device testing, an actual OS background-tab transition, Safari/Firefox, manual screen-reader listening, hosted Supabase authentication/storage, and live LinkedIn synchronization were not tested. No production deployment was performed.

## Before / after evidence

All captures are actual local browser output. Before captures predate this revision; after captures reflect the final implementation.

| View | Before | After |
| --- | --- | --- |
| English desktop homepage | [Before](../artifacts/v3/expansive/before/homepage-en.png) | [After](../artifacts/v3/expansive/after/homepage-en.png) |
| Arabic mobile homepage | [Before](../artifacts/v3/expansive/before/homepage-ar.png) | [After](../artifacts/v3/expansive/after/homepage-ar-mobile.png) |
| English navigation menu | [Previous Expertise menu](../artifacts/v3/expansive/before/approach-menu-en.png) | [New Approach menu](../artifacts/v3/expansive/after/approach-menu-en.png) |
| English About | [Before](../artifacts/v3/expansive/before/v3-company-en.png) | [After](../artifacts/v3/expansive/after/v3-company-en.png) |
| English Expertise | [Before](../artifacts/v3/expansive/before/v3-expertise-en.png) | [After](../artifacts/v3/expansive/after/v3-expertise-en.png) |
| English Projects | [Before](../artifacts/v3/expansive/before/v3-projects-en.png) | [After](../artifacts/v3/expansive/after/v3-projects-en.png) |
| English Sustainability | [Before](../artifacts/v3/expansive/before/v3-sustainability-en.png) | [After](../artifacts/v3/expansive/after/v3-sustainability-en.png) |
| English News | [Before](../artifacts/v3/expansive/before/v3-news-en.png) | [After](../artifacts/v3/expansive/after/v3-news-en.png) |

Additional final evidence:

- [Arabic desktop homepage](../artifacts/v3/expansive/after/homepage-ar.png), [English mobile homepage](../artifacts/v3/expansive/after/homepage-en-mobile.png).
- [Arabic desktop Approach](../artifacts/v3/expansive/after/approach-menu-ar.png), [Arabic mobile Approach](../artifacts/v3/expansive/after/approach-menu-ar-mobile.png), [English mobile Approach](../artifacts/v3/expansive/after/approach-menu-en-mobile.png).
- [English desktop footer](../artifacts/v3/expansive/after/footer-en.png), [Arabic desktop footer](../artifacts/v3/expansive/after/footer-ar.png), [English mobile footer](../artifacts/v3/expansive/after/footer-en-mobile.png), [Arabic mobile footer](../artifacts/v3/expansive/after/footer-ar-mobile.png).
- [Interaction recording](../artifacts/v3/expansive/after/desktop-interactions.webm): both languages, menus, scrolling, film controls, moving/dragged gallery and footer.
- The [after directory](../artifacts/v3/expansive/after/) also contains per-section captures and Company, Governance and Login menus in both languages.

## Files changed in this revision

Existing source components updated:

- `src/contracting/site/v3/CenteredNavigation.tsx`
- `src/contracting/site/v3/MegaMenuCard.tsx`
- `src/contracting/site/v3/HomeSections.tsx`
- `src/contracting/site/v3/FeaturedProjects.tsx`
- `src/contracting/site/v3/CinematicHero.tsx`
- `src/contracting/site/v3/content.ts`
- `src/contracting/site/v3/V3Preview.tsx`

New source files:

- `src/contracting/site/v3/ApproachMegaMenu.tsx`
- `src/contracting/site/v3/CorporateFooter.tsx`
- `src/contracting/site/v3/ProcessFilm.tsx`
- `src/contracting/site/v3/upgradeContent.ts`
- `src/contracting/site/v3/expansive.css`

Validation, capture and documentation:

- Updated `tests/v3/cinematic.spec.mjs`, `tests/v3/ux.spec.mjs`, `tests/v3/refinement.spec.mjs`, `tests/v3/premium.spec.mjs`, and `tests/v3/publication.spec.mjs`.
- Added `tests/v3/expansive.spec.mjs` and `scripts/verify-v3-expansive.mjs`.
- Updated the footer-logo selector in `scripts/verify-v3-branding.mjs` for the new footer markup.
- Added this report and `docs/media/v3-expansive-sources.json`; linked this revision from `docs/v3-premium-navigation-homepage.md`.
- Added local evidence under `artifacts/v3/expansive/` (source snapshot, before/after captures, browser measurements, interaction recording and build log).

This is the revision's file inventory, not the entire dirty working-tree list. Earlier changes to package files, route files, V2, content adapters, language setup and other source files remain preserved.

## Remaining items

The requested UI implementation is complete. Actual company news, approved statistics, published contact/social settings, governance documents and real portal credentials still require the existing editorial/administrative publication process. They were not fabricated or published by this task. The shared-bundle size warning is unchanged and remains outside this V3 visual revision.

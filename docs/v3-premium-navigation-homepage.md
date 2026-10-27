# V3 navigation, Arabic branding and continuous project gallery

Current revision: 2026-10-25. Review `/contracting/v3?lang=en` and `/contracting/v3?lang=ar`.

Current homepage completion: [3D map, News, Impact and resumed validation](v3-homepage-completion.md). Earlier reports below remain branding/gallery milestone history.

Latest homepage/navigation revision: [V3 premium homepage and navigation upgrade](v3-expansive-homepage.md). Its simplified Company / Approach / Projects / News / More hierarchy and expansive homepage supersede the navigation composition described below. This earlier report remains the logo and gallery audit history.

This report supersedes the earlier left-logo-in-both-languages and static three-card milestone. Earlier captures remain under `artifacts/v3/premium/`; gallery evidence is under `artifacts/v3/loop/`. The completed supplied-logo follow-up has fresh evidence under `artifacts/v3/branding-resumed/`.

## Preservation

Updated the existing implementation on `feature/corporate-v2-homepage`, retaining its substantial pre-existing uncommitted work. The pre-revision V3 files are copied to `artifacts/v3/loop/before/`. No branch checkout, commit, push, merge, deployment, database change, or Brokers repository operation was performed.

The existing architecture, route definitions, single BrowserRouter, Supabase clients/configuration, content adapters, publication rules, roles/RLS, V2 and legacy concepts remain intact. All three cinematic hero videos, their playback/fallback behavior, the fixed architectural background, and unrelated About/homepage work are preserved. No 3D map was added.

## Arabic/English logo follow-up (completed from the interrupted state)

The supplied Arabic artwork is now used for `lang=ar`; the original official English artwork is used for `lang=en`. `branding.ts` switches the actual PNG source for the shared navbar and footer. Arabic stays right-aligned and English left-aligned on desktop and mobile, including while the mobile menu is open. The previous temporary Arabic fallback is removed.

The existing cropped assets were found intact on resume and were not regenerated:

| Language | Original | Cropped navbar file | Crop rectangle (x, y, width, height) |
| --- | --- | --- | --- |
| Arabic | User-supplied `FBS Arabic contracting navbar logo.png`, 2172 x 724, retained unchanged in the user's Downloads directory | `public/contracting/v3/media/fbs-contracting-arabic-navbar.png` | 73, 245, 2025, 255 |
| English | `public/contracting/v3/media/fbs-contracting-official.png`, 400 x 62, retained unchanged | `public/contracting/v3/media/fbs-contracting-english-navbar.png` | 16, 7, 372, 42 |

A fresh read-only pixel audit compared every retained RGBA pixel against its original: zero differences for both marks. Every removed English pixel is fully transparent. The maximum removed Arabic alpha is 1/255; all pixels with alpha greater than 1 are retained, so isolated nearly invisible noise does not create excess canvas. Source and crop SHA-256 hashes match the provenance records in `docs/media/v3-navbar-logos.json`; audit output is `artifacts/v3/branding-resumed/asset-audit.json`. No redraw, mirroring, resampling or artwork distortion was performed.

Both marks use their natural ratios and shared responsive CSS image heights: 24px desktop, 22px at narrower desktop/tablet widths, 18px mobile and 15px on the smallest screens. Their widths differ naturally. The intrinsic width/height attributes and explicit selected-image `aspect-ratio` reserve the right space before decoding. This fixes the delayed-load width jump discovered during resumed validation, when the browser briefly retained the previous logo's intrinsic ratio. Equal outer navbar columns keep the main navigation centered despite different logo widths.

Latest follow-up files (including the interrupted work completed here):

- `src/contracting/site/v3/branding.ts`
- `src/contracting/site/v3/CenteredNavigation.tsx`
- `src/contracting/site/v3/V3Preview.tsx`
- `src/contracting/site/v3/premium.css`
- `public/contracting/v3/media/fbs-contracting-arabic-navbar.png`
- `public/contracting/v3/media/fbs-contracting-english-navbar.png`
- `docs/media/v3-navbar-logos.json`
- `tests/v3/cinematic.spec.mjs`
- `tests/v3/loop.spec.mjs`
- `scripts/verify-v3-branding.mjs`
- `docs/v3-premium-navigation-homepage.md`

Fresh screenshots: `artifacts/v3/branding-resumed/navbar-{en,ar}-{desktop,mobile}.png` and `menu-{en,ar}-{desktop,mobile}.png`. Actual headed Chrome measurements and HTTP asset-response results are in `review.json` in the same directory. Reproduce the review with the local dev server running and `node scripts/verify-v3-branding.mjs`.

Follow-up validation actually run after resuming:

| Check | Result |
| --- | --- |
| `npm run lint` | Passed, no warnings or errors |
| `npm run typecheck` | Passed |
| Focused V3 Playwright run | 24 passed in the final run: language source switching and delayed-load stability at 1440, 1280, 1024, 390 and 320px; both-language navigation geometry from 320 to 1600px; sticky navbar behavior |
| `npm run build` | Passed; existing shared/Mapbox bundle-size warning remains. Log: `artifacts/v3/branding-resumed/build.log` |
| Pixel/source audit | Both original hashes verified; zero changed retained pixels; removed alpha maximum 1 for Arabic and 0 for English |
| Fresh headed Chrome review | Actual EN/AR sources returned HTTP 200; matching heights and natural ratios; zero runtime errors, overflow or menu-induced logo movement; desktop center error under 0.01px |

The delayed-load check holds the Arabic PNG response for 250ms, then compares the reserved image dimensions with the decoded image dimensions, navbar height and vertical scroll position. It passes with the explicit aspect-ratio reservation in place. The resumed run preserved the existing cropped files and did not recrop or regenerate artwork.

Physical device tests, manual screen-reader listening and the unrelated gallery/database test suites were not repeated for this focused logo change. There is no remaining Arabic-artwork dependency or external blocker. No commit, push, merge or deployment was performed.

## Centered navigation

Desktop uses a three-column CSS grid with equal flexible outer columns and a centered intrinsic-width main group. The group is centered relative to the entire navbar, independently of the brand and utility widths. Logo and utilities occupy opposite logical edges; direction follows the active language.

Main groups remain Company, Expertise, Projects, News, Corporate Governance and Connect. The opposite utility group contains unified Login and the language switch. Below 1280px, the main group moves to the mobile/tablet menu to avoid collisions. The mobile menu retains all six groups and Login; the toggle has explicit dimensions throughout the expanded tablet range.

Existing mega-menu introductions, contextual cards, approved routes, active indicators, hover/click/touch handling, keyboard focus management, Escape and outside dismissal are preserved. Login aligns at the utility edge: right in English, left in Arabic; mobile panels remain inside viewport gutters. News-dialog focus restoration uses the same 1280px breakpoint.

Governance and Login availability remain unchanged: the five requested policy documents have not been approved/published in this repository, and careers/supplier/admin authenticated portals do not exist. The interface clearly labels policy and portal availability, links the existing public careers/supplier information separately, and does not fabricate policies, credentials, sessions or authorization. `navigationReadiness.ts` retains the reserved future governance route plan without exposing misleading policy pages.

## Continuous architectural project gallery

The previous static three-card presentation is replaced by large image-led cards with restrained project names, existing location/category metadata and the existing detail action. Card images retain their aspect ratio without stretching. Desktop shows approximately two large cards plus a partial next card; smaller layouts show a large card and a partial continuation.

`useProjectGallery.ts` owns one requestAnimationFrame loop and the measured geometry. It translates the entire track at 48 CSS pixels per second with no per-slide easing or timed advance. The physical cycle includes its final gap. Offset wraps modulo that measured cycle, so the visual continuation is identical at the boundary. Enough visual repeats are rendered to cover the viewport even when the published list contains only a small number of projects. ResizeObserver remeasures card/cycle width; intrinsic image panels reserve space before delivery.

Direction reverses for Arabic: English moves left; Arabic moves right with RTL card order and text alignment. Playback begins only when the gallery enters the viewport. It stops on pointer hover, keyboard focus, active pointer/touch contact, manual Pause, offscreen exit or document visibility loss. The RAF is cancelled while paused and on cleanup. No animation package or other dependency was added.

The visible Play/Pause button has translated accessible labels and state. Arrow buttons and Home/End/direction-aware arrow keys offer manual navigation. Pointer dragging works across the loop boundary; horizontal touch browsing preserves vertical page gestures. Drag release suppresses accidental project activation. Capture loss from an image is distinguished from capture loss by the gallery, and window release/cancel/blur clears abandoned gestures.

Only the original project set has semantic project buttons. Visual repeats are `aria-hidden` and contain no links, buttons or tabindex entries. Pointer activation of a repeat opens the same existing project record and returns focus to its original semantic button. The track has no live announcement stream. Reduced-motion mode renders only one stationary set, disables autoplay, and provides manual scrolling, arrows, keyboard navigation and touch/drag browsing.

Each real project uses one existing `useMediaSource` subscription. Signed URLs and variants are shared across visual repeats; duplication does not create one signing/refresh subscription per copy. The existing approved/published adapter boundary and explicit development-preview notice remain authoritative. Production does not fall back to unapproved development projects.

## Assets and provenance

The user-supplied Arabic logo and two pixel-preserving navbar crops are documented in `docs/media/v3-navbar-logos.json`. No new project, stock image, video, font or generated artwork was introduced. Existing project imagery is delivered through the existing adapters; the three hero MP4s and architectural background retain their manifests in `docs/media/v3-media-provenance.json` and `v3-phase3-derivatives.json`. Development profile projects still require the existing publication approval. A repeated visual card is a repeated view of the same record, not a new project.

## Current files changed

Modified in this revision:

- `src/contracting/site/v3/CenteredNavigation.tsx`
- `src/contracting/site/v3/FeaturedProjects.tsx`
- `src/contracting/site/v3/V3Preview.tsx`
- `src/contracting/site/v3/motion.ts` (remove the superseded per-card rail entrance, which would conflict with track motion)
- `src/contracting/site/v3/premium.css`
- `src/contracting/site/v3/premiumCopy.ts`
- `tests/v3/cinematic.spec.mjs`
- `tests/v3/premium.spec.mjs`
- `tests/v3/ux.spec.mjs`
- `docs/v3-premium-navigation-homepage.md`

Added in this revision:

- `src/contracting/site/v3/branding.ts`
- `src/contracting/site/v3/useProjectGallery.ts`
- `tests/v3/loop.spec.mjs`
- `scripts/verify-v3-loop.mjs`

Other paths shown by Git status predate this revision. Existing `ContractingRoutes.tsx`, Supabase files, V2 sources, hero/video files and package dependencies were not edited.

## Earlier gallery/navigation verification (before the supplied-logo follow-up)

| Check actually run in this revision | Final result |
| --- | --- |
| `npm run lint` | Passed, no errors or warnings |
| `npm run typecheck` | Passed |
| `npm run test:v2` | 6 passed |
| `npm run test:v3` | Full final run: 82 passed in 2.1 minutes |
| `npm run build` | Passed; log saved as `artifacts/v3/loop/production-build.log` |
| `node scripts/verify-v3-loop.mjs` | Passed; fresh headed Chrome screenshots and desktop interaction recording generated |
| Headed Chrome measurements | No runtime errors or horizontal page overflow in either language at desktop/tablet/mobile sizes; desktop main-group centering error below 0.01 CSS pixel; gallery movement and explicit Pause stability confirmed |
| Original hero videos and official logo | All four SHA-256 hashes still match the existing provenance manifest |

The initial browser run exposed a touch capture-transfer issue and a zero-width menu toggle in the newly expanded tablet range. Both were fixed before the final complete passing run. Playback-control tests wait for the existing entrance animation to settle before Playwright's automatic scroll-and-click behavior. The final wrap tests use actual pointer capture and ordinary animation frames, not accelerated browser time.

The browser suite covers English/Arabic desktop, tablet, mobile and boundary widths, full-width nav centering, logical logo placement, dropdown bounds, overflow, keyboard focus, pause/resume, constant-speed motion, wrap continuity/coverage, pointer activation suppression, repeated-card activation, touch input and reduced-motion manual access. A seam test uses a real pointer drag close to the end and then observes normal playback crossing the wrap; it does not claim to have waited through every natural full-duration cycle.

Current screenshots and a short desktop recording are generated by `node scripts/verify-v3-loop.mjs` against the local dev server in actual headed Chrome. The script captures navbar, governance, Login and projects in both languages at 1440px desktop, 1024px tablet and 390px mobile. It records measured nav center error, overflow, motion and explicit pause stability in `artifacts/v3/loop/browser-review.json`.

Evidence paths:

- `artifacts/v3/loop/navbar-{en,ar}-{desktop,tablet,mobile}.png`
- `artifacts/v3/loop/governance-{en,ar}-{desktop,tablet,mobile}.png`
- `artifacts/v3/loop/login-{en,ar}-{desktop,tablet,mobile}.png`
- `artifacts/v3/loop/menu-{en,ar}-{tablet,mobile}.png`
- `artifacts/v3/loop/projects-{en,ar}-{desktop,tablet,mobile}.png`
- `artifacts/v3/loop/projects-{en,ar}-{paused,keyboard}.png`
- `artifacts/v3/loop/project-detail-{en,ar}.png`
- `artifacts/v3/loop/desktop-interactions.webm`
- `artifacts/v3/loop/browser-review.json`

Checks not performed in this revision: physical phone/tablet testing, Safari/Firefox, manual screen-reader listening, real hosted Supabase/Auth/Storage verification, authenticated portal sign-in, real policy publishing, long-duration endurance/performance profiling, or deployment. Document-hidden gating is exercised through automated visibility events. Attempting a real background-tab transition in headed automation did not make `document.hidden` true in this environment, so an actual OS/browser visibility transition is not claimed as verified. The PGlite foundation suite from the previous milestone was not rerun because no database/auth/content foundation code changed.

The existing large-chunk production warning for shared application/Mapbox bundles remains. The existing governance/portal/content approvals remain dependencies; the supplied Arabic artwork is now integrated and verified; local design review requires no additional approval.

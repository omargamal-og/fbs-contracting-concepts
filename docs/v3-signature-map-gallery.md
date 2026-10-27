# V3 signature map and moving project gallery

Latest map-only continuation: [V3 regional world environment handover](v3-world-environment.md), finalized 2026-10-27. It replaces this report's earlier map composition and verification totals; gallery behavior and project routes remain as documented below.

Completed 2026-10-26 on `feature/corporate-v2-homepage`. Review `/contracting/v3?lang=en` and `/contracting/v3?lang=ar`. This revision builds on the [previous visual upgrade](v3-visual-quality-upgrade.md), with changes scoped to the map, gallery and their project-detail navigation.

No commit, push, merge, deployment, CMS publication, database migration or approval change was performed. The pre-existing dirty working tree was preserved. A source checkpoint is under `artifacts/v3/signature/before-source/`.

## What changed

The map now has a blue-toned material, a darker extruded base, photographic city markers, project callouts, a selected-project panel and controllable continuous ambient motion. The gallery keeps moving when the pointer is over its heading, controls or surrounding space; pointer-induced pauses are limited to individual cards. Every original and repeated card now has a real project URL.

### Map presentation

- The existing Natural Earth mesh has a north/south blue material gradient, a subtle physical sheen, dark side faces and light coastline accents. Geographic boundary and city-coordinate files are unchanged.
- Marker heads breathe gently above their fixed city reference positions. An expanding selected-city ring, restrained coastline highlight and fill-light variation provide ongoing ambient motion.
- A single animation scheduler caps ambient drawing at 30fps on wider stages and 20fps on narrower stages. Static variance shadows are cached instead of rebuilt every frame. Camera fly-to transitions retain their smooth finite animation.
- A visible bilingual Play/Pause map-motion control is provided. Ambient motion stops offscreen, in hidden documents, under reduced motion and during manual camera exploration; the stored preference resumes after exploration. Data-saving connections start with ambient motion disabled.
- City pins include an existing project thumbnail and the number of matching records. Hovering a desktop pin updates the floating preview; selecting a city updates the information panel and camera.
- The Deep Blue information panel contains the selected city, explicitly labeled city reference coordinates, a project image, title, publication status and actual details-page link. Previous/next controls browse multiple records within a city.
- Desktop gets a floating image callout. On mobile that duplicate callout is hidden to avoid covering city pins; thumbnail markers and the full project panel remain. The mobile stage was shortened after visual review to reduce empty grid space.
- Existing orbit, zoom, reset, keyboard controls, native touch/pinch, WebGL/context-loss fallback and cleanup remain functional. The text city/project panel is usable without WebGL.

The architectural grid and material colors are presentation details, not new roads, terrain or geographic facts. All pins stay at the verified reference-city X/Z positions. No precise project-site coordinate was invented; only marker-head height changes during ambient motion.

### Project presence and approval boundaries

The existing local portfolio consists of eight company-profile draft records. For local V3 review, the map now uses the same explicitly labeled development preview as the gallery. Its banner, project panel and project page state **publication approval pending** in both languages. City association comes from the source records' existing `region` field, retained as `cityKey`; it is not inferred from a photograph or project name.

The local record counts are four in Riyadh and one each in Jeddah, Madinah, Taif and Tabuk. These counts describe the preview collection, not verified public achievements, offices or construction-site locations.

In production, preview mode is disabled by `import.meta.env.DEV`, the fixture module is removed by Vite, and the map/details pages use only the existing approved published-content adapter. Approved city association continues to come from CMS `city_key`. Direct production URLs cannot expose draft or development projects. No record was approved or published to populate the design.

Existing project imagery is reused throughout. No new photo, video, geographic dataset, dependency or unsupported company claim was added. Source and preservation details are recorded in [v3-signature-map-gallery.json](media/v3-signature-map-gallery.json), referencing the existing geographic and media manifests.

### Gallery behavior and project pages

The root cause of the unwanted stops was section-level pointer handling. Hover state now belongs to each `.v3-project-card`. Heading/control hover does not stop autoplay. Leaving the hovered card resumes the same phase at the existing constant 48px/second rate, without rewinding or snapping.

The hovered/focused card receives image zoom, a richer Deep Blue overlay, an animated inset border, caption movement and a restrained shadow. The hit area stays stable to avoid repeated enter/leave events at card edges.

Each entire card is a React Router link, including image and title, to `/contracting/v3/projects/:slug?lang=en|ar`. Visual repeats have the same working destination, remain hidden from screen readers and have `tabIndex=-1`. There is one keyboard destination per real gallery record. Dragging still suppresses accidental link activation.

The new sibling V3 route is additive; existing V3, V2, legacy and archived route registrations are retained, with no additional BrowserRouter. The V3 project page reuses the existing public content loader, official language-specific navbar and footer. It supports direct URLs, reload, language switching, unavailable records and a link back to the gallery. Images retain their natural aspect ratio, and development records retain the pending-publication notice. News detail dialogs remain available.

Keyboard focus on a card, touch/drag contact, explicit Play/Pause, reduced motion, offscreen and hidden-tab safeguards remain. Thus **pointer hover pauses only on a card**; essential accessibility and visibility pauses are preserved.

## Visual and functional review

Fresh unchanged screenshots were captured before implementation. The first updated pass was reviewed in Chrome, then refined to remove a mobile callout/pin collision, keep card hover boundaries stable, preserve natural project-page image proportions and reduce narrow-screen map whitespace.

One touch test initially targeted a new project marker instead of bare canvas. It was corrected to exercise orbit/pinch on the landmass; city-marker touch still selects the city. Existing modal expectations were updated to assert real route navigation, reload and Back behavior.

The capture script initially measured zero ambient frames in a tall mobile section after the canvas had moved offscreen. It now explicitly brings the canvas itself into view before measuring and before full-page capture. The offscreen pause remains intact; it was not disabled to make recording pass.

Actual final checks:

| Command / audit | Result |
| --- | --- |
| `npm run lint` | Passed |
| `npm run typecheck` | Passed |
| `npm run test:v3` | 111 passed |
| `npm run test:foundation` | 36 passed |
| `npm run test:v2` | 6 passed |
| `npm run build` | Passed; existing large-chunk warnings remain |
| `node scripts/verify-v3-signature.mjs` | Headed Chrome captures and recording completed |
| Hero / logo / geography audit | All hashes match existing manifests |

The suite verifies heading-hover autoplay, card-hover pause/resume, constant-speed seamless wrapping, repeated-link navigation, drag suppression, native touch, keyboard/RTL navigation, reduced motion, direct/reloaded bilingual project pages, approved project media and draft exclusion. Map checks cover project selection/filtering, native touch orbit/pinch, camera controls, explicit ambient pause, capped drawing, offscreen/hidden suspension, fallback and resource cleanup.

Headed review covers English/Arabic 1440px desktop, both languages at 390px mobile, 768px English tablet and 320px Arabic. It records zero horizontal overflow, no broken loaded images and no page errors, verifies card-only hover, project routing, project-preview labels and actual ambient frame progress. Measurements are in [browser-review.json](../artifacts/v3/signature/after/browser-review.json).

The separately loaded Three.js scene remains approximately 606KB / 155KB gzip. No extra animation library was introduced. Physical-device/low-end GPU benchmarking, Safari/Firefox, manual screen-reader listening and hosted Supabase authentication/storage were not tested. Hidden-document tests use simulated visibility events; touch uses Chrome's native input protocol. This is not a live deployment or business-content approval.

## Before / after and recording

| View | Before | After |
| --- | --- | --- |
| Desktop map | [Before](../artifacts/v3/signature/before/v3-map-en.png) | [After](../artifacts/v3/signature/after/map-en-1440.png) |
| Arabic mobile map | [Before](../artifacts/v3/signature/before/v3-map-ar.png) | [After](../artifacts/v3/signature/after/map-ar-390.png) |
| Desktop gallery | [Before](../artifacts/v3/signature/before/v3-projects-en.png) | [After](../artifacts/v3/signature/after/gallery-en-1440.png) |
| Arabic mobile gallery | [Before](../artifacts/v3/signature/before/v3-projects-ar.png) | [After](../artifacts/v3/signature/after/gallery-ar-390.png) |
| English homepage | [Before](../artifacts/v3/signature/before/homepage-en.png) | [After](../artifacts/v3/signature/after/homepage-en-1440.png) |
| Arabic mobile homepage | [Before](../artifacts/v3/signature/before/homepage-ar.png) | [After](../artifacts/v3/signature/after/homepage-ar-390.png) |

Additional evidence: [hovered gallery card](../artifacts/v3/signature/after/gallery-hover-en-1440.png), [selected city/project](../artifacts/v3/signature/after/map-selected-en-1440.png), [English project page](../artifacts/v3/signature/after/project-detail-en-1440.png), [Arabic mobile project page](../artifacts/v3/signature/after/project-detail-ar-390.png), [320px map](../artifacts/v3/signature/after/map-ar-320.png).

[Short actual-browser interaction recording](../artifacts/v3/signature/after/map-gallery-interactions.webm): gallery motion while the pointer is over the heading, card-hover highlight/pause, full-card navigation and Back, map ambient motion, city/project switching, pause/resume, keyboard orbit/zoom/reset, and scrolling through the preserved homepage. Local preview notices remain visible.

Full-page/section stills hide sticky navbar/skip overlays for clean capture, with separate normal navbar screenshots supplied. The actual WebGL canvas is kept visible for Chrome's compositor while saving full-page images. The [after directory](../artifacts/v3/signature/after/) contains all language/viewport captures.

## Exact files changed

Updated implementation:

- `src/contracting/routes/ContractingRoutes.tsx` — additive V3 project-detail route.
- `src/contracting/site/v3/FeaturedProjects.tsx` — card-only pointer hover and complete-card links.
- `src/contracting/site/v3/V3Preview.tsx` — local map preview wiring and scoped stylesheet.
- `src/contracting/site/v3/developmentProjects.ts` — retain actual source `region` as `cityKey`.
- `src/contracting/site/v3/premiumCopy.ts` — accurate bilingual gallery help.
- `src/contracting/site/v3/map/createSaudiScene.ts` — material, capped ambient scheduler, marker/ripple motion and cached shadows.
- `src/contracting/site/v3/map/SaudiProjectMap.tsx` — image markers, callout, project panel/switcher, ambient control and explicit preview boundary.
- `src/contracting/site/v3/map/copy.ts` — bilingual project-review and motion controls.

Added implementation:

- `src/contracting/site/v3/ProjectDetails.tsx`
- `src/contracting/site/v3/projectNavigation.ts`
- `src/contracting/site/v3/signature.css`

Validation and documentation:

- Added `tests/v3/signature.spec.mjs` and `scripts/verify-v3-signature.mjs`.
- Updated `tests/v3/completion.spec.mjs`, `loop.spec.mjs`, `premium.spec.mjs`, `publication.spec.mjs`, `refinement.spec.mjs` and `ux.spec.mjs` for the requested route/hover/ambient contracts.
- Added this report and `docs/media/v3-signature-map-gallery.json`; linked this revision from the previous visual report.
- Added source checkpoint, before captures, first-pass review, final screenshots/recording/measurements and build log under `artifacts/v3/signature/`.

The existing gallery loop hook, hero media bytes/timing, logo files, geographic files, other homepage sections, Supabase setup, V2 and FBS Brokers were not changed. No new runtime dependency was added.

## Remaining review

The visual result and motion treatment are ready for user review. The map and gallery's local portfolio still needs editorial approval before becoming a public portfolio; preview status was not promoted. Confirmed site coordinates remain unavailable, so pins continue to represent cities. Production content publication, CMS/dashboard work and authentication portals remain separate milestones.

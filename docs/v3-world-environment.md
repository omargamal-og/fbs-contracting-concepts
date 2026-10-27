# V3 regional world environment — final handover

Latest visual replacement: [V3 architectural geographic diorama](v3-diorama-art-direction.md), completed 2026-10-27. The report below describes the earlier regional-world checkpoint.

Completed review date: 2026-10-27. Local routes: `/contracting/v3?lang=en` and `/contracting/v3?lang=ar`. This continues the [signature map and gallery](v3-signature-map-gallery.md) in place. No commit, push, merge, deployment, CMS publication or database migration was performed.

## Starting state and resumed work

The interrupted implementation already contained the 17-country regional context, procedural water, atmospheric fog, idle camera drift, lighter project panel, geographic legend and scene-relative overlay wrapper. The water surface had already been enlarged from 120 to 600 units and the camera far plane from 150 to 500. Those saved changes were retained. The earlier 121-test result belongs to that earlier state and is not the final verification result below.

The resumed session confirmed the extended water removes the straight surface boundary previously visible at 768px. No further water or geographic geometry change was necessary. Fresh screenshots show a continuous surface fading softly into the existing Air Blue atmosphere.

Native pointer checks at the old low-angle/far-zoom limits exposed severe foreshortening and colliding city names. Camera distance is now bounded to 12–32 units and polar angle to 0.18–0.9 radians, retaining the original azimuth range. Zoom buttons share the native OrbitControls distance limits. The default camera and city fly-to positions are unchanged from the saved world implementation.

City cards adapt to the actual canvas width, including a narrow tablet stage beside its information panel. If projected names would still overlap, lower-priority labels become small clickable photographic beacons at their original projected city position. The selected city remains expanded. Full names remain in the bilingual city index and native hover titles; clicking a condensed beacon still selects its city. Natural label measurements are cached and refreshed for width/text/font changes, rather than measured on every ambient frame.

The interrupted edit to `scripts/verify-v3-world.mjs` was still needed: its unused `DOMMatrixReadOnly` and `getComputedStyle` declarations caused two ESLint errors. The previous tool output was a **usage-limit failure in automatic approval review**, not a safety rejection or an explicit requirement for more user authorization. The resumed session retried through the normal reviewed tool path and the edit succeeded. No approval check was bypassed. The script was then extended for the requested 1024px views, camera ranges, fallback, full homepage captures and fresh recording. Its range helper was corrected to focus the canvas before sending Escape; the application's deliberate keyboard focus guard remains intact.

## Scene composition and continuous motion

- Saudi Arabia retains the approved existing national geometry, blue material, dark extruded sides, coastline strokes and project-city beacons.
- Seventeen complete neighboring country geometries use the same pinned Natural Earth source and projection. Light land, fine outlines, sea color, restrained sheen, soft shadows and distance fog give the country a regional setting. There is no distracting floor grid.
- The 600×600-unit water plane is two triangles; enlarging it adds no mesh subdivisions. Slow shader ripples and a broad highlight create surface movement without new image assets or dependencies.
- An integrated white information panel shows the selected city, city reference coordinates, project image, title, approval status and working details link. The desktop floating preview and toolbar are anchored to the canvas wrapper; help and attribution sit outside it. Mobile hides the duplicate floating card and retains the full project panel.
- Idle motion uses the existing single scheduler: sinusoidal camera yaw of ±0.014 radians and pitch of ±0.004 radians, marker breathing, selected-city ripple, coastline and fill-light variation. It does not rotate the geographic coordinates or invent project-site locations.
- Ambient rendering is capped at 30fps on wider stages and 20fps on stages narrower than 768px. Static shadows remain cached. Motion pauses offscreen, in hidden tabs, under reduced motion, on explicit Pause and during manual exploration. Data-saving connections start paused. Resuming captures the current camera pose rather than jumping to a separate orbit.
- City selection, fly-to, native touch orbit/pinch, keyboard orbit/zoom/reset/Escape, project switching and route navigation, WebGL failure/context-loss fallback and disposal remain in place.

The context is generalized cartography, not a terrain survey, elevation model, bathymetry or an FBS operations footprint. Regional land uses an illustrative shallow extrusion. City points remain reference-city coordinates, not construction sites. DEV-only project previews remain labeled publication approval pending; production still requires approved published CMS records.

Source, geometry hashes, presentation limits and motion parameters: [v3-world-environment.json](media/v3-world-environment.json). All 17 geometries compare exactly with the locally preserved pinned source. Existing Saudi boundary, city coordinates, three hero videos and two navbar crops retain their recorded hashes. Audit: `artifacts/v3/world/preservation-audit.json`.

## Exact files changed across this world upgrade

The initial source checkpoint is `artifacts/v3/world/before-source/v3/`. Existing unrelated dirty files, routes, Supabase configuration, V2, archived concepts and project source records were preserved.

| File | Change | Resumed session |
| --- | --- | --- |
| `src/contracting/site/v3/geography/regional-context.json` | New extracted regional geographic context | Retained unchanged |
| `src/contracting/site/v3/map/worldEnvironment.ts` | New regional land, coastlines and procedural water | Retained enlarged surface unchanged |
| `src/contracting/site/v3/map/createSaudiScene.ts` | World integration, atmosphere, idle camera | Refined camera bounds and label collision handling |
| `src/contracting/site/v3/map/SaudiProjectMap.tsx` | Scene wrapper, legend and city/project relation | Added localized marker titles |
| `src/contracting/site/v3/map/copy.ts` | Bilingual legend and city/project text | Retained unchanged |
| `src/contracting/site/v3/map/world.css` | New light integrated composition and responsive overlays | Added stage-width card sizing and condensed beacons |
| `src/contracting/site/v3/V3Preview.tsx` | Import scoped world stylesheet | Retained unchanged |
| `tests/v3/world.spec.mjs` | Geographic, responsive and ambient regression checks | Added 1024px and far/low camera label checks |
| `scripts/verify-v3-world.mjs` | Actual Chrome screenshots and interaction recording | Lint cleanup, expanded capture matrix and range/fallback/full-page captures |
| `docs/media/v3-world-environment.json` | Source and implementation audit | Updated final camera/label information |
| `docs/v3-world-environment.md` | This handover | Added |
| `docs/v3-signature-map-gallery.md` | Link to latest map handover | Added link only |

## Fresh review artifacts

Before images were captured from the unchanged scene before the world implementation on 2026-10-26. Final images were captured from the completed state on 2026-10-27 in actual Chrome. All paths are repository-relative. Sticky navigation is hidden only during section/full-page screenshot capture so it does not cover content; screenshots are not retouched.

| Review | Before | Final |
| --- | --- | --- |
| English desktop | [Before](../artifacts/v3/world/before/map-en.png) | [1440px](../artifacts/v3/world/final/map-en-1440.png) |
| Arabic desktop | — | [1440px](../artifacts/v3/world/final/map-ar-1440.png) |
| English tablet | — | [768px](../artifacts/v3/world/final/map-en-768.png), [1024px](../artifacts/v3/world/final/map-en-1024.png) |
| Arabic tablet | — | [768px](../artifacts/v3/world/final/map-ar-768.png), [1024px](../artifacts/v3/world/final/map-ar-1024.png) |
| English mobile | — | [390px](../artifacts/v3/world/final/map-en-390.png), [320px](../artifacts/v3/world/final/map-en-320.png) |
| Arabic mobile | [Before, 390px](../artifacts/v3/world/before/map-ar.png) | [390px](../artifacts/v3/world/final/map-ar-390.png), [320px](../artifacts/v3/world/final/map-ar-320.png) |
| Selected Jeddah/project | — | [English](../artifacts/v3/world/final/selected-en-1440.png), [Arabic](../artifacts/v3/world/final/selected-ar-1440.png) |
| Full homepage | — | [English](../artifacts/v3/world/final/homepage-en-1440.png), [Arabic](../artifacts/v3/world/final/homepage-ar-1440.png) |
| WebGL fallback | — | [Arabic mobile](../artifacts/v3/world/final/fallback-ar-390.png) |

Camera range evidence uses `artifacts/v3/world/final/range-{far-low,near-overhead,left,right}-{en,ar}-{768,1024}.png`. The pre-fix low-angle view is retained at `artifacts/v3/world/resume-range/low-angle-far-768.png`.

Recording: [map-interactions.webm](../artifacts/v3/world/final/map-interactions.webm), **19.84 seconds at 1440×1100**, showing idle water/beacon/camera motion, city selection and project switching, native pointer orbit, keyboard zoom/reset and Pause/Play. Playback metadata and frames at 5s/14s were inspected. Project detail navigation was checked separately in every capture context and in the V3 tests. Machine-readable capture results: [browser-review.json](../artifacts/v3/world/final/browser-review.json), [media-review.json](../artifacts/v3/world/final/media-review.json), [recording-review.json](../artifacts/v3/world/final/recording-review.json).

## Final executed checks

All commands below were executed during the resumed session against the final application code. The final capture-script-only cleanup was linted again; no application code changed after the final full suite/build.

| Command / check | Actual result |
| --- | --- |
| `npm run lint` | Passed, including the corrected verification script |
| `npm run typecheck` | Passed |
| `npm run test:v3` | **129 passed**, 3.5 minutes, no skipped tests |
| `npm run test:foundation` | **36 passed** |
| `npm run test:v2` | **6 passed** |
| `npm run build` | Passed; large-chunk warning remains |
| `node scripts/verify-v3-world.mjs` | Ten headed Chrome review contexts completed; English/Arabic at 1440, 1024, 768, 390 and 320px; zero runtime/console errors, broken map images or horizontal overflow in the normal contexts |
| `node scripts/verify-v3-world.mjs --media-only` | Regenerated the focused map recording and Arabic WebGL fallback screenshot, waiting for the lazy project image before capture |
| Native range captures | Both languages at 768/1024px: far/low, near/overhead, left/right azimuth limits; inspected actual rendered screenshots |
| Geographic source audit | All 17 extracted geometries exactly match the pinned local source; source SHA-256 matches manifest |
| Preservation audit | Seven recorded hashes match: three hero videos, two navbar crops, Saudi boundary and city data |
| `git diff --check` | Passed; pre-existing CRLF conversion notices remain |

The V3 suite includes native CDP touch orbit and pinch zoom, keyboard/reset/Escape, city selection, condensed-beacon selection, real project details routes, bilingual responsive overlays, reduced-motion static rendering, explicit Pause/Play, offscreen and hidden-tab suspension, simulated WebGL failure/context loss, cleanup, gallery/navigation regressions and production approval boundaries. The new far/low tests check that expanded city names do not collide at 320/390/768px in either language.

Visual review caught two capture issues without changing application safeguards: Escape needed focus on the canvas, and a full-section fallback capture needed to scroll its lazy image into view first. Both verification paths were corrected and executed again. No layout jump was observed after the canvas loaded in the reviewed contexts; an instrumented cumulative-layout-shift score was not collected.

The lazy scene build is 675.99 kB minified / 178.71 kB gzip. Existing shared and Mapbox chunks also exceed Vite's warning threshold. This warning does not prevent the production build.

## Practical limitations

This review uses local Chrome on Windows, including Chrome DevTools native touch/pinch emulation. It does not constitute testing on physical phones, Safari, Firefox, screen-reader software or a deployed CMS. Production approval behavior is covered with controlled fixtures, not a live publication action. No new production content was approved to populate the scene.

This is a bounded regional showcase. Close zoom intentionally crops geography to permit inspection; reset restores the complete country view. Distant regional boundaries follow the source's generalized administrative polygons, not a global seamless terrain model. Adaptive labels can change form as camera positions become crowded, while the city index and selected project remain available.

The production build continues to warn about large chunks, including the lazy Three.js scene and existing shared/Mapbox chunks. The scene remains loaded near its section; no new animation dependency or map-service token was added.

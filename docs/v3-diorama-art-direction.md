# V3 architectural geographic diorama

Completed 2026-10-27. Review `/contracting/v3?lang=en` and `/contracting/v3?lang=ar`. This is the map-only art-direction overhaul following the user's actual screenshot/video review; the [earlier world handover](v3-world-environment.md) remains a historical checkpoint.

No commit, push, merge, deployment, content publication, migration or dependency installation was performed. Routes, Supabase, V2, archived concepts, navbar, logos, hero and project gallery code were preserved. Existing unrelated working-tree changes were retained.

## Art direction

The large blue slab is replaced by a pale mineral architectural model above a distinct blue sea. The land has actual sculpted geometry, smooth normals, subtle grain/strata and a thin, softly colored beveled edge. Base depth is 0.18 units, reduced from 0.9; the side material is pale blue/gray rather than near-black. Light contextual land and coastline strokes frame the Red Sea and Arabian Gulf, with unobtrusive bilingual sea labels and soft atmospheric distance.

The relief is **stylized, not elevation data**. Its deterministic folds are an illustrative material/shape treatment within the original national outline. Three uniform shared-edge subdivisions add surface detail without T-junction gaps. Original geographic source files and city X/Z coordinates are unchanged. No satellite imagery, DEM, fabricated roads, routes or exact construction coordinates were added.

Each reference city now has lightweight real 3D architecture: an abstract stone/glass building group, shallow plinth, light stem and animated ring. These are consistent city symbols, **not models of actual FBS buildings or development footprints**. A visible localized scene note says that relief and architectural models are illustrative and locations are city-level references.

The full-width scene dominates. A single floating project panel replaces both the conventional tall sidebar and the duplicate floating preview. It contains the selected city, existing project image, title, approval status, project switcher and a clear View Project Details action. Compact city tabs select the same scene state. Reduced titles/legends/instructions and shorter introductory copy remove the previous dashboard density. City reference coordinates remain available to assistive technology.

On narrower stages, the panel becomes a compact image/text composition below the map. This uses the actual container width, so 1024px tablets do not accidentally receive a desktop overlay that covers the country. Arabic moves the panel and framing reserve to the opposite side without mirroring geography. Project imagery retains its existing aspect-preserving rendering and source assets.

## Camera and motion

The new controlled oblique home position is `[2.5,23,23]`, aimed at `[-0.7,0.25,-0.5]`. Wide stages reserve space for the floating panel through a language-aware view offset. Responsive field of view keeps the complete Saudi silhouette visible on narrow screens. Distance is constrained to 30.5–37 units, polar angle to 0.55–0.92 radians and azimuth to −0.32–0.45 radians. City focus emphasizes the target by 8%, retaining the whole-country composition instead of flying into a cropped close-up.

One coordinated ambient loop drives camera yaw (±0.06 radians), pitch (±0.016 radians), slow water/reflection movement, breathing city light stems, ripple propagation and light variation. Selected-project imagery reveals with a restrained layered transition. There is no uncontrolled spin or automatic project/city change.

Manual input suspends camera drift. After four seconds without input, the existing scheduler resumes from the current pose with a fresh drift anchor. Finish Exploring also resumes the stored preference. Explicit Pause, reduced motion, offscreen and hidden-tab conditions continue to stop ambient drawing. The inactivity timer is a single wake-up timer, not another animation loop, and is disposed with the scene.

## Actual visual review passes

1. **Before:** captured the unchanged implementation at English/Arabic 1440×1100 and 390×844, reset to Riyadh with reduced motion. Source checkpoint: `artifacts/v3/diorama/before-source/map/`.
2. **Pass 1:** reviewed mineral land, thin base, real city models, full-width environment and one panel. Screenshots exposed relief cracks from adaptive subdivision and an eastern crop on mobile. Evidence: `artifacts/v3/diorama/pass-1/`.
3. **Pass 2:** replaced adaptive tessellation with uniform shared-edge subdivision, hid the redundant flat cap, widened mobile framing and softened water highlights. Evidence: `artifacts/v3/diorama/pass-2/`.
4. **Final:** reviewed both languages across five widths, default/selected states, camera limits, reduced motion, WebGL fallback and the two separate recordings. Reduced mesh density and batched context geometry after timing tests exposed initialization contention. Final screenshots and videos are under `artifacts/v3/diorama/final/`.

These reviews used actual Chrome renderings. Passing tests was not treated as a visual-quality verdict. One exploratory shadow diagnostic was retained in pass 2; it is not a final screenshot and did not change the shipped scene.

## Before/after and final artifacts

Paths are repository-relative. `viewport-*` images are fixed-size captures suitable for dimension-matched comparison. `section-*` images include the entire redesigned section, whose height naturally differs from the previous layout. Both comparisons use the same language, selected city and reset/reduced-motion state.

| Artifact | Path |
| --- | --- |
| English before, **1440×1100** | [viewport-en-1440.png](../artifacts/v3/diorama/before/viewport-en-1440.png) |
| English final default, **1440×1100** | [viewport-en-1440.png](../artifacts/v3/diorama/final/viewport-en-1440.png) |
| After with baseline camera position/target replay, **1440×1100** | [matched-baseline-pose-en-1440.png](../artifacts/v3/diorama/final/matched-baseline-pose-en-1440.png) |
| Arabic before, **1440×1100** | [viewport-ar-1440.png](../artifacts/v3/diorama/before/viewport-ar-1440.png) |
| Arabic final default, **1440×1100** | [viewport-ar-1440.png](../artifacts/v3/diorama/final/viewport-ar-1440.png) |
| English final complete section | [section-en-1440.png](../artifacts/v3/diorama/final/section-en-1440.png) |
| Arabic final complete section | [section-ar-1440.png](../artifacts/v3/diorama/final/section-ar-1440.png) |
| English mobile before / after, **390×844** | [Before](../artifacts/v3/diorama/before/viewport-en-390.png), [after](../artifacts/v3/diorama/final/viewport-en-390.png) |
| Arabic mobile before / after, **390×844** | [Before](../artifacts/v3/diorama/before/viewport-ar-390.png), [after](../artifacts/v3/diorama/final/viewport-ar-390.png) |
| Final Arabic mobile complete section | [section-ar-390.png](../artifacts/v3/diorama/final/section-ar-390.png) |
| Final English tablet | [1024px](../artifacts/v3/diorama/final/section-en-1024.png), [768px](../artifacts/v3/diorama/final/section-en-768.png) |
| Selected Jeddah and project | [English](../artifacts/v3/diorama/final/selected-en-1440.png), [Arabic](../artifacts/v3/diorama/final/selected-ar-1440.png) |
| Arabic WebGL fallback | [fallback-ar-390.png](../artifacts/v3/diorama/final/fallback-ar-390.png) |
| **Continuous idle, no user input — 16.00 seconds** | [idle-continuous-16s.webm](../artifacts/v3/diorama/final/idle-continuous-16s.webm) |
| **Separate city/project/control interactions — 14.04 seconds** | [interactions.webm](../artifacts/v3/diorama/final/interactions.webm) |

The matched-baseline-pose artifact replays the old camera position `[5.5,20.5,19.5]` and target `[-0.7,0.35,-0.5]` in a review-only browser module response override. No application camera preset or source file is modified by that replay. The new full-width canvas has a different aspect/layout; this is a pose comparison, not a claim that every pixel has identical projection. The final default screenshots and both videos use the unmodified application and its intentionally redesigned camera.

Additional final files follow these patterns:

- `viewport-{en,ar}-{1440,1024,768,390,320}.png`
- `section-{en,ar}-{1440,1024,768,390,320}.png`
- `selected-{en,ar}-{1440,1024,768,390,320}.png`
- `range-{left,right,near,far}-{en,ar}-{1440,390}.png`

The idle recording is a continuous tail of a steady-state Chrome recording: only initial loading/positioning was trimmed with the existing Playwright-bundled FFmpeg. There are no cuts, time scaling or input events during its 16-second interval. Raw recording and second-by-second bounds/render counts are retained in [idle-raw.webm](../artifacts/v3/diorama/final/idle-raw.webm) and [idle-samples.json](../artifacts/v3/diorama/final/idle-samples.json). Video metadata and frames at 1/8/15 seconds were inspected: [video-review.json](../artifacts/v3/diorama/final/video-review.json).

## Performance and preservation

The initial detailed mesh rendered approximately 253,340 triangles in 191 calls. Three shared-edge subdivision passes and batching all contextual land/coastlines reduced the final scene to **90,592 triangles / 96 calls**. Recorded setup was **53.5–99.2ms** on this Windows review machine. This is scene construction timing, not total network or shader compilation time.

The cap remains 30fps on wide stages and 20fps on smaller stages. Actual review samples recorded **21–27 frames per 1.2 seconds** (approximately 17.5–22.5fps), not a promise of sustained 30fps. Shadows are cached; pixel ratio is capped at 1.5. Modules preload near the section, while WebGL and mesh construction wait until the canvas is visible. Expensive rendering stops offscreen/hidden. No new animation package, raster asset, map service or token was introduced.

The lazy scene chunk builds to **684.64kB minified / 182.56kB gzip**. Vite still warns about chunks exceeding 500kB, including existing shared and Mapbox chunks.

Preservation audit: [preservation-audit.json](../artifacts/v3/diorama/preservation-audit.json). All three hero videos, two language logo crops, Saudi boundary, city-coordinate file and regional-context hash match their recorded values. Source/presentation manifest: [v3-diorama-art-direction.json](media/v3-diorama-art-direction.json).

Draft safeguards remain unchanged: local previews are labeled pending publication; production uses only the existing approved published-content adapter. No project was approved to fill the design, and no exact project-site coordinate was inferred.

## Exact files changed in this request

| File | Change |
| --- | --- |
| `src/contracting/site/v3/map/dioramaLand.ts` | New mineral relief geometry, shared-edge subdivision and thin beveled base |
| `src/contracting/site/v3/map/cityArchitecture.ts` | New illustrative city meshes and ring/light animation |
| `src/contracting/site/v3/map/worldEnvironment.ts` | Distinct water, contextual land material and merged land/coastline geometry |
| `src/contracting/site/v3/map/createSaudiScene.ts` | Integrate diorama, controlled framing, stronger drift, four-second inactivity resume and diagnostic bounds/performance counters |
| `src/contracting/site/v3/map/SaudiProjectMap.tsx` | One project panel, compact city navigation, scene notes/sea labels, remove duplicate preview, defer construction until visible |
| `src/contracting/site/v3/map/copy.ts` | Bilingual concise scene copy and explicit illustrative-model notice |
| `src/contracting/site/v3/map/world.css` | Full-width composition, floating panel, compact responsive panel and refined city labels |
| `tests/v3/world.spec.mjs` | Updated one-panel assertions; added complete-country camera-limit and graceful-resume regressions |
| `tests/v3/signature.spec.mjs` | Assert one actual project preview and absence of the removed duplicate |
| `scripts/verify-v3-diorama.mjs` | New fixed-viewport captures, range review, separate idle/interaction recordings and baseline-pose replay |
| `docs/media/v3-diorama-art-direction.json` | New presentation, motion, performance and preservation manifest |
| `docs/v3-diorama-art-direction.md` | This handover |
| `docs/v3-world-environment.md` | Link to latest art-direction handover only |

## Executed validation

| Command / review | Actual result |
| --- | --- |
| `npm run lint` | Passed |
| `npm run typecheck` | Passed |
| `npm run test:v3` | **136 passed**, final full run, 3.5 minutes |
| `npm run test:foundation` | **36 passed** |
| `npm run test:v2` | **6 passed** |
| `npm run build` | Passed; large-chunk warning remains |
| `node scripts/verify-v3-diorama.mjs` | Passed; ten English/Arabic viewport contexts, separate recordings and fallback capture |
| `node scripts/verify-v3-diorama.mjs --comparison-only` | Passed; baseline camera-pose replay |
| Browser review | No normal-context runtime/console errors, broken project images or horizontal page overflow |
| `git diff --check` | Passed; pre-existing CRLF notices remain |

Tests cover native touch/pinch, orbit/zoom/reset/Escape, project selection/detail routes, Arabic/English behavior, responsive overlay bounds, whole-country framing through allowed controls, manual-inactivity resume, explicit Pause, reduced motion, offscreen/hidden-tab gating, WebGL failure/context loss, cleanup, approval boundaries and existing gallery/navbar/hero regressions.

Intermediate runs are not hidden: an initial focused run had 37 passes and one gallery timing failure; the first full run had 134 passes and two gallery timing failures. Geometry reduction, batched context draws and visible-only construction were implemented before the final passing full run. Timing assertions were not weakened and gallery implementation was not edited. The first idle-video trim used an unavailable encoder name; it was corrected to the VP9 encoder supplied by Playwright and both videos were regenerated successfully.

## Remaining limits

The scene is a deliberately stylized regional architectural model. It is not a satellite map, accurate terrain survey or depiction of actual buildings. Context remains generalized Natural Earth administrative geometry; no global terrain coverage is claimed. Zoom is intentionally restrained to keep the full Saudi silhouette useful, rather than permitting cropped close-ups.

Testing used local Chrome on Windows and DevTools native touch emulation. Physical phones, Safari, Firefox, assistive-technology software and a deployed/live CMS were not tested. Production-content checks used fixtures, without publishing anything. Performance figures are local observations. Visual design remains a reviewable judgment, supported by the supplied actual images and separate recordings rather than inferred from passing tests.

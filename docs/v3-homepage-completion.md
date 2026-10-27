# V3 homepage completion and resumed stabilization

Latest visual revision: [V3 major visual quality upgrade](v3-visual-quality-upgrade.md). It includes the requested development-only preview of the seven stored draft figures; production approval rules below remain intact. This report documents the preceding functional milestone.

Completed 2026-10-25. Review `/contracting/v3?lang=en` and `/contracting/v3?lang=ar`. This report supersedes the [previous homepage revision](v3-expansive-homepage.md) for the map, News and Impact behavior. The earlier visual design, branding and gallery work remains preserved.

No commit, push, merge, deployment, database change or publication was performed. Work stayed on `feature/corporate-v2-homepage`, preserving the existing dirty working tree. V2, archived concepts, the FBS Brokers project, Supabase architecture, existing routes and the single router were not modified for this milestone. The pre-milestone V3 source is preserved under `artifacts/v3/completion/before-source/v3/`.

## Resumed state and work completed

At the resume instruction, the working tree already contained a functioning initial Three.js map, Natural Earth boundaries/city coordinates, city selection and camera controls, localized CTA improvements, a compact News fallback, and a nonnumeric Impact narrative. The first full run had 98 of 99 V3 tests passing, with one compact-news height failure and one test-only ESLint global declaration to correct.

The resumed work completed narrow-screen News sizing, mobile map touch targets, style precedence, bounded camera controls, city-label framing, hidden/offscreen and idle rendering behavior, resource cleanup, and map discoverability from the Projects menu. It added native touch/pinch, hidden-document, context-loss, unmount, approved-project filter and future-news-layout coverage. All applicable checks were then executed successfully, followed by fresh headed-Chrome captures and this handover.

## Final homepage narrative

1. Cinematic hero: all three original files and 4.8-second sequencing preserved.
2. Our Impact: immediately below the hero; approved counters or a nonnumeric capability narrative.
3. Who We Are: existing expansive company composition.
4. Architectural image reveal.
5. Expertise / Approach: existing service tabs and selective film.
6. Featured Projects: existing continuous gallery and publication behavior.
7. Interactive Saudi Arabia 3D map and synchronized city/project panel.
8. Second architectural image reveal.
9. Sustainability / responsibility.
10. News & Updates: approved editorial stories or compact official-LinkedIn destination.
11. Contact / Careers / Suppliers CTA.
12. Corporate footer.

Impact stays directly below the hero to retain the established narrative and approval-safe layout. The map naturally follows Projects. No working section was broadly redesigned. Official language-specific logo sources, centered navbar and mega menus, full-width layouts, licensed imagery, continuous gallery motion, and fixed background system remain intact. Remaining service, sustainability and closing CTA links now explicitly retain the selected language.

## Functional 3D map

`SaudiProjectMap` is a reusable feature taking a language, project records and a project-open callback. Its React interface and synchronized text panel remain usable independently of the renderer. Three.js and its geometry module load only as the map approaches the viewport.

The renderer constructs actual extruded meshes from Saudi Arabia's polygon rings, including islands and holes where present. It adds side faces, edge geometry, lighting and a receiving shadow plane. Extrusion is illustrative depth, not terrain elevation. This is real WebGL geometry, not an SVG or screenshot imitation. No Mapbox token, map tiles, external runtime geographic request or hosted service is required.

The map supports:

- Smooth finite entrance and city fly-to transitions; immediate changes under reduced motion.
- Five verified city references: Riyadh, Jeddah, Madinah, Taif and Tabuk, with English/Arabic labels.
- Selecting a projected map pin or its accessible city-list button updates the same panel.
- Orbit, zoom and reset controls with constrained pitch, azimuth and distance.
- Explicit Explore/Finish interaction mode so ordinary page scrolling is preserved; drag to orbit and two-finger pinch to zoom when enabled.
- Keyboard arrows, +/−, 0 to reset, and Escape to finish. Visible buttons offer equivalent camera controls.
- A synchronized project list and category filter only when approved city-associated data supports it. Project details use the existing modal.
- A compact text-based city/project fallback on missing WebGL, lazy module failure or context loss.

Only approved published project records are passed to the map. City association uses the actual CMS `city_key`, retained by the V3 content loader after calling the existing Supabase adapter. It is never guessed from names, imagery, or unverified site coordinates. Pins always use reference-city coordinates and are explicitly labeled as city-level, not construction-site locations or FBS offices. No unpublished project is used as map evidence.

There are currently no approved local map projects. Each city therefore provides a truthful availability message, with no invented project, project count, category filter or company-footprint claim. Automated production tests verify the populated panel, category filtering, signed approved image delivery and details using explicitly synthetic approved fixtures; these tests do not publish business content.

The pre-existing development-only project gallery still has its conspicuous publication-approval-pending label. Those records are excluded from the map, and Vite removes the development fixture module from the production build. The gallery capture demonstrates this labeled local preview, not approved production portfolio evidence.

## Geographic source and license

Source: [Natural Earth](https://www.naturalearthdata.com/about/), maintained by its cartographic contributors. Its [terms of use](https://www.naturalearthdata.com/about/terms-of-use/) place the vector and raster datasets in the public domain, allowing commercial use and modification. The interface includes a courtesy source credit.

- Boundary: `ne_50m_admin_0_countries.geojson`, Saudi `ADM0_A3=SAU` geometry at 1:50m scale.
- City references: `ne_10m_populated_places_simple.geojson`, the five matching Saudi features at 1:10m scale.
- Repository revision: `ca96624a56bd078437bca8184e78163e5039ad19` in `nvkelso/natural-earth-vector`.
- Coordinate projection: local equirectangular, longitude scaled by cos(25°), latitude mapped north-up before camera orbit. Coordinate pairs retain upstream precision.
- The boundary geometry and all five city coordinate pairs were programmatically compared with the pinned upstream files: exact matches.
- The boundary is generalized cartographic geography, not a cadastral or legal boundary survey. City points are reference locations, not geocoded FBS sites.

The complete source URLs, extracted-file hashes and raw-source hashes are in [v3-saudi-geography.json](media/v3-saudi-geography.json). Raw audit copies remain under `artifacts/v3/completion/geography-source/`; only approximately 10KB of extracted boundary/city data is used by the application.

## News and Impact publication status

News continues through the existing approved-content Supabase adapter. With approved articles, the layout accommodates one lead story and up to three supporting records, images when supplied, dates when verified, excerpts, details, original LinkedIn-post links and a clear LinkedIn CTA. Responsive layouts and image transitions are ready without another structural redesign.

No approved articles were available locally. The actual homepage therefore shows a compact bilingual destination to the user-provided [official FBS Contracting LinkedIn page](https://www.linkedin.com/company/fbs-contracting/), with an explicit statement that no website articles are currently published. No news, date, post URL or photograph was fabricated. The publicly accessible profile could not provide reliably verified individual article content for import; no unsupported scraping was used. No live LinkedIn integration exists or is claimed. Future stories require manual approved CMS publication.

Impact uses the existing approved project-lifecycle capabilities as a nonnumeric narrative: planning, construction, and maintenance/operations with existing values and environmental responsibility. The numeric placeholder is gone. Approved statistics with reporting dates can still render animated counters, compact value suffixes, units and reference dates; reduced motion uses final values. Invalid values/divisors are excluded. Public numeric rendering still depends on the adapter's published/approved checks and reporting date, not on local fixtures.

These exact existing draft figures remain **unapproved and hidden**:

| Draft record | Value requiring approval | Current state |
| --- | --- | --- |
| `project-value` | SAR 1.2 billion+ | draft / unreviewed; no reference date |
| `residential-projects` | 15 | draft / unreviewed; no reference date |
| `residential-units` | 3,000+ | draft / unreviewed; no reference date |
| `built-up-area` | 800,000 m²+ | draft / unreviewed; no reference date |
| `commercial-projects` | 30+ | draft / unreviewed; no reference date |
| `concrete-works` | 200,000 m³+ | draft / unreviewed; no reference date |
| `employees` | 2,000+ | draft / unreviewed; no reference date |

These are recorded here for editorial review, not asserted as verified company achievements. Publishing requires evidence, bilingual review and approval through the existing publication boundary. None was promoted or assigned a fabricated date.

## Performance and lifecycle

The Three.js scene renders on demand: controls changes, resize, finite camera transitions and visibility return. There is no continuous idle orbit or render loop. Camera frames are canceled when offscreen/hidden and resume from the current pose when visible. Tests confirm a stable render count while idle and offscreen, and during a simulated hidden-document state.

The map caps pixel ratio at 1.5, uses a small extruded dataset and 1024px shadow map, and avoids textures, tiles and additional animation packages. Cleanup disconnects intersection/resize observers, disposes OrbitControls, cancels pending frames, removes visibility/context listeners, disposes geometry/materials/shadow resources and releases the WebGL renderer/context. The existing hero, gallery, selective film and ambient-motion suspension remain in place.

Production build sizes: the separately loaded `createSaudiScene` chunk is 598.53KB / 152.85KB gzip; the V3 component chunk is 82.68KB / 25KB gzip. Three.js is deferred until near the map. Vite warns about the new scene chunk above its 500KB threshold and the pre-existing large shared/Mapbox chunks. The build succeeds; no unrelated chunking or V2 map changes were made.

## Validation actually run

| Check | Final result |
| --- | --- |
| `npm run lint` | Passed, including new capture script |
| `npm run typecheck` | Passed |
| `npm run test:v3` | 101 passed, 2.4 minutes |
| `npm run test:foundation` | 36 passed, including PGlite SQL/RLS and publication regressions |
| `npm run test:v2` | 6 passed |
| `npm run build` | Passed; chunk warnings described above |
| `node scripts/verify-v3-completion.mjs` | Headed Chrome capture/review passed |
| Geography comparison | Exact source geometry and all five city coordinate pairs match |
| Asset hash audit | All three original hero video hashes and both cropped logo hashes match prior manifests |

The browser suite exercises actual WebGL rendering, bilingual city selection, keyboard camera controls/reset, reduced-motion immediate changes, native CDP touch orbit/pinch, no touch-induced page jump, context loss, WebGL unavailable fallback, simulated hidden-document pause/resume, offscreen/idle rendering, route-unmount cleanup, CMS `city_key` association, approved project filtering, draft exclusion, signed project imagery, category selection, news layout and statistics gates. Existing hero, menus, logo/source proportions, gallery loop/touch/pause, RTL, reduced-motion and route/scroll tests also pass.

The separate headed review captured English and Arabic at 1440px desktop, 768px tablet and 390px mobile. Each had a ready nonblank 3D scene and working city selection, zero horizontal overflow, no overlapping sections, no missing loaded images and no page errors. It verified gallery autoplay and stable initial scroll. Additional automated checks include 320px and 1024px layouts. Final map, selected-city, fallback, News, Impact and full-homepage screenshots were visually reviewed. See [browser-review.json](../artifacts/v3/completion/final/browser-review.json).

Not performed: physical-device or low-end GPU benchmarking, Safari/Firefox, manual screen-reader listening, real OS tab-background lifecycle, hosted Supabase authentication/storage or a live LinkedIn integration. Document visibility was simulated in tests; touch was dispatched through Chrome's real touch input protocol. Hosted data/auth behavior is covered by mock content APIs and local PGlite policy tests, not a live deployment.

## Screenshots and recording

| View | English | Arabic |
| --- | --- | --- |
| Full desktop homepage | [1440px](../artifacts/v3/completion/final/homepage-en-1440.png) | [1440px](../artifacts/v3/completion/final/homepage-ar-1440.png) |
| Full mobile homepage | [390px](../artifacts/v3/completion/final/homepage-en-390.png) | [390px](../artifacts/v3/completion/final/homepage-ar-390.png) |
| Full tablet homepage | [768px](../artifacts/v3/completion/final/homepage-en-768.png) | [768px](../artifacts/v3/completion/final/homepage-ar-768.png) |
| Desktop 3D map | [English](../artifacts/v3/completion/final/map-en-1440.png) | [Arabic](../artifacts/v3/completion/final/map-ar-1440.png) |
| Selected city | [English](../artifacts/v3/completion/final/map-selected-en-1440.png) | [Arabic](../artifacts/v3/completion/final/map-selected-ar-1440.png) |
| Mobile 3D map | [English](../artifacts/v3/completion/final/map-en-390.png) | [Arabic](../artifacts/v3/completion/final/map-ar-390.png) |
| News | [English](../artifacts/v3/completion/final/v3-news-en-1440.png) | [Arabic](../artifacts/v3/completion/final/v3-news-ar-1440.png) |
| Impact | [English](../artifacts/v3/completion/final/v3-impact-en-1440.png) | [Arabic](../artifacts/v3/completion/final/v3-impact-ar-1440.png) |

[WebGL fallback](../artifacts/v3/completion/final/map-webgl-fallback.png). [Actual browser interaction recording](../artifacts/v3/completion/final/homepage-map-interactions.webm): scrolling from the hero through Impact/Expertise/Projects, gallery autoplay, map city selection/fly-to/orbit/zoom/reset and project availability panel, News and closing/footer. The recording uses the explicitly labeled local development gallery; the map never treats those records as approved. Full-page capture keeps the on-demand WebGL section visible to Chrome's compositor; sticky navigation/skip overlays are hidden in section/full-page stills, with separate normal navbar captures supplied.

## Exact files added or changed for this milestone

Updated source:

- `src/contracting/site/v3/CenteredNavigation.tsx` — Projects menu map anchor.
- `src/contracting/site/v3/HomeSections.tsx` — Impact narrative/counters, compact/editorial News and localized CTAs.
- `src/contracting/site/v3/V3Preview.tsx` — map integration and scoped styles.
- `src/contracting/site/v3/useHomepageContent.ts` — retain published CMS city keys after the existing adapter.

Added source:

- `src/contracting/site/v3/completionCopy.ts`
- `src/contracting/site/v3/completion.css`
- `src/contracting/site/v3/geography/saudi-boundary.json`
- `src/contracting/site/v3/geography/saudi-cities.json`
- `src/contracting/site/v3/map/SaudiProjectMap.tsx`
- `src/contracting/site/v3/map/createSaudiScene.ts`
- `src/contracting/site/v3/map/model.ts`
- `src/contracting/site/v3/map/copy.ts`
- `src/contracting/site/v3/map/map.css`

Dependencies, tests, evidence and documentation:

- `package.json`, `package-lock.json` — add `three@0.186.1` and `@types/three@0.186.0`; preserve earlier dependency/script work.
- Added `tests/v3/completion.spec.mjs`; updated `tests/v3/publication.spec.mjs` and `tests/v3/refinement.spec.mjs` for complete content states and publication/3D coverage.
- Added `scripts/verify-v3-completion.mjs` and `docs/media/v3-saudi-geography.json`.
- Added this report; linked it from `docs/v3-expansive-homepage.md` and `docs/v3-premium-navigation-homepage.md`.
- Added local source snapshot, raw geographic audit files, development review stills, final captures/recording, browser review and build log under `artifacts/v3/completion/`.

This inventory is scoped to this milestone. The much larger pre-existing dirty working tree remains intact. Logo source/crop files, hero video bytes, V2 source, route definitions, migrations and seeds were not changed by this milestone.

## Remaining business and product work

The homepage interaction foundation is complete. Real portfolio publication still requires approval of the existing eight draft project records and imagery, with correct CMS city keys. News, the seven draft figures, current contact/social settings and governance documents require editorial evidence and publication. City pins remain geographic context until that data exists; no company projects or figures were fabricated to fill the interface.

Separate product work remains for the full CMS dashboard/editorial workflow, authenticated administration/HR/procurement portals, and detailed internal-page revisions. Those were not implemented in this milestone. A real authorized LinkedIn integration is optional separate work; the manual CMS news path already works.

Recommended next milestone: approve and publish the initial bilingual content batch, then begin the requested section-by-section visual refinements using this stable homepage foundation. Physical-device/performance and assistive-technology review should accompany release readiness.

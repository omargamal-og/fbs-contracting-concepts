# V3 cinematic design core — implementation 1

Preview: **/contracting/v3?lang=en** and **/contracting/v3?lang=ar**. Run npm run dev. This is a separate visual-direction milestone, with light demonstration content rather than a complete new homepage. V2, the current build, selector, concepts, application foundation, and company-profile content are preserved. There is one BrowserRouter. No commit, push, merge, database write, or deployment was performed.

## Visual implementation

- The seven interface colors were checked against FBS_Brand_Colors_Digital.pdf in the supplied local reference material: Deep Blue #082F4D, Sky Blue #649ABD, Steel Gray #A1B4BF, Light Blue #B9DAF2, Mist Gray #DAE4EA, White #FFFFFF, and Air Blue #EEF4F6. The rendered reference is available locally in artifacts/v3/brand-1.png. Content sections are predominantly translucent white and Air Blue. Natural colors in licensed photography/video are retained.
- The authentic FBS Contracting mark is extracted from the top-right logo on page 3 of FBS Contracting-Profile 2027 -EN- .pdf. It is an image asset, not text or a redrawn logo. The same image receives a white CSS color filter over the video. Exact source hash and extraction bounds are recorded in the provenance file. No separate official SVG was found.
- The logo is centered independently of left/right link widths, including RTL. The navbar transitions from transparent over the footage to translucent white with subtle blur on scroll. Full-width white mega menus support desktop hover/click, keyboard movement, focus trapping/restoration, Escape, inert background, and mobile groups. A short hover suppression prevents the menu reopening when a language change moves links under the pointer.
- Three local real MP4 clips play in sequence with 1.1-second opacity crossfades, automatic advancement before each clip ends, wraparound, previous/next, 01/02/03 selection, progress indication, and pause/resume. They are muted, inline, audio-free, and pause offscreen or in a hidden tab. Autoplay rejection leaves the poster and a user-triggered play option.
- At widths below 768px, with reduced motion, or when the browser reports data saving, the hero creates no video elements and uses manually selectable still posters. This is an intentional mobile/performance alternative, clearly labeled as a still view. Tablets and desktop retain actual videos unless another alternative applies.
- The rest of the page uses **one independent fixed image element** with a light wash, under a separate scrolling content layer inside an isolated stacking context. Two open image-reveal windows expose the same crane photograph, framed by light company/expertise/connect sections. There are no section-specific background image duplicates and no persistent background video. A 900px mobile image replaces the 2000px desktop image. GSAP adjusts opacity and adds a small desktop-only caption parallax; reduced motion keeps a static image composition.
- Existing company-profile-derived bilingual copy supplies the headline, short description, introduction, services, and project-category description. No statistics, projects, certifications, achievements, map, or application workflows were added in this milestone. V3 is a static visual preview rather than a new CMS publication path.

## Exact media paths and licenses

All served assets are in public/contracting/v3/media/ (browser URL prefix /contracting/v3/media/):

| File | Source / creator | Web derivative |
| --- | --- | --- |
| hero-01-high-rise.mp4 | [Pexels 35672598](https://www.pexels.com/video/aerial-view-of-high-rise-construction-site-35672598/) — HONG SON | 10 seconds from source offset 1s; 2,919,906 bytes |
| hero-02-engineers.mp4 | [Pexels 8964377](https://www.pexels.com/video/engineer-talking-to-a-construction-worker-8964377/) — Mikael Blomkvist | 8 seconds from source start; 1,798,366 bytes |
| hero-03-excavator.mp4 | [Pexels 29704052](https://www.pexels.com/video/aerial-view-of-excavator-at-construction-site-29704052/) — 8 K | 10 seconds from source offset 8s; 4,449,451 bytes |
| hero-01-poster.jpg | Frame 2s of optimized first clip | 1600×900 JPEG poster |
| hero-02-poster.jpg | Frame 2s of optimized second clip | 1600×900 JPEG poster |
| hero-03-poster.jpg | Frame 2s of optimized third clip | 1600×900 JPEG poster |
| construction-background.webp | [Pexels 12567101](https://www.pexels.com/photo/clear-sky-over-construction-crane-12567101/) — Robert So | 2000px wide; 160,432 bytes; separate persistent photograph |
| construction-background-mobile.webp | Same independent photograph | 900px wide; 30,518 bytes |
| fbs-contracting-official.png | Official FBS Contracting company profile, page 3 | 400×62 transparent logo extraction; 5,094 bytes |

The Pexels asset pages and [Pexels License](https://www.pexels.com/license/) were inspected on 22 October 2026. Website use and modification are permitted; attribution is optional. No endorsement is implied, people are not portrayed offensively, and these assets are not offered as standalone stock downloads. The hero explicitly states that the footage is stock and does not show FBS projects. The separate background is labeled as temporary stock photography with creator credit. These are licensed preview media, not newly approved FBS project records.

The machine-readable [media provenance record](media/v3-media-provenance.json) contains exact download URLs, source/derivative SHA-256 values, file sizes, encoding/probe details, trim ranges, official PDF hashes, and logo extraction bounds. Full source downloads and temporary processing tools remain ignored in artifacts/v3/. They are not shipped as application tooling or added to package-lock.json.

All video derivatives use 1600×900 H.264 High, 24fps, yuv420p, CRF 25, fast-start MP4, and no audio. Combined footage is 9.17 MB, down from approximately 206 MB of downloaded 4K sources. FFmpeg commands used -ss at the stated source offset, -t for duration, -vf scale=1600:-2,fps=24, -c:v libx264 -preset fast -crf 25 -profile:v high -pix_fmt yuv420p -an -movflags +faststart. Posters are extracted at 2 seconds. No external HTML pages are embedded or hotlinked for playback.

## Verification

| Command | Result |
| --- | --- |
| npm run typecheck | Passed |
| npm run lint | Passed |
| npm run test:foundation | 36 passed |
| npm run test:v2 | 6 passed |
| npm run content:seed:check | Passed; existing seed untouched |
| npm run test:ui | 17 V2/regression browser checks passed |
| npm run test:v3 | 14 V3 browser checks passed |
| npm run build | Passed; existing large application/Mapbox bundle warnings remain |

V3 browser checks use installed Chrome and the real local licensed media. They verify decoded video dimensions, currentTime progression, absence of media errors, actual automatic 01→02→03→01 playback, previous/next, pause/resume, CSS transitions, exact logo centering, transparent/white navbar states, keyboard menus, language URL/reload behavior, fixed-layer identity and position, both image reveals, offscreen suspension, reduced-motion requests, and widths 1440/768/390/320 in English/Arabic. No external Supabase or Mapbox credentials are required. This milestone makes no backend requests.

Visual inspection includes the three actual video scenes, English/Arabic hero, centered logo, white scrolled navbar, mega menu, the two persistent-image moments, and mobile posters. No horizontal overflow was observed at the checked widths. Local review artifacts are ignored:

- [Hero scene 01](../artifacts/v3/review-scene-01.png), [scene 02](../artifacts/v3/review-scene-02.png), [scene 03](../artifacts/v3/review-scene-03.png).
- [Arabic desktop hero](../artifacts/v3/review-hero-ar.png), [Arabic mobile](../artifacts/v3/hero-390-ar.png), [English mobile](../artifacts/v3/hero-390-en.png), [tablet](../artifacts/v3/hero-768-en.png).
- [First persistent image reveal / white navbar](../artifacts/v3/review-v3-image-reveal-one.png), [second persistent image reveal](../artifacts/v3/review-v3-image-reveal-two.png).
- [Mega navigation](../artifacts/v3/review-mega-menu.png).
- [Actual playback and scroll recording](../artifacts/v3/review-recording.webm), [MP4 recording](../artifacts/v3/review-recording.mp4).

This is visual implementation verification in Chrome, not company visual acceptance or a complete cross-browser/accessibility certification. Safari/iOS testing with the actual target devices remains a later validation step. The original Vite dependency audit finding reported during Phase 2 remains outside this milestone. No asset-download or fixed-background blocker remains.

## File changes in this milestone

Created:

- src/contracting/site/v3/V3Preview.tsx
- src/contracting/site/v3/CenteredNavigation.tsx
- src/contracting/site/v3/CinematicHero.tsx
- src/contracting/site/v3/content.ts
- src/contracting/site/v3/icons.tsx
- src/contracting/site/v3/styles.css
- public/contracting/v3/media/ — the nine exact assets listed above
- tests/v3/cinematic.spec.mjs
- playwright.v3.config.mjs
- docs/media/v3-media-provenance.json
- docs/v3-cinematic-design-core.md

Modified:

- src/contracting/routes/ContractingRoutes.tsx — lazy V3 route only, in addition to the already pending V2 route.
- package.json — test:v3 script; no new application dependencies.
- .gitignore — local V3 processing/download/review artifacts.
- README.md — V3 preview and report links.

The initial dirty Git state was preserved. Existing V2 source/tests, Phase 1 SQL/content changes, routes, assets, and prior reports were not discarded. Temporary PDF/video processors were installed only below ignored artifacts/v3/tools; the small Playwright recorder runtime was prepared in its browser cache. Existing GSAP, React, routing, language provider, and translation modules were reused.

After this visual direction is approved, subsequent work can replace the temporary media with company-approved footage/photography, integrate approved content through the existing foundation, and build the remaining homepage sections and 3D map. None of those later features is claimed as part of implementation 1.

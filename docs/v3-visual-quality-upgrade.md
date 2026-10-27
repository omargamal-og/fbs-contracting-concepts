# V3 major visual quality upgrade

Latest map/gallery revision (2026-10-26): [Signature map, continuous card-only hover behavior and real project pages](v3-signature-map-gallery.md). It adds explicitly labeled local project previews to the map; production publication rules remain unchanged.

Completed 2026-10-25 at `/contracting/v3?lang=en` and `/contracting/v3?lang=ar`. This revision follows the [homepage completion milestone](v3-homepage-completion.md). It changes visual composition and the explicitly requested local draft-statistic review; the existing architecture and interaction foundation remain in place.

## Visual audit and iteration

Fresh unchanged Chrome captures were taken before editing, in English/Arabic desktop, mobile and tablet layouts. They are under [visual/before](../artifacts/v3/visual/before/); the pre-revision V3 source is under `artifacts/v3/visual/before-source/v3/`.

The audit found these specific weaknesses:

- The map looked like a thin gray paper cutout. Its silhouette occupied a relatively small part of the stage, side edges were crude, city controls resembled form buttons, and the surrounding space dominated the composition.
- About repeated the hero's aerial frame; Sustainability repeated it again. The sections lacked distinct photographic identities.
- Large reveal windows created quiet gaps around small floating captions.
- Projects used repetitive rounded photographs with inset white information boxes, giving the rail a conventional card appearance.
- Impact had no visible figures in the review and a comparatively weak typographic hierarchy.
- News was almost entirely text, while the closing CTA looked like another generic pale block.

The first implementation was captured and visually reviewed under [iteration-1](../artifacts/v3/visual/iteration-1/). That review caught a clipped eastern map edge on mobile and a collapsed desktop News image caused by an indefinite percentage height. Both were corrected. [Iteration-2](../artifacts/v3/visual/iteration-2/) records the corrected silhouette, brighter ground plane and restored News photograph. The final pass reviewed full-page output and refreshed the captures after waiting for counters to reach their final values.

The stationary gallery also received a real interaction fix: mandatory Chrome scroll snapping could undo manual navigation with the new card dimensions. The reduced-motion rail now allows free manual scrolling, preserving arrow and keyboard navigation. The seamless animated gallery engine was not replaced.

## Design changes

| Area | Final treatment |
| --- | --- |
| 3D map | Larger default camera composition, deeper beveled landmass, fine coastline strokes, matte physical surface, bright Air Blue ground, subtle architectural grid, soft variance shadows and a restrained fill light |
| Map markers and UI | Slender stems, small spherical heads and ground rings; finite selection pulse; compact SVG controls and tooltips; numbered city index; editorial city panel with explicitly labeled reference coordinates |
| About | New licensed low-angle construction photograph paired with an Air Blue text area, stronger headline, fine architectural rule and readable text width |
| Expertise | Cleaner service index, less boxed active state, framed film/image panel and an unboxed story/CTA baseline |
| Projects | Medium photographic folios with minimal metadata, proportional covering, restrained Deep Blue readability gradient, white titles, edge-to-edge framing and subtle hover depth |
| Impact | Large figures, fine dividers, balanced four-plus-three desktop rhythm, two-column mobile layout, staggered counters and a visible review notice |
| Sustainability | Bright architectural material-detail image, distinct from the hero and About; clean editorial text/vision treatment |
| News fallback | Licensed architectural image and a clear official LinkedIn destination, explicitly distinct from a real news article |
| Closing CTA | Construction image strip, clear contact story and separate Careers/Suppliers rows within a broad composition |
| Typography and spacing | Local system-font hierarchy, lighter large English headings, readable body widths, shorter reveal windows and fewer repeated rounded boxes |

The map remains genuine Three.js geometry based on the existing Natural Earth rings. The source boundary/city files and attribution are unchanged. Extrusion, bevel and grid are architectural presentation details, not terrain or survey information. Reference-city coordinates are still separate from construction sites; the panel never treats them as exact project locations.

Camera field of view now adapts to the stage aspect ratio, including 320px layouts. Selection/fly-to, constrained orbit and zoom, reset, native touch/pinch, keyboard navigation, reduced motion, context-loss handling and the text fallback remain functional. Rendering is still on demand; no infinite WebGL loop was added. The CSS marker pulse is finite and disabled under reduced motion.

The three hero files, 4.8-second timing, official logo source switching/proportions/positioning, centered navbar, Approach/Governance/Login navigation, fixed architectural background, Supabase setup, router, V2 and legacy routes remain intact. No dependency was added in this revision. FBS colors are used for the new interface treatment; natural image/material shading remains, along with the previously requested existing social-platform hover colors.

## Seven draft figures: exact source and status

The user explicitly authorized showing the existing figures during **local V3 visual review**. They are extracted from the stored `supabase/seed.sql` statistic rows and their bilingual `content_translations` labels. Their existing lineage is `HeroStatistics.tsx` and the original `hero-projects.jpg` artwork. No number or missing label was invented; all seven records had valid values and both language labels.

| Stored record | Raw stored value | Unit / qualifier | Review presentation |
| --- | --- | --- | --- |
| Project value | 1,200,000,000 | SAR / plus | 1.2B+ |
| Residential projects | 15 | exact | 15 |
| Residential units | 3,000 | plus | 3,000+ |
| Built-up area | 800,000 | m² / plus | 800k+ |
| Commercial projects | 30 | plus | 30+ |
| Concrete works | 200,000 | m³ / plus | 200k+ |
| Employees | 2,000 | plus | 2,000+ |

The visible English note is **“Preliminary figures — subject to confirmation”**. Arabic is **“أرقام مبدئية — خاضعة للتأكيد”**. Labels and scale suffixes are localized. Static full values remain accessible to assistive technology while the visible counters animate. Counter motion pauses offscreen or when the document is hidden, and reduced motion shows final values immediately.

`scripts/generate-v3-review-statistics.mjs` produces the development-only snapshot and has a `--check` mode comparing it to the current stored seed. The loader imports it only behind `import.meta.env.DEV`, using a separate `reviewStatistics` property. It does not populate the approved statistics collection or request private drafts through the public API. Approved published statistics still take precedence when available.

All seven SQL records remain **draft / unreviewed**, with null reporting dates. No seed, database policy, publication state or approval was changed. Production tests confirm that the development fixture module and review UI are absent from the production build; production still shows approved dated figures or the existing nonnumeric narrative. Review figures are below the hero, never inside it.

Exact source hash and extraction details are in [v3-visual-upgrade.json](media/v3-visual-upgrade.json). Seed SHA-256 remains `17945b203499566d0c96e4e3a27e6ea2df3cf218deb2a4293d391b32fec74d19`.

## Imagery, news and project limitations

Two optimized stills were added, both inspected and covered by the [Pexels License](https://www.pexels.com/license/):

- [Mathias Reding — concrete building frame](https://www.pexels.com/photo/facade-of-unfinished-concrete-building-at-construction-site-7108782/): `construction-perspective.webp`, 1600×2400, 471,874 bytes, used for About and the closing composition.
- [Scott Webb — architectural facade detail](https://www.pexels.com/photo/white-concrete-building-305814/): `architectural-detail.webp`, 1600×900, 122,114 bytes, used for Sustainability and the News destination.

They use proportional CSS cropping and visible illustrative-stock labels. They are not represented as FBS projects, company news photographs or evidence of delivered work. Source URLs, license references, dimensions and hashes are recorded in [the media manifest](media/v3-visual-upgrade.json). Existing source imagery, logos, videos and geographic files were preserved.

The official [LinkedIn destination](https://www.linkedin.com/company/fbs-contracting/) is unchanged. No approved website news was available locally; no article, date, post or automatic synchronization was invented. The CMS-approved lead/supporting news composition and source links still work when published records exist.

Project imagery and records are unchanged. The existing local gallery remains visibly labeled as a company-profile preview awaiting publication approval. The map excludes those draft projects and shows only published approved city-associated records. With no such records locally, its city-reference information and truthful availability note remain complete and usable.

## Actual verification

| Check | Result |
| --- | --- |
| `npm run lint` | Passed |
| `npm run typecheck` | Passed |
| `node scripts/generate-v3-review-statistics.mjs --check` | Passed; seven exact stored values and bilingual labels |
| `npm run test:v3` | 106 passed, 2.6 minutes |
| `npm run test:foundation` | 36 passed |
| `npm run test:v2` | 6 passed |
| `npm run build` | Passed |
| `node scripts/verify-v3-visual.mjs` | Headed Chrome review and recording passed |
| Preservation hash audit | All three hero videos, both cropped logos and geographic data files match their prior manifests |

Browser review covers English and Arabic desktop (1440px), tablet (768px), mobile (390px), plus 320px Arabic. The capture verifies map rendering/selection, gallery autoplay, seven raw review values, stable initial scroll, image loading, section separation and page overflow. Final measurements and page-error results are in [browser-review.json](../artifacts/v3/visual/after/browser-review.json).

The automated suite also verifies language-specific logo placement/source/aspect ratio, centered navigation and menus, hero decoding/sequencing, continuous gallery loop/pause/drag/native touch/keyboard, manual reduced-motion navigation, map touch/pinch and camera controls, WebGL/context-loss fallback, offscreen/hidden map suspension, counter offscreen suspension, no page jumps, localized CTA links and production approval boundaries. New visual tests check real image dimensions, source labels, draft values and production exclusion, rather than claiming that test success proves visual quality.

The production scene chunk is 604.48KB / 154.22KB gzip, still lazy loaded near the map. Vite continues to warn about chunks above 500KB, including the scene and existing shared/Mapbox chunks. The build passes. This revision adds about 594KB of reused/cacheable still-image payload and no new video or runtime package.

Not performed: physical-device/low-end GPU benchmarking, Safari/Firefox, manual screen-reader listening, hosted Supabase authentication/storage or live LinkedIn integration. Hidden-document behavior is simulated in Chrome tests; touch uses Chrome's native input protocol. No production deployment was made.

## Before / after evidence

| View | Before | After |
| --- | --- | --- |
| English desktop homepage | [Before](../artifacts/v3/visual/before/homepage-en-1440.png) | [After](../artifacts/v3/visual/after/homepage-en-1440.png) |
| Arabic desktop homepage | [Before](../artifacts/v3/visual/before/homepage-ar-1440.png) | [After](../artifacts/v3/visual/after/homepage-ar-1440.png) |
| English mobile homepage | [Before](../artifacts/v3/visual/before/homepage-en-390.png) | [After](../artifacts/v3/visual/after/homepage-en-390.png) |
| Arabic mobile homepage | [Before](../artifacts/v3/visual/before/homepage-ar-390.png) | [After](../artifacts/v3/visual/after/homepage-ar-390.png) |
| Default desktop map | [Before](../artifacts/v3/visual/before/map-en-1440.png) | [After](../artifacts/v3/visual/after/map-en-1440.png) |
| Arabic mobile map | [Before](../artifacts/v3/visual/before/map-ar-390.png) | [After](../artifacts/v3/visual/after/map-ar-390.png) |
| English gallery | [Before](../artifacts/v3/visual/before/v3-projects-en-1440.png) | [After](../artifacts/v3/visual/after/v3-projects-en-1440.png) |
| Impact | [Before](../artifacts/v3/visual/before/v3-impact-en-1440.png) | [After](../artifacts/v3/visual/after/v3-impact-en-1440.png) |
| News | [Before](../artifacts/v3/visual/before/v3-news-en-1440.png) | [After](../artifacts/v3/visual/after/v3-news-en-1440.png) |

Additional final views: [selected city](../artifacts/v3/visual/after/map-selected-en-1440.png), [Arabic desktop map](../artifacts/v3/visual/after/map-ar-1440.png), [Arabic mobile gallery](../artifacts/v3/visual/after/v3-projects-ar-390.png), [WebGL fallback](../artifacts/v3/visual/after/map-webgl-fallback.png). All section and tablet captures are in the [after directory](../artifacts/v3/visual/after/).

[New actual-browser interaction recording](../artifacts/v3/visual/after/homepage-map-interactions.webm): hero scrolling, local preliminary Impact figures, gallery autoplay, map selection/fly-to/orbit/zoom/reset, News and closing/footer. It uses the explicitly labeled local review content. Full-page screenshots keep WebGL in view for Chrome's compositor and hide sticky navbar/skip overlays; separate unmodified navbar captures are included. Captures wait for counters to settle before saving final figures.

## Files changed in this revision

Updated source:

- `src/contracting/site/v3/HomeSections.tsx`
- `src/contracting/site/v3/V3Preview.tsx`
- `src/contracting/site/v3/useHomepageContent.ts`
- `src/contracting/site/v3/map/createSaudiScene.ts`
- `src/contracting/site/v3/map/SaudiProjectMap.tsx`
- `src/contracting/site/v3/map/copy.ts`

Added source/assets:

- `src/contracting/site/v3/visual.css`
- `src/contracting/site/v3/ImpactFigures.tsx`
- `src/contracting/site/v3/reviewStatistics.development.ts`
- `public/contracting/v3/media/construction-perspective.webp`
- `public/contracting/v3/media/architectural-detail.webp`

Validation and documentation:

- Added `scripts/generate-v3-review-statistics.mjs`, `scripts/verify-v3-visual.mjs`, and `tests/v3/visual.spec.mjs`.
- Updated `tests/v3/completion.spec.mjs`, `tests/v3/refinement.spec.mjs` and `tests/v3/publication.spec.mjs` for the authorized review state, new image composition and counter markup.
- Added `docs/media/v3-visual-upgrade.json` and this report; linked it from `docs/v3-homepage-completion.md` and `docs/v3-expansive-homepage.md`.
- Added baseline/source snapshot, both visual iterations, final screenshots/recording/measurements and build log under `artifacts/v3/visual/`.

This is the revision's inventory, not the entire dirty working tree. Existing package-file, route, V2, foundation and unrelated changes were preserved. No commit, push, merge, deployment, CMS update or destructive Git command was performed.

## Remaining review

The visual direction is ready for user review, especially the larger architectural map, serif figures, project gradients and image choices. These are aesthetic decisions, not business approvals. The seven figures remain preliminary; publishing them requires the established evidence, reporting dates and approval workflow. Actual project/news publication, governance documents, CMS dashboard and authentication portals remain separate editorial/product work.

The map is a generalized national model, not surveyed terrain. Low-end physical-device performance and assistive-technology review remain release-readiness checks. No remaining implementation blocker was found for this visual milestone.

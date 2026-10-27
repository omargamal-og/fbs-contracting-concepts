# Corporate V2 homepage — implementation and review

Implemented on feature/corporate-v2-homepage for review at **/contracting/v2**. The existing selector at /contracting, /contracting/build, archived A/B/C concepts, original project details, assets, and company-profile content remain available. There is still one BrowserRouter. No database migrations, production data writes, commits, pushes, merges, or deployments were performed in Phase 2.

## Preview

Run npm run dev, then open http://localhost:5173/contracting/v2?lang=en or http://localhost:5173/contracting/v2?lang=ar. The V2 language choice persists locally; an explicit lang query chooses the initial language. Internal project/news routes are /contracting/v2/projects/:slug and /contracting/v2/news/:slug. Supporting corporate pages and careers/suppliers/contact CTAs link to the existing /contracting/build pages, whose existing layout and language behavior are preserved.

In development, unavailable/unconfigured content uses a separately imported, explicitly labeled presentation module based only on existing repository content. Its eight projects have no map coordinates and are not marked published. The three existing artwork statistics carry both the global approval-pending banner and a local statistics notice. No video or news story is fabricated.

Production builds remove that fixture module. Missing, draft, unapproved, unavailable, or incomplete public content produces the neutral editorial shell and appropriate empty states. A backend outage offers retry, with an eight-second deadline to bound SDK retries. The old routes still contain their existing static content; this boundary applies to the new V2 experience.

## Delivered sections

| Section | Implemented behavior | Content condition |
| --- | --- | --- |
| Cinematic hero | Full viewport, animated headline, dark overlays, primary CTA, multiple ordered films/stills, CSS crossfades, pause/mute/selection controls, responsive media and focal points | Published hero_media + released media; architectural still in labeled local preview, abstract brand fallback in empty production |
| Our impact | Compact statistics below the hero, animated numbers and accessible static values | Approved, published statistics with reference dates; explicitly pending figures only in development |
| Who we are | Large editorial typography, project imagery, company introduction | Approved bilingual page section; existing content in labeled preview |
| Expertise | Keyboard-operated vertical tabs, changing visual/story, GSAP transitions | Published services and capabilities section |
| Featured projects | One expansive project image followed by an offset visual pair; working V2 detail pages and galleries | Approved projects and released project_media |
| Project map | Deferred Mapbox GL JS, 3D perspective, markers, selection, camera movement, linked details, accessible project list | Verified, evidenced coordinates + approved projects + public token; completed non-geographic selection shell otherwise |
| News & insights | Headline, image, date, excerpt, article details, optional original LinkedIn URL | Published news only; designed editorial empty state |
| Sustainability & vision | Two substantial editorial columns with distinct visual treatments | Approved bilingual sustainability and vision2030 sections |
| Connect | Large contact CTA, careers and supplier links | Existing supporting routes; no new application submission workflow |
| Footer | Corporate wordmark, navigation, back-to-top, conditional published contact/social links | Site settings; no invented contact information |

The full-screen navigation uses Company / Expertise / Projects / News / Connect, grouped links and editorial imagery. Desktop hover/click and arrow-key behavior, mobile groups, Escape, focus trapping/restoration, scroll locking, and background inert behavior are included. Navigation and sections support RTL.

The shared fixed background sits inside an isolated stacking context with explicit layers. GSAP contexts own staggered headline reveals, section entrances, image masks, desktop parallax, counters, menu opening, and expertise transitions. Animations clean up on language/route changes. Normal scrolling is preserved; this page does not require a pinned sequence. Reduced motion uses static content/posters and immediate camera changes. Video pauses offscreen and when the tab is hidden. Deferred media has lazy loading and viewport-based delivery. Map library and styles load only when the section is near view and credentials/coordinates permit a map.

## Content and media contract

V2 calls the existing Phase 1 getPublicHomepage, getPublicContent, and adapters from the content/controller layer. Visual sections receive presentation models and do not query Supabase. Additional reads resolve released media assets, project galleries, settings, and responsive media variants. Read requests use the existing anonymous/publishable client and RLS. There are no applicant/supplier reads or writes.

For the home page (pages.route_path is empty), publish bilingual page_sections with section_key values hero, companyIntroduction, capabilities, sustainability, and vision2030. Headline title text may contain a newline for editorial line breaks. Publish approved services, sectors, projects, project_media, hero_media, statistics, news, and site_settings through the foundation workflow. Unpublished parents and missing translations remain subject to existing visibility policies.

Hero media uses asset_id, optional poster_asset_id/mobile_asset_id, sort_order, and focal points. Supply a landscape, compressed muted construction film, a still poster, and an appropriate mobile crop. Multiple published entries form the sequence. Autoplay rejection pauses playback and leaves the poster available. Reduced motion creates no autoplay video. Browser playback was checked with a tiny geometric test clip generated in memory, not company footage or a shipped fixture.

site-media remains private. Approved public images receive 60-second signed URLs refreshed while near the viewport; public hero video receives a maximum 900-second lease refreshed before expiry to avoid frequent playback resets. Already issued video URLs can therefore remain usable for up to 15 minutes after withdrawal. This changes no private application bucket or permissions. Responsive image variants are consumed when present; no transcoding service or media upload workflow was added.

Map eligibility additionally requires coordinates_verified through the existing adapter, paired bounded latitude/longitude, a known precision, coordinate_source evidence, and a published/approved project. Neither city names nor array positions generate coordinates. A selected project without verified coordinates remains selectable in the list without a location pin. Invalid credentials, unsupported WebGL, load errors, timeouts, or deferred-bundle failures retain the fallback. The Mapbox Standard basemap uses dusk lighting and supported 3D objects; it does not model company projects as 3D buildings.

News is manually approved content. linkedin_original_url is restricted to HTTPS LinkedIn hosts in the presentation model. No scraping, API authorization, synchronization, token storage, or background sync job was added. Future integration must be server-side and feed the existing review/publication workflow.

## Verification — 22 October 2026

| Check | Result |
| --- | --- |
| npm run typecheck | Passed |
| npm run lint | Passed |
| npm run test:foundation | 36 passed: content boundary, SQL/RLS, department isolation, media rules, seed preservation |
| npm run test:v2 | 6 passed: map eligibility, empty production model, published media gate, LinkedIn URL safety, bilingual Unicode, route helpers |
| npm run content:seed:check | Passed; original draft seed matches source |
| npm run test:ui | 17 passed in installed headless Chrome |
| npm run build | Passed; emits bundle-size warnings |

UI checks cover all sections; statistics placement; static and map/news fallbacks; keyboard menu/tab behavior; responsive widths 1440/768/390/320; English/Arabic; language persistence; project selection/details; existing build/concept routes; GSAP and document cleanup; empty/error production; exclusion of development fixture chunks; synthetic published news/media; reduced-motion posters; and actual video autoplay/pause/mute/selection/offscreen suspension. The production test server uses a unique ignored build directory, synthetic browser-safe credentials, and intercepted responses. It never contacts or writes a real Supabase project.

Visual inspection included desktop, tablet, Arabic mobile, and the full-width menu. No horizontal overflow was observed at tested widths. Local screenshots (ignored, not shipped):

- [Desktop full page](../artifacts/v2/review-desktop.png)
- [Tablet full page](../artifacts/v2/review-tablet.png)
- [Arabic mobile full page](../artifacts/v2/review-mobile-ar.png)
- [Mega navigation](../artifacts/v2/review-menu.png)

These are implementation review screenshots, not company content approval or a complete accessibility audit. Live Supabase storage and production RLS integration were not exercised; foundation checks use local PGlite and mocked transport. Live Mapbox tiles, billing, 3D rendering and fly-to remain unverified without credentials and approved coordinates. Cross-browser video playback beyond Chrome remains to be checked with approved encoded footage.

The production build reports a roughly 653 kB existing application entry and a roughly 1.87 MB deferred Mapbox chunk (about 521 kB gzip). V2 itself is roughly 373 kB (about 113 kB gzip). The existing 2.42 MB architectural preview artwork remains an unchanged legacy asset and is referenced by the development presentation; it is not selected by V2's production empty-content model. Approved production media still needs compression/mobile variants and measured delivery budgets.

npm audit reports one high-severity dependency entry for the repository's existing Vite 8.3.1 development tooling (including Windows launch-editor advisories). Vite was not upgraded as part of this homepage scope. Track and resolve that toolchain update before a production release.

## Dependencies and file changes

Runtime additions: gsap ^3.15.0, @gsap/react ^2.1.2, mapbox-gl ^3.33.0. Development addition: @playwright/test ^1.64.1. The existing React/MUI/router/Supabase architecture remains in place.

The route file mounts the lazy V2 subtree. LanguageProvider accepts an optional initial language without changing its existing default. publicContent adds paginated media-variant reads, defensive publication checks, and bounded optional public-video URL lifetimes. Environment documentation adds an optional VITE_MAPBOX_PUBLIC_TOKEN. Test scripts and ignored local review artifacts are added.

Created files:

- docs/phase-2-homepage.md
- playwright.config.mjs
- src/contracting/site/v2/DetailPage.tsx
- src/contracting/site/v2/HomePage.tsx
- src/contracting/site/v2/V2Layout.tsx
- src/contracting/site/v2/V2Routes.tsx
- src/contracting/site/v2/components/CinematicHero.tsx
- src/contracting/site/v2/components/CorporateFooter.tsx
- src/contracting/site/v2/components/EditorialSections.tsx
- src/contracting/site/v2/components/MapboxCanvas.tsx
- src/contracting/site/v2/components/MegaNavigation.tsx
- src/contracting/site/v2/components/NewsSection.tsx
- src/contracting/site/v2/components/ProjectMapSection.tsx
- src/contracting/site/v2/components/SharedBackdrop.tsx
- src/contracting/site/v2/components/primitives.tsx
- src/contracting/site/v2/content/fixtures.development.ts
- src/contracting/site/v2/content/loadHomepage.ts
- src/contracting/site/v2/content/model.ts
- src/contracting/site/v2/content/useMediaSource.ts
- src/contracting/site/v2/content/useV2Content.ts
- src/contracting/site/v2/i18n.ts
- src/contracting/site/v2/motion/Motion.tsx
- src/contracting/site/v2/motion/gsap.ts
- src/contracting/site/v2/motion/useReducedMotion.ts
- src/contracting/site/v2/styles.css
- tests/v2/homepage.spec.mjs
- tests/v2/model.test.mjs
- tests/v2/production.spec.mjs

Modified files:

- .env.example
- .gitignore
- README.md
- package.json
- package-lock.json
- src/contracting/routes/ContractingRoutes.tsx
- src/contracting/site/content/publicContent.ts
- src/contracting/site/i18n/LanguageProvider.tsx

No existing homepage/map/concept/asset/company-profile files or database migrations were replaced.

## Remaining external inputs

1. A configured Supabase project with the Phase 1 migrations, storage policies, bilingual content review, approved publication, and actual released objects. Keep privileged keys and database credentials out of VITE variables. Full-stack verification remains necessary.
2. Company-approved construction videos with rights, posters, mobile crops, delivery formats, and agreed file/bitrate budgets; approved photographs and alt text for production. Confirm use rights for existing presentation artwork before publishing it.
3. Approved company copy, services/sectors, project details and image assignments, statistics with evidence and reference dates, sustainability/Vision wording, contact details and social links. No certification or achievement has been invented.
4. Project coordinates with verification, source evidence, precision, and approval. A URL-restricted pk. Mapbox token, enabled billing, allowed domains, and deployment CSP/worker policy checks. Set VITE_MAPBOX_PUBLIC_TOKEN only after provisioning these inputs.
5. Approved news copy/cover images/publication dates and original LinkedIn links. Any future sync requires approved LinkedIn application/organization access and server-side authorization; there is no live synchronization now.
6. Separate implementation and review of secure careers/supplier intake and reviewer/admin interfaces. Current CTAs preserve existing pages and do not imply that private application workflows are live.

The final /contracting cutover, deployment configuration, production integration validation, and company visual/content approval remain separate release steps.

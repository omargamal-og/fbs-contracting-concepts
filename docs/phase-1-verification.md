# Phase 1 verification report

Date: 2026-10-22 (Africa/Cairo)

Branch: `rebuild/corporate-v2-foundation`, created from the clean current HEAD `f371b2c`. No reset, merge, commit, push, deployment, or production database action was performed. All work is uncommitted for review. No other repository was used.

## Delivered

- Three ordered Supabase migrations covering 26 RLS-protected application tables, bilingual content, editorial roles, private applications, audit histories, and private storage policies.
- A deterministic, literal-only import generator, versioned draft SQL seed, and source/asset manifest.
- 102 draft roots with 204 translations, including all eight corporate project records and seven unapproved statistics. No coordinates, delivery completions, news, vacancies, videos, applicants, or staff identities were invented or seeded.
- An isolated anonymous Supabase client, public-schema TypeScript models, paginated content functions, adapters, media signing, and a loading/ready/unavailable/error hook.
- Local configuration and secret-free environment example, setup/security guide, and Phase 2 plan.

No existing frontend source, asset, route, dictionary, concept, or homepage file was changed. The new content module is deliberately unmounted. `/contracting/build` retains its current hardcoded demonstration experience, including its existing pending-approval notices; unpublished database statistics do not replace or publish that interface.

## Checks actually run

| Check | Result |
| --- | --- |
| `npm run test:foundation` | PASS: 36 tests, 0 failures, 0 skipped |
| `npm run content:seed:check` | PASS: committed seed/manifest content matches corporate sources |
| `npm run lint` | PASS, including the new generator and test scripts |
| `npm run typecheck` | PASS |
| `npm run build` | PASS; existing frontend emits a chunk-size warning |
| `git diff --name-only -- src` | Empty: no pre-existing tracked frontend source modified |
| `git diff --check` | Checked for tracked changes |

The 26 database tests execute the actual versioned SQL migrations, constraints, triggers, grants, and RLS in PGlite PostgreSQL. They switch to non-owner `anon`, `authenticated`, and `service_role` roles to exercise authorization, including queries with no frontend publication filters. They cover:

- Approved/live versus draft/scheduled/expired content, direct translation isolation, and dependency visibility.
- No anonymous private-table access or writes; no browser role escalation, including by an Administrator.
- HR/Procurement separation across submissions, internal notes, document metadata, assignments, and history; unassigned reviewers denied.
- Private buckets, released-only media, quarantined document hiding, and blocked browser private uploads/overwrites.
- Editor publication denial, bilingual/evidence/reference-date validation, live-content freezing, publisher attribution, and append-only history.
- Server-side application history updates with version increments and reviewer validation.
- Exact project import reconciliation, private bilingual dictionary preservation, coordinate validation, media-path ownership, and navigation cycle prevention.
- Fresh migration/seed replay, seed determinism, and reruns that preserve draft edits and published records.

The 10 frontend tests use the real Supabase SDK with mocked HTTP responses. They cover public-key validation, public query filters, locale selection, empty/error states, pagination, homepage availability, adapters, and 60-second media signing. A test-only WebSocket implementation supports the installed Node 20 runtime; no realtime connection is opened.

## Not verified and not claimed

Docker, the Supabase CLI, and psql are not installed on the available PATH. No Supabase environment variables were present or used. Therefore:

- No actual `supabase start` or CLI `db reset --local` was run.
- No real Auth server, invitation/sign-in, JWT issuance, PostgREST, GraphQL, or Storage HTTP endpoint was exercised.
- PGlite uses minimal Auth-user and Storage-catalog stubs. Storage policy SQL was tested, but real object bytes, MIME/size enforcement, signed-URL expiry, and download responses were not.
- Database types are hand-authored from migrations, not generated from a running Supabase schema.
- No browser visual or live route-navigation test was performed. Route preservation is supported by unchanged existing source and successful compilation/build.
- No application submission service, scanner, notification provider, role-management endpoint, state-transition service, admin dashboard, LinkedIn sync, or Mapbox integration is installed.

Existing Vite 8.3.1 remains unchanged. `npm audit` reports one high-severity affected dependency entry for Vite, including [GHSA-587h-7wmj-h5pm](https://github.com/advisories/GHSA-587h-7wmj-h5pm). Review and patch this separately before deployment. The build also reports a frontend JavaScript chunk larger than 500 kB. Neither is hidden by the passing checks.

## Exact next steps

1. Review the migrations, role model, private storage rules, and import manifest. Do not connect them to production yet.
2. Install Docker and the Supabase CLI; run the LOCAL setup in `supabase-foundation.md`, including `supabase db reset --local`.
3. Compare CLI-generated public types; verify Auth, direct REST draft isolation, anonymous published reads, and Storage upload/sign/download restrictions using the real local services.
4. Provision only local test staff through trusted Auth/database administration. No browser can grant roles.
5. Reconcile the authoritative company profile, media rights, statistic reference dates/evidence, and project coordinates. Keep unapproved data in draft.
6. After foundation approval, begin the complete homepage described in `phase-2-homepage-plan.md`. Address the Vite advisory before any deployment. Build sensitive application workflows separately on a reviewed server boundary.

## Complete changed-file inventory

26 files: 5 modified tracked files and 21 new files.

- `.env.example`
- `.gitignore`
- `README.md`
- `docs/phase-1-verification.md`
- `docs/phase-2-homepage-plan.md`
- `docs/supabase-foundation.md`
- `eslint.config.js`
- `package-lock.json`
- `package.json`
- `scripts/generate-content-seed.mjs`
- `src/contracting/site/content/adapters.ts`
- `src/contracting/site/content/client.ts`
- `src/contracting/site/content/config.ts`
- `src/contracting/site/content/database.types.ts`
- `src/contracting/site/content/publicContent.ts`
- `src/contracting/site/content/types.ts`
- `src/contracting/site/content/usePublicHomepage.ts`
- `supabase/config.toml`
- `supabase/migrations/202610220001_content.sql`
- `supabase/migrations/202610220002_applications_storage.sql`
- `supabase/migrations/202610220003_content_integrity.sql`
- `supabase/seed-manifest.json`
- `supabase/seed.sql`
- `tests/foundation/content.test.mjs`
- `tests/foundation/database.mjs`
- `tests/foundation/security.test.mjs`

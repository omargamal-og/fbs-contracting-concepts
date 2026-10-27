# Supabase foundation: local setup and security model

Phase 1 prepares content and authorization. It does not redesign or connect the existing `/contracting/build` pages, add an admin dashboard, open public submissions, or modify a hosted database. There is no Directus dependency.

## Local prerequisites and commands

The frontend uses its existing Vite requirements. Prefer Node 22+ for Supabase tooling; this machine's Node 20.19.5 can run the contract tests through a test-only `ws` dependency. Docker and the Supabase CLI are needed for a complete local Supabase stack; neither was available during implementation.

```powershell
npm install
npm run content:seed:check
npm run test:foundation
npm run lint
npm run typecheck
npm run build
```

The foundation tests use an in-memory PGlite PostgreSQL instance. They require no connection string, hosted project, or credentials. Their Auth identity and Storage catalogs are test stubs, not the real Supabase services.

After installing Docker Desktop and the Supabase CLI using their official instructions, run from this repository:

```powershell
supabase start
supabase db reset --local
supabase status
Copy-Item .env.example .env.local
```

`db reset --local` destroys only the disposable local database and recreates migrations and seed data. Do not use `--linked`, `db push`, `supabase link`, or a hosted database URL for these instructions. No remote setup or deployment is authorized by Phase 1.

Put the LOCAL API URL and public publishable key from `supabase status` into `.env.local`. Legacy JWT anon keys are also accepted. No key is supplied in the example. `.env*` files are ignored except `.env.example`.

```dotenv
VITE_SUPABASE_URL=http://127.0.0.1:54321
VITE_SUPABASE_PUBLISHABLE_KEY=<local publishable or legacy anon key>
```

Never use a `service_role` JWT, `sb_secret_*` key, or database password in any `VITE_*` variable. The configuration resolver rejects privileged key formats. The public content client disables persistent Auth sessions and URL session detection, so a future staff login must use a separate client.

## Schema and publication

Three ordered SQL migrations implement the foundation:

1. `202610220001_content.sql`: content, translations, roles, provenance, grants, RLS, and publication validation.
2. `202610220002_applications_storage.sql`: private applications, assignments, attachments, audit history, private buckets, and object policies.
3. `202610220003_content_integrity.sql`: dependency-aware public visibility, live-content guards, publication history, timestamp updates, and media integrity.

`public.content_items` is the shared UUID/publication/approval/order/timestamp record. The typed tables are `site_settings`, `pages`, `page_sections`, `navigation_items`, `services`, `sectors`, `projects`, `project_media`, `statistics`, `hero_media`, `news`, `job_openings`, and `media_assets`. Composite foreign keys prevent attaching the wrong content kind to a typed table.

`content_translations` has a unique `(content_id, language_code)` key. Only `ar`/RTL and `en`/LTR are supported. Title, summary, body, location label, alternative text, and SEO fields are explicit. Its JSON object retains existing structured editorial content; future section editors must validate payloads against their section type. Do not treat content JSON as arbitrary executable HTML.

`project_services` provides the service relationship; each project has an optional sector. `media_variants` belongs to a media asset. Project galleries and ordered hero entries reference media assets; hero entries support mobile media, focal points, and video posters. News supports an optional LinkedIn original URL but has no sync integration.

Publication and approval are distinct enums. Anonymous reads require published AND approved content, a publication time at or before database time, and an unexpired record. Child visibility also checks its parent/dependencies. Calling the tables or translations directly does not bypass this rule. Anonymous root reads exclude staff approval identities.

Publication requires both languages, a typed detail row, and evidence in restricted `private.content_provenance`. Statistics additionally require a reference date. Media additionally requires uploaded registered objects. Video hero entries require an image poster. Publishing as an authenticated Publisher records the actual Auth actor and time.

Live content details/translations/variants cannot be edited in place. A Publisher must unpublish first, which resets approval; edit and review, then republish. This deliberately favors review integrity over uninterrupted editing. Versioned drafts/preview and seamless promotion are NOT implemented. Archive roots to preserve publication history; normal root deletion is constrained by audit references. No retention/purge job is installed.

Projects retain year-only dates, optional unit counts/types, and an explicit delivery status defaulting to `unspecified`. Coordinates must be paired and bounded. Verified coordinates require a source and precision. Adapters expose map coordinates only when verified; no SVG anchors or assumed city-center coordinates are imported.

## Roles and administrative provisioning

`private` is absent from API-exposed schemas. All 26 application tables have RLS, including all private tables. Security-definer policy helpers have empty search paths, fully qualified relations, and explicit execution grants. There are no exposed privilege-changing RPCs.

| Role | Content | Applications |
| --- | --- | --- |
| Administrator | Editorial access | Both departments |
| Content Editor | Create/edit unapproved drafts; cannot approve/publish/edit live records | None |
| Publisher | Review, publish, unpublish; live edits still require unpublishing | None |
| HR Reviewer | Published public content | Assigned career applications/documents/history only |
| Procurement Reviewer | Published public content | Assigned supplier applications/documents/history only |
| Authenticated user without a role | Published public content | None |
| Anonymous | Published public content | None |

Roles come from `private.user_roles`, never editable Auth metadata. There is one role per account to avoid additive reviewer permissions. Even a logged-in Administrator has no browser write permission on role assignments. Revoking or changing a reviewer role immediately removes policy access based on the current role table.

No users or roles are created by the seed. Local signups and anonymous sign-ins are disabled. Create/invite staff through the LOCAL Auth administration surface, then provision the initial administrator through a trusted database session. Example for a real LOCAL Auth UUID:

```sql
insert into private.user_roles (user_id, role)
values ('<local-auth-user-uuid>', 'administrator');
```

Do not run this placeholder as-is or seed real staff identities into Git. Role changes, invitations, MFA policy, and admin UI are future server/admin work. Deactivate staff accounts instead of casually deleting Auth users referenced by retained audit records.

## Private application foundation and deferred server workflows

`private.career_applications` and `private.supplier_applications` are separate tables with separate fields/notes, review states, consent versions/times, locales, reviewer identity, version counters, and timestamps. Each attachment, assignment, or history record must reference exactly one application type.

An active assignment grants access only to a reviewer of the correct department. `assigned_by` must identify an Administrator. Unassigned reviewers cannot browse a department-wide queue. No applicant data is exposed by public APIs, and no authenticated browser role can insert/update/delete submissions, assignments, attachments, or history.

Database triggers append initial and changed application statuses atomically. Status changes require an active matching reviewer and a reason. History is append-only. This is an audit backstop, not a complete workflow service: no public submission endpoint, transition RPC, status-transition state machine, malware scanner, email sender, or reviewer UI is implemented.

Before opening applications, implement reviewed server-side operations that:

1. Validate allowed fields, consent version, lengths, email/phone, attachment signatures/size, and anti-abuse controls; generate storage keys server-side.
2. Quarantine uploads, scan actual bytes, and mark clean only after scanning. Never trust a client-provided MIME or scan result.
3. Insert the application and initial audit event in a transaction; clean up abandoned uploads safely.
4. Verify the current staff identity and department/assignment for every review request. Lock the application row and compare its expected version; reject conflicts.
5. Enforce allowed state transitions and record the responsible reviewer and reason atomically. Never accept an arbitrary actor identity from the browser.
6. Provide department-scoped lists/details and short-lived document downloads without exposing unrelated private metadata.
7. Enforce approved retention and deletion policies, redacted logs, rate limits, notification delivery, and operational auditing.

Because `private` is not exposed to PostgREST, a service-role REST client alone is not a private-data API. Use a reviewed server database transaction or narrowly scoped, authorized RPC wrappers added in a later migration. Never expose the entire private schema just to make a dashboard query convenient. Keep server credentials in a server secret store, not Vite.

## Storage and media delivery

All buckets are PRIVATE: `site-media`, `career-documents`, and `supplier-documents`. A public bucket bypasses file-download RLS, so it is unsuitable for mixed draft/released files. The SQL policies apply both to storage metadata and file authorization.

Site originals and variants must use `<media-asset-uuid>/<unique-filename>` paths, preventing a draft from claiming another asset's released path. Create draft metadata first, then upload to its registered path. Browser content staff can insert registered draft objects; browser overwrites/deletes are denied. Service operations must also use immutable, versioned object names rather than overwriting released bytes.

Draft media is visible only to editorial staff. Released approved media is anonymously readable through policies. `getReleasedMediaUrl()` signs a URL for 60 seconds, never uses `getPublicUrl()`, and relies on Storage authorization. An issued URL can remain usable until its expiry even after unpublishing. Full HTTP signing/download/expiry behavior still needs verification on the real local Storage service.

Application files require an assigned department reviewer and a clean scan status. Pending/rejected files cannot be downloaded through reviewer policies. MIME and size restrictions exist at bucket and document-metadata levels; these do not replace byte inspection or scanning. There are no public application upload policies.

The 50 MiB site-media limit is an initial ingest guard, not a production-video delivery design. Store media references/metadata in PostgreSQL, not video bytes. Phase 2 should choose optimized encodings, posters, responsive variants, lazy loading, and an approved CDN/video delivery strategy. No fabricated video records or uploads are included.

## Draft import and frontend integration

```powershell
npm run content:seed
npm run content:seed:check
```

The generator parses literals from corporate project/navigation/dictionary/statistics sources without executing TSX. It creates `supabase/seed.sql` and a source-hash/asset manifest. It never connects to a database or uploads media. Stable IDs, existence checks, and conflict protection make reruns non-destructive; existing editorial or published records are not overwritten. Conflicting manually created slugs may require explicit reconciliation rather than replacement.

The seed contains 102 unapproved draft roots and 204 translations: eight projects, seven unapproved statistics, nine local image references, eight gallery-cover relationships, one existing static hero entry, five services, two sectors, 24 pages, nine homepage sections, 28 navigation entries, and settings. Both original 470-leaf dictionaries are retained as a restricted provenance snapshot. No applicants, staff identities, news stories, vacancies, fabricated coordinates, legacy Atheel projects, or videos are seeded. Media object paths remain null until explicitly uploaded. Statistic reference dates/evidence remain unset.

`src/contracting/site/content/` contains the public-schema types, safe configuration/client, paginated public access functions, presentation adapters, and `usePublicHomepage()`. States are `loading`, `ready`, `unavailable` (not configured or no published content), and `error`. Missing Arabic does not fall back to invented or English content. Data access remains outside presentation components. None of this layer is mounted in the current homepage.

The database types are hand-authored and TypeScript-checked, not claimed to be CLI-generated. After the full LOCAL stack starts, generate a comparison outside `src` and reconcile it deliberately:

```powershell
supabase gen types typescript --local --schema public | Set-Content -Encoding utf8 "$env:TEMP\fbs-public-database.generated.ts"
```

Also verify local REST draft isolation, Auth invitations/JWT behavior, Storage upload/sign/download authorization, bucket MIME/size enforcement, and migration reset against the real services. See `phase-1-verification.md` for exactly what was and was not tested.

Official references: [RLS](https://supabase.com/docs/guides/database/postgres/row-level-security), [private buckets](https://supabase.com/docs/guides/storage/buckets/fundamentals), [local workflow](https://supabase.com/docs/guides/local-development/cli-workflows), [seeding](https://supabase.com/docs/guides/local-development/seeding-your-database), and [TypeScript](https://supabase.com/docs/reference/javascript/typescript-support).

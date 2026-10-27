# FBS Contracting — Corporate Website

Latest visual direction: run npm run dev and open **/contracting/v3?lang=en** or **/contracting/v3?lang=ar**. The complete bright, rounded homepage refinement is isolated from V2. The latest [critical UX fixes, interaction upgrade, verification and review artifacts](docs/v3-ux-upgrade.md) cover scroll restoration, contextual menus, ambient motion and the rebuilt project showcase. See the [Phase 3 design, motion, verification, file inventory, screenshots, and recording](docs/v3-phase3-refinement.md). The [original cinematic core and media license record](docs/v3-cinematic-design-core.md) remain available. Run npm run test:v3 for its development and production browser checks.

The redesigned bilingual corporate homepage is available at /contracting/v2. Run npm run dev and open /contracting/v2?lang=en or /contracting/v2?lang=ar for visual review. Development presentation content is explicitly marked as awaiting approval and is excluded from the V2 production content path. The existing website remains at /contracting/build, with the selector and concepts preserved.

- Setup, schema, roles, storage, and deferred workflows: [Foundation guide](docs/supabase-foundation.md).
- Test results, limitations, and file inventory: [Verification report](docs/phase-1-verification.md).
- Homepage features, content setup, verification, dependencies, file inventory, and remaining inputs: [Phase 2 handover](docs/phase-2-homepage.md).
- Original implementation direction: [Phase 2 plan](docs/phase-2-homepage-plan.md).

Run npm install, then npm run test:foundation, npm run content:seed:check, npm run lint, npm run typecheck, and npm run build. Foundation/model tests run locally without Docker or credentials. Run npm run test:v2 for V2 model checks and npm run test:ui for the browser suite (requires installed Google Chrome; backend responses are mocked). The seed generator never connects to a database.

The original Vite template documentation follows.

---

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```

You can also install [eslint-plugin-react-x](https://npmx.dev/package/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://npmx.dev/package/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```

# Research: Modern Tower of Hanoi Website

Date: 2026-01-22  
Branch: 001-tower-hanoi-site

## Decisions

### 1) Build tooling: Vite + Vue 3 + TypeScript

- Decision: Use Vue 3 with Vite and TypeScript.
- Rationale: Fast dev loop, straightforward static builds for GitHub Pages, strong TS support.
- Alternatives considered:
  - Vue CLI (older ecosystem, slower builds)
  - Nuxt (adds complexity and SSR concepts not needed for a static game)

### 2) GitHub Pages deploy strategy (project Pages under repo subpath)

- Decision: Configure Vite `base` for GitHub Pages project sites and deploy via official Pages Actions.
- Rationale: Prevents broken asset URLs when hosted under `https://<user>.github.io/<repo>/`.
- Details:
  - Use Vite `base: '/tower_hanoi/'` for project Pages (repo = `tower_hanoi`).
  - Use GitHub Actions chain: `actions/configure-pages` → `actions/upload-pages-artifact` (upload `dist/`) → `actions/deploy-pages`.
- Alternatives considered:
  - Manual gh-pages branch publishing (works, but less integrated than official Pages flow)

### 3) Routing strategy

- Decision: Prefer hash routing (Vue Router `createWebHashHistory()`).
- Rationale: GitHub Pages cannot natively rewrite all routes to `index.html`; hash routing avoids deep-link refresh 404s.
- Alternatives considered:
  - History routing + 404.html redirect shim (works, but adds complexity and edge cases)

### 4) Modal accessibility implementation

- Decision: Implement modal with Vue `Teleport`, focus trapping, Esc/backdrop dismiss, and make background inert while open.
- Rationale: Meets constitution accessibility baseline and matches clarified UX requirements.
- Implementation guidance:
  - `role="dialog"`, `aria-modal="true"`, accessible name via `aria-labelledby`.
  - Focus moved into the modal on open and returned to the trigger on close.
  - Use `inert` on the main app container while the modal is open.
- Alternatives considered:
  - Full headless UI framework (overkill)
  - DIY focus trap without inert (more error-prone)

### 5) Confetti effect

- Decision: Use a lightweight confetti library, loaded only on win.
- Recommendation: `js-confetti` (MIT) as first choice.
- Rationale: Small, simple API; easy to lazy-load; good UX for win celebration.
- Alternatives considered:
  - `canvas-confetti` (permissive license, more common; slightly larger)

### 6) Future persistence (DynamoDB)

- Decision: No database/storage for this version.
- Rationale: Must remain a static site; direct DynamoDB access from client is not appropriate.
- Future direction:
  - If persistence is needed later, introduce an API layer (e.g., API Gateway + Lambda) that talks to DynamoDB.

## Pitfalls to avoid

- Incorrect Vite base (missing trailing slash) leading to asset 404s on Pages.
- Using history routing without a deep-link strategy.
- Setting `aria-modal="true"` without actually making the background inert.
- Accidentally embedding secrets in client-side code or workflows.

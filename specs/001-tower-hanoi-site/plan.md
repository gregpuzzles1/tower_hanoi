# Implementation Plan: Modern Tower of Hanoi Website

**Branch**: `001-tower-hanoi-site` | **Date**: 2026-01-22 | **Spec**: specs/001-tower-hanoi-site/spec.md
**Input**: Feature specification from `specs/001-tower-hanoi-site/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Build a sleek, responsive Tower of Hanoi playing website with a slim top bar ("Tower of Hanoi" + "New Game ▼"), a centered New Game modal (3–7 discs, min moves), mouse/touch + keyboard controls, animated moves, invalid-move jiggle + tooltip, win popup with confetti, educational content sections, and a dynamic footer.

Technical approach: Vue 3 + TypeScript using Vite for a static build deployed to GitHub Pages via GitHub Actions; prefer hash routing (no backend) and accessibility-first modal patterns.

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: TypeScript (target ES2022), Node.js 20+ for tooling  
**Primary Dependencies**: Vue 3, Vite, Vue Router (hash routing), js-confetti (win celebration)  
**Storage**: N/A for now (future possibility: DynamoDB via a separate API layer; not directly from the browser)  
**Testing**: Optional (recommended: Vitest + @vue/test-utils; optional E2E: Playwright)  
**Target Platform**: Modern evergreen browsers; responsive mobile (iOS Safari and Android Chrome)
**Project Type**: web (static SPA)  
**Performance Goals**: Smooth animations (60fps target), responsive inputs (<100ms perceived)  
**Constraints**: Static hosting on GitHub Pages under repo subpath; no secrets in client; no server required  
**Scale/Scope**: Single-page game + content sections; local-only game state

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*


Gates derived from `.specify/memory/constitution.md`:

- Static-first (no server/runtime dependencies): PASS (Vue/Vite static build)
- GitHub Pages compatibility (repo subpath): PASS (Vite `base` configured; hash routing)
- CI is the quality gate (build + deploy workflow): PASS (Pages workflow planned)
- Accessibility/performance baseline: PASS (semantic HTML; focus-trapped modal; keyboard controls)
- Client-side security/supply chain: PASS (no secrets; Actions pinned to SHAs; lockfile committed)

For this repository (GitHub Pages static site), plans typically confirm:

- Build produces static files only (no server/runtime dependencies)
- Routes/asset URLs work under a repository base path
- GitHub Actions build step fails on errors and deploys to Pages
- No secrets are required in client-side code

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)
<!--
  ACTION REQUIRED: Replace the placeholder tree below with the concrete layout
  for this feature. Delete unused options and expand the chosen structure with
  real paths (e.g., apps/admin, packages/something). The delivered plan must
  not include Option labels.
-->

```text
index.html
vite.config.ts
package.json

src/
├── main.ts
├── App.vue
├── router/
│   └── index.ts
├── components/
│   ├── TopBar.vue
│   ├── NewGameModal.vue
│   ├── GameBoard.vue
│   ├── TowerView.vue
│   ├── DiscView.vue
│   ├── WinDialog.vue
│   └── AppFooter.vue
├── composables/
│   ├── useGameState.ts
│   ├── useKeyboardControls.ts
│   ├── useModalA11y.ts
│   └── useConfetti.ts
├── content/
│   └── copy.ts
└── styles/
  ├── base.css
  └── theme.css

public/
└── assets/

# Optional (only if tests are added)
tests/
├── unit/
└── e2e/

.github/
└── workflows/
  └── pages.yml
```

**Structure Decision**: Single Vue web app at repository root (Vite default layout) for the simplest GitHub Pages build/deploy and easiest local development.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |

No constitution violations expected for this feature.

## Phase Plan

### Phase 0: Research (output: `research.md`)

- GitHub Pages + Vite base path strategy (project Pages under `/<repo>/`)
- Routing strategy decision (hash routing vs history + 404 shim)
- Modal accessibility approach (focus trap + inert background)
- Confetti library choice and reduced-motion behavior

### Phase 1: Design (outputs: `data-model.md`, `contracts/`, `quickstart.md`)

- Define game state model + state machine (selection, animation lock, win)
- Define UI contracts and any future API placeholders (no backend now)
- Document local dev, build, and deployment steps

### Phase 2: Implementation Planning (output: `tasks.md` via `/speckit.tasks`)

- Break work into independently shippable slices aligned to user stories
- Ensure early tasks include GitHub Pages workflow + base path configuration

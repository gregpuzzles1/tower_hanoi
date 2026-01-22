# Tasks: Modern Tower of Hanoi Website

**Input**: Design documents from `/specs/001-tower-hanoi-site/`
**Prerequisites**: `plan.md` (required), `spec.md` (required), plus `research.md`, `data-model.md`, `quickstart.md`, `contracts/`

**CI/Build**: Include tasks to ensure GitHub Actions builds and deploys to GitHub Pages (static build).
**Tests**: Not included (no explicit request for automated tests in `spec.md`; acceptance scenarios are manual/behavioral).

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- All tasks include exact file paths

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure for a Vue 3 + TypeScript + Vite static site.

- [x] T001 Initialize Vite Vue+TS project at repo root (creates `package.json`, `index.html`, `vite.config.ts`, `src/`) 
- [x] T002 [P] Add GitHub Pages workflow in `.github/workflows/pages.yml` using official Pages flow (`actions/configure-pages` → `actions/upload-pages-artifact` → `actions/deploy-pages`), with explicit least-privilege `permissions:` and all Actions pinned to full-length commit SHAs (no `@v*` tags) (build `npm ci && npm run build`, upload `dist/`, deploy)
- [x] T003 Configure Vite base path for Pages in `vite.config.ts` (set `base: '/tower_hanoi/'`)
- [x] T004 Configure Vue Router hash routing in `src/router/index.ts` (`createWebHashHistory()`)
- [x] T005 [P] Add baseline styles in `src/styles/base.css` and `src/styles/theme.css` (CSS variables, responsive defaults)
- [x] T006 Wire app entry in `src/main.ts` and `src/App.vue` (router + global styles import)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core game state and UI scaffolding that MUST exist before implementing user stories.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

- [x] T007 Define core game types in `src/types/game.ts` (GameStatus, TowerId, Disc, Move, SelectionState, AnimationState)
- [x] T008 Implement game rules + state machine in `src/composables/useGameState.ts` (init/reset, legal move check, apply move, solved detection)
- [x] T009 Implement content model in `src/content/copy.ts` (how-to, history, applications strings/arrays)
- [x] T010 Create component skeletons (empty but compiling) in `src/components/TopBar.vue`, `src/components/NewGameModal.vue`, `src/components/GameBoard.vue`, `src/components/TowerView.vue`, `src/components/DiscView.vue`, `src/components/WinDialog.vue`, `src/components/AppFooter.vue`
- [x] T011 Define shared animation tokens in `src/styles/theme.css` (durations, easing, reduced-motion overrides)

**Checkpoint**: App builds, runs, and shows placeholder layout with no runtime errors.

---

## Phase 3: User Story 1 — Start A New Game (Priority: P1) 🎯 MVP

**Goal**: Player can open the New Game modal from the top bar, choose 3–7 discs, see minimum moves, and start/cancel/dismiss without breaking current state.

**Independent Test**: Load page → open modal → set discs to 3 and 7 → verify min moves (7, 127) → Start resets game to selected discs on left tower → Cancel/Esc/backdrop leaves game unchanged.

- [x] T012 [P] [US1] Implement top bar UI in `src/components/TopBar.vue` (title “Tower of Hanoi”, “New Game ▼” button)
- [x] T013 [P] [US1] Implement modal shell in `src/components/NewGameModal.vue` (centered overlay, backdrop, Start/Cancel buttons)
- [x] T014 [P] [US1] Implement modal accessibility helper in `src/composables/useModalA11y.ts` (focus trap, restore focus, inert background)
- [x] T015 [US1] Wire modal open/close state in `src/App.vue` (TopBar triggers, modal emits close)
- [x] T016 [US1] Implement disc count control (3–7) in `src/components/NewGameModal.vue` (buttons clamp range)
- [x] T017 [US1] Display minimum moves in `src/components/NewGameModal.vue` (compute $2^n - 1$)
- [x] T018 [US1] Implement Start/Cancel behaviors in `src/components/NewGameModal.vue` (Start calls `useGameState.reset(n)`, Cancel just closes)
- [x] T019 [US1] Implement Esc/backdrop dismiss requirements in `src/components/NewGameModal.vue` (close without changing game)

**Checkpoint**: US1 is fully usable and independently testable.

---

## Phase 4: User Story 2 — Play With Mouse Or Touch (Priority: P2)

**Goal**: Player can solve the puzzle via click/tap source then destination, with clear selection feedback and smooth legal-move animation.

**Independent Test**: Start a 3-disc game and complete it using only mouse/touch interactions.

- [x] T020 [P] [US2] Implement game board layout in `src/components/GameBoard.vue` (three towers, responsive spacing)
- [x] T021 [P] [US2] Implement tower rendering in `src/components/TowerView.vue` (stack discs, tower hit target)
- [x] T022 [P] [US2] Implement disc rendering in `src/components/DiscView.vue` (size-to-width mapping, distinct colors 1–7)
- [x] T023 [US2] Implement click/tap selection flow in `src/components/GameBoard.vue` (select source top disc, highlight/lift)
- [x] T024 [US2] Implement click/tap cancel behavior in `src/components/GameBoard.vue` (click same tower again cancels)
- [x] T025 [US2] Implement legal move execution in `src/components/GameBoard.vue` (call `useGameState.move(from,to)`; update stacks)
- [x] T026 [US2] Implement legal-move animation in `src/components/DiscView.vue` + `src/styles/base.css` (disc visually moves to destination)

**Checkpoint**: US2 works without keyboard and preserves rules.

---

## Phase 5: User Story 3 — Play With Keyboard (Priority: P3)

**Goal**: Desktop player can play using 1/2/3 source selection, Left/Right destination focus, Enter/Space to drop, Esc to cancel.

**Independent Test**: Solve a 3-disc game using only keyboard controls.

- [x] T027 [P] [US3] Implement keyboard controller in `src/composables/useKeyboardControls.ts` (key mapping, prevent default where appropriate)
- [x] T028 [US3] Add destination focus state in `src/composables/useGameState.ts` (or `src/components/GameBoard.vue`) to support Left/Right focus
- [x] T029 [US3] Render focus indicator in `src/components/TowerView.vue` + `src/styles/base.css` (visible focus ring/outline)
- [x] T030 [US3] Integrate keyboard controller in `src/components/GameBoard.vue` (only active when game area focused; disabled when modal open)
- [x] T031 [US3] Ensure Esc cancels selection in `src/composables/useGameState.ts` and/or `src/components/GameBoard.vue`

**Checkpoint**: US3 works keyboard-only and doesn’t hijack typing outside the game area.

---

## Phase 6: User Story 4 — Invalid Move Feedback (Priority: P4)

**Goal**: Invalid moves are rejected with a jiggle + snap-back and a tooltip showing the exact copy, then selection is canceled.

**Independent Test**: Attempt to place a larger disc on a smaller disc; confirm no state mutation, jiggle occurs, tooltip text matches exactly, selection clears.

- [x] T032 [P] [US4] Add invalid-move feedback state in `src/composables/useGameState.ts` (lastInvalidMoveAt, lastInvalidDiscSize, etc.)
- [x] T033 [P] [US4] Implement tooltip UI in `src/components/DiscView.vue` (exact text: "Larger discs can't be placed on smaller ones.")
- [x] T034 [P] [US4] Implement jiggle + snap-back animation in `src/styles/base.css` (keyframes; respects reduced-motion tokens)
- [x] T035 [US4] Wire invalid move handling in `src/components/GameBoard.vue` (reject move, trigger feedback, cancel selection)
- [x] T036 [US4] Enforce “no input during movingDisc animation” in `src/composables/useGameState.ts` (ignore/lock)

**Checkpoint**: Invalid moves never corrupt the towers and always show the correct feedback.

---

## Phase 7: User Story 5 — Win Celebration, Content, And Footer (Priority: P5)

**Goal**: Solving triggers a win popup + confetti; page includes educational content and dynamic footer links/year.

**Independent Test**: Solve 3-disc puzzle → win popup appears + confetti triggers → content sections render below game → footer links go to correct GitHub URLs → footer year range auto-updates.

- [x] T037 [P] [US5] Add win dialog UI in `src/components/WinDialog.vue` (congrats message, close action)
- [x] T038 [P] [US5] Add confetti integration in `src/composables/useConfetti.ts` (lazy-load `js-confetti`, trigger on win)
- [x] T039 [US5] Trigger win celebration from `src/composables/useGameState.ts` + `src/App.vue` when solved condition met
- [x] T040 [P] [US5] Implement content sections in `src/App.vue` using `src/content/copy.ts` (How to play, history, applications)
- [x] T041 [P] [US5] Implement footer in `src/components/AppFooter.vue` (© 2025-<current year> Greg Christian; links + email)
- [x] T042 [US5] Implement year auto-update logic in `src/components/AppFooter.vue` (compute end year at runtime)
- [x] T043 [US5] Validate footer links in `src/components/AppFooter.vue` target `https://github.com/gregpuzzles1/tower_hanoi` and `/issues/new`

**Checkpoint**: Full “game + content + footer” experience is complete.

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that span multiple stories, focused on UX, accessibility, and Pages readiness.

- [x] T044 [P] Add `prefers-reduced-motion` handling in `src/styles/base.css` and confetti trigger in `src/composables/useConfetti.ts`
- [x] T045 Improve responsive layout and touch targets in `src/styles/base.css` and `src/components/*` (mobile usability)
- [x] T046 Add basic SEO/meta in `index.html` (title, description, social preview placeholders)
- [x] T047 [P] Add project README and run instructions in `README.md` (use `specs/001-tower-hanoi-site/quickstart.md` as source)
- [x] T048 Validate Pages deploy end-to-end by ensuring `.github/workflows/pages.yml` builds and publishes `dist/`
- [x] T049 [P] Add MIT license file at repo root in `LICENSE` and ensure `src/components/AppFooter.vue` links “MIT License” to it

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion — BLOCKS all user stories
- **User Stories (Phase 3–7)**: Depend on Foundational completion
- **Polish (Phase 8)**: Depends on all desired user stories being complete

### User Story Dependencies (Recommended)

- **US1 (P1)** → **US2 (P2)** → **US3 (P3)** → **US4 (P4)** → **US5 (P5)**
  - Rationale: US1 establishes game initialization + modal patterns; US2 adds core interaction; US3 adds keyboard; US4 adds feedback; US5 adds celebration/content/footer.

Dependency graph:

`Setup (Phase 1) → Foundational (Phase 2) → US1 → US2 → US3 → US4 → US5 → Polish (Phase 8)`

---

## Parallel Opportunities (by Story)

### US1 Parallel Example

Run these in parallel (different files): T012, T013, T014

### US2 Parallel Example

Run these in parallel (different files): T020, T021, T022

### US4 Parallel Example

Run these in parallel (different files): T033, T034

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: US1
4. Validate US1 using its Independent Test

### Incremental Delivery

1. Setup + Foundational → app compiles and runs
2. US1 → modal-driven new game (MVP)
3. US2 → mouse/touch play
4. US3 → keyboard play
5. US4 → invalid move feedback
6. US5 → win celebration + content + footer

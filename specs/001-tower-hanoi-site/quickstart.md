# Quickstart: Modern Tower of Hanoi Website (Vue + TypeScript)

Date: 2026-01-22  
Branch: 001-tower-hanoi-site

## Prerequisites

- Node.js 20+
- npm (or pnpm/yarn)

## Local development

1. Install dependencies:

   - `npm install`

2. Start the dev server:

   - `npm run dev`

3. Open the URL shown in the terminal.

## Build

- `npm run build`

Output is expected in `dist/` (Vite default).

## Preview production build

- `npm run preview`

## GitHub Pages deployment notes

- This repository targets GitHub Pages hosting under a repo subpath.
- Ensure Vite `base` is configured for the repo name (project pages):

  - repo: `tower_hanoi`
  - base: `/tower_hanoi/`

- Prefer Vue Router hash routing to avoid deep-link refresh 404s on Pages.

## Accessibility checklist (minimum)

- Modal traps focus while open; Esc and backdrop dismiss.
- Keyboard controls work as specified (1/2/3, Left/Right, Enter/Space, Esc).
- No console errors on load and during play.

# Data Model: Modern Tower of Hanoi Website

Date: 2026-01-22  
Branch: 001-tower-hanoi-site

## Overview

This feature is a local-only game hosted as a static site. State is kept in memory (optional future: serialize to `localStorage`).

## Entities

### Game

Represents the entire game session.

Fields:
- `discCount: number` (3–7)
- `towers: [Tower, Tower, Tower]`
- `moveCount: number`
- `status: GameStatus`
- `selection: SelectionState`
- `animation: AnimationState`
- `startedAt: number | null` (ms epoch)
- `completedAt: number | null` (ms epoch)

Validation:
- `discCount` must be within 3–7.
- At all times, each tower must be strictly ordered (largest at bottom → smallest at top).

Relationships:
- Owns exactly 3 `Tower` objects.

### Tower

An ordered stack of discs.

Fields:
- `id: 0 | 1 | 2`
- `discs: Disc[]` (bottom-to-top order or top-to-bottom order; must be consistent)

Validation:
- `discs` must be strictly ordered by `size`.

### Disc

Fields:
- `size: number` (1..discCount; 1 is smallest)
- `colorToken: string` (maps size → distinct color)

Validation:
- Sizes must be unique across all towers.

### Move

Optional for stats/UX (not required for MVP).

Fields:
- `from: 0 | 1 | 2`
- `to: 0 | 1 | 2`
- `discSize: number`
- `at: number`

### NewGameSettings

Fields:
- `discCount: number` (3–7)

### UI Content

Static text content sections.

Fields:
- `howToPlay: string`
- `history: string[]`
- `applications: string[]`

## State Machines

### GameStatus

- `idle` (initial load)
- `playing`
- `won`

Transitions:
- `idle → playing` on Start
- `playing → won` when solved condition met
- `playing|won → playing` on Start (new game)

### SelectionState

- `none`
- `sourceSelected { sourceTowerId: 0|1|2 }`

Rules:
- Selecting a source tower chooses its top disc (if any).
- Clicking same tower again cancels selection.
- After an invalid move attempt, selection returns to `none`.

### AnimationState

- `idle`
- `movingDisc { discSize, fromTowerId, toTowerId }`

Rules:
- While `movingDisc`, user input is ignored (or deterministically queued, but default: ignore).

## Derived Values

- Minimum moves: $2^{discCount} - 1$
- Solved condition: all discs stacked (correct order) on tower `id = 2` (right tower)

## Notes

- Keyboard destination focus can be modeled separately (e.g., `focusedTowerId`), but should not mutate the tower data until a legal move completes.

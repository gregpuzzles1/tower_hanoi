# Feature Specification: Modern Tower of Hanoi Website

**Feature Branch**: `001-tower-hanoi-site`  
**Created**: 2026-01-22  
**Status**: Draft  
**Input**: User description: "Modern Tower of Hanoi playing website with a sleek UI, New Game modal (3-7 discs), animated disc moves, keyboard controls, invalid-move feedback, win confetti popup, educational content, and a dynamic footer with links."

## Clarifications

### Session 2026-01-22

- Q: Should the “New Game ▼” control be a real dropdown menu or just a dropdown-styled button that opens the modal? → A: Dropdown-styled button that directly opens the modal (no menu).
- Q: Which tower is the goal (solved state)? → A: Start on the left tower; solved when the full stack is on the right tower.
- Q: What is the GitHub repository slug used for footer links? → A: gregpuzzles1/tower_hanoi
- Q: How can the New Game modal be dismissed? → A: Esc and backdrop click dismiss it; focus is trapped while open; background is inert.
- Q: After an invalid move, does the disc remain selected or is selection canceled? → A: Selection is canceled after the invalid-move feedback.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Start A New Game (Priority: P1)

As a player, I can start a new Tower of Hanoi game from a slim top bar so I can quickly choose the number of discs and begin playing.

**Why this priority**: Without starting a game and seeing the layout, nothing else matters.

**Independent Test**: Can be fully tested by loading the page, opening the New Game modal, selecting disc counts from 3 to 7, and starting a game to confirm the board resets correctly.

**Acceptance Scenarios**:

1. **Given** the site is loaded, **When** I activate "New Game", **Then** a centered modal/overlay opens with disc count controls and Start/Cancel actions.
2. **Given** the modal is open, **When** I decrement discs below 3 or increment above 7, **Then** the control prevents going out of range.
3. **Given** the modal is open, **When** I choose 7 discs, **Then** the UI shows "Minimum moves: 127".
4. **Given** the modal is open, **When** I press Cancel (or dismiss the modal), **Then** the modal closes without changing the current game.
5. **Given** the modal is open, **When** I press Start, **Then** the game resets and displays exactly the selected number of discs on the starting tower.

---

### User Story 2 - Play With Mouse Or Touch (Priority: P2)

As a player, I can solve the puzzle with mouse/touch by selecting a source tower and destination tower, with clear visual feedback and smooth animations.

**Why this priority**: This is the core gameplay interaction for most users.

**Independent Test**: Can be fully tested by completing a small game (3 discs) using only click/tap interactions.

**Acceptance Scenarios**:

1. **Given** a game is in progress, **When** I click/tap a tower with at least one disc, **Then** the top disc visibly highlights/lifts to indicate selection.
2. **Given** a disc is selected, **When** I click/tap a destination tower where the move is legal, **Then** the disc animates to the destination tower and becomes the new top disc.
3. **Given** a disc is selected, **When** I click/tap the same tower again, **Then** the selection cancels and the disc returns to its resting state.

---

### User Story 3 - Play With Keyboard (Priority: P3)

As a desktop player, I can play using the keyboard so I can make moves efficiently without a mouse.

**Why this priority**: Keyboard support improves accessibility and makes the site feel polished.

**Independent Test**: Can be fully tested by solving a 3-disc game using only the keyboard.

**Acceptance Scenarios**:

1. **Given** a game is in progress, **When** I press 1, 2, or 3, **Then** the corresponding tower is selected as the source (if it has a top disc).
2. **Given** a source disc is selected, **When** I press Left/Right, **Then** the destination selection changes between towers with a clear focus indicator.
3. **Given** a destination is focused and a disc is selected, **When** I press Enter or Space, **Then** the disc is dropped to the focused tower if the move is legal.
4. **Given** a disc is selected, **When** I press Esc, **Then** selection is canceled without moving a disc.

---

### User Story 4 - Invalid Move Feedback (Priority: P4)

As a player, I get immediate feedback when attempting an invalid move so I understand the rule and can continue.

**Why this priority**: Prevents confusion and reduces frustration.

**Independent Test**: Can be tested by attempting to place a larger disc on a smaller disc and verifying the move is rejected with feedback.

**Acceptance Scenarios**:

1. **Given** I attempt to place a larger disc on a smaller disc, **When** I choose the destination tower, **Then** the disc briefly jiggles and snaps back to the original tower.
2. **Given** the invalid move occurs, **When** the feedback is shown, **Then** a small tooltip appears near the disc with the exact text: "Larger discs can't be placed on smaller ones." and then disappears.

---

### User Story 5 - Win Celebration, Content, And Footer (Priority: P5)

As a player, I get a celebratory confirmation when I solve the puzzle, and I can read how to play plus background information and project links.

**Why this priority**: Reinforces accomplishment, adds educational value, and makes the project feel complete.

**Independent Test**: Can be tested by solving a 3-disc game and verifying the win popup/confetti and the presence of the content sections and footer links.

**Acceptance Scenarios**:

1. **Given** all discs are moved to the goal tower, **When** the final move completes, **Then** a congratulatory popup appears and a confetti effect triggers.
2. **Given** I scroll below the playing area, **When** I view the page content, **Then** I see a "How to play" paragraph, followed by history paragraphs, followed by applications paragraphs.
3. **Given** I view the footer, **When** I click the repository link or "Open an Issue", **Then** I am taken to the correct GitHub pages.

### Edge Cases

- Selecting a tower with no discs (should not select a disc; may show subtle feedback).
- Attempting to move while an animation is already in progress (input should be ignored or queued deterministically).
- Rapid repeated clicks/taps on towers (no duplicated moves; no broken state).
- Using keyboard controls when focus is not in the game area (should not hijack typing in other controls).
- Switching disc count mid-game and pressing Cancel (state remains unchanged).
- Resizing the viewport during play (layout remains usable; no lost discs).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The page MUST display a slim top bar/header above the towers that includes the title "Tower of Hanoi" and a "New Game" control.
- **FR-001a**: The top bar MUST remain visible above the towers on mobile and desktop and SHOULD be between 48px and 64px tall (inclusive).
- **FR-002**: The "New Game ▼" control MUST look like a dropdown button (includes a down-caret indicator) but MUST directly open the New Game modal (no intermediate menu).
- **FR-003**: Activating "New Game" MUST open a centered modal/overlay that blocks gameplay interaction until it is dismissed.
- **FR-003a**: While the modal is open, keyboard focus MUST be trapped within the modal.
- **FR-003b**: While the modal is open, pressing Esc MUST dismiss the modal without changing the current game.
- **FR-003c**: While the modal is open, clicking/tapping the backdrop MUST dismiss the modal without changing the current game.
- **FR-004**: The modal MUST display a disc count control in the form: "Discs: [ - ] <value> [ + ]".
- **FR-005**: The disc count MUST be constrained to an inclusive range of 3 to 7.
- **FR-006**: The modal MUST display "Minimum moves: <number>" for the currently selected disc count, where minimum moves is computed as $2^n - 1$.
- **FR-007**: The modal MUST provide "Start" and "Cancel" actions; Start resets the game to the chosen disc count and Cancel closes the modal without changes.
- **FR-008**: The game MUST have exactly three towers.
- **FR-008a**: A new game MUST start with all discs stacked on the left tower.
- **FR-008b**: The puzzle MUST be considered solved when all discs are stacked (in correct order) on the right tower.
- **FR-009**: For mouse/touch input, the game MUST support selecting a source tower, visually highlighting/lifting the top disc, and selecting a destination tower.
- **FR-010**: Legal moves MUST animate the disc moving into place on the destination tower.
- **FR-010a**: For legal moves, the disc movement animation MUST begin within 300 ms of the user action (click/tap or Enter/Space).
- **FR-010b**: While a disc move animation is in progress, additional move inputs MUST be ignored (no queuing).
- **FR-011**: Illegal moves (placing a larger disc on a smaller disc) MUST be rejected and MUST show (a) a brief jiggle animation and snap-back and (b) a tooltip near the disc with the exact text: "Larger discs can't be placed on smaller ones."
- **FR-011a**: After an illegal move attempt, the disc selection MUST be canceled (no disc remains "picked up").
- **FR-011b**: The invalid-move tooltip MUST remain visible for about 1.5 seconds and MUST disappear automatically; repeated invalid attempts restart the visibility timer.
- **FR-012**: For desktop keyboard input, the game MUST support: 1/2/3 to select source tower; Left/Right to change destination selection; Enter or Space to drop; Esc to cancel selection.
- **FR-013**: Discs 1-7 MUST each have distinct colors and remain visually distinguishable.
- **FR-014**: When the puzzle is solved, the site MUST show a congratulatory popup and a confetti effect.
- **FR-014a**: The congratulatory popup MUST include a Close control and a "New Game" control; Close dismisses the popup, and "New Game" opens the New Game modal.
- **FR-015**: Below the playing area, the page MUST include: (a) a "How to play" paragraph; (b) one or more paragraphs on the history of Tower of Hanoi; (c) one or more paragraphs on applications of Tower of Hanoi.
- **FR-016**: The footer MUST include: "© 2025-2026 Greg Christian", a link labeled "MIT License", the email address "gregpuzzles1@gmail.com", a link to the project repository on GitHub, and a link labeled "Open an Issue" that opens the repository's issue creation page.
- **FR-016a**: The repository link MUST point to `https://github.com/gregpuzzles1/tower_hanoi`.
- **FR-016b**: The "Open an Issue" link MUST point to `https://github.com/gregpuzzles1/tower_hanoi/issues/new`.
- **FR-017**: The footer end-year MUST update automatically when the calendar year changes (e.g., becomes 2025-2027 on January 1st, 2027) without requiring a manual edit.
- **FR-018**: The site MUST remain functional as a static website suitable for static hosting.

### Key Entities *(include if feature involves data)*

- **Game**: Current disc count, current tower stacks, move count, start time, solved state.
- **Tower**: An ordered stack of discs.
- **Disc**: Size (1-n), color identity, current tower.
- **Move**: Source tower, destination tower, disc moved.
- **New Game Settings**: Selected disc count.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A new visitor can start a 3-disc game within 30 seconds of page load.
- **SC-002**: For legal moves, the disc visibly begins moving within 300 ms of the user action (click/tap or Enter/Space).
- **SC-003**: 95% of attempted invalid moves display the tooltip message and snap-back feedback without leaving the puzzle in an incorrect state.
- **SC-004**: 90% of desktop users can complete at least one valid move using keyboard-only controls on the first try.
- **SC-005**: The footer displays the correct year range on January 1st of a new year without a code change.

## Assumptions

- Default disc count when opening the New Game modal is 4.
- The site is served from a GitHub Pages base path that may include the repository name; links and assets must work under that constraint.
- The GitHub repository for links is `gregpuzzles1/tower_hanoi`.

## Out Of Scope

- User accounts, leaderboards, and cloud sync.
- Multiplayer or competitive modes.
- Native mobile apps (this is a web experience).


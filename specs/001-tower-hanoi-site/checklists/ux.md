# UX Checklist: Modern Tower of Hanoi Website

**Purpose**: Unit tests for UX + interaction requirements writing (completeness, clarity, consistency, measurability)
**Created**: 2026-01-22
**Feature**: [spec.md](../spec.md)
**Depth**: Standard
**Audience**: Author self-check

## Requirement Completeness

- [x] CHK001 Are the required top-bar elements fully specified (title text, control label, caret indicator, placement)? [Completeness, Spec §FR-001, Spec §FR-002]
- [x] CHK002 Are the modal requirements complete for all key interaction affordances (disc control, min moves, Start, Cancel)? [Completeness, Spec §FR-004, Spec §FR-006, Spec §FR-007]
- [x] CHK003 Are all gameplay input methods covered with explicit requirements (mouse/touch + keyboard) rather than only scenarios? [Completeness, Spec §FR-009, Spec §FR-012]
- [x] CHK004 Are visual feedback requirements specified for both selection and destination focus (what changes, where, and when)? [Completeness, Spec §FR-009, Spec §FR-012, Gap]
- [x] CHK005 Are win celebration requirements complete (popup content requirements, confetti behavior, dismissal/next action)? [Completeness, Spec §FR-014, Gap]
- [x] CHK006 Are content-section requirements complete beyond “presence” (headings, minimum paragraph counts, acceptable tone/reading level)? [Completeness, Spec §FR-015, Gap]
- [x] CHK007 Are footer requirements complete for link destinations, link labels, and formatting (including the year range format)? [Completeness, Spec §FR-016..FR-017]

## Requirement Clarity

- [x] CHK008 Is “slim top bar/header” defined with measurable UI constraints (height range, padding, breakpoints) rather than a subjective term? [Clarity, Spec §FR-001, Ambiguity]
- [x] CHK009 Is “centered modal/overlay” defined precisely (alignment rules, max width, mobile behavior) to avoid multiple interpretations? [Clarity, Spec §FR-003, Ambiguity]
- [x] CHK010 Is “blocks gameplay interaction until dismissed” specified in a measurable way (what inputs are blocked, what remains allowed)? [Clarity, Spec §FR-003, Ambiguity]
- [x] CHK011 Is the disc selection feedback (“highlights/lifts”) defined with concrete visual properties (elevation, outline, shadow, offset, duration)? [Clarity, Spec §FR-009, Ambiguity]
- [x] CHK012 Are move animation requirements defined with explicit timing/easing expectations (or a bounded range) rather than only “animates”? [Clarity, Spec §FR-010, Gap]
- [x] CHK013 Is the invalid-move feedback precisely defined (jiggle magnitude/duration, tooltip placement rules, tooltip dwell time)? [Clarity, Spec §FR-011, Ambiguity]
- [x] CHK014 Is the tooltip copy requirement complete for punctuation/case (exact string) and locale assumptions? [Clarity, Spec §FR-011]
- [x] CHK015 Are keyboard control requirements unambiguous about precedence and scope (when shortcuts are active, what happens if focus is in the modal or outside the board)? [Clarity, Spec §FR-012, Spec §FR-003a..FR-003c, Spec §Edge Cases]
- [x] CHK016 Is “distinct colors” clarified with accessibility constraints (color contrast, colorblind-safe palette, non-color cues)? [Clarity, Spec §FR-013, Gap]

## Requirement Consistency

- [x] CHK017 Are the modal-dismiss requirements consistent across Clarifications and functional requirements (Esc + backdrop, no game change)? [Consistency, Spec §Clarifications, Spec §FR-003b, Spec §FR-003c]
- [x] CHK018 Do the solved-state definitions align across requirements and data model (right tower, id=2)? [Consistency, Spec §FR-008b, Spec §Data Model “Solved condition”]
- [x] CHK019 Do invalid-move requirements align with selection-state rules (selection canceled after feedback)? [Consistency, Spec §FR-011a, Spec §Data Model “SelectionState”]
- [x] CHK020 Are the success criteria aligned with interaction requirements (e.g., “disc visibly begins moving within 300 ms” aligns with animation requirement definitions)? [Consistency, Spec §SC-002, Spec §FR-010, Gap]
- [x] CHK021 Are footer year-range requirements consistent with the required text (© 2025-2026) and the auto-update rule? [Consistency, Spec §FR-016, Spec §FR-017]

## Acceptance Criteria Quality

- [x] CHK022 Are the acceptance scenarios for New Game written to be objectively verifiable without relying on subjective UX judgments? [Acceptance Criteria, Spec §User Story 1]
- [x] CHK023 Are interaction acceptance scenarios complete for mobile touch (tap targets, accidental scroll, multi-touch) or explicitly out of scope? [Acceptance Criteria, Spec §User Story 2, Gap]
- [x] CHK024 Can “selection cancels” be verified purely from the written requirements (visual state definition, not just an implied state)? [Measurability, Spec §User Story 2, Spec §FR-009, Gap]
- [x] CHK025 Does the spec define what constitutes the “congratulatory popup” content (required text, actions, close affordance) so it’s testable? [Acceptance Criteria, Spec §FR-014, Gap]

## Scenario Coverage

- [x] CHK026 Are requirements present for the full primary interaction loop (select source → select destination → legal move animation → move count update if any → win detection)? [Coverage, Spec §FR-009..FR-014, Gap]
- [x] CHK027 Are alternate flows explicitly specified (cancel selection, reselect source, selecting empty tower) beyond being listed as edge cases? [Coverage, Spec §Edge Cases, Gap]
- [x] CHK028 Are exception flows specified for invalid moves (including what happens if the user tries again during feedback/animation)? [Coverage, Spec §FR-011, Spec §Edge Cases, Gap]

## Edge Case Coverage

- [x] CHK029 Is “attempting to move while an animation is already in progress” resolved into a clear requirement (ignore vs queue) instead of a suggestion? [Edge Case, Spec §Edge Cases, Ambiguity]
- [x] CHK030 Are viewport/responsive edge cases defined with measurable breakpoints and layout expectations (no overlap, minimum sizes)? [Edge Case, Spec §Edge Cases, Gap]

## Non-Functional Requirements (UX-Adjacent)

- [x] CHK031 Are accessibility requirements for the modal complete (focus trap behavior details, initial focus target, focus return target)? [NFR, Spec §FR-003a, Gap]
- [x] CHK032 Are reduced-motion requirements specified for animations/confetti (honor prefers-reduced-motion; provide alternative feedback)? [NFR, Gap]
- [x] CHK033 Are mobile usability requirements specified (touch target minimums, safe-area insets, scrolling behavior around the game area)? [NFR, Gap]
- [x] CHK034 Are performance/latency targets tied to specific user-visible interactions beyond one success criterion (e.g., input response for selection, tooltip appearance timing)? [NFR, Spec §SC-002, Spec §SC-003, Gap]

## Dependencies & Assumptions

- [x] CHK035 Are assumptions that affect UX explicitly marked as requirements or explicitly excluded (e.g., default disc count = 4)? [Assumption, Spec §Assumptions, Ambiguity]
- [x] CHK036 Are GitHub Pages constraints that affect UX (base path, hash routing implications for deep links) referenced in the spec or explicitly delegated to the plan? [Dependency, Spec §FR-018, Gap]

## Ambiguities & Conflicts

- [x] CHK037 Is there a clear definition for what “functional as a static website” means in UX terms (offline behavior, asset loading failures, no network assumptions)? [Ambiguity, Spec §FR-018, Gap]
- [x] CHK038 Are any terms in the spec subjective without measurable criteria (e.g., “sleek”, “modern”, “smooth animations”) and either clarified or removed from normative requirements? [Ambiguity, Gap]

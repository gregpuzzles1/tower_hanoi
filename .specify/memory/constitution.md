<!--
Sync Impact Report

- Version change: N/A (template) -> 1.0.0
- Modified principles: Template placeholders -> Static-first, Pages-compatible builds, CI as gate, A11y/perf baseline, Supply-chain safety
- Added sections: Filled Platform & Deployment; Filled Development Workflow; Filled Governance
- Removed sections: None
Templates requiring updates:
- updated: .specify/templates/plan-template.md
- updated: .specify/templates/tasks-template.md
- pending: None
- Deferred TODOs: None
-->

# tower_hanoi Constitution

## Core Principles

### I. Static-First

This project MUST be deployable as a static website (HTML/CSS/JS + assets).
It MUST NOT require a server runtime, databases, or long-lived backend services to function.

Rationale: GitHub Pages hosts static content; keeping it static simplifies security and ops.

### II. GitHub Pages Compatibility

The deployed output MUST be plain static files produced by a deterministic build.
All URLs and asset references MUST work when the site is served from a repository subpath
(e.g., `https://<user>.github.io/<repo>/`) unless the repository is configured for a custom domain.

Rationale: GitHub Pages commonly serves from a base path; broken relative paths are the #1 failure mode.

### III. CI Is The Quality Gate

Every change merged to the default branch MUST pass automated checks in GitHub Actions.
At minimum this includes:

- A clean install/build step that fails on errors
- A deployment workflow (or reusable workflow) that publishes the built static output to GitHub Pages

Tests are allowed and encouraged, but not required for this repository unless a feature spec explicitly
demands them.

Rationale: For a static app, build integrity is the essential guardrail.

### IV. Accessibility And Performance Baseline

User-facing pages MUST be usable with keyboard navigation and readable with semantic HTML.
Pages MUST load without console errors in a modern evergreen browser.

Rationale: A small baseline keeps the site broadly usable without overburdening development.

### V. Client-Side Security And Supply Chain

Secrets MUST NOT be embedded in client-side code or committed to the repository.
Third-party GitHub Actions in workflows MUST be pinned to a full-length commit SHA.
Dependencies MUST be locked (lockfile committed) and updated via routine maintenance.

Rationale: GitHub Pages is public by default; supply-chain and accidental secret exposure are the main risks.

## Platform & Deployment

- Hosting target is GitHub Pages.
- Deployments MUST be performed via GitHub Actions.
- The deploy workflow MUST use GitHub's supported Pages flow (e.g., `actions/deploy-pages`) and
	run with least-privilege permissions.
- The build output directory MUST be clearly defined (commonly `dist/` or `build/`) and only built
	artifacts are published.
- The site MUST not rely on runtime environment variables at request time.

## Development Workflow

- Default branch MUST remain deployable at all times.
- Changes SHOULD be made via pull requests.
- Pull requests MUST show green CI (build + Pages deploy workflow validation) before merge.
- Breaking changes to URLs, routing, or deployment configuration MUST be called out in the PR description.

## Governance

- This constitution is the project-wide override for build, quality gates, and deployment constraints.
- Amendments:
	- Proposed via pull request modifying `.specify/memory/constitution.md`
	- Must include a brief rationale and any required template updates
	- Requires approval from a repository maintainer
- Versioning policy for this document follows semantic versioning:
	- MAJOR: Removes or redefines a non-negotiable rule
	- MINOR: Adds a new non-negotiable rule or materially expands constraints
	- PATCH: Clarifies wording without changing meaning
- Compliance review expectation: feature plans and PRs MUST include a short constitution check
	describing how the change remains Pages-compatible.

**Version**: 1.0.0 | **Ratified**: 2026-01-22 | **Last Amended**: 2026-01-22

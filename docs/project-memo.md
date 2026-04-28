# Edgion Project Memo

## Product Direction

Edgion is a mobile-first learning app that helps Japanese learners understand news through background knowledge, quizzes, thought-tree notes, and progress reflection. The current stage is a Web/PWA MVP. The long-term target is TestFlight and Apple App Store readiness.

## Current Implementation

- Stack: Vite, React, TypeScript, plain CSS.
- Data source: built-in sample modules in `src/data/modules.ts`.
- Main screens: Home, Learn, Quiz, Thought Tree, Progress.
- Persistence: browser `localStorage`.
- PWA: manifest and service worker are present.
- Deployment: GitHub Pages through GitHub Actions.

## Active Guardrails

- Keep changes small and preserve existing MVP behavior.
- Do not add authentication, payments, cloud databases, analytics, push notifications, or App Store configuration without explicit approval.
- Do not introduce external services, API keys, secrets, or environment variables.
- Prefer built-in content and local state until product value is clearer.
- Use `npm run lint` and `npm run build` after implementation changes.

## Recent Work

- Added an App Store readiness roadmap in `docs/app-store-roadmap.md`.
- Added content guidelines in `docs/content-guidelines.md`.
- Added internal `sourceNotes` metadata to built-in modules for editorial review.
- Added first-run onboarding on Home.
- Added a Progress-screen action for resetting local learning data, with a confirmation dialog before deletion.
- Improved the empty Progress state with a small learning CTA.
- Extracted progress scoring and date-range helpers into `src/progress.ts`.
- Added optional reference-date support to Progress helpers for future deterministic tests.
- Documented Progress calculation behavior in `docs/progress-spec.md`.
- Added a manual QA checklist in `docs/qa-checklist.md`.
- Added Vitest with basic Progress helper tests.
- Added focused storage helper tests for local progress, thoughts, and onboarding state.
- Added a small Progress-to-Learn review link for each module.
- Added compact learner-facing source notes to Learn.
- Added privacy notes for the current local-only MVP behavior.
- Added a lightweight Review view for revisiting completed modules from Progress.
- Added a compact reviewed-state badge to Progress module cards.
- Refined PWA and social metadata for install/share previews.
- Added 192px and 512px PNG app icons for PWA install surfaces.
- Replaced the PWA icon artwork with the purple Edgion brand icon.
- Added a public support/privacy static page for future store-readiness work.
- Added subtle in-app links to the public Support / Privacy page.
- Refined the public Support / Privacy copy to better match the current MVP behavior.
- Added a reusable module template for future built-in lessons.
- Added a built-in module about food loss, discounting, and donation systems.
- Added difficulty and read-state labels to module cards.
- Added lightweight category and difficulty filters to the module picker.
- Limited service worker registration to production and unregister it during local development.
- Added thought tree character guidance and a saved-at status.
- Added lightweight Review navigation from Learn, Quiz, and Thought Tree.
- Added an app version badge sourced from `package.json` for public URL checks.

## Next Safe Task Candidates

- Add one more youth-relevant built-in module after source review.
- Draft one new built-in module with source notes using the module template.
- Add focused tests for review-state display logic if the Progress UI grows more complex.
- Add focused tests for storage helpers if the current localStorage behavior grows.

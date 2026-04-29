# Edgion

Edgion is a mobile-first learning app for building news literacy in Japanese. It turns a news topic into background knowledge, short quizzes, and a thought tree so learners can understand context and form their own opinions.

## Features

- Background-first news modules with history, institutions, stakeholders, and debate points
- Short quiz loops with explanations
- Thought tree notes for claim, reasons, evidence, counterpoints, and next questions
- Local progress persistence with `localStorage`
- PWA manifest and a simple service worker for the app shell

## Getting started

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

## Public preview

GitHub Pages URL:

https://kei-0928.github.io/Edgion/

Deployment is handled by GitHub Actions.

## Design notes

The MVP intentionally uses built-in sample modules instead of live news APIs. The UI reads from a `NewsModule[]` data structure, so RSS, editorial CMS content, or a News API can be introduced later without redesigning the learning flow.

Local storage keys:

- `edgion.progress.v1`
- `edgion.thoughts.v1`
- `edgion.thoughtMeta.v1`
- `edgion.onboarding.v1`

## Roadmap

The path from Web/PWA MVP to TestFlight and App Store readiness is tracked in [docs/app-store-roadmap.md](docs/app-store-roadmap.md).

App Store Connect metadata preparation is drafted in [docs/app-store-metadata.md](docs/app-store-metadata.md).

Support contact decisions for App Store readiness are tracked in [docs/support-contact-decision.md](docs/support-contact-decision.md).

PWA and HTML metadata readiness notes are tracked in [docs/pwa-metadata-audit.md](docs/pwa-metadata-audit.md).

Native readiness planning starts in [docs/native-readiness-brief.md](docs/native-readiness-brief.md), with Web runtime boundaries in [docs/web-runtime-boundaries.md](docs/web-runtime-boundaries.md) and local state persistence rules in [docs/local-state-contract.md](docs/local-state-contract.md).

Packaging options for the iOS path are compared in [docs/packaging-options-decision.md](docs/packaging-options-decision.md).

Content creation rules for safe, original learning modules are tracked in [docs/content-guidelines.md](docs/content-guidelines.md).

New built-in module drafts can start from [docs/module-template.md](docs/module-template.md).

Progress calculation rules are documented in [docs/progress-spec.md](docs/progress-spec.md).

Manual release checks are listed in [docs/qa-checklist.md](docs/qa-checklist.md).

Current privacy assumptions are summarized in [docs/privacy-notes.md](docs/privacy-notes.md).

Public support and privacy information is available at `/Edgion/support.html`.

## Future ideas

- Add RSS or curated editorial imports
- Add spaced repetition notifications
- Add shareable thought-tree summaries
- Add teacher or cohort dashboards
- Add source comparison and bias-check exercises

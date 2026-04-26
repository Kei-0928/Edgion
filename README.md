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

## Future ideas

- Add RSS or curated editorial imports
- Add spaced repetition notifications
- Add shareable thought-tree summaries
- Add teacher or cohort dashboards
- Add source comparison and bias-check exercises

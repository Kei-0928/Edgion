# Edgion QA Checklist

Use this checklist before publishing important MVP updates. It focuses on the current Web/PWA version and avoids App Store, account, payment, or backend checks.

## Core Smoke Test

- Open the app from the public GitHub Pages URL.
- Confirm Home loads without a blank screen.
- Confirm the visible app version matches `package.json`.
- Confirm the module picker shows all built-in modules.
- Confirm category and difficulty filters narrow the module picker.
- Confirm bottom navigation works on a narrow mobile viewport.

## Onboarding

- In a fresh browser profile or cleared site data, confirm the first-run onboarding appears.
- Confirm `はじめる` opens the Learn view.
- Confirm `あとでOK` dismisses onboarding.
- Reload and confirm dismissed onboarding does not reappear.

## Learn

- Open each built-in module.
- Confirm background cards are readable on mobile width.
- Tap `既読にする` and confirm Progress read count changes.

## Quiz

- Answer at least one quiz correctly and one incorrectly.
- Confirm correct and incorrect states are visually distinct.
- Confirm explanations appear after answering.
- Confirm Progress reflects quiz activity.

## Thought Tree

- Enter text in at least two thought fields.
- Confirm character counts and writing hints appear below textareas.
- Confirm the saved-at status appears after editing.
- Reload the page and confirm text is restored.
- Confirm Progress thought count updates for the current range.

## Review

- Open Review from Learn, Quiz, and Thought Tree.
- Confirm Review summarizes read state, quiz score, and thought notes.
- Tap `復習済みにする` and confirm the reviewed badge appears in Progress.
- Confirm Review links back to Learn, Quiz, and Tree.

## Progress

- Check `今日`, `今月`, and `全期間`.
- Confirm empty states show `教材を読む`.
- Confirm `教材を読む` opens Learn.
- Confirm module cards show read, reviewed, quiz, and thought activity states.
- Confirm `学習データをリセット` shows a confirmation dialog before clearing learning data.
- After confirming reset, verify read, quiz, and thought counts return to zero.

## PWA And Cache

- Open the public URL after a fresh deployment.
- Confirm the app does not show a blank screen.
- Confirm local development does not keep serving an old app shell after reload.
- If the app was previously installed or cached, reload once and confirm the latest app shell appears.
- Confirm `manifest.webmanifest` and `sw.js` are reachable under `/Edgion/`.

## Mobile Layout

- Check at around 390px width.
- Confirm buttons do not overlap the bottom navigation.
- Confirm long Japanese text wraps inside cards and buttons.
- Confirm Thought Tree textareas are comfortable to type into.

## Pre-Publish Commands

```bash
npm test
npm run lint
npm run build
```

All commands should pass before publishing.

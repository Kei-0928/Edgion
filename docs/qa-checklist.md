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
- Reload the app and confirm the reviewed state still appears.
- Confirm Review links back to Learn, Quiz, and Tree.

## Progress

- Check `今日`, `今月`, and `全期間`.
- Confirm empty states show `教材を読む`.
- Confirm `教材を読む` opens Learn.
- Confirm `社会理解の地図` shows six Knowledge Panel nodes with status labels.
- Confirm Knowledge Panel nodes fit on a small iPhone viewport without text overlap.
- Confirm tapping an untouched Knowledge Panel node opens Learn and tapping an active node opens Review.
- Confirm module cards show read, reviewed, quiz, and thought activity states.
- Confirm `学習データをリセット` shows a confirmation dialog before clearing learning data.
- After confirming reset, verify read, quiz, and thought counts return to zero.

## PWA And Cache

- Open the public URL after a fresh deployment.
- Confirm the app does not show a blank screen.
- Confirm local development does not keep serving an old app shell after reload.
- If the app was previously installed or cached, reload once and confirm the latest app shell appears.
- Confirm `manifest.webmanifest` and `sw.js` are reachable under `/Edgion/`.

## Local PWA Cache QA Record

Use this record when checking the production build locally. Codex can run these checks on the preview server; real iPhone install behavior remains a user-owned check.

- Date:
- Commit:
- Preview URL:
- Tester:
- Result: Pass / Needs fixes / Blocked
- Notes:

### Local Checks Codex Can Run

- `npm run build` passes.
- `npm run preview -- --host 127.0.0.1 --port 4173` serves the production build.
- `/Edgion/` returns HTTP 200 and loads without a blank screen.
- `/Edgion/manifest.webmanifest` returns HTTP 200.
- `/Edgion/sw.js` returns HTTP 200 and is not served from an old cached worker.
- `/Edgion/support.html` returns HTTP 200.
- Built `/Edgion/assets/*.js` and `/Edgion/assets/*.css` return HTTP 200.
- After one browser reload, Home still appears and no service-worker console errors are observed.

### Manual Or Tooling-Dependent Local Checks

- Cache Storage contains the active `edgion-shell-*` cache with the shell files and built JS/CSS assets.
- After the first successful online load, offline reload shows the cached app shell or another recoverable state.

### Conditional Regression Checks

- After a service-worker cache version change, old `edgion-` caches are removed and the latest shell appears after refresh.

### User-Only Real iPhone Checks

- Safari opens the public GitHub Pages URL without a blank screen.
- Add to Home Screen creates the expected icon, name, and artwork.
- The home-screen app opens in standalone display mode.
- Offline launch from the home-screen icon shows the cached app shell or a recoverable state.
- Returning online and refreshing once shows the latest deployed build.
- A previously installed or cached build does not keep serving stale content after deployment.
- Safe-area spacing keeps bottom navigation and primary actions visible.
- Thought Tree text entry remains usable while the iOS keyboard is open.

### Owner Real iPhone QA Record

Use this with the public GitHub Pages URL only. This does not require App Store Connect, TestFlight, signing, certificates, or an Apple Developer Program account.

- Date:
- Commit or visible app version:
- iPhone model:
- iOS version:
- Safari result: Pass / Needs fixes / Blocked
- Home-screen PWA result: Pass / Needs fixes / Blocked
- Notes:

Checks:

- Open `https://kei-0928.github.io/Edgion/` in Safari and confirm Home loads without a blank screen.
- Add to Home Screen, launch from the icon, and confirm it opens as the expected Edgion app.
- In Progress, confirm `社会理解の地図` shows all six Insight Map nodes without text overlap.
- Tap one untouched Insight Map node and confirm it opens Learn; tap one active or reviewed node and confirm it opens Review.
- From reset learning data, confirm all six Insight Map nodes show `未着手`, `着手 0/6`, and `復習済み 0`.
- Tap one untouched node, mark the module read, return to Progress, and confirm the node shows `背景読了` and `着手 1/6`.
- Answer all quiz questions for the same module, return to Progress, and confirm the node shows `確認済み`.
- Enter one Thought Tree field for the same module, return to Progress, and confirm the node shows `考えあり`.
- Open Review, tap `復習済みにする`, return to Progress, and confirm the node shows `復習済み` and the counter shows `復習済み 1`.
- Close Safari or the home-screen app, reopen, and confirm the reviewed state and local learning data persist.
- Use `学習データをリセット`, confirm Edgion learning progress is reset, and confirm unrelated Safari/browser data is not affected.
- After reset and reopen, confirm the Insight Map returns to six `未着手` nodes, `着手 0/6`, and `復習済み 0`.
- Turn on Airplane Mode after one successful online load, reopen or reload, and confirm the cached app shell or another recoverable state appears.
- Return online, refresh once, and confirm the latest deployed build appears.
- Open the support/privacy page from the app and confirm the Support and Privacy information is reachable and describes local-only learning data behavior.

### Latest Owner Real iPhone Result

- Date: 2026-04-30
- Commit or visible app version: deployed after merge commit `f25a858`
- iPhone model:
- iOS version:
- Safari result: Pass for Insight Map visibility
- Home-screen PWA result:
- Notes:
  - The project owner confirmed on a real iPhone that Progress shows `社会理解の地図`.
  - The project owner later confirmed that all owner-device QA checks in this section passed, including node-state progression, persistence after close/reopen, reset behavior, Add to Home Screen behavior, and offline/cache behavior.

### Latest Local Result

- Date: 2026-04-30
- Commit: `7a16c4d`
- Preview URL: `http://127.0.0.1:4174/Edgion/`
- Tester: Codex
- Result: Pass for local production preview / Blocked for real iPhone and offline cache storage checks
- Notes:
  - `npm test`, `npm run lint`, and `npm run build` passed before preview.
  - `/Edgion/`, `/Edgion/manifest.webmanifest`, `/Edgion/sw.js`, `/Edgion/support.html`, built JS, and built CSS returned HTTP 200 in production preview.
  - `sw.js` served `edgion-shell-v7` and is configured to precache built JS/CSS assets found in `index.html`.
  - The app opened with title `Edgion`.
  - Browser navigation from `/Edgion/` to `/Edgion/support.html` and back to `/Edgion/` kept the app shell available.
  - Browser reload kept the app available and showed the main navigation.
  - Progress showed `社会理解の地図` with six Insight Map nodes and status labels.
  - At a narrow mobile viewport, Insight Map nodes stacked without observed text overlap.
  - Tapping an untouched Insight Map node opened the module learning view.
  - Marking a module reviewed persisted after reload and appeared again in Progress.
  - No browser console errors were observed after load and reload.
  - Offline reload and Cache Storage contents could not be verified with the current browser automation surface, so this record remains blocked.
  - Installed PWA behavior and iOS Safari Add to Home Screen remain user-only real-device checks.

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

## TestFlight Candidate QA Record

Use this section when the Web/PWA build is close to a native iOS wrapper or TestFlight candidate. Record actual devices and results instead of treating the checklist as a memory aid.

- Date:
- Build or commit:
- Tester:
- Public URL or local build:
- Result: Pass / Needs fixes / Blocked
- Notes:

### Device Coverage

- iPhone small screen, such as iPhone SE size:
  - Device / simulator:
  - iOS version:
  - Browser or shell:
  - Result:
- iPhone standard or large screen:
  - Device / simulator:
  - iOS version:
  - Browser or shell:
  - Result:
- Desktop browser smoke test:
  - Browser:
  - Result:

### iOS And PWA Checks

- Safari opens the app without a blank screen.
- Add to Home Screen creates an icon with the expected name and artwork.
- The home-screen app opens in standalone display mode.
- Safe-area spacing does not hide navigation or primary actions.
- Text entry in Thought Tree remains usable when the iOS keyboard is open.
- Offline reload shows the cached app shell or a recoverable state.
- Returning online reloads the latest deployed app after one refresh.
- A previously installed or cached build does not keep serving stale content after deployment.

### Store-Readiness Notes

- Support / Privacy link is reachable from the app.
- Local data reset behavior is verified before any reviewer build.
- No login, payment, analytics, push notification, cloud sync, or live news feature has been added without a separate review.
- Any App Store Connect, Bundle ID, signing, certificate, or TestFlight setup remains outside this checklist until explicitly approved.

# Edgion Packaging Options Decision

This document compares possible paths from the current Web/PWA MVP toward an iOS App Store candidate. It is a decision aid only. It does not approve installing Capacitor, creating an Xcode project, configuring signing, creating a Bundle ID, using App Store Connect, or starting TestFlight.

## Decision Status

Current status: provisional.

Recommended direction for now:

1. Keep improving the Web/PWA MVP.
2. Run focused Web/PWA QA for cache, mobile layout, storage, and support/privacy surfaces.
3. Prepare a small Capacitor proof-of-concept plan, but do not implement it until explicitly approved.

## Current Constraints From The App

- The app is a Vite React single-page app with in-memory `ViewId` navigation.
- Production Web deployment assumes GitHub Pages under `/Edgion/`.
- `manifest.webmanifest` and `sw.js` use hard-coded `/Edgion/` paths.
- The app uses browser `localStorage` for all learner state.
- The app has no account, backend, analytics, payment, push notification, or live news API.
- External links are limited to source notes and support/repository surfaces.
- The service worker caches the app shell and caches same-origin assets after successful fetches.
- Support/privacy is currently a static `support.html` page.

These constraints make a thin wrapper possible in principle, but they also mean base path, service worker behavior, storage persistence, and external-link handling must be verified before native packaging.

## Option A: Stay Web/PWA-Only Longer

### Fit

This option best matches the current implementation.

### Advantages

- Lowest implementation risk.
- No native tooling, signing, Bundle ID, App Store Connect, or TestFlight setup required.
- Keeps the no-login, no-payment, no-tracking privacy posture simple.
- Lets the team improve content, onboarding, Progress, storage resilience, and QA before native complexity.
- GitHub Pages deployment already exists.

### Risks

- No App Store presence yet.
- iOS home-screen behavior may still differ from App Store expectations.
- PWA install and offline behavior can vary by browser and device.
- Monetization through App Store mechanisms cannot be validated yet.

### Best Use

Use this path while proving the learning loop, content quality, retention value, support/privacy wording, and mobile layout.

## Option B: Capacitor Thin Wrapper

### Fit

This is the most likely first native packaging path if the Web/PWA MVP remains the main product surface.

### Advantages

- Reuses the existing React/Vite app.
- Can preserve the current local-first architecture.
- Lets App Store screenshots and TestFlight feedback focus on the real product experience.
- More reversible than a full native rewrite.

### Risks

- The current `/Edgion/` base path may need a root or bundled-asset strategy.
- Service worker behavior inside a native webview may need to be disabled or adjusted.
- `localStorage` persistence must be tested across app relaunches and updates.
- External links may need explicit handling so source notes and support pages open safely.
- iOS keyboard and safe-area behavior must be tested with Thought Tree and bottom navigation.
- Native setup introduces Xcode, signing, provisioning, Bundle ID, App Store Connect, and TestFlight work, all of which require explicit approval.

### Best Use

Use this path only after Web/PWA QA shows the app is stable and after a specific native proof-of-concept plan is approved.

## Option C: Full Native Rewrite Later

### Fit

This is not recommended for the current MVP phase.

### Advantages

- Maximum control over iOS navigation, storage, keyboard, safe areas, and App Store-native behavior.
- Better long-term fit if the product later needs deep native features.

### Risks

- Highest cost and slowest path.
- Rebuilds existing learning flow, content rendering, Progress, storage, and QA from scratch.
- Adds more surface area before the core product and content strategy are proven.
- Could delay TestFlight learning unnecessarily.

### Best Use

Reconsider only if a thin wrapper fails because of serious WebView limitations or if future product requirements depend on native-only capabilities.

## Comparison Summary

| Criterion | Web/PWA Longer | Capacitor Wrapper | Native Rewrite |
| --- | --- | --- | --- |
| Current fit | High | Medium-high | Low |
| Speed | High | Medium | Low |
| Reuse existing UI | Full | Full or near-full | Low |
| App Store path | None yet | Direct candidate path | Direct but expensive |
| Technical risk | Low | Medium | High |
| Reversibility | High | Medium | Low |
| Requires Apple setup | No | Yes, later | Yes, later |
| Best current role | Stabilize MVP | Future proof-of-concept | Later fallback |

## Detailed Comparison Factors

| Factor | Web/PWA Longer | Capacitor Wrapper | Native Rewrite |
| --- | --- | --- | --- |
| `/Edgion/` path dependency | Keep current GitHub Pages path. | Must decide whether bundled assets use `/Edgion/`, root, or another base. | Path dependency disappears, but routing must be rebuilt. |
| Service worker and offline behavior | Keep current `sw.js`, then test cache/update behavior. | Decide whether service worker should run in the webview or be disabled/replaced. | Needs a new offline strategy. |
| Local state | Keep `localStorage` contract and `.v1` keys. | Verify webview `localStorage` survives relaunches and app updates. | Needs storage migration or a new persistence model. |
| Navigation | Current in-memory `ViewId` navigation is acceptable. | Back behavior, shortcuts, and future deep links need a plan. | Native navigation must be rebuilt. |
| External links | Browser behavior remains familiar. | Must choose how source notes and support pages open and return. | Native link handling must be designed. |
| Safe area and keyboard | Test as Safari/PWA behavior. | Test bottom navigation and Thought Tree textareas in iOS webview. | Full control, but more implementation work. |
| Content supply | Built-in `newsModules` ship with each release. | Same content bundle can be reused. | Content schema and rendering must be ported. |
| Privacy review | Current no-login, no-ads, no-tracking posture stays simple. | Privacy/support wording must match native wrapper behavior. | Privacy surfaces must be rewritten for native behavior. |
| QA scope | Web/PWA smoke, cache, mobile, and storage QA. | Adds webview, relaunch, update, link, safe-area, and keyboard QA. | Adds full native regression coverage. |
| Reversibility | Highest. | Medium; native config can be abandoned but adds overhead. | Lowest; major rewrite investment. |

## Provisional Decision

Do not start native tooling yet.

The next product-safe path is:

1. Complete Web/PWA preflight QA.
2. Confirm support/privacy contact strategy.
3. Confirm local storage persistence expectations.
4. Decide how `/Edgion/` should be handled in a packaged build.
5. Draft a Capacitor proof-of-concept checklist.
6. Ask for explicit approval before installing or configuring native tooling.

## User-Only Decisions Needed Later

These require the project owner, not the autonomous coding agent:

- Enroll in or confirm access to the Apple Developer Program.
- Choose the official support contact method.
- Confirm the final public privacy policy/support URL.
- Decide whether the first App Store release is free-only.
- Approve any In-App Purchase or subscription plan before implementation.
- Approve any Bundle ID, signing, certificate, provisioning, App Store Connect, or TestFlight action.

## Next Safe Engineering Tasks

- Run and record local PWA cache QA.
- Add a support-contact decision note without adding real personal contact information.
- Create a native preflight QA checklist from `docs/native-readiness-brief.md`, `docs/web-runtime-boundaries.md`, and `docs/local-state-contract.md`.
- Add content-module invariant tests so future lesson additions do not break quiz or source-note structure.

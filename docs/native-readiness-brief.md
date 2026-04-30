# Edgion Native Readiness Brief

This brief defines what must be understood before Edgion moves from the current Web/PWA MVP toward an iOS wrapper or native app. It is a planning document only. It does not approve installing native tooling, creating an Xcode project, configuring signing, creating a Bundle ID, using App Store Connect, or starting TestFlight.

## Current Web/PWA Shape

- Runtime: Vite, React, TypeScript, and plain CSS.
- Entry point: `src/main.tsx`.
- Content source: built-in `newsModules` from `src/data/modules.ts`.
- View model: local React state with `ViewId` values for Home, Learn, Quiz, Tree, Progress, and Review.
- Routing: no URL router yet. Navigation is in-memory state, not path-based deep links.
- Persistence: browser `localStorage` through `src/storage.ts`.
- Progress logic: pure helpers in `src/progress.ts`.
- PWA shell: `public/manifest.webmanifest` and `public/sw.js`.
- Public path: GitHub Pages under `/Edgion/`.
- Public support/privacy surface: `public/support.html`.

## MVP Behavior To Preserve

- The app must remain usable without login.
- The app must remain usable without payment, subscription, ads, analytics, push notifications, cloud sync, or live news feeds.
- Built-in modules should continue to work offline after the app shell and assets have been cached.
- Learners must be able to read, answer quizzes, write thought notes, review learning, and reset local learning data.
- Existing local storage keys should keep working unless a migration plan is written first.
- External source-note links should remain clearly external and should not become hidden data collection points.
- The support/privacy page must stay reachable from the app.

## What Native Preparation Should Validate

Before choosing a packaging path, validate these Web/PWA assumptions:

- The `/Edgion/` base path is appropriate for the packaged environment, or there is a documented plan to remove it.
- `import.meta.env.BASE_URL` continues to resolve support and service worker URLs correctly.
- `__APP_VERSION__` continues to show the package version.
- The service worker behavior is compatible with the target wrapper, or is explicitly disabled/adjusted there.
- `localStorage` persists reliably after app relaunch.
- `localStorage` write failures do not crash the app.
- Thought Tree textareas remain usable with the iOS keyboard.
- Bottom navigation and primary actions are not hidden by safe-area insets.
- External links to source notes and support pages open in an expected browser or in-app browser surface.
- Offline reload and post-update reload do not produce a blank screen.

## Packaging Options To Compare Later

The next design document should compare these options without implementing them yet:

- Stay Web/PWA-only longer while improving content and QA.
- Use Capacitor as a thin iOS wrapper around the current app.
- Rebuild as a native iOS app later if WebView constraints become too limiting.

The comparison should consider reversibility, testing cost, routing assumptions, service worker behavior, storage persistence, external links, screenshots, and support/privacy requirements.

## Out Of Scope Until Explicit Approval

- Apple Developer Program enrollment.
- App Store Connect app creation.
- Bundle ID, certificates, signing, provisioning profiles, or Xcode project setup.
- TestFlight distribution.
- In-App Purchase, subscriptions, paid app setup, or external purchase flows.
- Authentication, cloud database, analytics, telemetry, push notifications, or account systems.
- Live news APIs, RSS imports, CMS integration, or third-party content ingestion.

## Open Questions

- Should the native wrapper use the same `/Edgion/` base path or a root path?
- Should the service worker run inside a native shell, or should native builds use a different offline strategy?
- How should external source-note links open on iOS?
- What support contact will be stable enough for App Review and learners?
- Should App Store screenshots be captured from the Web/PWA, a native wrapper, or both?
- How should paid lesson packs be represented later without changing the free core learning loop?

## Recommended Next Step

Create a packaging options decision document before installing native tooling. The first recommendation should remain provisional until Web/PWA cache behavior, local storage persistence, mobile layout, and external-link handling have been tested on real iPhone hardware.

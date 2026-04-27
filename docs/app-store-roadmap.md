# Edgion App Store Roadmap

Edgion is currently a mobile-first Web/PWA MVP. The next goal is to grow it into a product-quality learning app that can be tested through TestFlight and, later, submitted to the Apple App Store.

This roadmap keeps the current MVP stable while making the path to iOS explicit.

## Current State

- Runtime: Vite, React, TypeScript, plain CSS.
- Content: built-in Japanese sample modules in `src/data/modules.ts`.
- Learning flow: Home, Learn, Quiz, Thought Tree, Progress.
- Persistence: browser `localStorage`.
- PWA: `manifest.webmanifest` and a service worker for the app shell.
- Deployment: GitHub Pages through GitHub Actions.

## App Store Readiness Gaps

### Product

- Add enough lessons for a meaningful first session.
- Make onboarding clear for first-time learners.
- Improve retention loops such as review prompts, streaks, or lightweight goals.
- Keep the tone youth-friendly without becoming too casual for civic topics.

### Content

- Avoid copying full news articles into the app.
- Prefer original background explainers, source links, timelines, glossary items, and discussion prompts.
- Prepare a repeatable editorial workflow for adding and reviewing modules.
- Track source notes for factual claims before public release.

### Technical

- Keep the Web/PWA version stable before adding native wrappers.
- Decide whether to use Capacitor for iOS packaging or migrate to a native stack later.
- Test on real iPhones, including small screens and Safari/Chrome behavior.
- Add basic automated checks around core learning state and storage behavior.

### Data And Privacy

- Keep the MVP usable without an account.
- Do not add authentication, cloud sync, analytics, notifications, or payments without a separate design review.
- Prepare a privacy policy before TestFlight or App Store submission.
- Define how users can reset or delete locally stored learning data.

### Store Operations

- Join the Apple Developer Program before TestFlight.
- Prepare app icon assets, screenshots, age rating, description, support URL, and privacy details.
- Use TestFlight to gather feedback before App Store submission.
- Review Apple App Store guidelines before adding user accounts, paid features, or user-generated sharing.

## Prioritized Roadmap

### v0.2: Stabilize The Web MVP

- Add this roadmap and keep README aligned.
- Add 5 to 10 high-quality sample modules.
- Add a short first-run onboarding flow.
- Improve Progress copy and empty states.
- Add a visible way to reset local learning data.
- Continue checking `npm run lint` and `npm run build` before publishing.

### v0.3: Strengthen Learning Loops

- Add a simple review mode for previously read modules.
- Add optional daily or weekly learning goals without notifications.
- Improve thought tree summaries so learners can revisit their opinion.
- Add content source notes to modules.

### v0.4: Prepare For iOS Packaging

- Evaluate Capacitor as the first iOS packaging path.
- Confirm routing, base path, service worker behavior, and local storage behavior in a native shell.
- Prepare iOS icon and splash assets.
- Check safe-area spacing and keyboard behavior on iPhone.

### v0.5: TestFlight Candidate

- Add required privacy policy and support information.
- Build the iOS app in Xcode.
- Run smoke tests on at least two iPhone screen sizes.
- Distribute through TestFlight to a small group.
- Collect feedback on onboarding, lesson clarity, quiz explanations, and Progress.

### v1.0: App Store Submission

- Finalize App Store metadata and screenshots.
- Confirm copyright-safe content and source review.
- Confirm privacy disclosures match the app behavior.
- Submit for App Review and respond to review feedback.

## Implementation Guardrails

The following changes require explicit approval before implementation:

- Authentication or user accounts.
- Cloud database, sync, analytics, or telemetry.
- Push notifications.
- Payments, subscriptions, or in-app purchases.
- App Store, TestFlight, Xcode, signing, or Apple Developer Program setup.
- Major UI redesigns or navigation changes.
- Live news API, RSS import, or third-party content ingestion.

Small, safe changes can proceed when they preserve the current MVP behavior:

- Documentation updates.
- Additional built-in modules.
- Copy improvements.
- Focused accessibility improvements.
- Small empty-state or progress-display refinements.
- Tests and type-safety improvements.

## Next Recommended Task

Add a first-run onboarding screen that briefly explains the Edgion learning loop:

1. Read the background.
2. Try the quiz.
3. Build a thought tree.
4. Check Progress.

This is a small product-quality improvement that helps new users understand the app without requiring accounts, payments, database changes, or native iOS setup.

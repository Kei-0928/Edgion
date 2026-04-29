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
- Prepare a final privacy policy before TestFlight or App Store submission.
- Keep `docs/privacy-notes.md` aligned with the app's actual data behavior until then.
- Define how users can reset or delete locally stored learning data.

### Store Operations

- Join the Apple Developer Program before TestFlight.
- Track user-owned submission tasks in `docs/user-owned-app-store-checklist.md`.
- Prepare app icon assets, screenshots, age rating, description, support URL, and privacy details.
- Use TestFlight to gather feedback before App Store submission.
- Review Apple App Store guidelines before adding user accounts, paid features, or user-generated sharing.

## Monetization Strategy

The preferred monetization path is trust-first freemium. Edgion should remain useful and safe as a free, accountless learning app before any paid feature is introduced.

### Recommended Sequence

1. Keep the first App Store candidate free.
   - Include enough built-in modules to show the learning loop.
   - Preserve the current no-login, no-ads, no-tracking posture.
   - Use the free release to validate onboarding, lesson clarity, retention, and support needs.

2. Add paid content only after the learning value is proven.
   - Prefer one-time paid lesson packs before subscriptions.
   - Good pack themes include elections and politics, AI and society, everyday economics, law and contracts, and climate and cities.
   - Any paid digital content on iOS requires a separate In-App Purchase design review before implementation.

3. Consider subscriptions only when content operations are repeatable.
   - A subscription makes sense after Edgion can reliably add new modules, review source notes, and maintain quality.
   - Subscription value should come from new lessons, deeper quizzes, review loops, or curated learning paths.

4. Consider school, tutoring, or inquiry-learning partnerships later.
   - B2B can be stronger than individual consumer revenue, but it likely requires login, class management, dashboards, exports, or cloud storage.
   - Treat this as a later product line because it would trigger authentication, database, privacy, and support design work.

### What To Avoid Early

- Avoid advertising as the first revenue model.
- Avoid analytics or tracking for monetization until there is a dedicated privacy review.
- Avoid adding payment, subscription, or external commerce flows without explicit approval.
- Avoid locking the core learning loop behind payment before App Store trust, content quality, and retention are proven.

### Revenue Guardrails

The following require explicit approval before implementation:

- In-App Purchase products.
- Subscriptions.
- Paid app pricing.
- External payment links or purchase flows.
- Analytics, attribution, ads, or tracking.
- Account login, cloud sync, or paid entitlements.

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
- Use `docs/packaging-options-decision.md` as the current packaging decision record.
- Keep `docs/native-readiness-brief.md`, `docs/web-runtime-boundaries.md`, and `docs/local-state-contract.md` aligned with the current Web/PWA implementation.
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

Evaluate the iOS packaging path before adding native tooling. Start with a local design document that compares Capacitor, a native rewrite, and staying Web/PWA-only for longer. Do not install Capacitor, create an Xcode project, or touch signing, Bundle ID, App Store Connect, or TestFlight settings without explicit approval.

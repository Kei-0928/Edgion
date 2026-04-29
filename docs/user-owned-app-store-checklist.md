# Edgion User-Owned App Store Checklist

This checklist tracks work that Codex must not perform without the project owner's explicit action or approval. It is for planning only and does not configure Apple Developer, App Store Connect, signing, Bundle ID, TestFlight, payments, accounts, analytics, or external services.

## When To Use This

Use this before moving from the Web/PWA MVP into a TestFlight or App Store submission workflow. Recheck Apple's current App Store Connect screens and review guidance at the time of submission.

## Owner Decisions Needed Before TestFlight

- Choose the official support contact method:
  - Dedicated support email, support form, or another maintained public support surface.
  - Avoid personal contact details that should not be public.
  - Ask users not to include sensitive personal information in support requests.
- Confirm the final public Support URL and Privacy Policy URL.
- Decide whether the first App Store candidate remains free-only.
- Approve any future native packaging path before tooling is installed.
- Approve any change involving authentication, cloud storage, analytics, notifications, payments, subscriptions, or in-app purchases.

## Owner Actions For Apple Setup

These actions require the project owner and should not be delegated to Codex without explicit approval at the time of action.

- Enroll in or confirm access to the Apple Developer Program.
- Create or confirm the App Store Connect app record.
- Choose the app name, SKU, primary language, category, age rating answers, and availability after reviewing the exact submitted content and features.
- Choose or approve the Bundle ID.
- Configure certificates, signing, provisioning profiles, and Xcode team settings.
- Create TestFlight builds and manage tester access.
- Submit any final App Store review build.

## Required Public Information

Before treating a build as submission-ready, confirm:

- Support URL is reachable and gives users a clear way to get help.
- Privacy Policy URL is reachable and matches the actual app behavior.
- Public page explains the current local-only learning data behavior.
- Public page explains how local learning data can be reset.
- App Store privacy nutrition labels match the implementation.
- Copyright and content-rights answers match the built-in learning modules and source-note approach.
- Age rating answers match the actual submitted build and current built-in module themes.

## Real Device QA Needed

Codex can run local preview and browser checks, but the project owner should verify these on real iPhone hardware before TestFlight or submission:

- Safari opens `https://kei-0928.github.io/Edgion/` without a blank screen.
- Add to Home Screen shows the expected app name and icon artwork.
- The home-screen app launches in standalone mode.
- Bottom navigation and primary actions are not hidden by safe-area insets.
- Thought Tree text entry remains usable with the iOS keyboard open.
- Progress shows the Insight Map / `社会理解の地図` without text overlap, and node taps open the expected Learn or Review flow.
- Mark one module as reviewed, close and reopen Safari or the home-screen app, then confirm the reviewed state and Insight Map status still appear.
- Local learning data persists after closing and reopening the app or browser.
- Local learning data reset works and does not clear unrelated browser data.
- Offline launch or reload shows the cached app shell or another recoverable state.
- Returning online and refreshing once shows the latest deployed build.

## Store Asset Work

Prepare and owner-approve:

- App icon set and any required native icon exports.
- App Store screenshots for required iPhone sizes.
- App description, subtitle, keywords, promotional text, and release notes.
- Reviewer notes explaining that the current app has no login, payment, analytics, ads, cloud sync, push notifications, or live news feed.
- A short support plan for incoming user feedback after release.

## Age Rating Review

Before answering App Store Connect age rating questions, owner-confirm:

- The submitted build still has no public posting, chat, social networking, unrestricted web browsing, ads, tracking, payments, gambling, or live news feed.
- Built-in modules are educational explainers about civic and life topics, not political campaigning, legal advice, emergency alerts, or real-time news coverage.
- Current topics include climate policy, school AI use, population decline, food loss, consumer contracts, and youth voting.
- Any future module involving violence, disasters, self-harm, drugs, sexuality, or other sensitive topics receives a separate content and age-rating review.

## Monetization Guardrails

The recommended first App Store candidate is free, accountless, and tracking-free. Before any revenue feature is implemented, the project owner must approve:

- Paid app pricing.
- In-App Purchase products.
- Subscriptions.
- Paid lesson packs.
- External purchase links or commerce flows.
- Entitlement storage, account login, cloud sync, or any payment-related backend.

## Stop And Ask Before Proceeding

Stop implementation and ask the project owner before:

- Installing native packaging tooling such as Capacitor.
- Creating or modifying an Xcode project.
- Changing production deployment settings.
- Creating API keys, OAuth credentials, certificates, signing assets, or secrets.
- Adding third-party SDKs for analytics, ads, crash reporting, payments, or notifications.
- Collecting or transmitting user data beyond the current local-only MVP behavior.

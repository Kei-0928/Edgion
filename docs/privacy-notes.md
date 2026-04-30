# Edgion Privacy Notes

This note tracks the privacy behavior of the current Web/PWA MVP and supports future TestFlight and App Store preparation. The public-facing summary is available in `public/support.html`. This is not a final legal privacy policy.

## Current MVP Behavior

Edgion currently works without an account, backend server, analytics service, payment system, push notifications, cloud sync, or live news API. Learning data stays on the user's device through browser `localStorage`.

## Data Stored Locally

The MVP stores these local keys:

- `edgion.progress.v1`: read state, quiz answers, review state, and activity timestamps including review timestamps.
- `edgion.thoughts.v1`: the learner's thought-tree notes.
- `edgion.thoughtMeta.v1`: thought-tree update timestamps.
- `edgion.onboarding.v1`: whether the first-run onboarding has been completed.

These values are used only to restore the learner's progress, support the Review view, and make the Progress screen useful.

## Data Not Collected In The MVP

The current MVP does not collect or transmit:

- Names, email addresses, phone numbers, or account identifiers.
- Precise location.
- Payment information.
- Analytics or advertising identifiers.
- Cloud-synced learning records.
- User-generated posts or shared public content.
- Browser history, contacts, photos, or device identifiers.

## User Control

Learners can reset local learning data from the Progress screen. This clears progress, quiz results, review state, thought notes, and thought metadata from the current browser storage.

The reset action does not clear onboarding completion because onboarding is not part of the learning record.

The reset action only affects the current browser or webview storage for Edgion. It does not clear data from other browsers, devices, browser profiles, or external websites opened from source links.

## Support Request Privacy

The public support page should ask users not to include sensitive personal information, private thought-tree notes, health information, school information, or other information unnecessary for support.

## External Links

Learn modules may show source-note links to official or public information pages. Opening those links takes the learner to an external website, where that website's own privacy practices apply.

## Current Public Support Surface

The public support and privacy page is available at `/Edgion/support.html`. For now, the GitHub repository is listed as the support contact surface because no formal support email or organization account has been confirmed.

## Future Review Triggers

Update this note and prepare a formal privacy policy before adding any of the following:

- Account login or authentication.
- Cloud sync, database storage, or backups.
- Analytics, crash reporting, or telemetry.
- Push notifications.
- Payments or subscriptions.
- User-generated sharing features.
- Live news feeds, RSS imports, or third-party content APIs.
- Native iOS packaging for TestFlight or App Store review.

## App Store Preparation Notes

Before TestFlight or App Store submission, confirm:

- The privacy policy matches the actual app behavior.
- App Store privacy nutrition labels match the implementation.
- The support URL and privacy policy URL are stable public pages.
- The public page clearly states when it is only an MVP privacy summary and not the final App Store privacy policy.
- Local data reset behavior is documented clearly enough for reviewers and learners.
- Any support contact listed publicly has been approved for that purpose.

## Preliminary App Privacy Answers

This is a draft for the current local-only MVP. The project owner must recheck App Store Connect against the exact submitted build before answering.

Candidate answer for the current MVP:

- Data collected from this app: No.
- Tracking: No.
- Third-party advertising: No.
- Analytics or crash reporting SDKs: No.
- Account data, contact information, location, identifiers, purchases, user content, or diagnostics transmitted to Edgion: No.

Important caveat: Edgion stores learning progress, quiz answers, review state, and thought-tree notes locally in browser or webview `localStorage`. In the current MVP these records are not sent to Edgion, Apple, or a third-party service by the app. If authentication, cloud sync, analytics, crash reporting, payments, support forms, push notifications, or external APIs are added, these draft answers must be discarded and rewritten.

# Edgion Privacy Notes

This note is a working draft for future TestFlight and App Store preparation. It is not a final legal privacy policy.

## Current MVP Behavior

Edgion currently works without an account, backend server, analytics service, payment system, or live news API. Learning data stays on the user's device through browser `localStorage`.

## Data Stored Locally

The MVP stores these local keys:

- `edgion.progress.v1`: read state, quiz answers, review state, and activity timestamps.
- `edgion.thoughts.v1`: the learner's thought-tree notes.
- `edgion.thoughtMeta.v1`: thought-tree update timestamps.
- `edgion.onboarding.v1`: whether the first-run onboarding has been completed.

These values are used only to restore the learner's progress and make the Progress screen useful.

## Data Not Collected In The MVP

The current MVP does not collect or transmit:

- Names, email addresses, phone numbers, or account identifiers.
- Precise location.
- Payment information.
- Analytics or advertising identifiers.
- Cloud-synced learning records.
- User-generated posts or shared public content.

## User Control

Learners can reset local learning data from the Progress screen. This clears progress, quiz results, thought notes, and thought metadata from the current browser storage.

The reset action does not clear onboarding completion because onboarding is not part of the learning record.

## External Links

Learn modules may show source-note links to official or public information pages. Opening those links takes the learner to an external website, where that website's own privacy practices apply.

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
- Local data reset behavior is documented clearly enough for reviewers and learners.

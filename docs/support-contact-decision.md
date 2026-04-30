# Edgion Support Contact Decision

This note tracks the support contact decision needed before TestFlight or App Store submission. It does not add a real contact address or external service.

## Current State

- Public support/privacy page: `https://kei-0928.github.io/Edgion/support.html`
- Current support surface: GitHub repository link.
- Current limitation: the public page says replies or responses are not guaranteed.

This is acceptable for the Web/PWA MVP, but it is weak for an App Store candidate because reviewers and users should have a clear way to reach the developer about issues, feedback, and support questions.

## User-Only Decision Needed

The project owner must choose an approved support contact method before App Store submission.

Good candidates:

- A dedicated support email address.
- A simple public support form.
- A GitHub Issues link, if requiring a GitHub account is acceptable for the intended audience.
- A lightweight support page that lists response expectations and what information users should include.

Avoid:

- Personal contact details that should not be public.
- A contact method that cannot be maintained.
- A page that only says responses are not guaranteed.
- Any contact workflow that collects sensitive learner data without a privacy review.

## Recommended Direction

For the first App Store candidate, prefer a dedicated support email or simple support form. Keep it separate from personal accounts where possible.

### Option Comparison

| Option | Fit for first App Store candidate | Pros | Risks / owner work |
| --- | --- | --- | --- |
| Dedicated support email | Recommended | Simple, familiar to reviewers and users, no app code changes needed | Owner must create and maintain a public address; incoming messages may contain personal data |
| Simple support form | Good later | Can guide users to include app version, device, and issue type | Requires external service, form privacy review, spam handling, and possible data-retention policy |
| GitHub Issues | Acceptable for Web/PWA MVP only | Already available and transparent for development | Requires a GitHub account, may feel unsuitable for general learners, public issues can expose personal data |
| Static support page only | Not enough for App Store candidate | Easy to host and maintain | Weak because users cannot clearly reach the developer |

### Recommended First Decision

For the first TestFlight or App Store candidate, choose a dedicated support email address and list it on `public/support.html`.

Recommended public wording:

- `Support: [approved support email]`
- `Please do not include sensitive personal information, private learning notes, school information, health information, addresses, payment information, or emergency details in support requests.`
- `Edgion does not provide emergency, legal, financial, medical, or individualized advice.`
- `Learning data is stored locally on your device in the current MVP and can be reset from Progress.`

Do not use a personal email address unless the project owner is comfortable making it public and maintaining it after release.

Suggested public support page requirements:

- Explain that Edgion currently has no account, payment, ads, analytics, cloud sync, or live news feed.
- Link to or include the privacy summary.
- Give one clear way to report bugs or ask questions.
- Ask users not to include sensitive personal information in support requests.
- State that learning data is stored locally and can be reset in the app.

## Decision Record Template

Complete this before treating the Support URL as App Store-ready.

| Field | Value |
| --- | --- |
| Chosen support method | Not decided |
| Public support contact | Not decided |
| Support URL | `https://kei-0928.github.io/Edgion/support.html` |
| Privacy Policy URL | `https://kei-0928.github.io/Edgion/support.html` |
| Owner approval date | Not recorded |
| Sensitive-info warning included | Yes, required |
| Response expectation | Not decided |

## Files To Update After Decision

After the project owner chooses the support method, update:

- `public/support.html`
- `docs/app-store-metadata.md`
- `docs/privacy-notes.md`
- `docs/qa-checklist.md`
- `docs/user-owned-app-store-checklist.md`

Do not update App Store Connect, TestFlight, Bundle ID, signing, or Apple Developer settings from this note.

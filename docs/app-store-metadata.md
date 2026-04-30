# Edgion App Store Metadata Draft

This draft prepares App Store Connect text and review notes before any Apple Developer Program, Bundle ID, signing, certificate, or TestFlight setup work begins. It is not a submission record.

## Source References

Last checked: 2026-04-30.

- Apple App Store Connect Help: [App information](https://developer.apple.com/help/app-store-connect/reference/app-information), including name, subtitle, privacy policy URL, category, content rights, and age rating.
- Apple App Store Connect Help: [Platform version information](https://developer.apple.com/help/app-store-connect/reference/app-review-information), including description, keywords, support URL, marketing URL, copyright, and version notes.
- Apple App Store Connect Help: [Screenshot specifications](https://developer.apple.com/help/app-store-connect/reference/app-information/screenshot-specifications/).
- Apple App Store Connect Help: [Set an app age rating](https://developer.apple.com/help/app-store-connect/manage-your-apps-availability/set-an-app-age-rating).
- Apple App Store Connect Help: [App privacy](https://developer.apple.com/help/app-store-connect/reference/app-information/app-privacy/) and [manage app privacy](https://developer.apple.com/help/app-store-connect/manage-app-information/manage-app-privacy).

## Current Product Summary

Edgion is a Japanese news literacy learning app focused on growing social understanding rather than streaming large volumes of news. It uses built-in original background modules, short quizzes, thought-tree notes, and a Progress Insight Map to help learners understand civic topics and form their own opinions.

Current MVP behavior:

- No account login.
- No payment or subscription.
- No analytics, ads, tracking, push notifications, or cloud sync.
- No live news API, RSS import, or third-party content ingestion.
- Learning progress and thought notes are stored locally in browser `localStorage`.
- Public Web/PWA URL: `https://kei-0928.github.io/Edgion/`
- Public support and privacy page: `https://kei-0928.github.io/Edgion/support.html`

## App Information Draft

- App name: `Edgion`
- Subtitle candidate: `ニュースを考える学習アプリ`
- Primary language candidate: Japanese
- Primary category candidate: Education
- Secondary category candidate: News
- Content rights note: Built-in modules should remain original Edgion explainers with source notes. Do not copy full news articles or paid source text.
- Made for Kids: Not selected unless a separate Kids category review is completed. Apple notes that this choice has lasting review implications after approval.

## Product Page Text Draft

### Promotional Text Candidate

ニュースの背景、クイズ、思考ツリー、社会理解の地図で、社会の話題を自分の言葉で考える練習ができます。

### Description Candidate

Edgionは、ニュースを消費するのではなく、社会の背景知識と自分の考えを育てるための学習アプリです。

ニュースをただ読むだけでなく、歴史、制度、関係者、論点を整理し、短いクイズと思考ツリーで理解を確かめます。社会の話題について、すぐに結論を出すのではなく、背景を知り、根拠を探し、反対意見も見ながら、自分の言葉で考えることを目指します。

Progress画面では、読んだ教材、解いたクイズ、残した思考メモ、復習済みの教材をもとに、社会理解の広がりを小さなInsight Mapとして確認できます。

主な機能:

- 日本語の背景解説教材
- 理解を確認する短いクイズ
- 主張、理由、根拠、反対意見、次の問いを書く思考ツリー
- 学びの広がりを確認するInsight Map / 社会理解の地図
- 読了、クイズ、復習、メモ数を確認できるProgress画面
- アカウントなしで使えるローカル保存

現在のMVPでは、ログイン、課金、広告、分析、通知、クラウド同期、ライブニュース取得は行いません。学習データは利用者の端末内に保存され、Progress画面からEdgion内の学習記録をリセットできます。

### Keywords Candidate

ニュース,学習,教養,社会,教育,リテラシー,時事,クイズ,思考,探究

Before submission, confirm the final keyword byte count and avoid duplicating the app name or developer name.

## Required URL Drafts

- Support URL candidate: `https://kei-0928.github.io/Edgion/support.html`
- Privacy Policy URL candidate: `https://kei-0928.github.io/Edgion/support.html`
- Marketing URL candidate: `https://kei-0928.github.io/Edgion/`

Before submission, confirm whether the support page needs a more direct contact method. Apple describes the Support URL as a page where users can reach the developer about issues, feedback, and feature requests.

Track the support contact decision in `docs/support-contact-decision.md` before treating the Support URL or Privacy Policy URL candidates as final. The current public support page is acceptable for Web/PWA transparency, but it is not yet a final App Store support-contact decision.

### Support Contact Decision Record

This record must be completed by the project owner before the Support URL is treated as App Store-ready.

| Field | Current value |
| --- | --- |
| Chosen support method | Not decided |
| Public contact surface | GitHub repository link on `support.html` |
| Final Support URL approved | No |
| Final Privacy Policy URL approved | No |
| Owner approval date | Not recorded |
| Sensitive-info warning present | Yes, in current support/privacy copy |

## Age Rating Preparation

Apple determines the final age rating from the App Store Connect questionnaire. Based on the current MVP, prepare answers around these facts:

This section is preparation only; the project owner must answer the App Store Connect age-rating questionnaire based on the exact submitted build.

- Educational content only.
- No user-generated public posting.
- No social networking.
- No unrestricted web browsing inside the app.
- No gambling, contests, loot boxes, or chance-based activities.
- No payments or in-app purchases.
- No explicit sexual content or nudity.
- No realistic violence or horror content.
- No alcohol, tobacco, drug use, or medical treatment content.
- No ads, tracking, or analytics.
- External source links may open public websites outside Edgion.

Open question before submission:

- Whether youth-oriented civic/news topics require a higher age suitability choice because some real-world topics may mention disasters, politics, conflict, or public safety in an educational context.

### Current Content Themes To Consider

The built-in modules are educational explainers, but they touch real civic and life topics:

- Climate and heat-risk policy.
- School use of generative AI.
- Population decline and local public services.
- Food loss, donation, and household purchasing choices.
- 18-year-old adulthood and consumer contracts.
- Youth voting and political participation.
- Disaster-information literacy and evacuation-decision background.

These topics are intended for news literacy and civic learning. The disaster-information module is educational preparedness content about reading public information, not live alerts or emergency instructions. The app should be described as educational content, not as social networking, political campaigning, unrestricted news browsing, crisis alerts, emergency guidance, or legal advice.

### Owner Age Rating Checklist

Before answering the App Store Connect questionnaire, the project owner should confirm against the actual submitted build:

- No user-generated public sharing has been added.
- No unrestricted web browsing has been added; source links open as external references.
- No live news feed, emergency alerting, or real-time political campaign content has been added.
- No legal, medical, financial, or safety advice feature has been added.
- No payments, in-app purchases, ads, tracking, analytics, or gambling-like mechanics have been added.
- The disaster-information module remains non-graphic, educational, and not framed as live emergency guidance.
- Any future module about violence, graphic injury, self-harm, drugs, sexuality, partisan campaigning, or other sensitive topics is reviewed separately before submission.

## Screenshot Plan

Apple requires screenshots for the device families the app supports. For an iPhone-first candidate, prepare one to ten portrait screenshots for the required iPhone display sizes listed by Apple at the time of submission.

Suggested first screenshot set:

- Home with onboarding or selected module summary.
- Learn view showing background cards.
- Quiz view after answering a question.
- Thought Tree view with sample notes.
- Progress view showing `既読`, `クイズ`, `思考ノード`, `全期間復習`, and the Insight Map / `社会理解の地図` as a local learning-activity map.
- Support / Privacy page if reviewers need a visible privacy surface.

Capture rules:

- Use real app UI, not marketing mockups only.
- Avoid showing personal data.
- Use Japanese screenshots for Japanese primary language.
- Keep any sample thought notes clearly fictional and suitable for young learners.
- Re-check screenshot pixel requirements immediately before upload.

### Screenshot Capture Record

Use this table when preparing final store screenshots. Do not include real learner notes or private data.

| Candidate | Screen | Device size | Language | Sample data | Result |
| --- | --- | --- | --- | --- | --- |
| 1 | Home / selected module | iPhone portrait, exact size TBD | Japanese | Built-in module only | Not captured |
| 2 | Learn / background cards | iPhone portrait, exact size TBD | Japanese | Built-in module only | Not captured |
| 3 | Quiz / answered state | iPhone portrait, exact size TBD | Japanese | Fictional quiz state | Not captured |
| 4 | Thought Tree | iPhone portrait, exact size TBD | Japanese | Fictional notes only | Not captured |
| 5 | Progress / Insight Map | iPhone portrait, exact size TBD | Japanese | Fictional local progress | Not captured |
| 6 | Support / Privacy | iPhone portrait, exact size TBD | Japanese | Public page only | Not captured |

## Review Notes Draft

Potential App Review note:

Edgion is a learning app for Japanese news literacy. The current version works without login, payment, analytics, ads, push notifications, cloud sync, or live news feeds. Learning progress and thought-tree notes are stored locally on the device. The Support / Privacy page explains current data behavior and reset options.

If the app is wrapped in a native shell later, include any reviewer instructions for opening the app, resetting local data, and verifying that no account is required.

Suggested reviewer verification steps:

1. Launch Edgion and confirm the app opens without login or account creation.
2. Open a built-in module, mark the background as read, answer the quiz, and add a short fictional Thought Tree note.
3. Open Progress and confirm the Insight Map / `社会理解の地図` updates from local learning activity.
4. Open Review and tap `復習済みにする`, then confirm Progress shows the reviewed state.
5. Use `学習データをリセット` from Progress to confirm local learning data can be cleared.
6. Open the Support / Privacy page and confirm it explains local-only learning data behavior.
7. Note that source-note links open external public websites outside Edgion.

## Submission Blockers To Confirm

Do not proceed to these without explicit approval:

- Apple Developer Program enrollment.
- App Store Connect app creation.
- Bundle ID, signing, certificates, provisioning profiles, or Xcode project setup.
- TestFlight distribution.
- Final support contact details.
- Final privacy policy wording.
- Final age rating questionnaire answers.
- Any authentication, payment, database, analytics, push notification, cloud sync, or external API integration.

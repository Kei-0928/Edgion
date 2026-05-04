# Edgion App Store Screenshot Guide

This guide prepares App Store screenshot capture without changing App Store Connect, native signing, Bundle ID, TestFlight, analytics, payments, accounts, or external services.

Use the public Web/PWA build first: `https://kei-0928.github.io/Edgion/`

## Goal

Show Edgion as a learning app that turns news and civic topics into background knowledge, quizzes, thought notes, review, and the Insight Map / `社会理解の地図`.

The screenshots should communicate:

- Edgion is not a live news feed.
- Learners progress through built-in educational modules.
- Learning data stays local in the current MVP.
- The Insight Map makes social understanding feel visible and expandable.

## Capture Set

Prepare this first iPhone portrait set before App Store submission. Recheck Apple's exact screenshot size requirements immediately before upload.

| Order | Screen | Purpose | State to show |
| --- | --- | --- | --- |
| 1 | Home | First impression and learning-library value | Select a youth-relevant module and show the 8-module library count |
| 2 | Learn | Background-first learning | Show section cards and public source review date |
| 3 | Quiz | Lightweight understanding check | Show one answered question with explanation |
| 4 | Thought Tree | Learner reflection | Show clearly fictional notes only |
| 5 | Progress / Insight Map | Core differentiation | Show several nodes unlocked and at least one reviewed node |
| 6 | Review | Retention loop | Show next steps and review summary |
| 7 | Support / Privacy | Transparency | Show local-only data and reset/support explanation |

## Recommended Module Mix

Use built-in topics that make the product feel broad without looking like breaking news:

- `学校で生成AIをどう使うか` for Learn or Quiz.
- `18歳選挙権と一票の使い方` for Thought Tree or Review.
- `防災情報と避難判断の読み解き方` for Home or module picker breadth.
- `最低賃金とアルバイトのルール` for youth-relevant everyday economics.
- `猛暑対策で変わる都市のルール` for Insight Map starting point.

Avoid using the disaster-information module in a way that looks like live emergency guidance. It should appear as educational preparedness and public-information literacy.

## Fictional Thought Notes

Use short, safe, clearly fictional notes. Do not show real learner notes, personal names, school names, addresses, contact information, health details, or private experiences.

Candidate notes:

- Claim: `情報を待つだけでなく、事前に地図と公的情報を確認したい。`
- Reasons: `家族や地域で動きやすさが違うので、早めの準備が大切だと思う。`
- Evidence: `警戒レベル、キキクル、ハザードマップの違いを確認する。`
- Counterpoint: `避難が空振りになると負担が大きいと感じる人もいる。`
- Next question: `自分の地域では、どの情報を最初に見ると判断しやすい？`

## Sample Local State

For screenshot capture only, prepare a browser profile or simulator with fictional local state. Keep this separate from personal browsing data.

Use the app UI where possible:

1. Reset learning data from Progress.
2. Mark one or two modules read.
3. Answer quiz questions for one module.
4. Add fictional Thought Tree notes.
5. Mark one module reviewed.
6. Return to Progress and confirm the Insight Map shows a mix of `未着手`, `背景読了`, `確認済み`, `考えあり`, and `復習済み`.

### Recommended No-Code Setup Sequence

Use this sequence when preparing screenshots through the visible UI. It avoids DevTools, scripts, copied private notes, and any localStorage editing.

1. Open a fresh browser profile, simulator, or installed PWA state for the candidate build.
2. Open Progress and run `学習データをリセット`.
3. Select `最低賃金とアルバイトのルール`.
4. Open Learn and tap `既読にする`.
5. Open Quiz and answer all questions. It is acceptable for screenshots if one answer is incorrect, as long as the explanation is visible and the state is clearly educational.
6. Open Thought Tree and enter the fictional notes from this guide.
7. Open Review and tap `復習済みにする`.
8. Select `学校で生成AIをどう使うか`, open Learn, and tap `既読にする`.
9. Open Quiz for the same module and answer at least one question.
10. Select `18歳選挙権と一票の使い方`, open Learn, and tap `既読にする`.
11. Return to Progress and confirm the Insight Map has:
    - one `復習済み` node,
    - one `確認済み` or quiz-active node,
    - one `背景読了` node,
    - remaining `未着手` nodes.

If the native wrapper is approved later, repeat this sequence in the actual TestFlight build instead of reusing Web/PWA screenshots.

Expected Progress screenshot state:

- Module count: 8.
- Insight Map nodes: 8.
- At least three visible node states.
- At least one reviewed node.
- No personal data.

## Capture QA

Before treating screenshots as final:

- Confirm text is readable on the target iPhone screenshot size.
- Confirm no button, label, or bottom navigation overlaps.
- Confirm sample notes are fictional and suitable for young learners.
- Confirm the app version and visual state match the submitted build.
- Confirm the Support / Privacy page is reachable from the same build.
- Confirm screenshots do not imply login, payments, live news, emergency alerts, or cloud sync.
- Confirm all Thought Tree text is copied from this guide or another owner-approved fictional note.

## Asset Policy

Do not commit final App Store screenshot images to the repository until the asset storage policy is agreed. Track capture status in `docs/app-store-metadata.md` first.

Native-wrapper screenshots should be recaptured after any approved Capacitor/Xcode/TestFlight setup, because browser chrome, safe areas, and standalone behavior may differ from the Web/PWA capture.

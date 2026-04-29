# Edgion Progress Spec

This document describes the current Progress calculation rules. It is meant to keep future changes compatible with the existing MVP behavior.

## Storage Inputs

Progress uses three local storage-backed data sets:

- `edgion.progress.v1`: read state, quiz answers, and activity timestamps.
- `edgion.thoughts.v1`: thought-tree field values.
- `edgion.thoughtMeta.v1`: last updated time for thought-tree notes.

Onboarding state is stored separately in `edgion.onboarding.v1` and does not count as learning activity.

## Ranges

Progress supports three ranges:

- `today`: activity whose timestamp is on the same calendar day as the reference date.
- `month`: activity whose timestamp is in the same month and year as the reference date.
- `all`: all activity, including old records that do not have newer timestamp fields.

The helper functions accept an optional reference date so future tests can verify date behavior deterministically.

## Read Count

`readCount` is the number of modules marked as read within the selected range.

Timestamp priority:

1. `readAt`
2. `completedAt`

For `all`, a read module counts even if it only has older `completedAt` metadata.

## Quiz Count

`quizCorrect` is the number of correct quiz answers in modules with quiz activity inside the selected range.

Timestamp priority:

1. `quizUpdatedAt`
2. `completedAt`

`quizTotal` behaves differently by range:

- For `all`, it counts every quiz item across all modules.
- For `today` and `month`, it counts quiz items only for modules with quiz activity in that range.

## Thought Count

`thoughtCount` is the number of non-empty thought-tree fields in modules with thought activity inside the selected range.

Timestamp source:

1. `thoughtMeta[moduleId].updatedAt`

Older thought notes without `thoughtMeta` only appear in the `all` view if future migration logic is added. The current MVP intentionally avoids guessing timestamps for older notes.

## Review State

Review completion is stored as `review: true`. Newer records also store `reviewedAt` as the ISO timestamp for the review action.

Current Progress and Insight Map displays treat review state as all-time because older records can be reviewed without `reviewedAt`. Do not infer `reviewedAt` from `completedAt`; that field may refer to read, quiz, or review activity depending on when the record was written.

## Empty State

The Progress empty state appears when:

```ts
readCount + thoughtCount === 0 && there is no quiz activity in the selected range
```

When empty, the UI shows a small call to action that sends the learner back to the Learn view for the currently selected module.

## Reset Behavior

The Progress reset action clears learning data after a confirmation dialog:

- Progress records.
- Thought-tree notes.
- Thought metadata.

It does not clear onboarding state, service worker caches, or app deployment data.

The header reset action clears only the selected module after a confirmation dialog:

- The selected module's progress record.
- The selected module's thought-tree notes.
- The selected module's thought metadata.

# Edgion Local State Contract

This document summarizes the current local persistence contract from the code. It is scoped to browser or webview local state only.

Do not expand this document into authentication, billing, database, Apple Developer, App Store Connect, signing, Bundle ID, or TestFlight configuration.

## Storage Keys

The current MVP stores local state in `window.localStorage` through `src/storage.ts`.

- `edgion.progress.v1`: learning progress by module.
- `edgion.thoughts.v1`: thought-tree note fields by module.
- `edgion.thoughtMeta.v1`: thought-tree metadata by module.
- `edgion.onboarding.v1`: first-run onboarding completion.

If `window` or `localStorage` is unavailable, load helpers return safe defaults and save helpers do nothing.

## Progress Shape

`edgion.progress.v1` stores a JSON object keyed by module id.

```ts
type ProgressState = Record<string, ModuleProgress>;

type ModuleProgress = {
  read: boolean;
  review: boolean;
  quizAnswers: Record<string, number>;
  completedAt?: string;
  readAt?: string;
  quizUpdatedAt?: string;
  reviewedAt?: string;
};
```

Default module progress is:

```json
{
  "read": false,
  "review": false,
  "quizAnswers": {}
}
```

Current writers use ISO strings from `new Date().toISOString()` for timestamps.

- Marking a module read sets `read`, `readAt`, and `completedAt`.
- Answering a quiz sets `quizAnswers[quizId]`, `completedAt`, and `quizUpdatedAt`.
- Marking review complete sets `review`, `completedAt`, and `reviewedAt`.

`reviewedAt` was added after the first review-loop MVP. Older `review: true` records may not have it, and code should not infer it from `completedAt` because `completedAt` has also been used for read and quiz activity.

## Thoughts Shape

`edgion.thoughts.v1` stores a JSON object keyed by module id.

```ts
type ThoughtState = Record<string, ThoughtNode>;

type ThoughtNode = {
  claim: string;
  reasons: string;
  evidence: string;
  counterpoint: string;
  nextQuestion: string;
};
```

Empty thought fields are stored as empty strings:

```json
{
  "claim": "",
  "reasons": "",
  "evidence": "",
  "counterpoint": "",
  "nextQuestion": ""
}
```

Updating any thought field also updates `edgion.thoughtMeta.v1` for the same module.

## Thought Metadata Shape

`edgion.thoughtMeta.v1` stores a JSON object keyed by module id.

```ts
type ThoughtMetaState = Record<string, { updatedAt?: string }>;
```

Current writers set `updatedAt` to an ISO string from `new Date().toISOString()` whenever a thought-tree field changes.

## Onboarding Shape

`edgion.onboarding.v1` stores a single JSON value. The intended value is a boolean:

```ts
type OnboardingComplete = boolean;
```

The default is `false`. Completing or dismissing the first-run onboarding saves `true`.

Unlike progress, thoughts, and thought metadata, onboarding is not structurally normalized beyond JSON parsing. Future code should preserve the intended boolean shape and avoid relying on non-boolean legacy values.

## Load Normalization

All local data is parsed with `JSON.parse`. Broken JSON, storage read errors, or unavailable storage return defaults.

Progress normalization:

- The top-level value must be a non-array object.
- Each module value must be a non-array object.
- Invalid module entries are skipped.
- `read` is kept only when it is a boolean; otherwise it becomes `false`.
- `review` is kept only when it is a boolean; otherwise it becomes `false`.
- `quizAnswers` is rebuilt from numeric answer indexes only.
- `completedAt`, `readAt`, `quizUpdatedAt`, and `reviewedAt` are kept only when they are strings.
- Missing valid fields fall back to default module progress.

Thought normalization:

- The top-level value must be a non-array object.
- Each module value must be a non-array object.
- Invalid module entries are skipped.
- `claim`, `reasons`, `evidence`, `counterpoint`, and `nextQuestion` are kept only when they are strings.
- Missing or invalid thought fields become empty strings.

Thought metadata normalization:

- The top-level value must be a non-array object.
- Each module value must be a non-array object.
- A module metadata entry is kept only when `updatedAt` is a string.
- Invalid metadata entries are skipped.

Because React effects save the loaded in-memory state after render, malformed but parseable progress, thoughts, and thought metadata may be rewritten in normalized form after the app starts.

## Write Failure Behavior

All save helpers serialize with `JSON.stringify` and write with `localStorage.setItem`.

Write errors are swallowed. This keeps the app usable in cases such as private browsing, blocked storage, or quota exhaustion.

When a write fails, the current in-memory React state can still update for the active session, but persistence across reloads or app restarts is not guaranteed.

## Reset Scope

There are two current reset paths.

The selected-module reset sets only the active module to empty local learning state:

- `progress[selectedModuleId] = defaultProgress()`
- `thoughts[selectedModuleId] = emptyThought`
- `thoughtMeta[selectedModuleId] = {}`

The Progress-screen learning-data reset asks for confirmation and then clears all learning records:

- `progress = {}`
- `thoughts = {}`
- `thoughtMeta = {}`

Learning-data reset does not clear onboarding completion, service worker caches, app shell assets, or deployment metadata.

## Future Migration Compatibility

Future migrations should keep these compatibility rules unless a deliberate versioned replacement is introduced.

- Continue reading all current `*.v1` keys until a migration has copied or intentionally retired them.
- Preserve unknown module ids where their records normalize into valid shapes.
- Preserve valid timestamp strings as opaque strings; do not reinterpret or rewrite them unless the migration requires it.
- Keep `quizAnswers` as quiz-id keys with numeric answer indexes.
- Treat missing fields as defaults rather than corrupted state.
- Keep older thought records without `thoughtMeta` readable in `edgion.thoughts.v1`; range-based Progress behavior may still depend on metadata.
- Use a new key suffix, such as `.v2`, for incompatible shape changes.
- Make migrations idempotent so repeated app launches do not duplicate or damage state.
- Keep reset behavior explicit about whether onboarding is included. The current learning-data reset excludes onboarding.

## Native Shell Persistence Checks

If the web app is wrapped in a native shell, verify local persistence behavior in that shell before release.

- Complete onboarding, close and reopen the app, and confirm onboarding does not reappear.
- Mark a module read, answer at least one quiz item, enter thought notes, close and reopen the app, and confirm all values remain.
- Confirm `thoughtMeta` updates when editing a thought field and remains available after restart.
- Run the selected-module reset, restart, and confirm only that module's learning state was cleared.
- Run the Progress-screen learning-data reset, restart, and confirm progress, quiz answers, thoughts, and thought metadata were cleared.
- Confirm onboarding completion remains after learning-data reset.
- Confirm app updates or shell relaunches do not unexpectedly clear the webview's localStorage for the app origin.
- Confirm storage failures, if the shell can simulate them, do not crash the app.

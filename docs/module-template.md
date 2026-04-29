# Edgion Module Template

Use this template when drafting a new built-in `NewsModule`. Keep the explanation original, traceable, and readable for high school, university, and early-career learners.

## Draft Metadata

- `id`: short kebab-case ID, for example `energy-bills`.
- `category`: learner-facing topic group.
- `title`: concrete news topic, not a vague theme.
- `summary`: 1 to 2 sentences that explain why the topic matters.
- `readingTime`: expected reading time, such as `7分`.
- `difficulty`: `Starter`, `Core`, or `Deep`.
- `lastReviewedAt`: source/content review date in `YYYY-MM-DD` format.
- `leadQuestion`: one open question that invites judgment.

## Background Sections

Write four short sections. Each section should be original and should explain background knowledge rather than repeating a news article.

1. `history`: How did this issue develop over time?
2. `system`: What rules, institutions, budgets, or incentives shape it?
3. `stakeholders`: Who is affected, and how are their interests different?
4. `debate`: What is the real tradeoff or disagreement?

## Timeline

Add 3 to 5 items. Use broad years or periods when exact dates are not important.

```ts
timeline: [
  { year: "YYYY年", event: "何が変わったかを一文で書く。" },
]
```

## Glossary

Add 3 terms. Avoid jargon where possible, but explain necessary terms clearly.

```ts
glossary: [
  {
    term: "用語",
    description: "高校生にも伝わる説明。",
  },
]
```

## Quiz Items

Add 2 to 3 questions. Each question should check understanding of a concept, not trivia.

```ts
quizItems: [
  {
    id: "topic-q1",
    question: "理解を確かめる問い",
    choices: ["正しい選択肢", "もっともらしい誤答", "誤答", "誤答"],
    answerIndex: 0,
    explanation: "正解の理由と、背景知識をもう一度説明する。",
  },
]
```

## Thought Prompts

Use the shared `thoughtPrompts` unless a module truly needs custom prompts. The default flow is:

- Claim: current position.
- Reasons: why the learner thinks that.
- Evidence: what they need to verify.
- Counterpoint: what a different view might value.
- Next question: what to research next.

## Source Notes

Add at least 2 reliable source notes. Prefer official, primary, or institutional sources.

Update `lastReviewedAt` when the module's source notes and factual claims are checked. This date is shown to learners as `出典確認`.

```ts
sourceNotes: [
  {
    title: "ページや資料のタイトル",
    publisher: "発行元",
    url: "https://example.com",
    note: "この教材のどの確認に使ったか。",
  },
]
```

## Quality Checklist

Before adding the module to `src/data/modules.ts`, confirm:

- The explanation is written in Edgion's own words.
- No full article text or long copyrighted excerpt is copied.
- The topic includes history, system, stakeholders, and debate.
- The lead question has more than one reasonable answer.
- Quiz explanations teach, even if the learner guessed.
- Source notes support factual claims.
- `lastReviewedAt` reflects the latest source/content review date.
- The tone is accessible without becoming careless.
- The module does not require authentication, live APIs, or private data.

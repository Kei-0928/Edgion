import { describe, expect, it } from "vitest";
import {
  countThoughtFields,
  getNextReviewModule,
  getProgressStats,
  getScore,
  isInRange,
} from "./progress";
import type { NewsModule, ThoughtNode } from "./types";

const moduleFixture: NewsModule = {
  id: "module-a",
  category: "社会",
  title: "テスト教材",
  summary: "Progress集計用のテスト教材。",
  readingTime: "5分",
  difficulty: "Starter",
  leadQuestion: "どう考える？",
  backgroundSections: [],
  timeline: [],
  glossary: [],
  quizItems: [
    {
      id: "q1",
      question: "正解は？",
      choices: ["A", "B"],
      answerIndex: 0,
      explanation: "Aが正解。",
    },
    {
      id: "q2",
      question: "もう一問",
      choices: ["A", "B"],
      answerIndex: 1,
      explanation: "Bが正解。",
    },
  ],
  thoughtPrompts: [],
  sourceNotes: [],
};

const emptyThought: ThoughtNode = {
  claim: "",
  reasons: "",
  evidence: "",
  counterpoint: "",
  nextQuestion: "",
};

describe("progress helpers", () => {
  it("counts correct quiz answers", () => {
    const score = getScore(moduleFixture, {
      read: false,
      review: false,
      quizAnswers: {
        q1: 0,
        q2: 0,
      },
    });

    expect(score).toBe(1);
  });

  it("counts non-empty thought fields", () => {
    expect(
      countThoughtFields({
        ...emptyThought,
        claim: "賛成",
        evidence: "統計を確認したい",
      }),
    ).toBe(2);
  });

  it("finds the first read module that has not been reviewed", () => {
    const secondModule = {
      ...moduleFixture,
      id: "module-b",
      title: "復習候補",
    };

    expect(
      getNextReviewModule([moduleFixture, secondModule], {
        "module-a": {
          read: true,
          review: true,
          quizAnswers: {},
        },
        "module-b": {
          read: true,
          review: false,
          quizAnswers: {},
        },
      }),
    ).toEqual(secondModule);
  });

  it("returns undefined when there are no review candidates", () => {
    expect(
      getNextReviewModule([moduleFixture], {
        "module-a": {
          read: true,
          review: true,
          quizAnswers: {},
        },
      }),
    ).toBeUndefined();
  });

  it("finds review candidates inside the selected range", () => {
    const referenceDate = new Date("2026-04-27T12:00:00+09:00");
    const secondModule = {
      ...moduleFixture,
      id: "module-b",
      title: "今日の復習候補",
    };

    expect(
      getNextReviewModule(
        [moduleFixture, secondModule],
        {
          "module-a": {
            read: true,
            review: false,
            readAt: "2026-04-26T12:00:00+09:00",
            quizAnswers: {},
          },
          "module-b": {
            read: true,
            review: false,
            readAt: "2026-04-27T08:00:00+09:00",
            quizAnswers: {},
          },
        },
        "today",
        referenceDate,
      ),
    ).toEqual(secondModule);
  });

  it("checks date ranges against a fixed reference date", () => {
    const referenceDate = new Date("2026-04-27T12:00:00+09:00");

    expect(isInRange("2026-04-27T08:00:00+09:00", "today", referenceDate)).toBe(true);
    expect(isInRange("2026-04-26T23:00:00+09:00", "today", referenceDate)).toBe(false);
    expect(isInRange("2026-04-01T08:00:00+09:00", "month", referenceDate)).toBe(true);
    expect(isInRange("2026-03-31T23:00:00+09:00", "month", referenceDate)).toBe(false);
    expect(isInRange(undefined, "all", referenceDate)).toBe(true);
  });

  it("summarizes read, quiz, and thought activity for a selected range", () => {
    const stats = getProgressStats(
      [moduleFixture],
      {
        "module-a": {
          read: true,
          review: false,
          readAt: "2026-04-27T08:00:00+09:00",
          quizUpdatedAt: "2026-04-27T09:00:00+09:00",
          quizAnswers: {
            q1: 0,
            q2: 1,
          },
        },
      },
      {
        "module-a": {
          ...emptyThought,
          claim: "賛成",
          reasons: "生活への影響が大きい",
        },
      },
      {
        "module-a": {
          updatedAt: "2026-04-27T10:00:00+09:00",
        },
      },
      "today",
      new Date("2026-04-27T12:00:00+09:00"),
    );

    expect(stats).toEqual({
      readCount: 1,
      quizCorrect: 2,
      quizTotal: 2,
      thoughtCount: 2,
    });
  });

  it("does not count thought notes without thought metadata", () => {
    const stats = getProgressStats(
      [moduleFixture],
      {},
      {
        "module-a": {
          ...emptyThought,
          claim: "メタデータがない古いメモ",
          reasons: "日時を推測しない",
        },
      },
      {},
      "all",
      new Date("2026-04-27T12:00:00+09:00"),
    );

    expect(stats.thoughtCount).toBe(0);
  });
});

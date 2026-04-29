import { describe, expect, it } from "vitest";
import {
  countThoughtFields,
  getKnowledgeNodeStatus,
  getNextReviewModule,
  getProgressStats,
  getReviewNextSteps,
  getScore,
  hasQuizActivity,
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
  lastReviewedAt: "2026-04-29",
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

  it("maps module activity to knowledge node states", () => {
    expect(
      getKnowledgeNodeStatus(
        moduleFixture,
        {
          read: false,
          review: false,
          quizAnswers: {},
        },
        emptyThought,
      ),
    ).toEqual({ state: "locked", label: "未着手", level: 0 });

    expect(
      getKnowledgeNodeStatus(
        moduleFixture,
        {
          read: true,
          review: false,
          quizAnswers: {},
        },
        emptyThought,
      ),
    ).toEqual({ state: "lit", label: "背景読了", level: 1 });

    expect(
      getKnowledgeNodeStatus(
        moduleFixture,
        {
          read: true,
          review: false,
          quizAnswers: {
            q1: 0,
            q2: 1,
          },
        },
        emptyThought,
      ),
    ).toEqual({ state: "strengthened", label: "確認済み", level: 2 });

    expect(
      getKnowledgeNodeStatus(
        moduleFixture,
        {
          read: true,
          review: false,
          quizAnswers: {
            q1: 0,
            q2: 1,
          },
        },
        {
          ...emptyThought,
          claim: "自分の考え",
        },
      ),
    ).toEqual({ state: "personalized", label: "考えあり", level: 3 });

    expect(
      getKnowledgeNodeStatus(
        moduleFixture,
        {
          read: true,
          review: true,
          quizAnswers: {},
        },
        emptyThought,
      ),
    ).toEqual({ state: "mastered", label: "復習済み", level: 4 });
  });

  it("keeps knowledge node state precedence stable", () => {
    expect(
      getKnowledgeNodeStatus(
        moduleFixture,
        {
          read: true,
          review: true,
          quizAnswers: {},
        },
        {
          ...emptyThought,
          claim: "復習済みが最優先",
        },
      ).state,
    ).toBe("mastered");

    expect(
      getKnowledgeNodeStatus(
        moduleFixture,
        {
          read: true,
          review: false,
          quizAnswers: {
            q1: 1,
            q2: 0,
          },
        },
        {
          ...emptyThought,
          claim: "クイズ結果より自分のメモを優先",
        },
      ).state,
    ).toBe("personalized");

    expect(
      getKnowledgeNodeStatus(
        moduleFixture,
        {
          read: true,
          review: false,
          quizAnswers: {
            q1: 1,
            q2: 0,
          },
        },
        emptyThought,
      ).state,
    ).toBe("strengthened");

    expect(
      getKnowledgeNodeStatus(
        moduleFixture,
        {
          read: true,
          review: false,
          quizAnswers: {
            q1: 0,
          },
        },
        {
          ...emptyThought,
          claim: "   ",
        },
      ).state,
    ).toBe("lit");
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

  it("detects quiz activity even when answers are incorrect", () => {
    expect(
      hasQuizActivity(
        [moduleFixture],
        {
          "module-a": {
            read: false,
            review: false,
            quizUpdatedAt: "2026-04-27T09:00:00+09:00",
            quizAnswers: {
              q1: 1,
            },
          },
        },
        "today",
        new Date("2026-04-27T12:00:00+09:00"),
      ),
    ).toBe(true);
  });

  it("summarizes next review steps for incomplete learning activity", () => {
    expect(
      getReviewNextSteps(
        moduleFixture,
        {
          read: false,
          review: false,
          quizAnswers: {
            q1: 0,
          },
        },
        {
          ...emptyThought,
          claim: "賛成",
        },
      ),
    ).toEqual([
      {
        label: "背景",
        detail: "背景を一度読むと、復習の土台ができます。",
        status: "todo",
      },
      {
        label: "クイズ",
        detail: "2問中1問に回答済みです。",
        status: "todo",
      },
      {
        label: "思考メモ",
        detail: "5項目中1項目を記入済みです。",
        status: "todo",
      },
      {
        label: "復習",
        detail: "最後に復習済みにするとProgressへ反映されます。",
        status: "todo",
      },
    ]);
  });

  it("summarizes completed review steps", () => {
    expect(
      getReviewNextSteps(
        moduleFixture,
        {
          read: true,
          review: true,
          quizAnswers: {
            q1: 0,
            q2: 1,
          },
        },
        {
          ...emptyThought,
          claim: "賛成",
          reasons: "生活への影響が大きい",
          evidence: "統計を確認したい",
        },
      ),
    ).toEqual([
      {
        label: "背景",
        detail: "要点は読了済みです。",
        status: "done",
      },
      {
        label: "クイズ",
        detail: "全問に回答済みです。",
        status: "done",
      },
      {
        label: "思考メモ",
        detail: "意見を見直す材料がそろっています。",
        status: "done",
      },
      {
        label: "復習",
        detail: "この教材は復習済みです。",
        status: "done",
      },
    ]);
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

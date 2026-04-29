import { describe, expect, it } from "vitest";

import { newsModules } from "./modules";
import type { ThoughtNode } from "../types";

const expectedSectionKinds = ["history", "system", "stakeholders", "debate"];
const expectedThoughtLabels = [
  "claim",
  "reasons",
  "evidence",
  "counterpoint",
  "nextQuestion",
] satisfies Array<keyof ThoughtNode>;

const expectNonEmptyString = (value: string, label: string) => {
  expect(value.trim(), label).not.toBe("");
};

const expectHttpUrl = (value: string, label: string) => {
  const url = new URL(value);

  expect(url.protocol, label).toBe("https:");
};

const expectIsoDate = (value: string, label: string) => {
  expect(value, label).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  expect(Number.isNaN(new Date(`${value}T00:00:00+09:00`).getTime()), label).toBe(false);
};

describe("built-in news modules", () => {
  it("keeps module identifiers unique and stable enough for local progress", () => {
    const ids = newsModules.map((module) => module.id);

    expect(newsModules.length).toBeGreaterThanOrEqual(6);
    expect(new Set(ids).size).toBe(ids.length);

    for (const module of newsModules) {
      expect(module.id, `${module.title} id`).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
      expectNonEmptyString(module.category, `${module.id} category`);
      expectNonEmptyString(module.title, `${module.id} title`);
      expectNonEmptyString(module.summary, `${module.id} summary`);
      expectNonEmptyString(module.readingTime, `${module.id} readingTime`);
      expect(module.readingTime, `${module.id} readingTime`).toMatch(/^\d+分$/);
      expect(["Starter", "Core", "Deep"], `${module.id} difficulty`).toContain(
        module.difficulty,
      );
      expectIsoDate(module.lastReviewedAt, `${module.id} lastReviewedAt`);
      expectNonEmptyString(module.leadQuestion, `${module.id} leadQuestion`);
    }
  });

  it("keeps each module aligned with the educational content structure", () => {
    for (const module of newsModules) {
      expect(
        module.backgroundSections.map((section) => section.kind),
        `${module.id} background section kinds`,
      ).toEqual(expectedSectionKinds);
      expect(module.timeline.length, `${module.id} timeline`).toBeGreaterThanOrEqual(3);
      expect(module.glossary.length, `${module.id} glossary`).toBeGreaterThanOrEqual(3);
      expect(module.sourceNotes.length, `${module.id} source notes`).toBeGreaterThanOrEqual(1);

      for (const section of module.backgroundSections) {
        expectNonEmptyString(section.title, `${module.id} ${section.kind} title`);
        expectNonEmptyString(section.body, `${module.id} ${section.kind} body`);
      }

      for (const item of module.timeline) {
        expectNonEmptyString(item.year, `${module.id} timeline year`);
        expectNonEmptyString(item.event, `${module.id} timeline event`);
      }

      for (const item of module.glossary) {
        expectNonEmptyString(item.term, `${module.id} glossary term`);
        expectNonEmptyString(item.description, `${module.id} glossary description`);
      }
    }
  });

  it("keeps quizzes answerable and explanations present", () => {
    const allQuizIds = new Set<string>();

    for (const module of newsModules) {
      expect(module.quizItems.length, `${module.id} quiz count`).toBeGreaterThanOrEqual(2);

      for (const quiz of module.quizItems) {
        expect(quiz.id, `${module.id} quiz id`).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
        expect(allQuizIds.has(quiz.id), `${module.id} duplicate quiz id ${quiz.id}`).toBe(false);
        allQuizIds.add(quiz.id);

        expectNonEmptyString(quiz.question, `${quiz.id} question`);
        expect(quiz.choices.length, `${quiz.id} choices`).toBeGreaterThanOrEqual(2);
        expect(
          new Set(quiz.choices.map((choice) => choice.trim())).size,
          `${quiz.id} duplicate choices`,
        ).toBe(quiz.choices.length);
        expect(Number.isInteger(quiz.answerIndex), `${quiz.id} answerIndex`).toBe(true);
        expect(quiz.answerIndex, `${quiz.id} answerIndex`).toBeGreaterThanOrEqual(0);
        expect(quiz.answerIndex, `${quiz.id} answerIndex`).toBeLessThan(quiz.choices.length);
        expectNonEmptyString(quiz.explanation, `${quiz.id} explanation`);

        for (const [choiceIndex, choice] of quiz.choices.entries()) {
          expectNonEmptyString(choice, `${quiz.id} choice ${choiceIndex}`);
        }
      }
    }
  });

  it("keeps thought prompts compatible with the stored thought shape", () => {
    for (const module of newsModules) {
      expect(
        module.thoughtPrompts.map((prompt) => prompt.label),
        `${module.id} thought prompt labels`,
      ).toEqual(expectedThoughtLabels);

      for (const prompt of module.thoughtPrompts) {
        expect(prompt.id, `${module.id} thought prompt id`).toBe(prompt.label);
        expectNonEmptyString(prompt.title, `${module.id} ${prompt.id} title`);
        expectNonEmptyString(prompt.prompt, `${module.id} ${prompt.id} prompt`);
      }
    }
  });

  it("keeps learner-facing source notes usable", () => {
    for (const module of newsModules) {
      for (const source of module.sourceNotes) {
        expectNonEmptyString(source.title, `${module.id} source title`);
        expectNonEmptyString(source.publisher, `${module.id} source publisher`);
        expectNonEmptyString(source.note, `${module.id} source note`);
        expectHttpUrl(source.url, `${module.id} source url`);
      }
    }
  });
});

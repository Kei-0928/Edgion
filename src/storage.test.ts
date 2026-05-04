import { afterEach, beforeEach, describe, expect, it } from "vitest";

import {
  defaultProgress,
  loadOnboardingComplete,
  loadProgress,
  loadThoughtMeta,
  loadThoughts,
  saveOnboardingComplete,
  saveProgress,
  saveThoughtMeta,
  saveThoughts,
} from "./storage";

const PROGRESS_KEY = "edgion.progress.v1";
const THOUGHTS_KEY = "edgion.thoughts.v1";
const THOUGHT_META_KEY = "edgion.thoughtMeta.v1";

type TestStorage = Pick<Storage, "getItem" | "setItem"> & {
  setRaw: (key: string, value: string) => void;
};

const createStorage = (): TestStorage => {
  const values = new Map<string, string>();

  return {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => {
      values.set(key, value);
    },
    setRaw: (key: string, value: string) => {
      values.set(key, value);
    },
  };
};

const setWindowStorage = (storage: TestStorage) => {
  Object.defineProperty(globalThis, "window", {
    value: { localStorage: storage },
    configurable: true,
  });
};

const setWindowWithThrowingStorage = () => {
  Object.defineProperty(globalThis, "window", {
    value: {
      get localStorage() {
        throw new Error("storage blocked");
      },
    },
    configurable: true,
  });
};

const createFailingStorage = (): TestStorage => ({
  getItem: () => null,
  setItem: () => {
    throw new Error("storage unavailable");
  },
  setRaw: () => undefined,
});

describe("storage helpers", () => {
  let storage: TestStorage;

  beforeEach(() => {
    storage = createStorage();
    setWindowStorage(storage);
  });

  afterEach(() => {
    Reflect.deleteProperty(globalThis, "window");
  });

  it("returns safe defaults when storage is unavailable", () => {
    Reflect.deleteProperty(globalThis, "window");

    expect(loadProgress()).toEqual({});
    expect(loadThoughts()).toEqual({});
    expect(loadThoughtMeta()).toEqual({});
    expect(loadOnboardingComplete()).toBe(false);
    expect(defaultProgress()).toEqual({
      read: false,
      review: false,
      quizAnswers: {},
    });
  });

  it("round trips progress, thoughts, and thought metadata", () => {
    saveProgress({
      "climate-cities": {
        read: true,
        review: true,
        quizAnswers: { "heat-1": 1 },
        readAt: "2026-04-27T00:00:00.000Z",
        reviewedAt: "2026-04-28T00:00:00.000Z",
      },
    });
    saveThoughts({
      "climate-cities": {
        claim: "暑さ対策は都市政策として考えるべき",
        reasons: "健康と移動のしやすさに関わるから",
        evidence: "熱中症対策の呼びかけが増えている",
        counterpoint: "費用負担が大きい",
        nextQuestion: "どの対策が一番効果的か",
      },
    });
    saveThoughtMeta({
      "climate-cities": { updatedAt: "2026-04-27T00:00:00.000Z" },
    });

    expect(loadProgress()["climate-cities"]?.quizAnswers["heat-1"]).toBe(1);
    expect(loadProgress()["climate-cities"]?.reviewedAt).toBe("2026-04-28T00:00:00.000Z");
    expect(loadThoughts()["climate-cities"]?.claim).toBe(
      "暑さ対策は都市政策として考えるべき",
    );
    expect(loadThoughtMeta()["climate-cities"]?.updatedAt).toBe(
      "2026-04-27T00:00:00.000Z",
    );
  });

  it("falls back safely when stored JSON is broken", () => {
    storage.setRaw(PROGRESS_KEY, "{broken");
    storage.setRaw(THOUGHTS_KEY, "{broken");
    storage.setRaw(THOUGHT_META_KEY, "{broken");

    expect(loadProgress()).toEqual({});
    expect(loadThoughts()).toEqual({});
    expect(loadThoughtMeta()).toEqual({});
  });

  it("normalizes malformed progress records", () => {
    storage.setRaw(
      PROGRESS_KEY,
      JSON.stringify({
        "climate-cities": {
          read: true,
          review: "yes",
          quizAnswers: {
            "climate-q1": 0,
            "climate-q2": "1",
          },
          readAt: "2026-04-27T00:00:00.000Z",
          quizUpdatedAt: 123,
          reviewedAt: "2026-04-28T00:00:00.000Z",
        },
        "ai-school": {
          read: "true",
          reviewedAt: 456,
        },
        broken: null,
      }),
    );

    expect(loadProgress()).toEqual({
      "climate-cities": {
        read: true,
        review: false,
        quizAnswers: {
          "climate-q1": 0,
        },
        readAt: "2026-04-27T00:00:00.000Z",
        reviewedAt: "2026-04-28T00:00:00.000Z",
      },
      "ai-school": {
        read: false,
        review: false,
        quizAnswers: {},
      },
    });
  });

  it("normalizes malformed thought records", () => {
    storage.setRaw(
      THOUGHTS_KEY,
      JSON.stringify({
        "climate-cities": {
          claim: "都市の暑さ対策は必要",
          reasons: 123,
          evidence: "公的情報を確認したい",
          counterpoint: null,
        },
        broken: "not a thought",
      }),
    );

    expect(loadThoughts()).toEqual({
      "climate-cities": {
        claim: "都市の暑さ対策は必要",
        reasons: "",
        evidence: "公的情報を確認したい",
        counterpoint: "",
        nextQuestion: "",
      },
    });
  });

  it("normalizes malformed thought metadata records", () => {
    storage.setRaw(
      THOUGHT_META_KEY,
      JSON.stringify({
        "climate-cities": {
          updatedAt: "2026-04-27T00:00:00.000Z",
        },
        "ai-school": {
          updatedAt: 123,
        },
        broken: null,
      }),
    );

    expect(loadThoughtMeta()).toEqual({
      "climate-cities": {
        updatedAt: "2026-04-27T00:00:00.000Z",
      },
    });
  });

  it("reports failed writes while keeping save helpers safe", () => {
    setWindowStorage(createFailingStorage());

    expect(() =>
      saveProgress({
        "climate-cities": {
          read: true,
          review: false,
          quizAnswers: {},
        },
      }),
    ).not.toThrow();
    expect(() => saveThoughts({})).not.toThrow();
    expect(() => saveThoughtMeta({})).not.toThrow();
    expect(() => saveOnboardingComplete(true)).not.toThrow();
    expect(saveProgress({})).toBe(false);
    expect(saveThoughts({})).toBe(false);
    expect(saveThoughtMeta({})).toBe(false);
    expect(saveOnboardingComplete(true)).toBe(false);
  });

  it("falls back safely when localStorage access itself is blocked", () => {
    setWindowWithThrowingStorage();

    expect(loadProgress()).toEqual({});
    expect(loadThoughts()).toEqual({});
    expect(loadThoughtMeta()).toEqual({});
    expect(loadOnboardingComplete()).toBe(false);
    expect(saveProgress({})).toBe(false);
    expect(saveThoughts({})).toBe(false);
    expect(saveThoughtMeta({})).toBe(false);
    expect(saveOnboardingComplete(true)).toBe(false);
  });

  it("reports successful writes", () => {
    expect(saveProgress({})).toBe(true);
    expect(saveThoughts({})).toBe(true);
    expect(saveThoughtMeta({})).toBe(true);
    expect(saveOnboardingComplete(true)).toBe(true);
  });

  it("round trips onboarding completion", () => {
    expect(loadOnboardingComplete()).toBe(false);

    saveOnboardingComplete(true);

    expect(loadOnboardingComplete()).toBe(true);
  });
});

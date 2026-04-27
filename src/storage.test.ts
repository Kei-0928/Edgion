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
        review: false,
        quizAnswers: { "heat-1": 1 },
        readAt: "2026-04-27T00:00:00.000Z",
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

  it("round trips onboarding completion", () => {
    expect(loadOnboardingComplete()).toBe(false);

    saveOnboardingComplete(true);

    expect(loadOnboardingComplete()).toBe(true);
  });
});

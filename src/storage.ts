import type { ModuleProgress, ProgressState, ThoughtNode, ThoughtState } from "./types";

const PROGRESS_KEY = "edgion.progress.v1";
const THOUGHTS_KEY = "edgion.thoughts.v1";

export const emptyThought: ThoughtNode = {
  claim: "",
  reasons: "",
  evidence: "",
  counterpoint: "",
  nextQuestion: "",
};

const canUseStorage = () => typeof window !== "undefined" && "localStorage" in window;

const readJson = <T>(key: string, fallback: T): T => {
  if (!canUseStorage()) {
    return fallback;
  }

  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

const writeJson = <T>(key: string, value: T) => {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.setItem(key, JSON.stringify(value));
};

export const loadProgress = () => readJson<ProgressState>(PROGRESS_KEY, {});

export const saveProgress = (progress: ProgressState) => writeJson(PROGRESS_KEY, progress);

export const loadThoughts = () => readJson<ThoughtState>(THOUGHTS_KEY, {});

export const saveThoughts = (thoughts: ThoughtState) => writeJson(THOUGHTS_KEY, thoughts);

export const defaultProgress = (): ModuleProgress => ({
  read: false,
  review: false,
  quizAnswers: {},
});

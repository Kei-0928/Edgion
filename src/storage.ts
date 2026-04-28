import type {
  ModuleProgress,
  ProgressState,
  ThoughtMetaState,
  ThoughtNode,
  ThoughtState,
} from "./types";

const PROGRESS_KEY = "edgion.progress.v1";
const THOUGHTS_KEY = "edgion.thoughts.v1";
const THOUGHT_META_KEY = "edgion.thoughtMeta.v1";
const ONBOARDING_KEY = "edgion.onboarding.v1";

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

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage can fail in private browsing or when quota is exceeded. Keep the app usable.
  }
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const normalizeProgress = (value: unknown): ProgressState => {
  if (!isRecord(value)) {
    return {};
  }

  const normalizedProgress: ProgressState = {};

  Object.entries(value).forEach(([moduleId, moduleProgress]) => {
    if (!isRecord(moduleProgress)) {
      return;
    }

    const quizAnswers: Record<string, number> = {};
    if (isRecord(moduleProgress.quizAnswers)) {
      Object.entries(moduleProgress.quizAnswers).forEach(([quizId, answerIndex]) => {
        if (typeof answerIndex === "number") {
          quizAnswers[quizId] = answerIndex;
        }
      });
    }

    const normalized: ModuleProgress = {
      ...defaultProgress(),
      read: typeof moduleProgress.read === "boolean" ? moduleProgress.read : false,
      review: typeof moduleProgress.review === "boolean" ? moduleProgress.review : false,
      quizAnswers,
    };

    if (typeof moduleProgress.completedAt === "string") {
      normalized.completedAt = moduleProgress.completedAt;
    }

    if (typeof moduleProgress.readAt === "string") {
      normalized.readAt = moduleProgress.readAt;
    }

    if (typeof moduleProgress.quizUpdatedAt === "string") {
      normalized.quizUpdatedAt = moduleProgress.quizUpdatedAt;
    }

    normalizedProgress[moduleId] = normalized;
  });

  return normalizedProgress;
};

const thoughtFields = [
  "claim",
  "reasons",
  "evidence",
  "counterpoint",
  "nextQuestion",
] as const satisfies ReadonlyArray<keyof ThoughtNode>;

const normalizeThoughts = (value: unknown): ThoughtState => {
  if (!isRecord(value)) {
    return {};
  }

  const normalizedThoughts: ThoughtState = {};

  Object.entries(value).forEach(([moduleId, thought]) => {
    if (!isRecord(thought)) {
      return;
    }

    const normalized: ThoughtNode = { ...emptyThought };
    thoughtFields.forEach((field) => {
      if (typeof thought[field] === "string") {
        normalized[field] = thought[field];
      }
    });

    normalizedThoughts[moduleId] = normalized;
  });

  return normalizedThoughts;
};

const normalizeThoughtMeta = (value: unknown): ThoughtMetaState => {
  if (!isRecord(value)) {
    return {};
  }

  const normalizedThoughtMeta: ThoughtMetaState = {};

  Object.entries(value).forEach(([moduleId, meta]) => {
    if (!isRecord(meta)) {
      return;
    }

    if (typeof meta.updatedAt === "string") {
      normalizedThoughtMeta[moduleId] = {
        updatedAt: meta.updatedAt,
      };
    }
  });

  return normalizedThoughtMeta;
};

export const loadProgress = () => normalizeProgress(readJson<unknown>(PROGRESS_KEY, {}));

export const saveProgress = (progress: ProgressState) => writeJson(PROGRESS_KEY, progress);

export const loadThoughts = () => normalizeThoughts(readJson<unknown>(THOUGHTS_KEY, {}));

export const saveThoughts = (thoughts: ThoughtState) => writeJson(THOUGHTS_KEY, thoughts);

export const loadThoughtMeta = () => normalizeThoughtMeta(readJson<unknown>(THOUGHT_META_KEY, {}));

export const saveThoughtMeta = (thoughtMeta: ThoughtMetaState) =>
  writeJson(THOUGHT_META_KEY, thoughtMeta);

export const loadOnboardingComplete = () => readJson<boolean>(ONBOARDING_KEY, false);

export const saveOnboardingComplete = (complete: boolean) =>
  writeJson(ONBOARDING_KEY, complete);

export const defaultProgress = (): ModuleProgress => ({
  read: false,
  review: false,
  quizAnswers: {},
});

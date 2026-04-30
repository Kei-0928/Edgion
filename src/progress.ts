import type {
  ModuleProgress,
  NewsModule,
  ThoughtMetaState,
  ThoughtNode,
  ThoughtState,
} from "./types";

export type ProgressRange = "today" | "month" | "all";

export type ProgressStats = {
  readCount: number;
  quizCorrect: number;
  quizTotal: number;
  thoughtCount: number;
};

export type ReviewNextStep = {
  label: string;
  detail: string;
  status: "todo" | "done";
};

export type KnowledgeNodeState = "locked" | "lit" | "strengthened" | "personalized" | "mastered";

export type KnowledgeNodeStatus = {
  state: KnowledgeNodeState;
  label: string;
  level: number;
};

const knowledgeNodeStatus: Record<KnowledgeNodeState, Omit<KnowledgeNodeStatus, "state">> = {
  locked: {
    label: "未着手",
    level: 0,
  },
  lit: {
    label: "背景読了",
    level: 1,
  },
  strengthened: {
    label: "確認済み",
    level: 2,
  },
  personalized: {
    label: "考えあり",
    level: 3,
  },
  mastered: {
    label: "復習済み",
    level: 4,
  },
};

export const getModuleProgress = (
  progress: Record<string, ModuleProgress>,
  moduleId: string,
): ModuleProgress =>
  progress[moduleId] ?? {
    read: false,
    review: false,
    quizAnswers: {},
  };

export const getScore = (module: NewsModule, moduleProgress: ModuleProgress) =>
  module.quizItems.reduce((score, item) => {
    return moduleProgress.quizAnswers[item.id] === item.answerIndex ? score + 1 : score;
  }, 0);

export const countThoughtFields = (thought: ThoughtNode | undefined) =>
  thought ? Object.values(thought).filter((value) => value.trim().length > 0).length : 0;

export const getAnsweredQuizCount = (module: NewsModule, moduleProgress: ModuleProgress) =>
  module.quizItems.filter((item) => Object.hasOwn(moduleProgress.quizAnswers, item.id)).length;

export const markModuleReviewed = (
  moduleProgress: ModuleProgress,
  reviewedAt: string,
): ModuleProgress => {
  if (moduleProgress.review) {
    return moduleProgress;
  }

  return {
    ...moduleProgress,
    review: true,
    reviewedAt,
  };
};

export const getKnowledgeNodeStatus = (
  module: NewsModule,
  moduleProgress: ModuleProgress,
  thought: ThoughtNode | undefined,
): KnowledgeNodeStatus => {
  const answeredCount = getAnsweredQuizCount(module, moduleProgress);
  const state = moduleProgress.review
    ? "mastered"
    : countThoughtFields(thought) > 0
      ? "personalized"
      : answeredCount >= module.quizItems.length
        ? "strengthened"
        : moduleProgress.read
          ? "lit"
          : "locked";

  return {
    state,
    ...knowledgeNodeStatus[state],
  };
};

const sameDay = (date: Date, reference: Date) =>
  date.getFullYear() === reference.getFullYear() &&
  date.getMonth() === reference.getMonth() &&
  date.getDate() === reference.getDate();

const sameMonth = (date: Date, reference: Date) =>
  date.getFullYear() === reference.getFullYear() && date.getMonth() === reference.getMonth();

export const isInRange = (
  isoDate: string | undefined,
  range: ProgressRange,
  referenceDate = new Date(),
) => {
  if (range === "all") {
    return true;
  }

  if (!isoDate) {
    return false;
  }

  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) {
    return false;
  }

  return range === "today" ? sameDay(date, referenceDate) : sameMonth(date, referenceDate);
};

export const getNextReviewModule = (
  modules: NewsModule[],
  progress: Record<string, ModuleProgress>,
  range: ProgressRange = "all",
  referenceDate = new Date(),
) =>
  modules.find((module) => {
    const moduleProgress = getModuleProgress(progress, module.id);
    const readDate = moduleProgress.readAt ?? moduleProgress.completedAt;
    return (
      moduleProgress.read &&
      !moduleProgress.review &&
      isInRange(readDate, range, referenceDate)
    );
  });

export const hasQuizActivity = (
  modules: NewsModule[],
  progress: Record<string, ModuleProgress>,
  range: ProgressRange,
  referenceDate = new Date(),
) =>
  modules.some((module) => {
    const moduleProgress = getModuleProgress(progress, module.id);
    return (
      Object.keys(moduleProgress.quizAnswers).length > 0 &&
      isInRange(moduleProgress.quizUpdatedAt ?? moduleProgress.completedAt, range, referenceDate)
    );
  });

export const getReviewNextSteps = (
  module: NewsModule,
  moduleProgress: ModuleProgress,
  thought: ThoughtNode | undefined,
): ReviewNextStep[] => {
  const answeredCount = getAnsweredQuizCount(module, moduleProgress);
  const thoughtCount = countThoughtFields(thought);
  const quizComplete = answeredCount >= module.quizItems.length;
  const thoughtReady = thoughtCount >= 3;

  return [
    moduleProgress.read
      ? {
          label: "背景",
          detail: "要点は読了済みです。",
          status: "done",
        }
      : {
          label: "背景",
          detail: "背景を一度読むと、復習の土台ができます。",
          status: "todo",
        },
    quizComplete
      ? {
          label: "クイズ",
          detail: "全問に回答済みです。",
          status: "done",
        }
      : {
          label: "クイズ",
          detail: `${module.quizItems.length}問中${answeredCount}問に回答済みです。`,
          status: "todo",
        },
    thoughtReady
      ? {
          label: "思考メモ",
          detail: "意見を見直す材料がそろっています。",
          status: "done",
        }
      : {
          label: "思考メモ",
          detail: `5項目中${thoughtCount}項目を記入済みです。`,
          status: "todo",
        },
    moduleProgress.review
      ? {
          label: "復習",
          detail: "この教材は復習済みです。",
          status: "done",
        }
      : {
          label: "復習",
          detail: "最後に復習済みにするとProgressへ反映されます。",
          status: "todo",
        },
  ];
};

export const getProgressStats = (
  modules: NewsModule[],
  progress: Record<string, ModuleProgress>,
  thoughts: ThoughtState,
  thoughtMeta: ThoughtMetaState,
  range: ProgressRange,
  referenceDate = new Date(),
): ProgressStats => {
  const readCount = modules.filter((module) => {
    const moduleProgress = getModuleProgress(progress, module.id);
    return (
      moduleProgress.read &&
      isInRange(moduleProgress.readAt ?? moduleProgress.completedAt, range, referenceDate)
    );
  }).length;

  const quizCorrect = modules.reduce((total, module) => {
    const moduleProgress = getModuleProgress(progress, module.id);
    if (
      !isInRange(moduleProgress.quizUpdatedAt ?? moduleProgress.completedAt, range, referenceDate)
    ) {
      return total;
    }

    return total + getScore(module, moduleProgress);
  }, 0);

  const quizTotal =
    range === "all"
      ? modules.reduce((total, module) => total + module.quizItems.length, 0)
      : modules.reduce((total, module) => {
          const moduleProgress = getModuleProgress(progress, module.id);
          return isInRange(
            moduleProgress.quizUpdatedAt ?? moduleProgress.completedAt,
            range,
            referenceDate,
          )
            ? total + module.quizItems.length
            : total;
        }, 0);

  const thoughtCount = modules.reduce((total, module) => {
    const thoughtUpdatedAt = thoughtMeta[module.id]?.updatedAt;
    if (!thoughtUpdatedAt || !isInRange(thoughtUpdatedAt, range, referenceDate)) {
      return total;
    }

    return total + countThoughtFields(thoughts[module.id]);
  }, 0);

  return { readCount, quizCorrect, quizTotal, thoughtCount };
};

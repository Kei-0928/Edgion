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

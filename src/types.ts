import type { LucideIcon } from "lucide-react";

export type BackgroundSection = {
  title: string;
  body: string;
  kind: "history" | "system" | "stakeholders" | "debate";
};

export type TimelineItem = {
  year: string;
  event: string;
};

export type GlossaryItem = {
  term: string;
  description: string;
};

export type QuizItem = {
  id: string;
  question: string;
  choices: string[];
  answerIndex: number;
  explanation: string;
};

export type ThoughtPrompt = {
  id: string;
  label: keyof ThoughtNode;
  title: string;
  prompt: string;
};

export type ThoughtNode = {
  claim: string;
  reasons: string;
  evidence: string;
  counterpoint: string;
  nextQuestion: string;
};

export type SourceNote = {
  title: string;
  publisher: string;
  url: string;
  note: string;
};

export type NewsModule = {
  id: string;
  category: string;
  title: string;
  summary: string;
  readingTime: string;
  difficulty: "Starter" | "Core" | "Deep";
  leadQuestion: string;
  backgroundSections: BackgroundSection[];
  timeline: TimelineItem[];
  glossary: GlossaryItem[];
  quizItems: QuizItem[];
  thoughtPrompts: ThoughtPrompt[];
  sourceNotes: SourceNote[];
};

export type ModuleProgress = {
  read: boolean;
  review: boolean;
  quizAnswers: Record<string, number>;
  completedAt?: string;
  readAt?: string;
  quizUpdatedAt?: string;
};

export type ProgressState = Record<string, ModuleProgress>;

export type ThoughtState = Record<string, ThoughtNode>;

export type ThoughtMetaState = Record<string, { updatedAt?: string }>;

export type ViewId = "home" | "learn" | "quiz" | "tree" | "progress" | "review";

export type NavigationItem = {
  id: ViewId;
  label: string;
  icon: LucideIcon;
};

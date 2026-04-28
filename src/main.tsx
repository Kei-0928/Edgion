import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight,
  BookOpen,
  Brain,
  CheckCircle2,
  CircleHelp,
  Compass,
  ExternalLink,
  Flame,
  GraduationCap,
  History,
  Home,
  Layers3,
  Lightbulb,
  Map,
  MessageSquareText,
  PanelTop,
  RotateCcw,
  RefreshCw,
  Route,
  Sparkles,
  Sprout,
  Trash2,
  Trophy,
} from "lucide-react";
import { newsModules } from "./data/modules";
import {
  countThoughtFields,
  getModuleProgress,
  getProgressStats,
  getScore,
  isInRange,
} from "./progress";
import type { ProgressRange, ProgressStats } from "./progress";
import {
  defaultProgress,
  emptyThought,
  loadProgress,
  loadOnboardingComplete,
  loadThoughtMeta,
  loadThoughts,
  saveOnboardingComplete,
  saveProgress,
  saveThoughtMeta,
  saveThoughts,
} from "./storage";
import type {
  ModuleProgress,
  NavigationItem,
  NewsModule,
  ThoughtMetaState,
  ThoughtNode,
  ViewId,
} from "./types";
import "./styles.css";

const navItems: NavigationItem[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "learn", label: "Learn", icon: BookOpen },
  { id: "quiz", label: "Quiz", icon: CircleHelp },
  { id: "tree", label: "Tree", icon: Brain },
  { id: "progress", label: "Progress", icon: Trophy },
];

const supportUrl = `${import.meta.env.BASE_URL}support.html`;
const appVersion = __APP_VERSION__;

const sectionIcons = {
  history: History,
  system: Layers3,
  stakeholders: Sprout,
  debate: MessageSquareText,
};

const formatSavedAt = (isoDate: string | undefined) => {
  if (!isoDate) {
    return "まだメモは保存されていません";
  }

  const date = new Date(isoDate);

  if (Number.isNaN(date.getTime())) {
    return "保存時刻を確認できません";
  }

  return `保存済み ${date.toLocaleString("ja-JP", {
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })}`;
};

function App() {
  const [activeView, setActiveView] = useState<ViewId>("home");
  const [selectedModuleId, setSelectedModuleId] = useState(newsModules[0].id);
  const [progress, setProgress] = useState(loadProgress);
  const [thoughts, setThoughts] = useState(loadThoughts);
  const [thoughtMeta, setThoughtMeta] = useState(loadThoughtMeta);
  const [showOnboarding, setShowOnboarding] = useState(() => !loadOnboardingComplete());

  const selectedModule = useMemo(
    () => newsModules.find((module) => module.id === selectedModuleId) ?? newsModules[0],
    [selectedModuleId],
  );

  const selectedProgress = getModuleProgress(progress, selectedModule.id);
  const selectedThought = thoughts[selectedModule.id] ?? emptyThought;
  const progressReferenceDate = useMemo(() => new Date(), []);

  const stats = useMemo(
    () => getProgressStats(newsModules, progress, thoughts, thoughtMeta, "all", progressReferenceDate),
    [progress, progressReferenceDate, thoughts, thoughtMeta],
  );

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  useEffect(() => {
    saveThoughts(thoughts);
  }, [thoughts]);

  useEffect(() => {
    saveThoughtMeta(thoughtMeta);
  }, [thoughtMeta]);

  useEffect(() => {
    if (!("serviceWorker" in navigator)) {
      return;
    }

    if (import.meta.env.PROD) {
      navigator.serviceWorker
        .register(`${import.meta.env.BASE_URL}sw.js`, { updateViaCache: "none" })
        .then((registration) => registration.update())
        .catch(() => undefined);
      return;
    }

    navigator.serviceWorker
      .getRegistrations()
      .then((registrations) =>
        Promise.all(
          registrations
            .filter((registration) => registration.scope.includes(import.meta.env.BASE_URL))
            .map((registration) => registration.unregister()),
        ),
      )
      .catch(() => undefined);
  }, []);

  const updateSelectedProgress = (nextProgress: ModuleProgress) => {
    setProgress((current) => ({ ...current, [selectedModule.id]: nextProgress }));
  };

  const setQuizAnswer = (quizId: string, answerIndex: number) => {
    const now = new Date().toISOString();
    updateSelectedProgress({
      ...selectedProgress,
      quizAnswers: {
        ...selectedProgress.quizAnswers,
        [quizId]: answerIndex,
      },
      completedAt: now,
      quizUpdatedAt: now,
    });
  };

  const updateThought = (field: keyof ThoughtNode, value: string) => {
    const now = new Date().toISOString();
    setThoughts((current) => ({
      ...current,
      [selectedModule.id]: {
        ...(current[selectedModule.id] ?? emptyThought),
        [field]: value,
      },
    }));
    setThoughtMeta((current) => ({
      ...current,
      [selectedModule.id]: {
        updatedAt: now,
      },
    }));
  };

  const resetModule = () => {
    setProgress((current) => ({
      ...current,
      [selectedModule.id]: defaultProgress(),
    }));
    setThoughts((current) => ({
      ...current,
      [selectedModule.id]: emptyThought,
    }));
    setThoughtMeta((current) => ({
      ...current,
      [selectedModule.id]: {},
    }));
  };

  const completeOnboarding = () => {
    saveOnboardingComplete(true);
    setShowOnboarding(false);
  };

  const resetLearningData = () => {
    const confirmed = window.confirm(
      "学習データをすべてリセットします。既読、クイズ結果、思考メモは元に戻せません。",
    );

    if (!confirmed) {
      return;
    }

    setProgress({});
    setThoughts({});
    setThoughtMeta({});
  };

  const openReview = (moduleId: string) => {
    setSelectedModuleId(moduleId);
    setActiveView("review");
  };

  const markReviewed = () => {
    updateSelectedProgress({
      ...selectedProgress,
      review: true,
      completedAt: new Date().toISOString(),
    });
  };

  return (
    <div className="app-shell">
      <aside className="sidebar" aria-label="Primary navigation">
        <div className="brand-mark">
          <div className="brand-symbol" aria-hidden="true">
            <Compass size={26} />
          </div>
          <div>
            <p>Edgion</p>
            <span>News literacy studio · v{appVersion}</span>
          </div>
        </div>

        <nav className="side-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                className={activeView === item.id ? "nav-button active" : "nav-button"}
                key={item.id}
                onClick={() => setActiveView(item.id)}
                type="button"
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="sidebar-card">
          <span>今日の問い</span>
          <strong>{selectedModule.leadQuestion}</strong>
          <a className="support-link" href={supportUrl}>
            <ExternalLink size={15} />
            <span>Support / Privacy</span>
          </a>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <div className="eyebrow-row">
              <p className="eyebrow">Background-first news learning</p>
              <span className="version-chip">v{appVersion}</span>
            </div>
            <h1>ニュースを、考える材料に変える。</h1>
          </div>
          <div className="topbar-actions">
            <button className="ghost-button" onClick={resetModule} type="button">
              <RefreshCw size={17} />
              <span>リセット</span>
            </button>
            <button className="primary-button" onClick={() => setActiveView("learn")} type="button">
              <BookOpen size={17} />
              <span>学ぶ</span>
            </button>
          </div>
        </header>

        <ModulePicker
          selectedModuleId={selectedModule.id}
          onSelect={(moduleId) => {
            setSelectedModuleId(moduleId);
            setActiveView("learn");
          }}
          progress={progress}
        />

        {activeView === "home" && (
          <HomeView
            selectedModule={selectedModule}
            selectedProgress={selectedProgress}
            showOnboarding={showOnboarding}
            supportUrl={supportUrl}
            stats={stats}
            onDismissOnboarding={completeOnboarding}
            onStart={() => setActiveView("learn")}
          />
        )}

        {activeView === "learn" && (
          <LearnView
            module={selectedModule}
            progress={selectedProgress}
            onMarkRead={() =>
              updateSelectedProgress({
                ...selectedProgress,
                read: true,
                readAt: new Date().toISOString(),
                completedAt: new Date().toISOString(),
              })
            }
            onOpenReview={() => setActiveView("review")}
          />
        )}

        {activeView === "quiz" && (
          <QuizView
            module={selectedModule}
            progress={selectedProgress}
            onAnswer={setQuizAnswer}
            onOpenReview={() => setActiveView("review")}
          />
        )}

        {activeView === "tree" && (
          <ThoughtTreeView
            module={selectedModule}
            savedAt={thoughtMeta[selectedModule.id]?.updatedAt}
            thought={selectedThought}
            onChange={updateThought}
            onOpenReview={() => setActiveView("review")}
          />
        )}

        {activeView === "review" && (
          <ReviewView
            module={selectedModule}
            progress={selectedProgress}
            thought={selectedThought}
            onMarkReviewed={markReviewed}
            onOpenLearn={() => setActiveView("learn")}
            onOpenQuiz={() => setActiveView("quiz")}
            onOpenTree={() => setActiveView("tree")}
          />
        )}

        {activeView === "progress" && (
          <ProgressView
            onOpenModule={(moduleId) => openReview(moduleId)}
            onStartModule={(moduleId) => {
              setSelectedModuleId(moduleId);
              setActiveView("learn");
            }}
            onStartLearning={() => setActiveView("learn")}
            onResetLearningData={resetLearningData}
            progress={progress}
            thoughts={thoughts}
            thoughtMeta={thoughtMeta}
            stats={stats}
            referenceDate={progressReferenceDate}
          />
        )}
      </main>

      <nav className="bottom-nav" aria-label="Primary navigation">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              aria-label={item.label}
              className={activeView === item.id ? "bottom-button active" : "bottom-button"}
              key={item.id}
              onClick={() => setActiveView(item.id)}
              title={item.label}
              type="button"
            >
              <Icon size={21} />
            </button>
          );
        })}
      </nav>
    </div>
  );
}

function ModulePicker({
  selectedModuleId,
  onSelect,
  progress,
}: {
  selectedModuleId: string;
  onSelect: (moduleId: string) => void;
  progress: Record<string, ModuleProgress>;
}) {
  const [categoryFilter, setCategoryFilter] = useState("すべて");
  const [difficultyFilter, setDifficultyFilter] = useState<NewsModule["difficulty"] | "すべて">("すべて");
  const [readFilter, setReadFilter] = useState<"すべて" | "未読" | "既読">("すべて");
  const categories = useMemo(() => ["すべて", ...new Set(newsModules.map((module) => module.category))], []);
  const difficulties = useMemo(
    () => ["すべて", ...new Set(newsModules.map((module) => module.difficulty))] as const,
    [],
  );
  const readFilters = ["すべて", "未読", "既読"] as const;
  const filteredModules = newsModules.filter((module) => {
    const moduleProgress = getModuleProgress(progress, module.id);
    const matchesCategory = categoryFilter === "すべて" || module.category === categoryFilter;
    const matchesDifficulty = difficultyFilter === "すべて" || module.difficulty === difficultyFilter;
    const matchesReadState =
      readFilter === "すべて" ||
      (readFilter === "未読" && !moduleProgress.read) ||
      (readFilter === "既読" && moduleProgress.read);
    return matchesCategory && matchesDifficulty && matchesReadState;
  });

  return (
    <section className="module-picker" aria-label="教材を選ぶ">
      <div className="module-filters" aria-label="教材フィルター">
        <div className="filter-group" aria-label="カテゴリ">
          {categories.map((category) => (
            <button
              className={categoryFilter === category ? "filter-chip active" : "filter-chip"}
              key={category}
              onClick={() => setCategoryFilter(category)}
              type="button"
            >
              {category}
            </button>
          ))}
        </div>
        <div className="filter-group" aria-label="難易度">
          {difficulties.map((difficulty) => (
            <button
              className={difficultyFilter === difficulty ? "filter-chip active" : "filter-chip"}
              key={difficulty}
              onClick={() => setDifficultyFilter(difficulty)}
              type="button"
            >
              {difficulty}
            </button>
          ))}
        </div>
        <div className="filter-group" aria-label="学習状態">
          {readFilters.map((readState) => (
            <button
              className={readFilter === readState ? "filter-chip active" : "filter-chip"}
              key={readState}
              onClick={() => setReadFilter(readState)}
              type="button"
            >
              {readState}
            </button>
          ))}
        </div>
      </div>

      <div className="module-strip">
        {filteredModules.length === 0 && (
          <div className="module-empty-state">
            <strong>条件に合う教材はありません</strong>
            <p>フィルターをゆるめると、別のテーマが見つかります。</p>
          </div>
        )}
        {filteredModules.map((module) => {
          const moduleProgress = getModuleProgress(progress, module.id);
          const score = getScore(module, moduleProgress);
          return (
            <button
              className={selectedModuleId === module.id ? "module-chip active" : "module-chip"}
              key={module.id}
              onClick={() => onSelect(module.id)}
              type="button"
            >
              <span>{module.category}</span>
              <strong>{module.title}</strong>
              <span className="module-chip-tags">
                <span className="module-tag">{module.difficulty}</span>
                <span className={moduleProgress.read ? "module-tag read" : "module-tag"}>
                  {moduleProgress.read ? "既読" : "未読"}
                </span>
              </span>
              <small>
                {module.readingTime} · {score}/{module.quizItems.length}
              </small>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function HomeView({
  selectedModule,
  selectedProgress,
  showOnboarding,
  supportUrl,
  stats,
  onDismissOnboarding,
  onStart,
}: {
  selectedModule: NewsModule;
  selectedProgress: ModuleProgress;
  showOnboarding: boolean;
  supportUrl: string;
  stats: { readCount: number; quizCorrect: number; quizTotal: number; thoughtCount: number };
  onDismissOnboarding: () => void;
  onStart: () => void;
}) {
  const score = getScore(selectedModule, selectedProgress);
  const selectedModuleIndex = newsModules.findIndex((module) => module.id === selectedModule.id);
  const modulePosition = selectedModuleIndex >= 0 ? selectedModuleIndex + 1 : 1;

  return (
    <section className="view-grid home-grid">
      {showOnboarding && (
        <article className="onboarding-panel" aria-label="Edgionの使い方">
          <div>
            <p className="eyebrow">First loop</p>
            <h2>4ステップでニュースを自分の考えにする</h2>
          </div>
          <ol className="onboarding-steps">
            <li>
              <BookOpen size={18} />
              <span>背景を読む</span>
            </li>
            <li>
              <CircleHelp size={18} />
              <span>クイズで確かめる</span>
            </li>
            <li>
              <Brain size={18} />
              <span>思考ツリーを書く</span>
            </li>
            <li>
              <Trophy size={18} />
              <span>Progressで振り返る</span>
            </li>
          </ol>
          <div className="onboarding-actions">
            <button className="ghost-button" onClick={onDismissOnboarding} type="button">
              あとでOK
            </button>
            <button
              className="primary-button"
              onClick={() => {
                onDismissOnboarding();
                onStart();
              }}
              type="button"
            >
              <ArrowRight size={17} />
              <span>はじめる</span>
            </button>
          </div>
        </article>
      )}

      <div className="hero-panel">
        <div className="hero-copy">
          <span className="pill">
            <Sparkles size={15} />
            {newsModules.length}本の教養ライブラリ
          </span>
          <h2>{selectedModule.title}</h2>
          <p>{selectedModule.summary}</p>
          <div className="hero-actions">
            <button className="primary-button" onClick={onStart} type="button">
              <ArrowRight size={17} />
              <span>背景から読む</span>
            </button>
            <span className="mini-status">
              Quiz {score}/{selectedModule.quizItems.length}
            </span>
            <span className="mini-status library-status">
              {modulePosition}/{newsModules.length}
            </span>
          </div>
        </div>
        <div className="signal-map" aria-hidden="true">
          <div className="signal-card main-signal">
            <Flame size={18} />
            <span>News</span>
          </div>
          <div className="signal-card history-signal">
            <History size={18} />
            <span>History</span>
          </div>
          <div className="signal-card system-signal">
            <PanelTop size={18} />
            <span>System</span>
          </div>
          <div className="signal-card opinion-signal">
            <Lightbulb size={18} />
            <span>Opinion</span>
          </div>
          <div className="signal-line one" />
          <div className="signal-line two" />
          <div className="signal-line three" />
        </div>
      </div>

      <div className="metric-row">
        <Metric icon={BookOpen} label="既読教材" value={`${stats.readCount}/${newsModules.length}`} />
        <Metric icon={CheckCircle2} label="正解数" value={`${stats.quizCorrect}/${stats.quizTotal}`} />
        <Metric icon={Brain} label="思考メモ" value={`${stats.thoughtCount}`} />
        <Metric icon={Layers3} label="教材数" value={`${newsModules.length}`} />
      </div>

      <div className="focus-panel">
        <div>
          <p className="eyebrow">Focus question</p>
          <h3>{selectedModule.leadQuestion}</h3>
        </div>
        <p>
          Edgionは、6本のニュース背景教材を起点に、背景知識、確認クイズ、意見の骨組みまで一つの流れで扱います。
        </p>
      </div>

      <a className="support-strip" href={supportUrl}>
        <ExternalLink size={17} />
        <span>Support / Privacy</span>
      </a>
    </section>
  );
}

function LearnView({
  module,
  progress,
  onMarkRead,
  onOpenReview,
}: {
  module: NewsModule;
  progress: ModuleProgress;
  onMarkRead: () => void;
  onOpenReview: () => void;
}) {
  return (
    <section className="view-grid">
      <div className="content-header">
        <div>
          <p className="eyebrow">{module.category}</p>
          <h2>{module.title}</h2>
          <p>{module.summary}</p>
        </div>
        <div className="header-actions">
          <button className="primary-button" onClick={onMarkRead} type="button">
            <CheckCircle2 size={17} />
            <span>{progress.read ? "既読済み" : "既読にする"}</span>
          </button>
          <button className="ghost-button" onClick={onOpenReview} type="button">
            <ArrowRight size={17} />
            <span>Reviewへ</span>
          </button>
        </div>
      </div>

      <div className="background-grid">
        {module.backgroundSections.map((section) => {
          const Icon = sectionIcons[section.kind];
          return (
            <article className="info-card" key={section.title}>
              <div className="card-icon">
                <Icon size={20} />
              </div>
              <h3>{section.title}</h3>
              <p>{section.body}</p>
            </article>
          );
        })}
      </div>

      <div className="two-column">
        <article className="panel">
          <div className="section-title">
            <Route size={19} />
            <h3>流れでつかむ</h3>
          </div>
          <ol className="timeline">
            {module.timeline.map((item) => (
              <li key={`${item.year}-${item.event}`}>
                <span>{item.year}</span>
                <p>{item.event}</p>
              </li>
            ))}
          </ol>
        </article>

        <article className="panel">
          <div className="section-title">
            <GraduationCap size={19} />
            <h3>用語メモ</h3>
          </div>
          <div className="glossary-list">
            {module.glossary.map((item) => (
              <div key={item.term}>
                <strong>{item.term}</strong>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </article>
      </div>

      <article className="source-panel">
        <div className="section-title">
          <ExternalLink size={19} />
          <h3>参考にした公的情報</h3>
        </div>
        <div className="source-list">
          {module.sourceNotes.map((source) => (
            <a href={source.url} key={source.url} rel="noreferrer" target="_blank">
              <span>{source.publisher}</span>
              <strong>{source.title}</strong>
              <p>{source.note}</p>
            </a>
          ))}
        </div>
      </article>
    </section>
  );
}

function QuizView({
  module,
  progress,
  onAnswer,
  onOpenReview,
}: {
  module: NewsModule;
  progress: ModuleProgress;
  onAnswer: (quizId: string, answerIndex: number) => void;
  onOpenReview: () => void;
}) {
  const score = getScore(module, progress);
  const answeredCount = Object.keys(progress.quizAnswers).length;
  const reviewLabel = answeredCount >= module.quizItems.length ? "Reviewでまとめる" : "Reviewへ";

  return (
    <section className="view-grid">
      <div className="content-header">
        <div>
          <p className="eyebrow">Check your frame</p>
          <h2>理解を小さく試す</h2>
          <p>背景を読んだあと、制度や論点のつながりをクイズで確認します。</p>
        </div>
        <div className="header-actions">
          <div className="score-badge">
            {score}/{module.quizItems.length}
          </div>
          <button className="ghost-button" onClick={onOpenReview} type="button">
            <ArrowRight size={17} />
            <span>{reviewLabel}</span>
          </button>
        </div>
      </div>

      <div className="quiz-stack">
        {module.quizItems.map((item, index) => {
          const selected = progress.quizAnswers[item.id];
          const answered = typeof selected === "number";
          return (
            <article className="quiz-card" key={item.id}>
              <div className="quiz-heading">
                <span>Q{index + 1}</span>
                <h3>{item.question}</h3>
              </div>
              <div className="choice-grid">
                {item.choices.map((choice, choiceIndex) => {
                  const isCorrect = choiceIndex === item.answerIndex;
                  const isSelected = selected === choiceIndex;
                  const className = [
                    "choice-button",
                    answered && isCorrect ? "correct" : "",
                    answered && isSelected && !isCorrect ? "incorrect" : "",
                  ]
                    .filter(Boolean)
                    .join(" ");

                  return (
                    <button
                      className={className}
                      key={choice}
                      onClick={() => onAnswer(item.id, choiceIndex)}
                      type="button"
                    >
                      {choice}
                    </button>
                  );
                })}
              </div>
              {answered && <p className="explanation">{item.explanation}</p>}
            </article>
          );
        })}
      </div>
    </section>
  );
}

function ThoughtTreeView({
  module,
  savedAt,
  thought,
  onChange,
  onOpenReview,
}: {
  module: NewsModule;
  savedAt?: string;
  thought: ThoughtNode;
  onChange: (field: keyof ThoughtNode, value: string) => void;
  onOpenReview: () => void;
}) {
  const savedLabel = formatSavedAt(savedAt);
  const hasThought = countThoughtFields(thought) > 0;
  const reviewLabel = hasThought ? "Reviewでまとめる" : "Reviewへ";

  return (
    <section className="view-grid">
      <div className="content-header">
        <div>
          <p className="eyebrow">Thought tree</p>
          <h2>意見の枝を育てる</h2>
          <p>{module.leadQuestion}</p>
        </div>
        <div className="thought-status">
          <span className="mini-status">{countThoughtFields(thought)}/5 nodes</span>
          <small>{savedLabel}</small>
          <button className="ghost-button" onClick={onOpenReview} type="button">
            <ArrowRight size={17} />
            <span>{reviewLabel}</span>
          </button>
        </div>
      </div>

      <div className="thought-layout">
        <div className="tree-rail" aria-hidden="true">
          <div className="tree-node root">News</div>
          <div className="tree-branch" />
          <div className="tree-node">Why</div>
          <div className="tree-branch" />
          <div className="tree-node">Evidence</div>
          <div className="tree-branch" />
          <div className="tree-node">Next</div>
        </div>

        <div className="thought-stack">
          {module.thoughtPrompts.map((prompt) => {
            const value = thought[prompt.label];
            const characterCount = value.trim().length;
            const hint = characterCount >= 40 ? "考えの芯が見えてきました" : "まずは40字くらいで十分";

            return (
              <label className="thought-card" key={prompt.id}>
                <span>{prompt.title}</span>
                <small>{prompt.prompt}</small>
                <textarea
                  onChange={(event) => onChange(prompt.label, event.target.value)}
                  placeholder="ここに自分の言葉でメモ"
                  rows={4}
                  value={value}
                />
                <span className="thought-helper">
                  <small>{characterCount}字</small>
                  <small>{hint}</small>
                </span>
              </label>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ReviewView({
  module,
  progress,
  thought,
  onMarkReviewed,
  onOpenLearn,
  onOpenQuiz,
  onOpenTree,
}: {
  module: NewsModule;
  progress: ModuleProgress;
  thought: ThoughtNode;
  onMarkReviewed: () => void;
  onOpenLearn: () => void;
  onOpenQuiz: () => void;
  onOpenTree: () => void;
}) {
  const score = getScore(module, progress);
  const thoughtCount = countThoughtFields(thought);
  const hasQuizAnswers = Object.keys(progress.quizAnswers).length > 0;
  const thoughtEntries = module.thoughtPrompts.map((prompt) => ({
    ...prompt,
    value: thought[prompt.label].trim(),
  }));

  return (
    <section className="view-grid">
      <div className="content-header">
        <div>
          <p className="eyebrow">Review loop</p>
          <h2>学びを一度まとめる</h2>
          <p>{module.title}で読んだこと、解いたこと、考えたことを短く見直します。</p>
        </div>
        <button className="primary-button" onClick={onMarkReviewed} type="button">
          <CheckCircle2 size={17} />
          <span>{progress.review ? "復習済み" : "復習済みにする"}</span>
        </button>
      </div>

      <div className="review-grid">
        <article className="review-card">
          <div className="section-title">
            <BookOpen size={19} />
            <h3>背景の要点</h3>
          </div>
          <p>{module.summary}</p>
          <button className="ghost-button review-action" onClick={onOpenLearn} type="button">
            <BookOpen size={16} />
            <span>背景を読み直す</span>
          </button>
        </article>

        <article className="review-card">
          <div className="section-title">
            <CircleHelp size={19} />
            <h3>クイズ結果</h3>
          </div>
          <p>
            {hasQuizAnswers
              ? `${module.quizItems.length}問中 ${score}問正解。解説をもう一度見ると、制度や論点のつながりを固めやすくなります。`
              : "まだクイズに答えていません。背景を読んだあとに試すと、理解の抜けを見つけやすくなります。"}
          </p>
          <button className="ghost-button review-action" onClick={onOpenQuiz} type="button">
            <CircleHelp size={16} />
            <span>クイズを見る</span>
          </button>
        </article>

        <article className="review-card wide">
          <div className="section-title">
            <Brain size={19} />
            <h3>思考メモ</h3>
          </div>
          <p>
            {thoughtCount > 0
              ? `${thoughtCount}/5個のメモがあります。意見を強めるより、足りない根拠や反対意見を見つけるつもりで見直しましょう。`
              : "まだ思考メモはありません。まずは仮の主張を一文で置いてみるだけでも十分です。"}
          </p>
          <div className="review-thought-list">
            {thoughtEntries.map((entry) => (
              <div key={entry.id}>
                <span>{entry.title}</span>
                <p>{entry.value || "未入力"}</p>
              </div>
            ))}
          </div>
          <button className="ghost-button review-action" onClick={onOpenTree} type="button">
            <Brain size={16} />
            <span>思考ツリーを編集</span>
          </button>
        </article>
      </div>
    </section>
  );
}

function ProgressView({
  onOpenModule,
  onStartModule,
  onStartLearning,
  onResetLearningData,
  progress,
  thoughts,
  thoughtMeta,
  stats,
  referenceDate,
}: {
  onOpenModule: (moduleId: string) => void;
  onStartModule: (moduleId: string) => void;
  onStartLearning: () => void;
  onResetLearningData: () => void;
  progress: Record<string, ModuleProgress>;
  thoughts: Record<string, ThoughtNode>;
  thoughtMeta: ThoughtMetaState;
  stats: ProgressStats;
  referenceDate: Date;
}) {
  const [range, setRange] = useState<ProgressRange>("today");
  const visibleStats = useMemo(
    () =>
      range === "all"
        ? stats
        : getProgressStats(newsModules, progress, thoughts, thoughtMeta, range, referenceDate),
    [progress, range, referenceDate, stats, thoughtMeta, thoughts],
  );
  const rangeLabel = range === "today" ? "今日" : range === "month" ? "今月" : "全期間";
  const quizValue =
    visibleStats.quizTotal === 0
      ? `${visibleStats.quizCorrect}`
      : `${visibleStats.quizCorrect}/${visibleStats.quizTotal}`;
  const readLibraryValue = `${visibleStats.readCount}/${newsModules.length}`;
  const hasActivity =
    visibleStats.readCount + visibleStats.quizCorrect + visibleStats.thoughtCount > 0;

  return (
    <section className="view-grid">
      <div className="content-header">
        <div>
          <p className="eyebrow">Learning loop</p>
          <h2>毎日の教養ログ</h2>
          <p>{rangeLabel}の読んだ量、試した量、考えた量を軽く見える化します。</p>
        </div>
        <button className="ghost-button danger-button" onClick={onResetLearningData} type="button">
          <Trash2 size={17} />
          <span>学習データをリセット</span>
        </button>
      </div>

      <div className="range-tabs" aria-label="ログの期間">
        {[
          ["today", "今日"],
          ["month", "今月"],
          ["all", "全期間"],
        ].map(([id, label]) => (
          <button
            className={range === id ? "range-tab active" : "range-tab"}
            key={id}
            onClick={() => setRange(id as ProgressRange)}
            type="button"
          >
            {label}
          </button>
        ))}
      </div>

      <div className="metric-row">
        <Metric icon={BookOpen} label="既読" value={readLibraryValue} />
        <Metric icon={CircleHelp} label="クイズ" value={quizValue} />
        <Metric icon={Brain} label="思考ノード" value={`${visibleStats.thoughtCount}`} />
        <Metric icon={Layers3} label="教材数" value={`${newsModules.length}`} />
      </div>

      <article className="log-summary">
        <strong>{rangeLabel}のふり返り</strong>
        <p>
          {hasActivity
            ? `${newsModules.length}本の教材のうち、${visibleStats.readCount}本に読んだログがあります。次は未読のテーマを一つ選ぶと、教養の範囲が広がります。`
            : `まだこの期間のログはありません。${newsModules.length}本の教材から気になるテーマを一つ選んで、背景から読んでみましょう。`}
        </p>
        {!hasActivity && (
          <button className="primary-button log-summary-action" onClick={onStartLearning} type="button">
            <BookOpen size={17} />
            <span>教材を読む</span>
          </button>
        )}
      </article>

      <div className="progress-list">
        {newsModules.map((module) => {
          const moduleProgress = getModuleProgress(progress, module.id);
          const score = getScore(module, moduleProgress);
          const thoughtCount = countThoughtFields(thoughts[module.id] ?? emptyThought);
          const readValue = isInRange(
            moduleProgress.readAt ?? moduleProgress.completedAt,
            range,
            referenceDate,
          )
            ? moduleProgress.read
              ? 100
              : 0
            : 0;
          const quizValueForModule = isInRange(
            moduleProgress.quizUpdatedAt ?? moduleProgress.completedAt,
            range,
            referenceDate,
          )
            ? (score / module.quizItems.length) * 100
            : 0;
          const thoughtValue = isInRange(thoughtMeta[module.id]?.updatedAt, range, referenceDate)
            ? (thoughtCount / 5) * 100
            : 0;
          const hasModuleActivity = readValue + quizValueForModule + thoughtValue > 0;

          return (
            <article className="progress-card" key={module.id}>
              <div className="progress-card-copy">
                <div>
                  <div className="progress-card-meta">
                    <span>{module.category}</span>
                    {moduleProgress.review && (
                      <span className="reviewed-badge">
                        <CheckCircle2 size={14} />
                        復習済み
                      </span>
                    )}
                  </div>
                  <h3>{module.title}</h3>
                </div>
                <button
                  className="ghost-button progress-card-action"
                  onClick={() =>
                    hasModuleActivity ? onOpenModule(module.id) : onStartModule(module.id)
                  }
                  type="button"
                >
                  {hasModuleActivity ? <RotateCcw size={16} /> : <BookOpen size={16} />}
                  <span>{hasModuleActivity ? "復習する" : "教材を見る"}</span>
                </button>
              </div>
              <div className="progress-bars">
                <ProgressBar label="Read" value={readValue} />
                <ProgressBar label="Quiz" value={quizValueForModule} />
                <ProgressBar label="Tree" value={thoughtValue} />
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function Metric({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="metric-card">
      <Icon size={21} />
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function ProgressBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="progress-bar-row">
      <span>{label}</span>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${Math.min(100, value)}%` }} />
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight,
  BookOpen,
  Brain,
  CheckCircle2,
  CircleHelp,
  Compass,
  Flame,
  GraduationCap,
  History,
  Home,
  Layers3,
  Lightbulb,
  Map,
  MessageSquareText,
  PanelTop,
  RefreshCw,
  Route,
  Sparkles,
  Sprout,
  Trophy,
} from "lucide-react";
import { newsModules } from "./data/modules";
import {
  defaultProgress,
  emptyThought,
  loadProgress,
  loadThoughts,
  saveProgress,
  saveThoughts,
} from "./storage";
import type { ModuleProgress, NavigationItem, NewsModule, ThoughtNode, ViewId } from "./types";
import "./styles.css";

const navItems: NavigationItem[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "learn", label: "Learn", icon: BookOpen },
  { id: "quiz", label: "Quiz", icon: CircleHelp },
  { id: "tree", label: "Tree", icon: Brain },
  { id: "progress", label: "Progress", icon: Trophy },
];

const sectionIcons = {
  history: History,
  system: Layers3,
  stakeholders: Sprout,
  debate: MessageSquareText,
};

const getModuleProgress = (
  progress: Record<string, ModuleProgress>,
  moduleId: string,
): ModuleProgress => progress[moduleId] ?? defaultProgress();

const getScore = (module: NewsModule, moduleProgress: ModuleProgress) =>
  module.quizItems.reduce((score, item) => {
    return moduleProgress.quizAnswers[item.id] === item.answerIndex ? score + 1 : score;
  }, 0);

const countThoughtFields = (thought: ThoughtNode) =>
  Object.values(thought).filter((value) => value.trim().length > 0).length;

function App() {
  const [activeView, setActiveView] = useState<ViewId>("home");
  const [selectedModuleId, setSelectedModuleId] = useState(newsModules[0].id);
  const [progress, setProgress] = useState(loadProgress);
  const [thoughts, setThoughts] = useState(loadThoughts);

  const selectedModule = useMemo(
    () => newsModules.find((module) => module.id === selectedModuleId) ?? newsModules[0],
    [selectedModuleId],
  );

  const selectedProgress = getModuleProgress(progress, selectedModule.id);
  const selectedThought = thoughts[selectedModule.id] ?? emptyThought;

  const stats = useMemo(() => {
    const readCount = newsModules.filter((module) => getModuleProgress(progress, module.id).read)
      .length;
    const quizCorrect = newsModules.reduce(
      (total, module) => total + getScore(module, getModuleProgress(progress, module.id)),
      0,
    );
    const quizTotal = newsModules.reduce((total, module) => total + module.quizItems.length, 0);
    const thoughtCount = newsModules.reduce(
      (total, module) => total + countThoughtFields(thoughts[module.id] ?? emptyThought),
      0,
    );

    return { readCount, quizCorrect, quizTotal, thoughtCount };
  }, [progress, thoughts]);

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  useEffect(() => {
    saveThoughts(thoughts);
  }, [thoughts]);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => undefined);
    }
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
    });
  };

  const updateThought = (field: keyof ThoughtNode, value: string) => {
    setThoughts((current) => ({
      ...current,
      [selectedModule.id]: {
        ...(current[selectedModule.id] ?? emptyThought),
        [field]: value,
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
            <span>News literacy studio</span>
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
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <p className="eyebrow">Background-first news learning</p>
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
            stats={stats}
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
                completedAt: new Date().toISOString(),
              })
            }
          />
        )}

        {activeView === "quiz" && (
          <QuizView module={selectedModule} progress={selectedProgress} onAnswer={setQuizAnswer} />
        )}

        {activeView === "tree" && (
          <ThoughtTreeView module={selectedModule} thought={selectedThought} onChange={updateThought} />
        )}

        {activeView === "progress" && (
          <ProgressView progress={progress} thoughts={thoughts} stats={stats} />
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
  return (
    <section className="module-strip" aria-label="教材を選ぶ">
      {newsModules.map((module) => {
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
            <small>
              {module.readingTime} · {score}/{module.quizItems.length}
            </small>
          </button>
        );
      })}
    </section>
  );
}

function HomeView({
  selectedModule,
  selectedProgress,
  stats,
  onStart,
}: {
  selectedModule: NewsModule;
  selectedProgress: ModuleProgress;
  stats: { readCount: number; quizCorrect: number; quizTotal: number; thoughtCount: number };
  onStart: () => void;
}) {
  const score = getScore(selectedModule, selectedProgress);

  return (
    <section className="view-grid home-grid">
      <div className="hero-panel">
        <div className="hero-copy">
          <span className="pill">
            <Sparkles size={15} />
            新しい教養の習慣
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
      </div>

      <div className="focus-panel">
        <div>
          <p className="eyebrow">Focus question</p>
          <h3>{selectedModule.leadQuestion}</h3>
        </div>
        <p>
          Edgionは、ニュースを「知って終わり」にせず、背景知識、確認クイズ、意見の骨組みまで一つの流れで扱います。
        </p>
      </div>
    </section>
  );
}

function LearnView({
  module,
  progress,
  onMarkRead,
}: {
  module: NewsModule;
  progress: ModuleProgress;
  onMarkRead: () => void;
}) {
  return (
    <section className="view-grid">
      <div className="content-header">
        <div>
          <p className="eyebrow">{module.category}</p>
          <h2>{module.title}</h2>
          <p>{module.summary}</p>
        </div>
        <button className="primary-button" onClick={onMarkRead} type="button">
          <CheckCircle2 size={17} />
          <span>{progress.read ? "既読済み" : "既読にする"}</span>
        </button>
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
    </section>
  );
}

function QuizView({
  module,
  progress,
  onAnswer,
}: {
  module: NewsModule;
  progress: ModuleProgress;
  onAnswer: (quizId: string, answerIndex: number) => void;
}) {
  const score = getScore(module, progress);

  return (
    <section className="view-grid">
      <div className="content-header">
        <div>
          <p className="eyebrow">Check your frame</p>
          <h2>理解を小さく試す</h2>
          <p>背景を読んだあと、制度や論点のつながりをクイズで確認します。</p>
        </div>
        <div className="score-badge">
          {score}/{module.quizItems.length}
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
  thought,
  onChange,
}: {
  module: NewsModule;
  thought: ThoughtNode;
  onChange: (field: keyof ThoughtNode, value: string) => void;
}) {
  return (
    <section className="view-grid">
      <div className="content-header">
        <div>
          <p className="eyebrow">Thought tree</p>
          <h2>意見の枝を育てる</h2>
          <p>{module.leadQuestion}</p>
        </div>
        <span className="mini-status">{countThoughtFields(thought)}/5 nodes</span>
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
          {module.thoughtPrompts.map((prompt) => (
            <label className="thought-card" key={prompt.id}>
              <span>{prompt.title}</span>
              <small>{prompt.prompt}</small>
              <textarea
                onChange={(event) => onChange(prompt.label, event.target.value)}
                placeholder="ここに自分の言葉でメモ"
                rows={4}
                value={thought[prompt.label]}
              />
            </label>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProgressView({
  progress,
  thoughts,
  stats,
}: {
  progress: Record<string, ModuleProgress>;
  thoughts: Record<string, ThoughtNode>;
  stats: { readCount: number; quizCorrect: number; quizTotal: number; thoughtCount: number };
}) {
  return (
    <section className="view-grid">
      <div className="content-header">
        <div>
          <p className="eyebrow">Learning loop</p>
          <h2>毎日の教養ログ</h2>
          <p>読んだ量、試した量、考えた量を軽く見える化します。</p>
        </div>
      </div>

      <div className="metric-row">
        <Metric icon={BookOpen} label="既読" value={`${stats.readCount}/${newsModules.length}`} />
        <Metric icon={CircleHelp} label="クイズ" value={`${stats.quizCorrect}/${stats.quizTotal}`} />
        <Metric icon={Brain} label="思考ノード" value={`${stats.thoughtCount}`} />
      </div>

      <div className="progress-list">
        {newsModules.map((module) => {
          const moduleProgress = getModuleProgress(progress, module.id);
          const score = getScore(module, moduleProgress);
          const thoughtCount = countThoughtFields(thoughts[module.id] ?? emptyThought);

          return (
            <article className="progress-card" key={module.id}>
              <div>
                <span>{module.category}</span>
                <h3>{module.title}</h3>
              </div>
              <div className="progress-bars">
                <ProgressBar label="Read" value={moduleProgress.read ? 100 : 0} />
                <ProgressBar label="Quiz" value={(score / module.quizItems.length) * 100} />
                <ProgressBar label="Tree" value={(thoughtCount / 5) * 100} />
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

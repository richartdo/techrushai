"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowUpRight,
  BookOpen,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Compass,
  LayoutDashboard,
  LoaderCircle,
  Route,
  UserRound,
} from "lucide-react";
import { signOut } from "@/app/auth/actions";

type Progress = { status: "not_started" | "in_progress" | "completed"; updated_at?: string };
type LearningModule = {
  id: string;
  title: string;
  objective: string;
  position: number;
  learning_progress: Progress[];
};
type Roadmap = {
  id: string;
  title: string;
  summary: string;
  status: "draft" | "active" | "archived";
  learning_modules: LearningModule[];
};

const links = [
  { href: "/app", label: "Learning home", icon: LayoutDashboard },
  { href: "/roadmap", label: "My roadmap", icon: Route },
  { href: "/assessments", label: "Assessments", icon: ClipboardCheck },
  { href: "/second-brain", label: "Second Brain", icon: BrainCircuit },
  { href: "/settings/profile", label: "My profile", icon: UserRound },
];

function progressFor(module: LearningModule) {
  return module.learning_progress?.[0]?.status ?? "not_started";
}

function titleCase(value: string) {
  return value.replace("_", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export function LmsHome() {
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");
  const [feedback, setFeedback] = useState("");
  const [savingModule, setSavingModule] = useState<string | null>(null);

  const loadRoadmaps = async () => {
    setState("loading");
    try {
      const response = await fetch("/api/roadmaps", { cache: "no-store" });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error ?? "We could not load your learning plan.");
      setRoadmaps(body.roadmaps ?? []);
      setFeedback("");
      setState("ready");
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : "We could not load your learning plan.");
      setState("error");
    }
  };

  useEffect(() => {
    void Promise.resolve().then(loadRoadmaps);
  }, []);

  const learningState = useMemo(() => {
    const roadmap = roadmaps.find((item) => item.status === "active") ?? roadmaps[0];
    const modules = [...(roadmap?.learning_modules ?? [])].sort((a, b) => a.position - b.position);
    const completed = modules.filter((module) => progressFor(module) === "completed").length;
    const current = modules.find((module) => progressFor(module) === "in_progress")
      ?? modules.find((module) => progressFor(module) !== "completed");
    return {
      roadmap,
      modules,
      completed,
      current,
      percent: modules.length ? Math.round((completed / modules.length) * 100) : 0,
    };
  }, [roadmaps]);

  const completeCurrentModule = async () => {
    const currentModule = learningState.current;
    if (!currentModule) return;
    setSavingModule(currentModule.id);
    setFeedback("");
    try {
      const response = await fetch("/api/progress", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ moduleId: currentModule.id, status: "completed" }),
      });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error ?? "We could not save that progress update.");
      setRoadmaps((currentRoadmaps) => currentRoadmaps.map((roadmap) => ({
        ...roadmap,
        learning_modules: roadmap.learning_modules.map((item) => item.id === currentModule.id
          ? { ...item, learning_progress: [{ status: "completed" }] }
          : item),
      })));
      setFeedback("Progress saved. Your next lesson is ready.");
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : "We could not save that progress update.");
    } finally {
      setSavingModule(null);
    }
  };

  return (
    <main className="lms-shell">
      <aside className="lms-rail" aria-label="Learning navigation">
        <Link className="lms-brand" href="/app">techrush<span>ai</span></Link>
        <nav className="lms-navigation">
          {links.map(({ href, label, icon: Icon }) => (
            <Link className={`lms-nav-link${href === "/app" ? " is-active" : ""}`} href={href} key={href}>
              <Icon aria-hidden="true" size={18} />
              <span>{label}</span>
            </Link>
          ))}
        </nav>
        <form className="lms-signout" action={signOut}>
          <button type="submit">Sign out</button>
        </form>
      </aside>

      <section className="lms-content" aria-labelledby="lms-heading">
        <header className="lms-heading">
          <div>
            <p className="lms-kicker">Your learning space</p>
            <h1 id="lms-heading">Keep building your direction.</h1>
          </div>
          <Link className="lms-profile-link" href="/settings/profile"><UserRound size={17} aria-hidden="true" /> Profile</Link>
        </header>

        {state === "loading" && <LmsSkeleton />}
        {state === "error" && (
          <section className="lms-message lms-message-error" role="alert">
            <p>{feedback}</p>
            <button type="button" onClick={() => void loadRoadmaps()}>Try again</button>
          </section>
        )}
        {state === "ready" && !learningState.roadmap && <LmsEmptyState />}
        {state === "ready" && learningState.roadmap && (
          <div className="lms-layout">
            <section className="lms-primary">
              <article className="lms-next-card">
                <div className="lms-next-copy">
                  <p className="lms-kicker">Continue learning</p>
                  <h2>{learningState.current?.title ?? "Your roadmap is complete"}</h2>
                  <p>{learningState.current?.objective ?? "You have completed every saved lesson in this roadmap."}</p>
                  {learningState.current ? (
                    <div className="lms-next-actions">
                      <Link className="lms-button lms-button-primary" href="/roadmap">Open roadmap <ChevronRight size={17} aria-hidden="true" /></Link>
                      <button className="lms-button lms-button-secondary" type="button" onClick={completeCurrentModule} disabled={savingModule === learningState.current.id}>
                        {savingModule === learningState.current.id ? <LoaderCircle className="lms-spinner" size={17} aria-hidden="true" /> : <CheckCircle2 size={17} aria-hidden="true" />}
                        {savingModule === learningState.current.id ? "Saving" : "Mark complete"}
                      </button>
                    </div>
                  ) : <Link className="lms-button lms-button-primary" href="/roadmap">Review roadmap <ArrowUpRight size={17} aria-hidden="true" /></Link>}
                </div>
                <div className="lms-next-marker" aria-hidden="true"><BookOpen size={38} /><span>Next</span></div>
              </article>

              {feedback && <p className={`lms-feedback${feedback.startsWith("Progress saved") ? " is-success" : " is-error"}`} role="status">{feedback}</p>}

              <section className="lms-sequence" aria-labelledby="sequence-heading">
                <div className="lms-section-heading">
                  <div><p className="lms-kicker">Saved plan</p><h2 id="sequence-heading">Your learning sequence</h2></div>
                  <Link href="/roadmap">View all <ArrowUpRight size={15} aria-hidden="true" /></Link>
                </div>
                <ol>
                  {learningState.modules.slice(0, 4).map((module, index) => {
                    const status = progressFor(module);
                    return <li className={`lms-module is-${status}`} key={module.id}>
                      <span className="lms-module-number">{String(index + 1).padStart(2, "0")}</span>
                      <div><h3>{module.title}</h3><p>{module.objective}</p></div>
                      <span className="lms-status">{titleCase(status)}</span>
                    </li>;
                  })}
                </ol>
              </section>
            </section>

            <aside className="lms-sidebar">
              <section className="lms-plan-card" aria-labelledby="plan-heading">
                <p className="lms-kicker">Current roadmap</p>
                <h2 id="plan-heading">{learningState.roadmap.title}</h2>
                <p>{learningState.roadmap.summary}</p>
                <div className="lms-progress-row"><span>{learningState.completed} of {learningState.modules.length} lessons complete</span><strong>{learningState.percent}%</strong></div>
                <div className="lms-progress-track" aria-label={`${learningState.percent}% of roadmap complete`} role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={learningState.percent}><span style={{ width: `${learningState.percent}%` }} /></div>
              </section>
              <section className="lms-tools" aria-labelledby="tools-heading">
                <p className="lms-kicker">Learning tools</p>
                <h2 id="tools-heading">Use your evidence</h2>
                <Link href="/assessments"><ClipboardCheck size={19} aria-hidden="true" /><span><strong>Assessments</strong><small>Record what you know</small></span><ChevronRight size={16} aria-hidden="true" /></Link>
                <Link href="/second-brain"><BrainCircuit size={19} aria-hidden="true" /><span><strong>Second Brain</strong><small>Keep useful learning notes</small></span><ChevronRight size={16} aria-hidden="true" /></Link>
                <Link href="/settings/profile"><Compass size={19} aria-hidden="true" /><span><strong>Learning profile</strong><small>Refine your direction</small></span><ChevronRight size={16} aria-hidden="true" /></Link>
              </section>
            </aside>
          </div>
        )}
      </section>
    </main>
  );
}

function LmsSkeleton() {
  return <div className="lms-layout" aria-label="Loading your learning space" aria-busy="true">
    <section className="lms-primary"><div className="lms-skeleton lms-skeleton-hero" /><div className="lms-skeleton lms-skeleton-list" /></section>
    <aside className="lms-sidebar"><div className="lms-skeleton lms-skeleton-side" /><div className="lms-skeleton lms-skeleton-side" /></aside>
  </div>;
}

function LmsEmptyState() {
  return <section className="lms-empty">
    <div className="lms-empty-icon"><Compass size={30} aria-hidden="true" /></div>
    <p className="lms-kicker">Start here</p>
    <h2>Build your first learning plan.</h2>
    <p>Tell us where you are and what you want to learn, then save a roadmap you can return to here.</p>
    <div><Link className="lms-button lms-button-primary" href="/onboarding">Complete profile <ChevronRight size={17} aria-hidden="true" /></Link><Link className="lms-button lms-button-secondary" href="/roadmap">Create roadmap <ArrowUpRight size={17} aria-hidden="true" /></Link></div>
  </section>;
}

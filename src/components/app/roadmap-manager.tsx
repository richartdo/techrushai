"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Check, ChevronRight, Sparkles } from "lucide-react";

type Module = { id: string; title: string; objective: string; position: number; learning_progress: { status: string }[] };
type Path = { id: string; title: string; summary: string; source: string; learning_modules: Module[] };

export function RoadmapManager() {
  const [paths, setPaths] = useState<Path[]>([]);
  const [status, setStatus] = useState("Loading saved roadmaps…");
  const [busy, setBusy] = useState(false);
  const [needsOnboarding, setNeedsOnboarding] = useState(false);
  const load = async () => {
    const response = await fetch("/api/roadmaps"); const body = await response.json();
    if (response.ok) { setPaths(body.roadmaps); setStatus(""); } else setStatus(body.error ?? "Unable to load roadmaps.");
  };
  useEffect(() => { void Promise.resolve().then(load); }, []);
  const create = async () => {
    setBusy(true); setNeedsOnboarding(false); setStatus("");
    const response = await fetch("/api/roadmaps", { method: "POST" }); const body = await response.json();
    setBusy(false);
    if (response.ok) { setStatus(body.mode === "mock" ? "Your sample roadmap has been saved." : "Your roadmap has been saved."); void load(); return; }
    if (body.code === "ONBOARDING_REQUIRED") { setNeedsOnboarding(true); setStatus(body.error); return; }
    setStatus(body.error ?? "Unable to create roadmap.");
  };
  const complete = async (id: string) => {
    const response = await fetch("/api/progress", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ moduleId: id, status: "completed" }) });
    if (response.ok) void load(); else setStatus("Unable to update progress.");
  };
  return <main className="app-shell"><main className="app-main"><header className="app-header"><div><p className="eyebrow">TechRushAI workspace</p><h1>Your personalised roadmap</h1></div></header><section className="roadmap"><div className="panel roadmap-hero"><p className="eyebrow">Personalised learning plan</p><h2>Build your next path.</h2><p>When you are ready to learn a specific skill, save your learning profile first. Your roadmap will then be created around the direction you choose.</p><button className="button button-primary" disabled={busy} onClick={create}><Sparkles size={16} />{busy ? "Creating…" : "Create roadmap"}</button></div>{status && <p className={status.includes("Unable") || needsOnboarding ? "form-error" : "form-success"} role="status">{status}</p>}{needsOnboarding && <Link className="button button-primary" href="/onboarding">Complete learning profile <ChevronRight size={16} /></Link>}<div className="phase-list">{paths.flatMap((path) => path.learning_modules.map((module) => <article className="phase" key={module.id}><span>{String(module.position).padStart(2, "0")}</span><div><p className="eyebrow">{path.source === "development_mock" ? "Sample roadmap" : "Saved roadmap"}</p><h3>{module.title}</h3><p>{module.objective}</p><small>{module.learning_progress?.[0]?.status ?? "not started"}</small></div><button className="button button-quiet" onClick={() => complete(module.id)} disabled={module.learning_progress?.[0]?.status === "completed"}>{module.learning_progress?.[0]?.status === "completed" ? <Check size={16} /> : <ChevronRight size={16} />}</button></article>))}</div></section></main></main>;
}

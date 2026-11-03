"use client";

import Link from "next/link";
import { useState } from "react";
import { Check, ChevronLeft, ChevronRight, Compass, X } from "lucide-react";

type FormData = { displayName: string; experienceLevel: string; skills: string; careerGoal: string; studyHours: string; timeline: string; education: string; knowledge: string; methods: string; outcomes: string };

const steps = [
  { title: "Your starting point", copy: "A few details help us understand the experience you are bringing in." },
  { title: "Your direction", copy: "Choose the skills and outcomes you want your roadmap to support." },
  { title: "A realistic pace", copy: "Set a pace that fits your life. You can revise it any time." },
];

export function OnboardingForm() {
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<FormData>({ displayName: "", experienceLevel: "beginner", skills: "", careerGoal: "", studyHours: "5", timeline: "", education: "", knowledge: "", methods: "self-paced", outcomes: "" });
  const update = (key: keyof FormData, value: string) => setForm((current) => ({ ...current, [key]: value }));
  const field = (label: string, key: keyof FormData, placeholder: string, type = "text") => <label className="onboarding-field">{label}<input type={type} value={form[key]} onChange={(event) => update(key, event.target.value)} placeholder={placeholder} /></label>;
  const save = async () => {
    setSaving(true); setStatus("");
    try {
      const response = await fetch("/api/onboarding", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ displayName: form.displayName, experienceLevel: form.experienceLevel, skillsOfInterest: form.skills.split(",").map((item) => item.trim()).filter(Boolean), careerGoal: form.careerGoal, weeklyStudyHours: form.studyHours, targetTimeline: form.timeline, educationBackground: form.education, technicalKnowledge: form.knowledge, learningMethods: form.methods.split(",").map((item) => item.trim()).filter(Boolean), desiredOutcomes: form.outcomes }) });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error ?? "We could not save your learning profile.");
      setStatus("saved");
    } catch (error) { setStatus(error instanceof Error ? error.message : "We could not save your learning profile."); } finally { setSaving(false); }
  };

  if (status === "saved") return <main className="onboarding-page"><section className="onboarding-success"><div className="onboarding-success-icon"><Check size={28} aria-hidden="true" /></div><p className="onboarding-kicker">Learning profile saved</p><h1>Your LMS is ready for a personal roadmap.</h1><p>Your preferences are private. When you create a roadmap, your learning home will show the saved plan and your progress.</p><div><Link className="onboarding-button onboarding-button-primary" href="/roadmap">Create roadmap <ChevronRight size={17} aria-hidden="true" /></Link><Link className="onboarding-button onboarding-button-secondary" href="/app">Return to LMS</Link></div></section></main>;

  return <main className="onboarding-page">
    <header className="onboarding-topbar"><Link className="onboarding-brand" href="/app">techrush<span>ai</span></Link><Link className="onboarding-skip" href="/app"><X size={17} aria-hidden="true" /> Skip for now</Link></header>
    <section className="onboarding-layout" aria-labelledby="onboarding-title">
      <aside className="onboarding-intro"><p className="onboarding-kicker">Personalise when ready</p><h1 id="onboarding-title">Build a learning plan around you.</h1><p>You can skip this for now and explore the LMS. We only ask for these details when you are ready to create a personalised roadmap.</p><div className="onboarding-intro-note"><Compass size={19} aria-hidden="true" /><span>Your answers stay private and can be changed later.</span></div></aside>
      <section className="onboarding-card">
        <div className="onboarding-progress" aria-label={`Step ${step + 1} of ${steps.length}`}><span>Step {step + 1} of {steps.length}</span><div>{steps.map((item, index) => <i className={index <= step ? "is-current" : ""} key={item.title} />)}</div></div>
        <h2>{steps[step].title}</h2><p className="onboarding-card-copy">{steps[step].copy}</p>
        <div className="onboarding-fields">
          {step === 0 && <>{field("Display name", "displayName", "How should we address you?")}<label className="onboarding-field">Experience level<select value={form.experienceLevel} onChange={(event) => update("experienceLevel", event.target.value)}><option value="beginner">Beginner</option><option value="intermediate">Intermediate</option><option value="advanced">Advanced</option></select></label>{field("Education background", "education", "Your current education")}{field("Technical knowledge", "knowledge", "What have you already learned?")}</>}
          {step === 1 && <>{field("Skills of interest", "skills", "For example: frontend development")}{field("Career goal", "careerGoal", "A role or direction")}<label className="onboarding-field onboarding-field-wide">Desired outcomes<input value={form.outcomes} onChange={(event) => update("outcomes", event.target.value)} placeholder="What do you want to achieve?" /></label></>}
          {step === 2 && <>{field("Study hours each week", "studyHours", "5", "number")}{field("Target timeline", "timeline", "For example: 3 months")}<label className="onboarding-field onboarding-field-wide">Preferred learning methods<input value={form.methods} onChange={(event) => update("methods", event.target.value)} placeholder="For example: self-paced, projects" /></label></>}
        </div>
        {status && <p className="onboarding-error" role="alert">{status}</p>}
        <div className="onboarding-actions"><button className="onboarding-back" type="button" onClick={() => setStep((current) => current - 1)} disabled={step === 0}><ChevronLeft size={17} aria-hidden="true" /> Back</button><button className="onboarding-button onboarding-button-primary" type="button" onClick={() => step < steps.length - 1 ? setStep((current) => current + 1) : void save()} disabled={saving}>{saving ? "Saving" : step === steps.length - 1 ? "Save learning profile" : "Continue"}<ChevronRight size={17} aria-hidden="true" /></button></div>
      </section>
    </section>
  </main>;
}

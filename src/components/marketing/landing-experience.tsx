"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

type Stage = { eyebrow: string; title: string; description: string; detailTitle: string; detail: string; image: string; alt: string };

const stages: Stage[] = [
  { eyebrow: "01 / Learning direction", title: "Find the path that fits your starting point.", description: "Bring your experience, goals, and available time into one clear learning direction.", detailTitle: "A roadmap begins with context.", detail: "TechRushAI gathers the inputs that matter so each next step can be grounded in where you are now—not a generic course sequence.", image: "/illustrations/learning-direction.png", alt: "A learner moving from confusion toward a clear learning path." },
  { eyebrow: "02 / Second Brain", title: "Keep the context behind every learning decision.", description: "Connect notes, practice, goals, and evidence in a memory system made for progress.", detailTitle: "Useful memory, under your control.", detail: "Your Second Brain makes it easier to return to the ideas, attempts, and gaps that shape the help you need next.", image: "/illustrations/second-brain-machine.png", alt: "A glowing knowledge machine with connected concept nodes." },
  { eyebrow: "03 / Portfolio growth", title: "Turn learning into work you can point to.", description: "Shape projects and practical evidence into a portfolio that reflects your development.", detailTitle: "Progress becomes visible work.", detail: "Use your roadmap as a bridge from exercises to meaningful artifacts, keeping the story of how your skills developed intact.", image: "/illustrations/portfolio-growth.png", alt: "Project artifacts growing into a polished profile." },
  { eyebrow: "04 / Opportunities", title: "Explore opportunities through verified work.", description: "Use your learning evidence to understand the projects, roles, and collaborations worth exploring.", detailTitle: "Opportunity follows demonstrated work.", detail: "TechRushAI helps connect your work to relevant directions. It does not promise outcomes; it gives you clearer evidence to take forward.", image: "/illustrations/opportunity-pathways.png", alt: "A learner with opportunity pathways flowing from their verified work." },
];

export function LandingExperience({ videoUrl }: { videoUrl: string }) {
  const [activeStage, setActiveStage] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const active = stages[activeStage];

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setReduceMotion(motionQuery.matches);
    const updateScroll = () => setScrolled(window.scrollY > 24);
    updateMotion(); updateScroll();
    motionQuery.addEventListener("change", updateMotion);
    window.addEventListener("scroll", updateScroll, { passive: true });
    return () => { motionQuery.removeEventListener("change", updateMotion); window.removeEventListener("scroll", updateScroll); };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return <main className="landing-dark">
    <header className={`landing-nav ${scrolled || menuOpen ? "landing-nav-solid" : ""}`}>
      <div className="landing-nav-inner">
        <Link className="landing-brand" href="/" aria-label="TechRushAI home" onClick={closeMenu}>techrush<span>ai</span></Link>
        <nav className={`landing-links ${menuOpen ? "landing-links-open" : ""}`} aria-label="Main navigation">
          <a href="#journey" onClick={closeMenu}>How it works</a><a href="#second-brain" onClick={() => { setActiveStage(1); closeMenu(); }}>Second Brain</a><a href="#faq" onClick={closeMenu}>FAQ</a><Link className="landing-mobile-signin" href="/sign-in" onClick={closeMenu}>Sign in</Link>
        </nav>
        <div className="landing-actions"><Link className="landing-signin" href="/sign-in">Sign in</Link><Link className="landing-cta" href="/onboarding">Start learning <ArrowRight size={18} aria-hidden="true" /></Link><button className="landing-menu-button" type="button" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? <X size={21} /> : <Menu size={21} />}</button></div>
      </div>
    </header>
    <section className="landing-hero" aria-labelledby="landing-title">
      {videoUrl && !reduceMotion ? <video className="landing-hero-video" autoPlay muted loop playsInline preload="metadata" aria-hidden="true"><source src={videoUrl} /></video> : null}
      <div className="landing-video-overlay" />
      <div className="landing-hero-inner"><div className="landing-hero-copy"><p className="landing-kicker">Learning intelligence for builders</p><h1 id="landing-title">From uncertain to <em>opportunity-ready.</em></h1><p>Bring your experience, goals, and evidence into one system that helps you choose a direction and build meaningful momentum.</p><div className="landing-hero-actions"><Link className="landing-cta" href="/onboarding">Find my direction <ArrowRight size={18} aria-hidden="true" /></Link><a className="landing-text-link" href="#journey">Explore the journey <ArrowRight size={16} aria-hidden="true" /></a></div></div><figure className="landing-hero-art"><Image src="/techrush-journey.png" alt="A learner using the TechRushAI engine to move from uncertainty to new opportunities." width={2056} height={765} priority /></figure></div>
    </section>
    <section className="landing-journey" id="journey" aria-labelledby="journey-title"><div className="landing-section-heading"><p className="landing-kicker">One connected journey</p><h2 id="journey-title">Build a path, a memory, and work that carries forward.</h2><p>Select a stage to see how the pieces work together.</p></div><div className="landing-stage-grid">{stages.map((stage, index) => <button key={stage.title} className={`landing-stage ${activeStage === index ? "landing-stage-active" : ""}`} type="button" onClick={() => setActiveStage(index)} aria-pressed={activeStage === index}><span className="landing-stage-art"><Image src={stage.image} alt={stage.alt} width={1024} height={1024} style={{ width: "100%", height: "auto" }} /></span><span className="landing-stage-copy"><small>{stage.eyebrow}</small><strong>{stage.title}</strong><span>{stage.description}</span></span></button>)}</div><article className="landing-stage-detail" id="second-brain" aria-live="polite"><div className="landing-detail-orbit" aria-hidden="true"><i /><i /><i /></div><p>{active.eyebrow}</p><h3>{active.detailTitle}</h3><span>{active.detail}</span><Link className="landing-text-link" href={activeStage === 1 ? "/second-brain" : "/onboarding"}>{activeStage === 1 ? "Explore the Second Brain" : "Start with your direction"} <ArrowRight size={16} aria-hidden="true" /></Link></article></section>
    <section className="landing-faq" id="faq" aria-labelledby="faq-title"><div><p className="landing-kicker">Questions, answered plainly</p><h2 id="faq-title">Built for useful progress.</h2></div><div className="landing-faq-items"><details><summary>Does TechRushAI claim I have mastered a skill?</summary><p>No. It separates completed learning from evidence of skill and shows the basis of each recommendation.</p></details><details><summary>What happens when AI configuration is unavailable?</summary><p>The product makes its development mode explicit and keeps saved roadmap and learning workflows available without pretending a live model responded.</p></details><details><summary>Can I update my goals later?</summary><p>Yes. Your preferences and goals are designed to be revisited as your direction changes.</p></details></div></section>
    <footer className="landing-footer"><Link className="landing-brand" href="/">techrush<span>ai</span></Link><span>Learn smarter. Build your Second Brain.</span><span>Meta Global AI Developer Hackathon 2026</span></footer>
  </main>;
}

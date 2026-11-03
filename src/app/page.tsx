import { LandingExperience } from "@/components/marketing/landing-experience";

export default function Home() {
  return <LandingExperience videoUrl={process.env.NEXT_PUBLIC_HERO_VIDEO_URL ?? ""} />;
}

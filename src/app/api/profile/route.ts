import { NextResponse } from "next/server";
import { requireUserId } from "@/lib/security/auth";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { learnerProfileSchema } from "@/lib/validations/learner";

export async function GET() {
  try {
    const db = await createServerSupabaseClient();
    const userId = await requireUserId(db.auth);
    const [{ data: profile, error: profileError }, { data: preferences, error: preferencesError }, { data: auth }] = await Promise.all([
      db.from("profiles").select("display_name,resume_status,profile_visibility").eq("id", userId).maybeSingle(),
      db.from("learner_preferences").select("education_background,technical_knowledge,skills_of_interest,career_goal,experience_level,learning_methods,weekly_study_hours,desired_outcomes,target_timeline").eq("user_id", userId).maybeSingle(),
      db.auth.getUser(),
    ]);
    if (profileError || preferencesError) throw profileError ?? preferencesError;
    return NextResponse.json({ profile, preferences, email: auth.user?.email ?? "" });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error && error.message === "UNAUTHORIZED" ? "Sign in required" : "Unable to load your profile" }, { status: error instanceof Error && error.message === "UNAUTHORIZED" ? 401 : 400 });
  }
}

export async function PUT(request: Request) {
  try {
    const input = learnerProfileSchema.parse(await request.json());
    const db = await createServerSupabaseClient();
    const userId = await requireUserId(db.auth);
    const updatedAt = new Date().toISOString();
    const [{ error: profileError }, { error: preferencesError }] = await Promise.all([
      db.from("profiles").upsert({ id: userId, display_name: input.displayName, resume_status: input.resumeStatus, profile_visibility: input.profileVisibility, updated_at: updatedAt }),
      db.from("learner_preferences").upsert({ user_id: userId, education_background: input.educationBackground, technical_knowledge: input.technicalKnowledge, skills_of_interest: input.skillsOfInterest, career_goal: input.careerGoal, experience_level: input.experienceLevel, learning_methods: input.learningMethods, weekly_study_hours: input.weeklyStudyHours, desired_outcomes: input.desiredOutcomes, target_timeline: input.targetTimeline, updated_at: updatedAt }),
    ]);
    if (profileError || preferencesError) throw profileError ?? preferencesError;
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error && error.message === "UNAUTHORIZED" ? "Sign in required" : "Unable to save your profile" }, { status: error instanceof Error && error.message === "UNAUTHORIZED" ? 401 : 400 });
  }
}

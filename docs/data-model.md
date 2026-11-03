# Data model and isolation

Implemented private Supabase records are owned by `profiles.id` / `auth.uid()`: learner preferences, learning paths/modules/progress, tutor conversations/messages, memory entries, assessment attempts, and skill-mastery records. RLS policies scope access to the signed-in user.

The frontend introduces `SkillProfile` as the required next level of isolation. A future migration must create user-owned skill-profile records and add `skill_profile_id` foreign keys to roadmaps, progress, assessments, memory entries, projects, portfolio drafts, career targets, applications, social plans, and WhatsApp threads. Until that migration lands, expanded feature-area screens remain integration-ready and do not claim profile-specific persistence.

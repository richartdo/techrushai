# Implementation progress

## Completed
- Responsive Workbench/Cobalt design system, public landing page, app shell, onboarding, roadmap, learning, tutor, Second Brain, assessment and career views.
- Supabase SSR browser/server clients, session-refresh proxy, protected application routes, sign-up/sign-in/sign-out, confirmation callback, and password reset action.
- Authenticated Zod-validated endpoints for learner preferences, roadmap creation/retrieval/update, module progress, assessment attempts, skill-mastery updates, and private learner-memory evidence.
- Additive Phase 2 migration for automatic profile creation, module-write policies, and user-owned skill mastery records.
- Mock AI remains deterministic and is explicitly marked `development_mock` when persisted; no fallback provider is silently used.
- Product route architecture for profiles, learning, Second Brain, projects, portfolio, career, social, settings, public portfolio, and public product pages. Each area supplies a consistent profile-context surface, integration-state disclosure, empty state, and local interaction feedback.
- Typed frontend integration contracts and documentation for provider states and external setup.
- Public landing page redesigned with a scoped dark-navy system, responsive edge navigation, original TechRushAI journey illustrations, selectable journey stages, and a reduced-motion-safe hero.
- Optional hero-video configuration added as `NEXT_PUBLIC_HERO_VIDEO_URL`; it remains blank by default so no video request is made until an approved local or hosted URL is supplied.
- Authenticated `/settings/profile` page and `/api/profile` endpoint now load and update the learner's private profile and onboarding context with Zod validation. Resume status is intentionally metadata-only until secure Supabase Storage is configured.
- Authenticated `/app` is now the learner LMS home after sign-in: it retrieves only the signed-in learner's saved roadmap, shows real lesson completion, persists “Mark complete” through the protected progress endpoint, and links to assessment, Second Brain, roadmap, and profile workflows.
- Onboarding is optional after account creation: new learners enter `/app` directly, can skip the learning-profile form, and are asked to complete it only when they choose to create a personalised roadmap. The roadmap endpoint independently enforces this requirement before generating a record.

## Pending external setup
- Create a Supabase project, copy `.env.example` to `.env.local`, then set the URL and publishable key.
- Apply all migrations in `supabase/migrations/` through the Supabase CLI or SQL editor, including `202610280003_learner_profile_settings.sql`. This is intentionally not performed from this workspace.
- In Supabase Auth, add `http://localhost:3000/auth/callback` and the production `/auth/callback` URL to Redirect URLs; configure email confirmation/reset email delivery.
- Provider-specific live Meta Model API request mapping and credentials.
- Embedding-provider selection for pgvector semantic retrieval.
- Skill-profile data model and migration: required before profile-specific routes can persist independently scoped data. The UI explicitly labels these expanded areas as integration-ready rather than functional integrations.

## Verification
- `pnpm lint` passed with no errors.
- `pnpm test` passed: 3 authorization/user-isolation checks.
- `pnpm build` passed: TypeScript validation completed; 27 route entries including the LMS, onboarding, profile, and product catch-all coverage were generated.
- Landing-page verification: blank video configuration uses the illustration fallback; navigation, CTA, responsive menu, keyboard-selectable journey controls, and reduced-motion video suppression are implemented in the public-page component.
- Live Supabase integration is not executable in this workspace until the documented project credentials and migrations are supplied.

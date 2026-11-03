# External services checklist

| Service | Purpose | Required configuration | Current state | Test before claim |
|---|---|---|---|---|
| Supabase | Auth and private learner data | URL, publishable key, auth redirects, migrations | Not configured locally | Sign up, session refresh, RLS isolation |
| Meta Model API | Roadmaps and tutoring | Server-only endpoint/key and provider request mapping | Development mock | Structured response and failure path |
| Educational resources | Verified study videos/resources | Approved provider/API | Not configured | URL metadata and learner save flow |
| WhatsApp Business | Learning assistant | Business account, webhook, token | Not configured | Opt-in, inbound/outbound and isolation |
| Social APIs | Draft approval and publishing | OAuth clients/scopes | Not configured | Explicit publish approval and account ownership |

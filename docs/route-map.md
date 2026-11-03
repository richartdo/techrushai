# Route map

Public: `/`, `/about`, `/features`, `/how-it-works`, `/sign-in`, `/sign-up`, `/reset-password`, `/p/[username]/*`.

Private core: `/app`, `/onboarding`, `/roadmap`, `/learn`, `/tutor`, `/second-brain`, `/assessments`, `/career`.

Private product-area coverage: `/dashboard`, `/profiles/*`, `/learning/*`, `/projects/*`, `/portfolio/*`, `/career/*`, `/social/*`, `/settings/*`, and `/second-brain/*`. These render the profile-scoped integration-ready area shell until the corresponding data provider is configured. The Supabase proxy protects these routes when environment configuration exists.

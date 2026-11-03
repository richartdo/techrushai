# Component inventory

- `Workspace`: existing core dashboard, learning, tutor, Second Brain, and career surfaces.
- `OnboardingForm`, `RoadmapManager`, `AssessmentForm`: Supabase-backed core workflow controls.
- `ProductArea`: reusable profile-scoped feature-area shell with contextual actions, integration state, empty state, and module cards.
- `AuthForm` and `SignOutButton`: authentication interaction surfaces.

Feature-specific components should replace generic `ProductArea` cards only when their real provider/repository contract is implemented.

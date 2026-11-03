# Frontend implementation plan

## Current coverage

The application has a Cobalt/Workbench design system, public landing page, protected core learner paths, Supabase SSR boundaries, onboarding persistence, roadmap persistence, assessment evidence, Second Brain, and career views. The current UI did not yet contain the broader multi-profile, project, public portfolio, social, WhatsApp, or integration-status route architecture required by the product brief.

## Incremental approach

1. Preserve the established visual system and backend boundary.
2. Use a route registry and feature-area shell for the wider product map, avoiding duplicated static mock dashboards.
3. Model all unavailable services with typed, visible integration states.
4. Keep Supabase-backed learning operations separate from development fixtures and live Meta operations.
5. Expand individual feature areas from their integration-ready states only when their backing data model and provider are ready.

## Delivered in this pass

- Dedicated, navigable product-area screens for profiles, learning, Second Brain, projects, portfolios, career, social, and settings; plus public about/features/how-it-works and public portfolio route coverage.
- Profile-context affordance and empty-state guidance that avoids mixing profiles or manufacturing data.
- Typed contracts and status cards for Supabase, Meta, resources, WhatsApp, and social integrations.

## Next build increments

Implement profile records/migrations and profile switching first, then attach profile IDs to learning paths, memory, projects, and portfolio drafts. This is prerequisite to safely enabling the broader modules.

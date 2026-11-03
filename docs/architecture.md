# TechRushAI architecture

Next.js App Router provides the UI and server Route Handlers. Supabase owns authentication, private relational data, row-level access control, and future private storage. Meta inference remains server-side behind `src/lib/ai/meta.ts`; the current adapter exposes explicit `mock` and `live` modes and never silently changes providers.

Core flow: learner preferences → validated roadmap → learning activity / assessment evidence → memory entries → retrieved context → adapted tutor and career recommendations. `memory_entries` is structured memory. Semantic retrieval is intentionally modular and is not represented as enabled until a compatible embedding provider is configured.

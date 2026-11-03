# Deployment

Set `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, `META_API_URL`, and `META_API_KEY` in Vercel. Never expose `META_API_KEY` with a `NEXT_PUBLIC_` prefix. Apply `supabase/migrations/202610280001_core_learning.sql` using the Supabase CLI or SQL editor before enabling authenticated persistence.

Without Meta variables, the application intentionally runs in visible development mock mode. A real Meta endpoint must be mapped and tested in `src/lib/ai/meta.ts` before selecting live mode. Configure Supabase Auth redirect URLs for the deployed hostname and add error monitoring before production launch.

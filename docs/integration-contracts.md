# Integration contracts

All provider state uses one of: `not_configured`, `development_mock`, `connecting`, `connected`, `error`, or `unauthorized`.

Typed contracts reside in `src/lib/integrations/contracts.ts`. They cover skill profiles, educational resources, learning, portfolios, opportunities, and integration status. Supabase is the only persistence provider currently implemented; Meta is explicit development mock mode unless its live adapter is configured and tested. WhatsApp, educational resource discovery, and social publishing are not configured and do not make live-operation claims.

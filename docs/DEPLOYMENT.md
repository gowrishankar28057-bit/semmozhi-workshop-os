# Deployment

Provision separate Neon branches/databases for development, preview, and production. Configure pooled/direct URLs and run reviewed migrations once per environment. Configure Auth/Turnstile/QR secrets in the hosting secret store. Build with `npm ci && npm run db:generate && npm run build`. Deploy behind Cloudflare, then verify health, headers, authentication, QR expiry, certificate verification, audit events, and rollback. Production provisioning is intentionally not performed by this foundation.

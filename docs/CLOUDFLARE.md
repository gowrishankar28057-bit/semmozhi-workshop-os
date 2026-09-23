# Cloudflare

Route DNS through Cloudflare with proxied records, Full (strict) TLS, managed WAF rules, DDoS/bot protections, and rate limits on auth, registration, QR, and verification endpoints. Turnstile site key is public; the secret remains server-only and tokens are verified against Cloudflare. CSP allows only the Turnstile challenge origins. `wrangler.jsonc` is a foundation; choose and document an OpenNext/Workers adapter before deployment. No account IDs or API tokens belong in Git.

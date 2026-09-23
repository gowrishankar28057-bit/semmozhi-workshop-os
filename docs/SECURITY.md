# Application security

Controls present: safe headers, CSP foundation, server guard helpers, ownership checks, strict validation, Turnstile server helper, signed expiring QR tokens, audit redaction, and safe health errors. Production gaps: configured Auth.js, distributed rate limiting, replay prevention, CSRF/provider review, CSP nonce/hashing, HSTS at edge, log/PII retention, backup restore test, dependency review, and penetration testing. Never log credentials, raw tokens, database URLs, or certificate private storage URLs.

# Testing

Vitest covers pure business policy boundaries: 0/50/89/90/100 attendance, certificate rejection/acceptance, permissions, and organizer isolation. Integration tests will use an isolated PostgreSQL schema and transaction-safe fixtures. Playwright begins with the public landing path; P1 adds deterministic authenticated states for each role. CI runs generation, lint, typecheck, unit tests, and production build without production secrets.

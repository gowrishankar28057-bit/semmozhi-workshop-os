# Agent rules

1. Keep PostgreSQL/Neon, Prisma, and Next.js as the primary architecture unless explicitly authorized otherwise.
2. Do not add another backend framework or expose/commit secrets, `.env.local`, credentials, or private identifiers.
3. Enforce RBAC and organizer ownership on the server for every protected operation. Hidden UI is not authorization.
4. Use `calculateAttendance`; never hardcode attendance percentages. The certificate threshold remains `>= 90%`, based on actual attendance records.
5. Preserve working behavior and avoid architectural rewrites. Prefer finishing a vertical slice over adding unrelated scaffolding.
6. Update relevant docs, `TASKS.md`, and `HANDOFF.md` whenever behavior or architecture changes.
7. Run Prisma validation/generation, lint, typecheck, tests, and build before handoff.
8. Never fabricate an integration, deployed resource, completed feature, or test result. Label work implemented, scaffolded, or planned.
9. AI features are secondary to reliable workshop operations, security, accessibility, and data integrity.
10. Audit sensitive changes without storing passwords, secrets, raw tokens, or unnecessary personal data.

# Handoff

## Current State

Foundation milestone. The repository compiles into a real Next.js application with domain boundaries; most product modules are intentionally shells.

## Completed

Landing page, public workshop/certificate routes, role dashboards, Prisma schema, health check, attendance engine, certificate gate, QR signing/verification, RBAC helpers, security headers, validation schemas, unit tests, CI, and documentation.

## Scaffolded

Auth.js integration, CRUD services/repositories/actions, Turnstile UI, Learning Passport, archive, community, notifications, analytics, React PDF generation, rate limiting, and Cloudflare deployment.

## Not Started

Real authentication providers, organizer creation workflow, application migrations against Neon, file storage, email/push delivery, production analytics, and production deployment.

## Known Bugs

None known in the validated foundation. The health route intentionally returns 503 without a reachable database.

## Environment Variables

See `.env.example`: database URLs, Auth.js values, public app URL, Turnstile keys, Cloudflare account ID, and attendance QR secret.

## Database Status

Schema and seed are ready; no Neon project or migrations were created because credentials were not supplied.

## Cloudflare Status

Headers, Turnstile verification, CSP allowances, and Wrangler foundation exist; no account resources are provisioned.

## Tests

Attendance boundaries, certificate threshold, ownership/RBAC helpers, plus public landing E2E scaffolding.

## Important Files

`prisma/schema.prisma`, `lib/auth/`, `lib/attendance/`, `lib/certificates/`, `docs/ARCHITECTURE.md`, and `TASKS.md`.

## Recommended Next Task

P1: configure Auth.js and Prisma adapter, enforce session roles, then implement the audited “Admin creates Organizer” vertical slice.

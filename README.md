# Semmozhi Workshop OS

Production-oriented Workshop Management, Learning Management, and lifelong learning foundation for CICT. It connects the complete journey: an admin creates organizers; organizers publish workshops and sessions; participants register and attend; the platform calculates attendance and issues verifiable certificates only at **90% or higher**.

## Why this exists

Workshop operations, attendance evidence, learning resources, and post-event communities often fragment across tools. Semmozhi Workshop OS provides one secure system of record while preserving completed workshops as reusable knowledge archives.

## Roles and flow

- **Admin:** manages organizers and platform oversight.
- **Organizer:** owns workshops, sessions, registrations, attendance, resources, communities, and certificate workflows.
- **Participant:** discovers and joins workshops, sees personal attendance, earns certificates, and builds a Learning Passport.

## Stack

Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, Prisma 6, Neon PostgreSQL, Auth.js-ready boundaries, Zod, React Hook Form, JOSE-signed QR tokens, React PDF, Vitest, Playwright, and Cloudflare-ready security controls.

## Architecture

`app/` owns pages and HTTP boundaries; `components/` owns reusable UI; `lib/services/` owns use-case contracts; `lib/repositories/` isolates persistence; `lib/validators/` validates untrusted input; `lib/auth/` enforces RBAC; and `prisma/` defines the source-of-truth data model. See `docs/ARCHITECTURE.md`.

## Local setup

```bash
npm install
copy .env.example .env.local
npm run db:generate
npm run db:migrate
npm run db:seed
npm run dev
```

Use a Neon development branch or local PostgreSQL database. Put the pooled URL in `DATABASE_URL` and the direct URL in `DIRECT_URL`; never commit `.env.local`.

## Validation

```bash
npm run lint
npm run typecheck
npm test
npm run build
npm run test:e2e
```

Database commands: `db:generate`, `db:migrate`, `db:push`, `db:seed`, `db:studio`, and `db:validate`. Cloudflare configuration and deployment decisions are documented in `docs/CLOUDFLARE.md` and `docs/DEPLOYMENT.md`.

## Security

Authorization belongs on the server. Organizer ownership is verified for every owned resource. Turnstile tokens are verified server-side. QR payloads contain references, timestamps, and a nonce—not secrets. Audit metadata is filtered for sensitive keys. See `SECURITY.md`.

## Status and roadmap

The landing page, health endpoint, database schema, attendance calculation, certificate eligibility gate, signed QR primitives, RBAC helpers, tests, CI, and architectural shells are implemented. Auth, full CRUD, persistence-backed dashboards, PDF storage, distributed rate limiting, and deployment are scaffolded or planned. See `TASKS.md` and `HANDOFF.md`.

## License

MIT © 2026 Gowri Shankar.

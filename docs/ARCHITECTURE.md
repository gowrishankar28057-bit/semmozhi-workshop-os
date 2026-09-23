# Architecture

This is a modular Next.js application, not a collection of microservices. Pages and route handlers call service-layer use cases; services validate authorization and business policies; repositories isolate Prisma. Zod validates all external input. UI components receive typed view data and never query Prisma.

Workshop archives retain sessions, resources, announcements, recording URLs, communities, and certificate records when status becomes `ARCHIVED`; archival changes visibility, not ownership or data retention. Notifications are durable in-app records with future delivery adapters. Analytics queries will aggregate source records rather than persist fake counters. Learning recommendations remain deterministic from prerequisites, categories, and completed records until a separate feature is approved.

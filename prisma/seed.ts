import {
  PrismaClient,
  Role,
  WorkshopMode,
  WorkshopStatus,
  AttendanceStatus,
} from "@prisma/client";
import { createCertificateCode } from "../lib/certificates/certificate-id";

const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.user.upsert({
    where: { email: "admin@example.invalid" },
    update: {},
    create: {
      email: "admin@example.invalid",
      name: "Demo Admin",
      role: Role.ADMIN,
    },
  });
  const organizerUsers = await Promise.all(
    [1, 2].map((n) =>
      prisma.user.upsert({
        where: { email: `organizer${n}@example.invalid` },
        update: {},
        create: {
          email: `organizer${n}@example.invalid`,
          name: `Demo Organizer ${n}`,
          role: Role.ORGANIZER,
        },
      }),
    ),
  );
  const organizers = await Promise.all(
    organizerUsers.map((user, i) =>
      prisma.organizerProfile.upsert({
        where: { userId: user.id },
        update: {},
        create: {
          userId: user.id,
          organization: `CICT Demo Unit ${i + 1}`,
          status: "ACTIVE",
        },
      }),
    ),
  );
  const participants = await Promise.all(
    ["eighty", "ninety", "hundred", "learner"].map((name) =>
      prisma.user.upsert({
        where: { email: `${name}@example.invalid` },
        update: {},
        create: {
          email: `${name}@example.invalid`,
          name: `Demo ${name}`,
          role: Role.PARTICIPANT,
          learningPassport: { create: {} },
        },
      }),
    ),
  );
  const base = new Date("2026-10-01T09:00:00.000Z");
  const workshops = [];
  for (let i = 0; i < 5; i++) {
    const workshop = await prisma.workshop.upsert({
      where: { slug: `demo-workshop-${i + 1}` },
      update: {},
      create: {
        organizerId: organizers[i % 2].id,
        slug: `demo-workshop-${i + 1}`,
        title: `Demo Workshop ${i + 1}`,
        summary: "Demonstration data for local development only.",
        description:
          "A seeded workshop used to exercise the Semmozhi Workshop OS foundation.",
        category: i % 2 ? "Literature" : "Language",
        mode: i % 2 ? WorkshopMode.HYBRID : WorkshopMode.OFFLINE,
        status: WorkshopStatus.PUBLISHED,
        startsAt: new Date(base.getTime() + i * 86400000),
        endsAt: new Date(base.getTime() + (i + 1) * 86400000),
        announcements: {
          create: {
            title: "Welcome",
            body: "Demo announcement for local development.",
            publishedAt: base,
          },
        },
        resources: {
          create: {
            title: "Reading list",
            url: "https://example.invalid/demo-resource",
          },
        },
      },
    });
    workshops.push(workshop);
  }
  const sessions = [];
  for (let i = 0; i < 10; i++)
    sessions.push(
      await prisma.session.upsert({
        where: { id: `seed-session-${i}` },
        update: {},
        create: {
          id: `seed-session-${i}`,
          workshopId: workshops[0].id,
          title: `Foundation Session ${i + 1}`,
          startsAt: new Date(base.getTime() + i * 3600000),
          endsAt: new Date(base.getTime() + (i + 1) * 3600000),
        },
      }),
    );
  for (const participant of participants.slice(0, 3))
    await prisma.registration.upsert({
      where: {
        workshopId_participantId: {
          workshopId: workshops[0].id,
          participantId: participant.id,
        },
      },
      update: {},
      create: { workshopId: workshops[0].id, participantId: participant.id },
    });
  for (const [participantIndex, attended] of [8, 9, 10].entries()) {
    const participant = participants[participantIndex];
    for (let i = 0; i < sessions.length; i++)
      await prisma.attendance.upsert({
        where: {
          sessionId_participantId: {
            sessionId: sessions[i].id,
            participantId: participant.id,
          },
        },
        update: {},
        create: {
          sessionId: sessions[i].id,
          participantId: participant.id,
          status:
            i < attended ? AttendanceStatus.PRESENT : AttendanceStatus.ABSENT,
          checkedInAt: i < attended ? sessions[i].startsAt : null,
          source: "seed",
        },
      });
    if (attended >= 9)
      await prisma.certificate.upsert({
        where: {
          workshopId_participantId: {
            workshopId: workshops[0].id,
            participantId: participant.id,
          },
        },
        update: {},
        create: {
          code: createCertificateCode(),
          workshopId: workshops[0].id,
          participantId: participant.id,
          attendanceRate: attended * 10,
        },
      });
  }
  console.log(`Seeded foundation data. Admin id: ${admin.id}`);
}

main().finally(() => prisma.$disconnect());

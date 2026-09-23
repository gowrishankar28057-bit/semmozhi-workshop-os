import type { Attendance } from "@prisma/client";
export interface AttendanceRepository {
  listForParticipant(
    workshopId: string,
    participantId: string,
  ): Promise<Attendance[]>;
  upsert(input: {
    sessionId: string;
    participantId: string;
    status: string;
  }): Promise<Attendance>;
}

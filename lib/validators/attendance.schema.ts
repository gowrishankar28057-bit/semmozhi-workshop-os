import { z } from "zod";
export const attendanceUpdateSchema = z.object({
  sessionId: z.cuid(),
  participantId: z.cuid(),
  status: z.enum(["PRESENT", "ABSENT", "LATE", "EXCUSED"]),
  notes: z.string().trim().max(500).optional(),
});

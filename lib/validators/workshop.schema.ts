import { z } from "zod";

export const workshopSchema = z
  .object({
    title: z.string().trim().min(3).max(160),
    titleTa: z.string().trim().max(160).optional(),
    summary: z.string().trim().min(10).max(300),
    description: z.string().trim().min(20).max(20_000),
    category: z.string().trim().min(2).max(80),
    mode: z.enum(["ONLINE", "OFFLINE", "HYBRID"]),
    startsAt: z.coerce.date(),
    endsAt: z.coerce.date(),
    capacity: z.number().int().positive().optional(),
  })
  .refine((data) => data.endsAt > data.startsAt, {
    message: "End time must be after start time",
    path: ["endsAt"],
  });

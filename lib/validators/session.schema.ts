import { z } from "zod";

export const sessionSchema = z
  .object({
    workshopId: z.cuid(),
    title: z.string().trim().min(3).max(160),
    startsAt: z.coerce.date(),
    endsAt: z.coerce.date(),
  })
  .refine((value) => value.endsAt > value.startsAt, {
    message: "End time must follow start time",
  });

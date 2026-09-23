import { z } from "zod";

export const createOrganizerSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.email(),
  organization: z.string().trim().max(160).optional(),
});

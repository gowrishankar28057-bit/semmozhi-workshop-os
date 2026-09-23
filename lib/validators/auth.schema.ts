import { z } from "zod";

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(12).max(128),
  turnstileToken: z.string().min(1),
});

export const participantRegistrationSchema = loginSchema.extend({
  name: z.string().trim().min(2).max(100),
});

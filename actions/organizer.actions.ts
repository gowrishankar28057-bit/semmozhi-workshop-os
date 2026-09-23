import type { ActionResult } from "./types";
export type CreateOrganizerAction = (
  formData: FormData,
) => Promise<ActionResult<{ organizerId: string }>>;
// P1 implementation must validate the ADMIN principal, Zod input, transaction, and audit event.

import type { ActionResult } from "./types";
export type CreateWorkshopAction = (
  formData: FormData,
) => Promise<ActionResult<{ workshopId: string }>>;
// P3 implementation must derive organizer ownership from the session.

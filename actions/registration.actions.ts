import type { ActionResult } from "./types";
export type RegisterForWorkshopAction = (
  workshopId: string,
) => Promise<ActionResult<{ registrationId: string }>>;
// P4 implementation checks publication, deadline, capacity, and duplicates atomically.

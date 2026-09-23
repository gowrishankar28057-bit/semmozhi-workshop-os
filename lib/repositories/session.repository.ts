import type { Session } from "@prisma/client";
import type { ReadRepository } from "./contracts";
export interface SessionRepository extends ReadRepository<Session> {
  listByWorkshop(workshopId: string): Promise<Session[]>;
}

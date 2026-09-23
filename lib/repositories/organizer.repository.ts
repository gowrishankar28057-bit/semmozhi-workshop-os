import type { OrganizerProfile } from "@prisma/client";
import type { ReadRepository } from "./contracts";
export interface OrganizerRepository extends ReadRepository<OrganizerProfile> {
  findByUserId(userId: string): Promise<OrganizerProfile | null>;
}

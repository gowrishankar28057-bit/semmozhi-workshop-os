import type { Workshop } from "@prisma/client";
import type { ReadRepository } from "./contracts";
export interface WorkshopRepository extends ReadRepository<Workshop> {
  findPublishedBySlug(slug: string): Promise<Workshop | null>;
  findOrganizerId(id: string): Promise<string | null>;
}

import type { Page, PageRequest, ServiceContext } from "./types";
export type OrganizerSummary = {
  id: string;
  name: string;
  email: string;
  status: string;
};
export interface OrganizerService {
  create(context: ServiceContext, input: unknown): Promise<OrganizerSummary>;
  list(
    context: ServiceContext,
    page: PageRequest,
  ): Promise<Page<OrganizerSummary>>;
  setStatus(
    context: ServiceContext,
    organizerId: string,
    status: "ACTIVE" | "DISABLED",
  ): Promise<void>;
}

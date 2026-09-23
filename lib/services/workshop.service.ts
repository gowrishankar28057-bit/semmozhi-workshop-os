import type { Page, PageRequest, ServiceContext } from "./types";

export type WorkshopSummary = {
  id: string;
  title: string;
  category: string;
  status: string;
  startsAt: Date;
};
export interface WorkshopService {
  discover(page: PageRequest): Promise<Page<WorkshopSummary>>;
  create(context: ServiceContext, input: unknown): Promise<WorkshopSummary>;
  publish(context: ServiceContext, workshopId: string): Promise<void>;
}

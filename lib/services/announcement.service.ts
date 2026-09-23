import type { ServiceContext } from "./types";
export interface AnnouncementService {
  publish(context: ServiceContext, input: unknown): Promise<{ id: string }>;
}

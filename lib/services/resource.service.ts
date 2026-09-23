import type { ServiceContext } from "./types";
export interface ResourceService {
  add(
    context: ServiceContext,
    workshopId: string,
    input: unknown,
  ): Promise<{ id: string }>;
}

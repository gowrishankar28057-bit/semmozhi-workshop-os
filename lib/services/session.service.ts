import type { ServiceContext } from "./types";
export interface SessionService {
  create(context: ServiceContext, input: unknown): Promise<{ id: string }>;
}

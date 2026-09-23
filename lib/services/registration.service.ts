import type { ServiceContext } from "./types";
export interface RegistrationService {
  register(
    context: ServiceContext,
    workshopId: string,
  ): Promise<{ id: string; status: string }>;
  cancel(context: ServiceContext, workshopId: string): Promise<void>;
}

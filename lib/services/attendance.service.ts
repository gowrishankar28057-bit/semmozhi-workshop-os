import type { ServiceContext } from "./types";
import type { AttendanceCalculation } from "@/lib/attendance/calculator";
export interface AttendanceService {
  getParticipantSummary(
    context: ServiceContext,
    workshopId: string,
  ): Promise<AttendanceCalculation>;
  record(context: ServiceContext, input: unknown): Promise<void>;
}

import { z } from "zod";
export const workshopRegistrationSchema = z.object({ workshopId: z.cuid() });

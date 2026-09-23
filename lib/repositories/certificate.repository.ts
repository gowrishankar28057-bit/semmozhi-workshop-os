import type { Certificate } from "@prisma/client";
export interface CertificateRepository {
  findByCode(code: string): Promise<Certificate | null>;
  findForParticipant(
    workshopId: string,
    participantId: string,
  ): Promise<Certificate | null>;
}

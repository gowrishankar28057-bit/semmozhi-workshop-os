import type { ServiceContext } from "./types";
import type { PublicCertificateVerification } from "@/lib/certificates/verification";
export interface CertificateService {
  issue(
    context: ServiceContext,
    registrationId: string,
  ): Promise<{ code: string }>;
  verify(code: string): Promise<PublicCertificateVerification>;
}

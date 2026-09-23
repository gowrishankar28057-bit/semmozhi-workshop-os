import { assertCertificateEligible } from "./eligibility";
import { createCertificateCode } from "./certificate-id";

export type CertificateDraft = {
  code: string;
  participantId: string;
  workshopId: string;
  attendanceRate: number;
};

export function createCertificateDraft(input: {
  participantId: string;
  workshopId: string;
  attendedSessions: number;
  eligibleSessions: number;
}): CertificateDraft {
  const attendance = assertCertificateEligible(input);
  return {
    code: createCertificateCode(),
    participantId: input.participantId,
    workshopId: input.workshopId,
    attendanceRate: attendance.percentage,
  };
}

// TODO(P6): render this persisted draft with @react-pdf/renderer and upload it to approved object storage.

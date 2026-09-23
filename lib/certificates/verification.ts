export type PublicCertificateVerification = {
  valid: boolean;
  code: string;
  participantName?: string;
  workshopTitle?: string;
  issuedAt?: Date;
};

export interface CertificateVerifier {
  verify(code: string): Promise<PublicCertificateVerification>;
}

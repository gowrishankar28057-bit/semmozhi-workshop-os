import { calculateAttendance } from "@/lib/attendance/calculator";

export function assertCertificateEligible(input: {
  attendedSessions: number;
  eligibleSessions: number;
}) {
  const result = calculateAttendance(input);
  if (!result.eligibleForCertificate) {
    throw new Error("Certificate requires at least 90% attendance");
  }
  return result;
}

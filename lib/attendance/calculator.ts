export const CERTIFICATE_ATTENDANCE_THRESHOLD = 90;

export type AttendanceCalculation = {
  percentage: number;
  attended: number;
  total: number;
  eligibleForCertificate: boolean;
};

export function calculateAttendance(input: {
  attendedSessions: number;
  eligibleSessions: number;
}): AttendanceCalculation {
  const { attendedSessions, eligibleSessions } = input;
  if (
    !Number.isInteger(attendedSessions) ||
    !Number.isInteger(eligibleSessions)
  ) {
    throw new TypeError("Attendance counts must be integers");
  }
  if (
    attendedSessions < 0 ||
    eligibleSessions < 0 ||
    attendedSessions > eligibleSessions
  ) {
    throw new RangeError("Attendance counts are outside the valid range");
  }
  const percentage =
    eligibleSessions === 0 ? 0 : (attendedSessions / eligibleSessions) * 100;
  return {
    percentage: Math.round(percentage * 100) / 100,
    attended: attendedSessions,
    total: eligibleSessions,
    eligibleForCertificate:
      eligibleSessions > 0 && percentage >= CERTIFICATE_ATTENDANCE_THRESHOLD,
  };
}

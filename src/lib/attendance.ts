import { prisma } from './db';

/**
 * Calculate attendance percentage for a user in a workshop
 */
export async function calculateAttendancePercentage(
  userId: string,
  workshopId: string,
): Promise<number> {
  try {
    const sessions = await prisma.session.findMany({
      where: { workshopId },
    });

    if (sessions.length === 0) {
      return 0;
    }

    const attendanceRecords = await prisma.attendance.findMany({
      where: {
        userId,
        workshopId,
      },
    });

    const percentage = (attendanceRecords.length / sessions.length) * 100;
    return Math.round(percentage * 100) / 100;
  } catch (error) {
    console.error('Error calculating attendance:', error);
    return 0;
  }
}

/**
 * Check if a user is eligible for certificate
 * Eligibility: attendance >= 90%
 */
export function isCertificateEligible(attendancePercentage: number): boolean {
  return attendancePercentage >= 90;
}

/**
 * Generate certificate for eligible participant
 */
export async function generateCertificate(userId: string, workshopId: string) {
  try {
    const attendance = await calculateAttendancePercentage(userId, workshopId);

    if (!isCertificateEligible(attendance)) {
      throw new Error(`Attendance ${attendance}% is below 90% minimum requirement`);
    }

    const participant = await prisma.workshopParticipant.findUnique({
      where: {
        userId_workshopId: {
          userId,
          workshopId,
        },
      },
    });

    if (!participant) {
      throw new Error('Participant not found');
    }

    // Import certificate generation utilities
    const { generateCertificateCode, generateVerificationHash } = await import('./certificate');

    const certificateCode = generateCertificateCode();
    const hash = generateVerificationHash(certificateCode);

    const certificate = await prisma.certificate.create({
      data: {
        participantId: userId,
        workshopId,
        certificateCode,
        hash,
        attendancePercentage: attendance,
        status: 'ISSUED',
        issuedAt: new Date(),
      },
      include: {
        participant: true,
        workshop: true,
      },
    });

    return certificate;
  } catch (error) {
    console.error('Error generating certificate:', error);
    throw error;
  }
}

/**
 * Verify certificate eligibility test cases
 * Returns test results for: 0%, 50%, 89%, 90%, 100%
 */
export function getAttendanceTestCases(): Array<{
  percentage: number;
  eligible: boolean;
}> {
  const testCases = [0, 50, 89, 90, 100];

  return testCases.map((percentage) => ({
    percentage,
    eligible: isCertificateEligible(percentage),
  }));
}

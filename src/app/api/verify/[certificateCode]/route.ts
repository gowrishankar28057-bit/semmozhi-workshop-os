import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(
  req: NextRequest,
  { params }: { params: { certificateCode: string } },
) {
  try {
    const { searchParams } = new URL(req.url);
    const hash = searchParams.get('hash');

    const certificate = await prisma.certificate.findUnique({
      where: { certificateCode: params.certificateCode },
      include: {
        participant: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        workshop: {
          select: {
            id: true,
            title: true,
            description: true,
            startDate: true,
            endDate: true,
            organizer: {
              select: {
                organizationName: true,
                logo: true,
              },
            },
          },
        },
      },
    });

    if (!certificate) {
      return NextResponse.json(
        { error: 'Certificate not found' },
        { status: 404 },
      );
    }

    if (certificate.status === 'REVOKED') {
      return NextResponse.json(
        {
          message: 'Certificate verification failed',
          data: null,
          verified: false,
          reason: 'This certificate has been revoked',
        },
        { status: 200 },
      );
    }

    // Verify hash if provided
    if (hash && certificate.hash !== hash) {
      return NextResponse.json(
        {
          message: 'Certificate verification failed',
          data: null,
          verified: false,
          reason: 'Hash verification failed',
        },
        { status: 200 },
      );
    }

    return NextResponse.json(
      {
        message: 'Certificate verified successfully',
        data: {
          certificateCode: certificate.certificateCode,
          participant: certificate.participant,
          workshop: certificate.workshop,
          attendancePercentage: certificate.attendancePercentage,
          issuedAt: certificate.issuedAt,
          status: certificate.status,
        },
        verified: true,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('Certificate verification error:', error);
    return NextResponse.json(
      { error: 'An error occurred during certificate verification' },
      { status: 500 },
    );
  }
}

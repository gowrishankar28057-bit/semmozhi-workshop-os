import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyToken, extractTokenFromHeader } from '@/lib/auth';
import { calculateAttendancePercentage, generateCertificate } from '@/lib/attendance';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const authHeader = req.headers.get('authorization');
    const token = extractTokenFromHeader(authHeader);

    if (!token) {
      return NextResponse.json(
        { error: 'Authorization token required' },
        { status: 401 },
      );
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 },
      );
    }

    const certificates = await prisma.certificate.findMany({
      where: {
        workshopId: params.id,
        participantId: payload.id,
      },
      include: {
        workshop: true,
      },
    });

    return NextResponse.json(
      {
        message: 'Certificates retrieved successfully',
        data: certificates,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('Certificates fetch error:', error);
    return NextResponse.json(
      { error: 'An error occurred while fetching certificates' },
      { status: 500 },
    );
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const authHeader = req.headers.get('authorization');
    const token = extractTokenFromHeader(authHeader);

    if (!token) {
      return NextResponse.json(
        { error: 'Authorization token required' },
        { status: 401 },
      );
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 },
      );
    }

    const workshop = await prisma.workshop.findUnique({
      where: { id: params.id },
    });

    if (!workshop) {
      return NextResponse.json(
        { error: 'Workshop not found' },
        { status: 404 },
      );
    }

    // Check attendance percentage
    const attendance = await calculateAttendancePercentage(payload.id, params.id);

    if (attendance < workshop.minAttendancePercentage) {
      return NextResponse.json(
        {
          error: `Your attendance (${attendance}%) is below the minimum requirement (${workshop.minAttendancePercentage}%)`,
        },
        { status: 400 },
      );
    }

    // Check if certificate already exists
    const existing = await prisma.certificate.findFirst({
      where: {
        participantId: payload.id,
        workshopId: params.id,
        status: 'ISSUED',
      },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'Certificate already issued for this workshop' },
        { status: 409 },
      );
    }

    const certificate = await generateCertificate(payload.id, params.id);

    return NextResponse.json(
      {
        message: 'Certificate generated successfully',
        data: certificate,
      },
      { status: 201 },
    );
  } catch (error: any) {
    console.error('Certificate generation error:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred while generating certificate' },
      { status: 500 },
    );
  }
}

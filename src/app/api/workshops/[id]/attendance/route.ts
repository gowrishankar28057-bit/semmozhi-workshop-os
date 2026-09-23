import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyToken, extractTokenFromHeader } from '@/lib/auth';

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

    const body = await req.json();
    const { sessionId, verified = false } = body;

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 },
      );
    }

    const session = await prisma.session.findUnique({
      where: { id: sessionId },
    });

    if (!session || session.workshopId !== params.id) {
      return NextResponse.json(
        { error: 'Session not found in this workshop' },
        { status: 404 },
      );
    }

    // Check if already marked attendance
    const existing = await prisma.attendance.findUnique({
      where: {
        userId_sessionId: {
          userId: payload.id,
          sessionId,
        },
      },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'Attendance already marked for this session' },
        { status: 409 },
      );
    }

    const attendance = await prisma.attendance.create({
      data: {
        userId: payload.id,
        sessionId,
        workshopId: params.id,
        verified,
        verifiedAt: verified ? new Date() : null,
      },
    });

    return NextResponse.json(
      {
        message: 'Attendance recorded successfully',
        data: attendance,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error('Attendance error:', error);
    return NextResponse.json(
      { error: 'An error occurred while recording attendance' },
      { status: 500 },
    );
  }
}

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

    const attendances = await prisma.attendance.findMany({
      where: {
        workshopId: params.id,
        userId: payload.id,
      },
      include: {
        session: true,
      },
    });

    return NextResponse.json(
      {
        message: 'Attendance records retrieved',
        data: attendances,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('Attendance fetch error:', error);
    return NextResponse.json(
      { error: 'An error occurred while fetching attendance' },
      { status: 500 },
    );
  }
}

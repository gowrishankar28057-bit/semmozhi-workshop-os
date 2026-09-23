import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyToken, extractTokenFromHeader } from '@/lib/auth';
import { UserRole } from '@prisma/client';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const organizerId = searchParams.get('organizerId');

    const filters: any = {};
    if (status) filters.status = status;
    if (organizerId) filters.organizerId = organizerId;

    const workshops = await prisma.workshop.findMany({
      where: filters,
      include: {
        organizer: {
          select: {
            organizationName: true,
            logo: true,
          },
        },
        sessions: true,
        participants: true,
      },
      orderBy: { startDate: 'desc' },
    });

    return NextResponse.json(
      {
        message: 'Workshops retrieved successfully',
        data: workshops,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('Workshops fetch error:', error);
    return NextResponse.json(
      { error: 'An error occurred while fetching workshops' },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
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

    if (!payload || payload.role !== UserRole.ORGANIZER) {
      return NextResponse.json(
        { error: 'Only organizers can create workshops' },
        { status: 403 },
      );
    }

    const body = await req.json();
    const {
      title,
      description,
      category,
      language,
      startDate,
      endDate,
      registrationDeadline,
      maxParticipants,
      minAttendancePercentage,
    } = body;

    if (!title || !description || !startDate || !endDate) {
      return NextResponse.json(
        { error: 'Title, description, start date, and end date are required' },
        { status: 400 },
      );
    }

    // Get organizer
    const organizer = await prisma.organizer.findUnique({
      where: { userId: payload.id },
    });

    if (!organizer) {
      return NextResponse.json(
        { error: 'Organizer profile not found' },
        { status: 404 },
      );
    }

    const workshop = await prisma.workshop.create({
      data: {
        title,
        description,
        organizerId: organizer.id,
        category,
        language,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        registrationDeadline: registrationDeadline ? new Date(registrationDeadline) : null,
        maxParticipants,
        minAttendancePercentage: minAttendancePercentage || 90,
      },
      include: {
        organizer: {
          select: {
            organizationName: true,
            logo: true,
          },
        },
      },
    });

    return NextResponse.json(
      {
        message: 'Workshop created successfully',
        data: workshop,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error('Workshop creation error:', error);
    return NextResponse.json(
      { error: 'An error occurred while creating workshop' },
      { status: 500 },
    );
  }
}

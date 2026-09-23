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

    const workshop = await prisma.workshop.findUnique({
      where: { id: params.id },
      include: {
        participants: true,
      },
    });

    if (!workshop) {
      return NextResponse.json(
        { error: 'Workshop not found' },
        { status: 404 },
      );
    }

    // Check if registration deadline has passed
    if (workshop.registrationDeadline && new Date() > workshop.registrationDeadline) {
      return NextResponse.json(
        { error: 'Registration deadline has passed' },
        { status: 400 },
      );
    }

    // Check max participants
    if (workshop.maxParticipants && workshop.participants.length >= workshop.maxParticipants) {
      return NextResponse.json(
        { error: 'Workshop has reached maximum capacity' },
        { status: 400 },
      );
    }

    // Check if already registered
    const existing = await prisma.workshopParticipant.findUnique({
      where: {
        userId_workshopId: {
          userId: payload.id,
          workshopId: params.id,
        },
      },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'You are already registered for this workshop' },
        { status: 409 },
      );
    }

    const registration = await prisma.workshopParticipant.create({
      data: {
        userId: payload.id,
        workshopId: params.id,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        workshop: true,
      },
    });

    return NextResponse.json(
      {
        message: 'Successfully registered for workshop',
        data: registration,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'An error occurred during registration' },
      { status: 500 },
    );
  }
}

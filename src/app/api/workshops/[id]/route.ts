import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyToken, extractTokenFromHeader } from '@/lib/auth';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const workshop = await prisma.workshop.findUnique({
      where: { id: params.id },
      include: {
        organizer: true,
        sessions: {
          orderBy: { sessionNumber: 'asc' },
        },
        participants: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
        announcements: {
          orderBy: { createdAt: 'desc' },
        },
        resources: true,
      },
    });

    if (!workshop) {
      return NextResponse.json(
        { error: 'Workshop not found' },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        message: 'Workshop retrieved successfully',
        data: workshop,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('Workshop fetch error:', error);
    return NextResponse.json(
      { error: 'An error occurred while fetching workshop' },
      { status: 500 },
    );
  }
}

export async function PUT(
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
      include: { organizer: true },
    });

    if (!workshop) {
      return NextResponse.json(
        { error: 'Workshop not found' },
        { status: 404 },
      );
    }

    if (workshop.organizer.userId !== payload.id) {
      return NextResponse.json(
        { error: 'Only the workshop organizer can update it' },
        { status: 403 },
      );
    }

    const body = await req.json();
    const { title, description, status, category, language, startDate, endDate } = body;

    const updated = await prisma.workshop.update({
      where: { id: params.id },
      data: {
        ...(title && { title }),
        ...(description && { description }),
        ...(status && { status }),
        ...(category && { category }),
        ...(language && { language }),
        ...(startDate && { startDate: new Date(startDate) }),
        ...(endDate && { endDate: new Date(endDate) }),
      },
      include: { organizer: true },
    });

    return NextResponse.json(
      {
        message: 'Workshop updated successfully',
        data: updated,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('Workshop update error:', error);
    return NextResponse.json(
      { error: 'An error occurred while updating workshop' },
      { status: 500 },
    );
  }
}

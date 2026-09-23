import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyToken, extractTokenFromHeader } from '@/lib/auth';

export async function GET(req: NextRequest) {
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
        { error: 'Invalid or expired token' },
        { status: 401 },
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        avatar: true,
        phone: true,
        createdAt: true,
        updatedAt: true,
        organizer: {
          select: {
            id: true,
            organizationName: true,
            description: true,
            website: true,
            logo: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        message: 'Profile retrieved successfully',
        user,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('Profile fetch error:', error);
    return NextResponse.json(
      { error: 'An error occurred while fetching profile' },
      { status: 500 },
    );
  }
}

export async function PUT(req: NextRequest) {
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
        { error: 'Invalid or expired token' },
        { status: 401 },
      );
    }

    const body = await req.json();
    const { name, avatar, phone } = body;

    const updatedUser = await prisma.user.update({
      where: { id: payload.id },
      data: {
        ...(name && { name }),
        ...(avatar && { avatar }),
        ...(phone && { phone }),
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        avatar: true,
        phone: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(
      {
        message: 'Profile updated successfully',
        user: updatedUser,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('Profile update error:', error);
    return NextResponse.json(
      { error: 'An error occurred while updating profile' },
      { status: 500 },
    );
  }
}

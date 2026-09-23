import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, extractTokenFromHeader } from '@/lib/auth';

const publicRoutes = [
  '/auth/login',
  '/auth/register',
  '/auth',
  '/verify',
  '/api/auth/login',
  '/api/auth/register',
  '/api/verify',
];

const adminRoutes = ['/admin', '/api/admin'];
const organizerRoutes = ['/organizer', '/api/organizer'];
const protectedRoutes = ['/participant', '/dashboard'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public routes
  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Get token from headers
  const authHeader = request.headers.get('authorization');
  const token = extractTokenFromHeader(authHeader);

  if (!token) {
    // If token is missing and route is protected, redirect to login
    if (
      protectedRoutes.some((route) => pathname.startsWith(route)) ||
      adminRoutes.some((route) => pathname.startsWith(route)) ||
      organizerRoutes.some((route) => pathname.startsWith(route))
    ) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
    return NextResponse.next();
  }

  // Verify token
  const payload = verifyToken(token);

  if (!payload) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // Check role-based access
  if (adminRoutes.some((route) => pathname.startsWith(route))) {
    if (payload.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  if (organizerRoutes.some((route) => pathname.startsWith(route))) {
    if (payload.role !== 'ORGANIZER' && payload.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // Set user info in request headers for downstream handlers
  const response = NextResponse.next();
  response.headers.set('x-user-id', payload.id);
  response.headers.set('x-user-role', payload.role);

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
};

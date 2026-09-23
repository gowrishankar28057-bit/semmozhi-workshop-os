import { NextResponse, type NextRequest } from "next/server";

const protectedPrefixes = ["/admin", "/organizer", "/participant"];

export function proxy(request: NextRequest) {
  const response = NextResponse.next();
  response.headers.set(
    "Content-Security-Policy",
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com",
      "frame-src https://challenges.cloudflare.com",
      "connect-src 'self' https://challenges.cloudflare.com",
      "img-src 'self' data: blob:",
      "style-src 'self' 'unsafe-inline'",
      "font-src 'self' data:",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
    ].join("; "),
  );

  // Auth.js session enforcement is added in P1. Server actions and route handlers
  // still call requireRole; this marker prevents protected paths being mistaken for public.
  if (
    protectedPrefixes.some((prefix) =>
      request.nextUrl.pathname.startsWith(prefix),
    )
  ) {
    response.headers.set("X-Semmozhi-Protected-Route", "true");
  }
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

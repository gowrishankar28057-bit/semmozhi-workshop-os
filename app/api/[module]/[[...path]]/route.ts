import { NextResponse, type NextRequest } from "next/server";

const modules = new Set([
  "auth",
  "organizers",
  "workshops",
  "sessions",
  "registrations",
  "attendance",
  "qr",
  "announcements",
  "resources",
  "certificates",
  "communities",
  "posts",
  "notifications",
  "analytics",
  "cloudflare",
]);
function response(
  request: NextRequest,
  context: { params: Promise<{ module: string; path?: string[] }> },
) {
  return context.params.then(({ module }) =>
    modules.has(module)
      ? NextResponse.json(
          {
            status: "scaffolded",
            message: "This API boundary is documented but not implemented.",
          },
          { status: 501 },
        )
      : NextResponse.json({ status: "not_found" }, { status: 404 }),
  );
}
export const GET = response;
export const POST = response;
export const PATCH = response;
export const DELETE = response;

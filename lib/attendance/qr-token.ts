import { jwtVerify, SignJWT } from "jose";

export type AttendanceTokenPayload = {
  sessionId: string;
  issuedAt: number;
  expiresAt: number;
  nonce: string;
};

function key(secret: string) {
  if (secret.length < 32)
    throw new Error("ATTENDANCE_QR_SECRET must be at least 32 characters");
  return new TextEncoder().encode(secret);
}

export async function createAttendanceToken(input: {
  sessionId: string;
  ttlSeconds?: number;
  secret: string;
}): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const ttl = Math.min(Math.max(input.ttlSeconds ?? 45, 10), 300);
  return new SignJWT({ nonce: crypto.randomUUID() })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setSubject(input.sessionId)
    .setIssuedAt(now)
    .setExpirationTime(now + ttl)
    .sign(key(input.secret));
}

export async function verifyAttendanceToken(
  token: string,
  secret: string,
): Promise<AttendanceTokenPayload> {
  const { payload } = await jwtVerify(token, key(secret), {
    algorithms: ["HS256"],
  });
  if (
    !payload.sub ||
    !payload.iat ||
    !payload.exp ||
    typeof payload.nonce !== "string"
  ) {
    throw new Error("Malformed attendance token");
  }
  return {
    sessionId: payload.sub,
    issuedAt: payload.iat,
    expiresAt: payload.exp,
    nonce: payload.nonce,
  };
}

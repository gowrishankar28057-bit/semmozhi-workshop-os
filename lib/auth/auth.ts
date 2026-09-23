import type { AuthPrincipal } from "./guards";

/**
 * Auth.js integration boundary. P1 will configure providers, callbacks and the
 * Prisma adapter. Callers must never infer identity from request parameters.
 */
export async function getCurrentPrincipal(): Promise<AuthPrincipal | null> {
  // TODO(P1): map the validated Auth.js session to an AuthPrincipal.
  return null;
}

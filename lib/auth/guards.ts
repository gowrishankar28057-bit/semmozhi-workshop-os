import type { AppRole } from "./roles";
import { hasPermission, type Permission } from "./permissions";

export type AuthPrincipal = {
  userId: string;
  role: AppRole;
  organizerId?: string;
};

export class AuthorizationError extends Error {
  constructor(message = "You are not authorized to perform this action") {
    super(message);
    this.name = "AuthorizationError";
  }
}

export function requireRole(
  principal: AuthPrincipal | null,
  roles: AppRole[],
): AuthPrincipal {
  if (!principal || !roles.includes(principal.role))
    throw new AuthorizationError();
  return principal;
}

export function requirePermission(
  principal: AuthPrincipal | null,
  permission: Permission,
) {
  if (!principal || !hasPermission(principal.role, permission))
    throw new AuthorizationError();
  return principal;
}

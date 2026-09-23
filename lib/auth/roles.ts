export const ROLES = ["ADMIN", "ORGANIZER", "PARTICIPANT"] as const;
export type AppRole = (typeof ROLES)[number];

export function isAppRole(value: unknown): value is AppRole {
  return typeof value === "string" && ROLES.includes(value as AppRole);
}

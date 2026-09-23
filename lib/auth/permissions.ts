import type { AppRole } from "./roles";

export const PERMISSIONS = {
  MANAGE_ORGANIZERS: "manage:organizers",
  VIEW_PLATFORM_ANALYTICS: "view:platform-analytics",
  MANAGE_OWN_WORKSHOPS: "manage:own-workshops",
  MANAGE_ATTENDANCE: "manage:attendance",
  MANAGE_CERTIFICATES: "manage:certificates",
  DISCOVER_WORKSHOPS: "discover:workshops",
  REGISTER_WORKSHOPS: "register:workshops",
  VIEW_OWN_ATTENDANCE: "view:own-attendance",
  VIEW_OWN_CERTIFICATES: "view:own-certificates",
  PARTICIPATE_COMMUNITIES: "participate:communities",
} as const;

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];

const rolePermissions: Record<AppRole, ReadonlySet<Permission>> = {
  ADMIN: new Set([
    PERMISSIONS.MANAGE_ORGANIZERS,
    PERMISSIONS.VIEW_PLATFORM_ANALYTICS,
  ]),
  ORGANIZER: new Set([
    PERMISSIONS.MANAGE_OWN_WORKSHOPS,
    PERMISSIONS.MANAGE_ATTENDANCE,
    PERMISSIONS.MANAGE_CERTIFICATES,
  ]),
  PARTICIPANT: new Set([
    PERMISSIONS.DISCOVER_WORKSHOPS,
    PERMISSIONS.REGISTER_WORKSHOPS,
    PERMISSIONS.VIEW_OWN_ATTENDANCE,
    PERMISSIONS.VIEW_OWN_CERTIFICATES,
    PERMISSIONS.PARTICIPATE_COMMUNITIES,
  ]),
};

export function hasPermission(role: AppRole, permission: Permission): boolean {
  return rolePermissions[role].has(permission);
}

export function canManageWorkshop(input: {
  role: AppRole;
  userOrganizerId?: string;
  workshopOrganizerId: string;
}): boolean {
  return (
    input.role === "ADMIN" ||
    (input.role === "ORGANIZER" &&
      input.userOrganizerId === input.workshopOrganizerId)
  );
}

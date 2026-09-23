import { describe, expect, it } from "vitest";
import {
  canManageWorkshop,
  hasPermission,
  PERMISSIONS,
} from "@/lib/auth/permissions";

describe("permissions", () => {
  it("allows admins to manage organizers", () =>
    expect(hasPermission("ADMIN", PERMISSIONS.MANAGE_ORGANIZERS)).toBe(true));
  it("does not allow participants to manage attendance", () =>
    expect(hasPermission("PARTICIPANT", PERMISSIONS.MANAGE_ATTENDANCE)).toBe(
      false,
    ));
  it("prevents organizer cross-tenant access", () =>
    expect(
      canManageWorkshop({
        role: "ORGANIZER",
        userOrganizerId: "a",
        workshopOrganizerId: "b",
      }),
    ).toBe(false));
  it("allows an organizer to manage their own workshop", () =>
    expect(
      canManageWorkshop({
        role: "ORGANIZER",
        userOrganizerId: "a",
        workshopOrganizerId: "a",
      }),
    ).toBe(true));
});

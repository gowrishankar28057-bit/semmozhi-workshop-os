import { describe, expect, it } from "vitest";
import { calculateAttendance } from "@/lib/attendance/calculator";

describe("calculateAttendance", () => {
  it.each([
    [0, 10, 0, false],
    [5, 10, 50, false],
    [89, 100, 89, false],
    [9, 10, 90, true],
    [10, 10, 100, true],
  ])("calculates %d/%d", (attended, total, percentage, eligible) => {
    expect(
      calculateAttendance({
        attendedSessions: attended,
        eligibleSessions: total,
      }),
    ).toEqual({
      percentage,
      attended,
      total,
      eligibleForCertificate: eligible,
    });
  });
  it("does not award a certificate when there are no eligible sessions", () => {
    expect(
      calculateAttendance({ attendedSessions: 0, eligibleSessions: 0 })
        .eligibleForCertificate,
    ).toBe(false);
  });
});

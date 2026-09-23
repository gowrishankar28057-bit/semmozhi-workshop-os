import { describe, expect, it } from "vitest";
import { assertCertificateEligible } from "@/lib/certificates/eligibility";
import { createCertificateDraft } from "@/lib/certificates/generator";

describe("certificate eligibility", () => {
  it("rejects attendance below 90%", () => {
    expect(() =>
      assertCertificateEligible({
        attendedSessions: 89,
        eligibleSessions: 100,
      }),
    ).toThrow(/90%/);
  });
  it("accepts exactly 90%", () => {
    expect(
      assertCertificateEligible({ attendedSessions: 9, eligibleSessions: 10 })
        .percentage,
    ).toBe(90);
  });
  it("creates a draft only after eligibility", () => {
    expect(
      createCertificateDraft({
        participantId: "p1",
        workshopId: "w1",
        attendedSessions: 10,
        eligibleSessions: 10,
      }).code,
    ).toMatch(/^SWO-/);
  });
});

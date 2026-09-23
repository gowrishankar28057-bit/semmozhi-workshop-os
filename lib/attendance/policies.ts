export const PRESENT_STATUSES = new Set(["PRESENT", "LATE"] as const);

export function countsAsAttended(status: string): boolean {
  return PRESENT_STATUSES.has(status as "PRESENT" | "LATE");
}

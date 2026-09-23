import type { ActionResult } from "./types";
export type RecordAttendanceAction = (
  formData: FormData,
) => Promise<ActionResult<{ attendanceId: string }>>;
// P5 implementation validates organizer ownership and writes an audit record.

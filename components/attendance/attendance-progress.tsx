import { CERTIFICATE_ATTENDANCE_THRESHOLD } from "@/lib/attendance/calculator";
export function AttendanceProgress({ percentage }: { percentage: number }) {
  const safe = Math.min(Math.max(percentage, 0), 100);
  return (
    <div>
      <div className="mb-2 flex justify-between text-sm">
        <span>Attendance</span>
        <strong>{safe}%</strong>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-charcoal/10">
        <div className="h-full bg-maroon" style={{ width: `${safe}%` }} />
      </div>
      <p className="mt-2 text-xs text-charcoal/60">
        Certificate unlocks at {CERTIFICATE_ATTENDANCE_THRESHOLD}%.
      </p>
    </div>
  );
}

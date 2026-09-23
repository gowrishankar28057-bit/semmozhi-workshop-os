import { verifyAttendanceToken } from "./qr-token";

export type CheckInCommand = { token: string; participantId: string };
export type CheckInResult = {
  sessionId: string;
  participantId: string;
  checkedInAt: Date;
};

export async function checkInParticipant(
  command: CheckInCommand,
  deps: {
    secret: string;
    isRegistered: (
      participantId: string,
      sessionId: string,
    ) => Promise<boolean>;
  },
): Promise<CheckInResult> {
  const payload = await verifyAttendanceToken(command.token, deps.secret);
  if (!(await deps.isRegistered(command.participantId, payload.sessionId))) {
    throw new Error("Participant is not registered for this workshop");
  }
  // Persistence and nonce replay prevention are implemented in P7.
  return {
    sessionId: payload.sessionId,
    participantId: command.participantId,
    checkedInAt: new Date(),
  };
}

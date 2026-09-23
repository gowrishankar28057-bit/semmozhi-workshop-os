import type { ActionResult } from "./types";
export type IssueCertificateAction = (
  registrationId: string,
) => Promise<ActionResult<{ certificateCode: string }>>;
// P6 implementation recomputes attendance server-side in the issuing transaction.

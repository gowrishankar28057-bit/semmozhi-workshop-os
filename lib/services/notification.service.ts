import type { ServiceContext } from "./types";
export type NotificationInput = {
  userId: string;
  type: "ANNOUNCEMENT" | "WORKSHOP" | "ATTENDANCE" | "CERTIFICATE" | "SYSTEM";
  title: string;
  body: string;
  actionUrl?: string;
};
export interface NotificationService {
  send(
    context: ServiceContext,
    input: NotificationInput,
  ): Promise<{ id: string }>;
  markRead(context: ServiceContext, notificationId: string): Promise<void>;
}

import type { ServiceContext } from "./types";
export type AdminAnalytics = {
  totalOrganizers: number;
  totalParticipants: number;
  totalWorkshops: number;
  activeWorkshops: number;
  certificatesIssued: number;
};
export type OrganizerAnalytics = {
  registrations: number;
  attendanceRate: number;
  certificateEligible: number;
  sessionParticipation: number[];
};
export type ParticipantAnalytics = {
  attendanceRate: number;
  completedWorkshops: number;
  learningHours: number;
  certificates: number;
};
export interface AnalyticsService {
  admin(context: ServiceContext): Promise<AdminAnalytics>;
  organizer(context: ServiceContext): Promise<OrganizerAnalytics>;
  participant(context: ServiceContext): Promise<ParticipantAnalytics>;
}

export type PageRequest = { cursor?: string; limit?: number };
export type Page<T> = { items: T[]; nextCursor?: string };
export type ServiceContext = {
  userId: string;
  role: "ADMIN" | "ORGANIZER" | "PARTICIPANT";
  organizerId?: string;
};

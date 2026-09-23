import type { User } from "@prisma/client";
import type { ReadRepository } from "./contracts";
export interface UserRepository extends ReadRepository<User> {
  findByEmail(email: string): Promise<User | null>;
}

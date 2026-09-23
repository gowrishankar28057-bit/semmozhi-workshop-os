import type { ServiceContext } from "./types";
export interface CommunityService {
  join(context: ServiceContext, communityId: string): Promise<void>;
  createPost(
    context: ServiceContext,
    communityId: string,
    input: unknown,
  ): Promise<{ id: string }>;
}

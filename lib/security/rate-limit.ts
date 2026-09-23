export type RateLimitDecision = {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds?: number;
};
export interface RateLimiter {
  check(key: string): Promise<RateLimitDecision>;
}

/** In-memory limiting is intentionally not used in production serverless deployments. */
export function createUnconfiguredRateLimiter(): RateLimiter {
  return {
    async check() {
      throw new Error("A distributed rate-limit provider must be configured");
    },
  };
}

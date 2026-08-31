import { Redis } from "@upstash/redis";

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Multi-tenant publishing platforms where we cap by author/publication
// identity (path-derived) instead of the bare domain, so one demo per
// domain doesn't lock out every other newsletter hosted there.
const SHARED_PLATFORM_DOMAINS = [
  "medium.com",
  "substack.com",
  "beehiiv.com",
  "ghost.io",
  "wordpress.com",
  "convertkit.com",
];

export function rateLimitKeyForUrl(rawUrl: string): string {
  const u = new URL(rawUrl);
  const host = u.hostname.replace(/^www\./, "");

  // name.substack.com etc. are already identity-scoped subdomains, so only
  // the bare apex domain (e.g. medium.com/@author) needs path-based identity.
  const isBareSharedApex = SHARED_PLATFORM_DOMAINS.includes(host);

  if (isBareSharedApex) {
    const identity = u.pathname.split("/").filter(Boolean)[0] || "unknown";
    return `domain:${host}:${identity}`;
  }

  return `domain:${host}`;
}

export async function incrWithTTL(key: string, ttlSeconds: number): Promise<number> {
  const count = await redis.incr(key);
  if (count === 1) {
    await redis.expire(key, ttlSeconds);
  }
  return count;
}

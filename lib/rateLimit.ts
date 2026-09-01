/**
 * Per-IP rate limiting for the public API routes.
 *
 * Lifted out of app/api/waitlist/route.ts so /api/contact can share ONE
 * implementation rather than carry a second copy that drifts. The waitlist
 * route had a limiter from the start; /api/contact shipped without one and
 * sends an email to admin@junoonwellness.com on every POST, so a script
 * could push unlimited mail through Junoon's own SMTP account. The cost of
 * that is the sending reputation the newsletter also depends on.
 *
 * Deliberately in-memory: it resets on cold start and is not shared across
 * Vercel instances or regions, so it blunts casual scripted abuse without
 * provisioning a store. That is the right trade for a marketing site. If it
 * ever needs to hold under real distributed abuse, swap the Map for a
 * durable limiter (e.g. Upstash) — the call sites do not change.
 */

interface Bucket {
  count: number;
  resetAt: number;
}

export interface RateLimitOptions {
  /** Sliding window length in milliseconds. */
  windowMs: number;
  /** Requests allowed per window, per IP. */
  max: number;
}

/**
 * Each route gets its OWN store, so a burst of newsletter signups can never
 * lock someone out of the contact form (or the reverse). A single shared Map
 * keyed by IP alone would couple two unrelated surfaces.
 */
export function createRateLimiter({ windowMs, max }: RateLimitOptions) {
  const hits = new Map<string, Bucket>();
  let sweepCounter = 0;

  return function isRateLimited(ip: string): boolean {
    // Sweep expired entries periodically so a long-lived warm instance does
    // not accumulate one entry per unique IP forever.
    sweepCounter += 1;
    if (sweepCounter % 500 === 0) {
      const cutoff = Date.now();
      for (const [key, bucket] of hits) {
        if (cutoff > bucket.resetAt) hits.delete(key);
      }
    }

    const now = Date.now();
    const bucket = hits.get(ip);
    if (!bucket || now > bucket.resetAt) {
      hits.set(ip, { count: 1, resetAt: now + windowMs });
      return false;
    }
    bucket.count += 1;
    return bucket.count > max;
  };
}

export function getClientIp(req: Request): string {
  // Vercel (and most proxies) set x-forwarded-for as "client, proxy1, proxy2".
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

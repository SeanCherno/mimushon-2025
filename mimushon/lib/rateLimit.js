/**
 * Simple in-memory sliding-window rate limiter.
 *
 * ⚠️  State lives in Node.js process memory.
 *    This works correctly for single-instance deployments (a VPS, a
 *    self-hosted server, etc.).  For multi-instance / serverless
 *    deployments (Vercel, AWS Lambda, …) replace the store with a
 *    Redis-backed counter — e.g. @upstash/ratelimit — so all instances
 *    share the same counter.
 *
 * Usage:
 *   import { rateLimit, getClientIp } from "../../../lib/rateLimit";
 *
 *   const ip = getClientIp(request);
 *   const { allowed, retryAfterMs } = rateLimit(ip, 60, 60_000); // 60 req/min
 *   if (!allowed) return NextResponse.json({ error: "Too many requests" }, { status: 429 });
 */

/** @type {Map<string, number[]>} key → array of request timestamps (ms) */
const store = new Map();

/**
 * Check (and record) a request for a given key against a sliding window.
 *
 * @param {string} key       Unique identifier for the client (usually IP).
 * @param {number} limit     Maximum number of requests allowed in the window.
 * @param {number} windowMs  Sliding window size in milliseconds.
 * @returns {{ allowed: boolean, retryAfterMs: number }}
 */
export function rateLimit(key, limit, windowMs) {
  const now = Date.now();
  const windowStart = now - windowMs;

  // Keep only timestamps that fall within the current window.
  const timestamps = (store.get(key) ?? []).filter((t) => t > windowStart);

  if (timestamps.length >= limit) {
    // The oldest timestamp tells us when a slot will free up.
    const retryAfterMs = timestamps[0] + windowMs - now;
    store.set(key, timestamps);
    return { allowed: false, retryAfterMs };
  }

  timestamps.push(now);
  store.set(key, timestamps);
  return { allowed: true, retryAfterMs: 0 };
}

/**
 * Extract the real client IP from Next.js request headers.
 * Prefers the first entry in X-Forwarded-For (set by reverse proxies /
 * load balancers), then X-Real-IP, then falls back to "unknown".
 *
 * @param {Request} request
 * @returns {string}
 */
export function getClientIp(request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

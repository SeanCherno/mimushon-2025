/**
 * Sliding-window rate limiter.
 *
 * When UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN are set, requests
 * are tracked in Upstash Redis via the REST pipeline API so all instances
 * (Vercel, Lambda, etc.) share the same counter.
 *
 * When those env vars are absent the limiter falls back to a simple in-memory
 * store, which works correctly for single-instance deployments.
 *
 * Usage:
 *   import { rateLimit, getClientIp } from "../../../lib/rateLimit";
 *
 *   const ip = getClientIp(request);
 *   const { allowed, retryAfterMs } = await rateLimit(ip, 60, 60_000); // 60 req/min
 *   if (!allowed) return NextResponse.json({ error: "Too many requests" }, { status: 429 });
 */

// ── Redis-backed implementation (Upstash REST pipeline) ──────────────────────

/**
 * Rate-limit using Upstash Redis sorted-set pipeline.
 * Returns null if the Redis call fails (caller should fall back).
 *
 * @param {string} key
 * @param {number} limit
 * @param {number} windowMs
 * @returns {Promise<{ allowed: boolean, retryAfterMs: number } | null>}
 */
async function rateLimitRedis(key, limit, windowMs) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  const now = Date.now();
  const windowStart = now - windowMs;
  // Unique member for this request — timestamp + random suffix avoids collisions
  const member = `${now}-${Math.random().toString(36).slice(2)}`;

  try {
    const res = await fetch(`${url}/pipeline`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        ["ZREMRANGEBYSCORE", key, 0, windowStart],
        ["ZADD", key, now, member],
        ["ZCARD", key],
        ["PEXPIRE", key, windowMs],
      ]),
    });

    if (!res.ok) return null;

    // Pipeline response is an array of { result } objects, one per command.
    const results = await res.json();
    // Index 2 = ZCARD result = current request count after adding this one
    const count = results[2]?.result ?? 0;

    if (count > limit) {
      // We already added the member; remove it so we don't inflate the count.
      await fetch(`${url}/pipeline`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify([["ZREM", key, member]]),
      }).catch(() => {}); // best-effort

      // Approximate retry window — we don't have the oldest score here
      return { allowed: false, retryAfterMs: windowMs };
    }

    return { allowed: true, retryAfterMs: 0 };
  } catch {
    return null; // network/parse error → let caller fall back
  }
}

// ── In-memory fallback ────────────────────────────────────────────────────────

/** @type {Map<string, number[]>} key → array of request timestamps (ms) */
const store = new Map();

/**
 * Rate-limit using the in-memory sliding-window store.
 *
 * @param {string} key
 * @param {number} limit
 * @param {number} windowMs
 * @returns {{ allowed: boolean, retryAfterMs: number }}
 */
function rateLimitMemory(key, limit, windowMs) {
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

// ── Public API ────────────────────────────────────────────────────────────────

/**
 * Check (and record) a request for a given key against a sliding window.
 * Uses Redis when Upstash env vars are present; otherwise falls back to memory.
 *
 * @param {string} key       Unique identifier for the client (usually IP).
 * @param {number} limit     Maximum number of requests allowed in the window.
 * @param {number} windowMs  Sliding window size in milliseconds.
 * @returns {Promise<{ allowed: boolean, retryAfterMs: number }>}
 */
export async function rateLimit(key, limit, windowMs) {
  if (
    process.env.UPSTASH_REDIS_REST_URL &&
    process.env.UPSTASH_REDIS_REST_TOKEN
  ) {
    const result = await rateLimitRedis(key, limit, windowMs);
    if (result !== null) return result;
    // Fall through to memory on Redis error
  }
  return rateLimitMemory(key, limit, windowMs);
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

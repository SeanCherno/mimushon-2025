/**
 * Simple in-memory rate limiter.
 * Works per-process — adequate for a single-server deployment.
 * For multi-server deployments, replace with Redis-backed solution.
 */

const store = new Map();

// Clean up old entries every 5 minutes to prevent memory leaks
setInterval(() => {
  const now = Date.now();
  for (const [key, data] of store.entries()) {
    if (now - data.windowStart > data.windowMs * 2) {
      store.delete(key);
    }
  }
}, 5 * 60 * 1000);

/**
 * @param {string} key        - Usually the client IP
 * @param {object} options
 * @param {number} options.windowMs  - Time window in milliseconds
 * @param {number} options.max       - Max requests per window
 * @returns {{ allowed: boolean, remaining: number, resetAt: number }}
 */
export function rateLimit(key, { windowMs = 60_000, max = 20 }) {
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || now - entry.windowStart > windowMs) {
    // New window
    store.set(key, { count: 1, windowStart: now, windowMs });
    return { allowed: true, remaining: max - 1, resetAt: now + windowMs };
  }

  entry.count += 1;
  const remaining = Math.max(0, max - entry.count);

  return {
    allowed: entry.count <= max,
    remaining,
    resetAt: entry.windowStart + windowMs,
  };
}

/**
 * Get the client IP from a Next.js Request object.
 */
export function getClientIp(request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

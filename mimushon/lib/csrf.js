/**
 * CSRF origin validation helper.
 *
 * Browsers always attach an Origin header to cross-origin POST requests.
 * By verifying it matches our own domain we prevent any third-party site
 * from triggering our API on behalf of a logged-in user.
 *
 * Allowed origins are controlled by the NEXT_PUBLIC_SITE_ORIGIN env var
 * (set it in .env.local / your deployment environment).  A safe default
 * of "https://mimushon.co.il" is used when the variable is absent.
 */

// In production only the real domain is accepted.
// In development, common localhost variants are also allowed so you can
// test with the browser without having to set any env var.
const PROD_ORIGIN =
  process.env.NEXT_PUBLIC_SITE_ORIGIN || "https://mimushon.co.il";

const ALLOWED_ORIGINS =
  process.env.NODE_ENV === "production"
    ? [PROD_ORIGIN]
    : [PROD_ORIGIN, "http://localhost:3000", "http://127.0.0.1:3000"];

/**
 * Returns true when the request passes the CSRF origin check.
 *
 * @param {Request} request  The incoming Next.js Request object.
 * @returns {boolean}
 */
export function checkCsrfOrigin(request) {
  const origin = request.headers.get("origin");

  // No Origin header on a POST → reject in production (browsers always
  // send it for cross-origin requests; its absence is suspicious).
  if (!origin) {
    return process.env.NODE_ENV !== "production";
  }

  return ALLOWED_ORIGINS.includes(origin);
}

import crypto from "crypto";

/* Anti-scraping: /api/calculate is a percentage oracle, so we gate it behind a
   short-lived signed token that is ONLY embedded in the rendered homepage.
   A real visitor's browser gets the token in the page and sends it back on each
   calc request; a cold script hitting the API without rendering the page has no
   valid token and is rejected. It doesn't make scraping impossible (a scraper
   can still fetch+parse the HTML for a token), but it stops trivial API
   enumeration and, with the rate limit, makes bulk extraction real work.

   Signing key: prefer CALC_TOKEN_SECRET in the environment. If unset, fall back
   to a per-process random key — fine for a single instance (tokens simply become
   invalid across a restart, and clients get a fresh one on the next page load).
   Set CALC_TOKEN_SECRET in production for stability across restarts/instances. */
const SECRET =
  process.env.CALC_TOKEN_SECRET ||
  (() => {
    console.warn(
      "[calcToken] CALC_TOKEN_SECRET not set — using a per-process random key. " +
        "Set it in the environment for stability across restarts."
    );
    return crypto.randomBytes(32).toString("hex");
  })();

const MAX_AGE_MS = 12 * 60 * 60 * 1000; // 12h — generous, covers any real session.
const CLOCK_SKEW_MS = 60 * 1000;

function sign(ts) {
  return crypto.createHmac("sha256", SECRET).update(String(ts)).digest("base64url");
}

// Issue a fresh token to embed in the rendered page. Format: "<ms>.<hmac>".
export function issueCalcToken() {
  const ts = Date.now();
  return `${ts}.${sign(ts)}`;
}

// Verify a token from a calc request. True only for a well-formed, correctly
// signed, non-expired token.
export function verifyCalcToken(token) {
  if (typeof token !== "string" || token.indexOf(".") === -1) return false;
  const [tsStr, sig] = token.split(".");
  const ts = Number(tsStr);
  if (!Number.isFinite(ts)) return false;
  const age = Date.now() - ts;
  if (age > MAX_AGE_MS || age < -CLOCK_SKEW_MS) return false; // expired or future
  const expected = sign(ts);
  if (typeof sig !== "string" || sig.length !== expected.length) return false;
  return crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
}

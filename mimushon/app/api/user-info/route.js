import { NextResponse } from "next/server";
import pool from "../../../lib/db";
import { checkCsrfOrigin } from "../../../lib/csrf";
import { sendLeadNotification } from "../../../lib/mailer";

export const dynamic = 'force-dynamic';

// ── Validation constants ──────────────────────────────────────────────────────
const MAX_NAME_LEN = 100;
const MAX_PHONE_LEN = 15;
const MAX_COMMENT_LEN = 1_000;
// Accepts digits, spaces, hyphens, plus signs, parentheses — 7–15 chars
const PHONE_REGEX = /^[\d\s\-()+]{7,15}$/;

// ── Helper ────────────────────────────────────────────────────────────────────
function badRequest(message) {
  return NextResponse.json({ result: false, error: message }, { status: 400 });
}

// ── Route handler ─────────────────────────────────────────────────────────────
export async function POST(request) {
  // 1. CSRF origin check
  if (!checkCsrfOrigin(request)) {
    return NextResponse.json({ result: false, error: "Forbidden" }, { status: 403 });
  }

  // 2. Parse body safely
  let body;
  try {
    body = await request.json();
  } catch {
    return badRequest("Invalid request body");
  }

  const { name, phone, hearot, consent } = body ?? {};

  // 2a. Consent check
  if (!consent) {
    return badRequest("יש לאשר את תנאי השימוש לפני שליחת הטופס");
  }

  // 2. Server-side input validation
  if (
    typeof name !== "string" ||
    name.trim().length === 0 ||
    name.length > MAX_NAME_LEN
  ) {
    return badRequest("Invalid name (must be 1–100 characters)");
  }

  if (
    typeof phone !== "string" ||
    phone.trim().length === 0 ||
    phone.length > MAX_PHONE_LEN ||
    !PHONE_REGEX.test(phone.trim())
  ) {
    return badRequest("Invalid phone number");
  }

  if (
    hearot !== undefined &&
    hearot !== null &&
    (typeof hearot !== "string" || hearot.length > MAX_COMMENT_LEN)
  ) {
    return badRequest(`Comment must not exceed ${MAX_COMMENT_LEN} characters`);
  }

  // 3. Insert — use parameterized query (no SQL injection risk)
  try {
    const queryText =
      "INSERT INTO contact_us_users(name, phone, comment) VALUES($1, $2, $3)";
    const values = [
      name.trim(),
      phone.trim(),
      typeof hearot === "string" ? hearot.trim() : "",
    ];

    await pool.query(queryText, values);

    // Send email notification (best-effort — never fail the request on email error)
    try {
      await sendLeadNotification({
        name: name.trim(),
        phone: phone.trim(),
        comment: typeof hearot === "string" ? hearot.trim() : "",
      });
    } catch (emailErr) {
      console.error("[user-info] Failed to send lead notification email:", emailErr.message);
    }

    // Don't log PII (name/phone) in production logs
    console.log("[user-info] Contact form submission saved successfully.");
    return NextResponse.json({ result: true });
  } catch (err) {
    // Log the full error server-side only — never expose internals to the client
    console.error("[user-info] Database insert failed:", err);
    return NextResponse.json({ result: false }, { status: 500 });
  }
}

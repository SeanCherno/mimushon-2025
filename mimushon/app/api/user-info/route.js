import { NextResponse } from "next/server";
import pool from "../../../lib/db";
import { checkCsrfOrigin } from "../../../lib/csrf";
import { rateLimit, getClientIp } from "../../../lib/rateLimit";

export const dynamic = 'force-dynamic';

// ── Validation constants ──────────────────────────────────────────────────────
const MAX_NAME_LEN = 100;
const MAX_PHONE_LEN = 15;
const MAX_COMMENT_LEN = 1_000;
const PHONE_REGEX = /^[\d\s\-()+]{7,15}$/;

// ── Helper ────────────────────────────────────────────────────────────────────
function badRequest(message) {
  return NextResponse.json({ result: false, error: message }, { status: 400 });
}

// ── Route handler ─────────────────────────────────────────────────────────────
export async function POST(request) {
  // 1. Rate limit — 5 submissions per IP per hour
  const ip = getClientIp(request);
  const { allowed } = rateLimit(`user-info:${ip}`, { windowMs: 60 * 60_000, max: 5 });
  if (!allowed) {
    return NextResponse.json(
      { result: false, error: "יותר מדי בקשות. אנא נסה שוב מאוחר יותר." },
      { status: 429 }
    );
  }

  // 2. CSRF origin check
  if (!checkCsrfOrigin(request)) {
    return NextResponse.json({ result: false, error: "Forbidden" }, { status: 403 });
  }

  // 3. Parse body safely
  let body;
  try {
    body = await request.json();
  } catch {
    return badRequest("Invalid request body");
  }

  const { name, phone, hearot, consent, percentages, claimType } = body ?? {};

  // Validate claimType
  const VALID_CLAIM_TYPES = ['illness', 'work_accident', 'idf_disabled', 'other'];
  const safeClaimType = VALID_CLAIM_TYPES.includes(claimType) ? claimType : null;

  // 4. Consent check
  if (!consent) {
    return badRequest("יש לאשר את תנאי השימוש לפני שליחת הטופס");
  }

  // 5. Input validation
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

  // Validate percentages if provided
  const safePercentages = (percentages && typeof percentages === "object" && !Array.isArray(percentages))
    ? percentages
    : null;

  // 6. Insert
  try {
    const queryText =
      "INSERT INTO contact_us_users(name, phone, comment, percentages, claim_type) VALUES($1, $2, $3, $4, $5)";
    const values = [
      name.trim(),
      phone.trim(),
      typeof hearot === "string" ? hearot.trim() : "",
      safePercentages ? JSON.stringify(safePercentages) : null,
      safeClaimType,
    ];

    await pool.query(queryText, values);

    console.log("[user-info] Contact form submission saved successfully.");
    return NextResponse.json({ result: true });
  } catch (err) {
    console.error("[user-info] Database insert failed:", err);
    return NextResponse.json({ result: false }, { status: 500 });
  }
}

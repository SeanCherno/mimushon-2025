import { NextResponse } from "next/server";
import pool from "../../../lib/db";
import { modes, findDiseasesById } from "../../../lib/data";
import { checkCsrfOrigin } from "../../../lib/csrf";
import { rateLimit, getClientIp } from "../../../lib/rateLimit";

export const dynamic = 'force-dynamic';

// ── Validation constants ──────────────────────────────────────────────────────
const MAX_DISEASES = 20; // Hard cap — prevents DoS amplification attacks

// ── Route handler ─────────────────────────────────────────────────────────────
export async function POST(request) {
  // 1. Rate limit — 60 calculations per IP per minute
  const ip = getClientIp(request);
  const { allowed } = rateLimit(`calculate:${ip}`, { windowMs: 60_000, max: 60 });
  if (!allowed) {
    return NextResponse.json(
      { error: "יותר מדי בקשות. אנא נסה שוב מאוחר יותר." },
      { status: 429 }
    );
  }

  // 2. CSRF origin check
  if (!checkCsrfOrigin(request)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // 2. Parse body safely
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { chosenDiseasesWithSeverities } = body ?? {};

  // 4. Validate: must be a non-empty array within the allowed limit
  if (!Array.isArray(chosenDiseasesWithSeverities)) {
    return NextResponse.json(
      { error: "chosenDiseasesWithSeverities must be an array" },
      { status: 400 }
    );
  }
  if (chosenDiseasesWithSeverities.length === 0) {
    return NextResponse.json(
      { error: "chosenDiseasesWithSeverities must not be empty" },
      { status: 400 }
    );
  }
  if (chosenDiseasesWithSeverities.length > MAX_DISEASES) {
    return NextResponse.json(
      { error: `Cannot calculate more than ${MAX_DISEASES} diseases at once` },
      { status: 400 }
    );
  }

  // 5. Validate the shape of each entry
  for (const entry of chosenDiseasesWithSeverities) {
    if (
      !entry ||
      typeof entry !== "object" ||
      !entry.disease?.id ||
      typeof entry.selectedSeverity?.severityId !== "string"
    ) {
      return NextResponse.json(
        { error: "Each entry must have disease.id and selectedSeverity.severityId" },
        { status: 400 }
      );
    }
  }

  // 6. Run the Israeli combined-values weighted calculation
  const newTotals = {
    generalDisability: 0,
    taxIncome: 0,
    specialServices: 0,
  };

  chosenDiseasesWithSeverities.forEach((entry) => {
    const fullDisease = findDiseasesById(entry.disease.id);
    if (!fullDisease) return; // Unknown disease — skip gracefully

    const foundSeverity = fullDisease.severities.find(
      (sev) => sev.severityId === entry.selectedSeverity.severityId
    );

    if (foundSeverity) {
      modes.forEach((mode) => {
        if (foundSeverity[mode.dataKey]) {
          // Formula: accumulated += (1 - accumulated/100) * percentage
          newTotals[mode.id] +=
            (1 - newTotals[mode.id] / 100) *
            (foundSeverity ? foundSeverity.percentage : 0);
        }
      });
    }
  });

  // 7. Log to database (best-effort — never fail the main request on log error)
  try {
    const logQueryText =
      "INSERT INTO disease_calculations(calculation_data) VALUES($1)";
    const logValues = [
      {
        diseases: JSON.stringify(
          chosenDiseasesWithSeverities.map((disease) => ({
            disease: {
              id: disease.disease.id,
              name: disease.disease.name,
            },
            selectedSeverity: disease.selectedSeverity,
          }))
        ),
        totals: newTotals,
      },
    ];
    await pool.query(logQueryText, logValues);
  } catch (logErr) {
    // Log server-side only — don't surface DB errors to the client
    console.error("[calculate] Failed to log calculation to database:", logErr);
  }

  // NOTE: The artificial 2-second setTimeout that was here has been removed.
  // It was holding a server thread open on every request — a DoS amplifier.

  return NextResponse.json({ newTotals });
}

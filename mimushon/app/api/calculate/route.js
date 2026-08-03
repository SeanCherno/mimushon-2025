import { NextResponse } from "next/server";
import pool from "../../../lib/db";
import { modes, findDiseasesById } from "../../../lib/data";
import { checkCsrfOrigin } from "../../../lib/csrf";
import { rateLimit, getClientIp } from "../../../lib/rateLimit";
import { combineValues, combinedTotalWithCaps, buildCapNotices } from "../../../lib/regCalc";
import { verifyCalcToken } from "../../../lib/calcToken";

export const dynamic = 'force-dynamic';

// ── Validation constants ──────────────────────────────────────────────────────
const MAX_DISEASES = 20; // Hard cap — prevents DoS amplification attacks

// The combined-values method and the reg. 11(ג) per-organ ceiling live in
// lib/regCalc.js (pure, unit-tested). See that file for the safety rationale.

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

  // 2b. Anti-scraping: require the signed token that is only embedded in the
  // rendered homepage. A cold script hitting this endpoint without rendering the
  // page has no valid token. See lib/calcToken.js.
  if (!verifyCalcToken(request.headers.get("x-calc-token"))) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // 2. Parse body safely
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { chosenDiseasesWithSeverities, claimType, live } = body ?? {};

  // Live (debounced) recalculations fire on every grade the user picks, before
  // they have consented to the terms/privacy policy. Those must NOT be persisted
  // — only the final, consented calculation is logged. See the DB block below.
  const isLive = live === true;

  // Validate claimType if provided
  const VALID_CLAIM_TYPES = ['illness', 'work_accident', 'idf_disabled', 'other'];
  const safeClaimType = VALID_CLAIM_TYPES.includes(claimType) ? claimType : null;

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

  // 6. Run the Israeli combined-values weighted calculation.
  //
  // Resolve every chosen entry to its authoritative percentage (percentages are
  // stripped from the client payload by design — the server is the source of
  // truth). We keep the per-impairment values here so we can also return an
  // ordered "show the work" breakdown, mirroring regulation 12ב(ב): impairments
  // are combined highest-first, each one taking its percentage of the remaining
  // earning capacity.
  const impairments = [];
  const limbTagged = []; // { region, side } per counted impairment, for the notice
  chosenDiseasesWithSeverities.forEach((entry) => {
    const { disease: fullDisease } = findDiseasesById(entry.disease.id, true);
    if (!fullDisease) return; // Unknown disease — skip gracefully

    const foundSeverity = fullDisease.severities.find(
      (sev) => sev.severityId === entry.selectedSeverity.severityId
    );
    if (!foundSeverity) return;

    // Structured reg. 11(ג) tags: region + anatomical level on the disease, side on
    // the severity (arm, from the book) or on the entry (leg, chosen by the user).
    const capRegion = fullDisease.capRegion ?? null;
    const capLevel = fullDisease.capLevel ?? null;
    const entrySide = entry.side === "right" || entry.side === "left" ? entry.side : null;
    const side = foundSeverity.side ?? entrySide;

    impairments.push({
      id: entry.disease.id,
      name: entry.disease.name,
      severityId: foundSeverity.severityId,
      percentage: foundSeverity.percentage ?? 0,
      countForDisability: !!foundSeverity.countForDisability,
      countForTax: !!foundSeverity.countForTax,
      countForSpecial: !!foundSeverity.countForSpecial,
      capRegion,
      capLevel,
      side,
    });

    // Tag limb + side for the reg. 11(ג) same-limb notice (disability degree only).
    if (foundSeverity.countForDisability && capRegion) {
      limbTagged.push({ region: capRegion, side });
    }
  });

  // Non-blocking reg. 11(ג) notices — surfaced to the user. They flag same-limb
  // stacking even where we don't (yet) enforce a hard ceiling.
  const capNotices = buildCapNotices(limbTagged);

  const newTotals = {
    generalDisability: 0,
    taxIncome: 0,
    specialServices: 0,
  };

  // Combined-values formula per mode: accumulated += (1 - accumulated/100) * p.
  // The result is order-independent, but the regulation defines the sequence as
  // descending, so we sort — which also makes the returned breakdown correct.
  modes.forEach((mode) => {
    const counting = impairments
      .filter((imp) => imp[mode.dataKey])
      .sort((a, b) => b.percentage - a.percentage);
    // Applies reg. 11(ג) organ ceilings where configured; otherwise identical to
    // the plain combined-values total.
    newTotals[mode.id] = combinedTotalWithCaps(counting);
  });

  // Ordered, step-by-step breakdown for the general-disability degree — the
  // medical number the committee actually determines. Each step exposes the
  // running total so the client can render the residual-capacity math.
  const gdCounting = impairments
    .filter((imp) => imp.countForDisability)
    .sort((a, b) => b.percentage - a.percentage);
  let gdAcc = 0;
  const breakdown = gdCounting.map((imp) => {
    const before = gdAcc;
    gdAcc += (1 - gdAcc / 100) * imp.percentage;
    return {
      id: imp.id,
      name: imp.name,
      percentage: imp.percentage,
      before,
      runningTotal: gdAcc,
    };
  });

  // If a reg. 11(ג) organ ceiling bound, the capped headline (newTotals) is below
  // this flat running total. Append a synthetic step so the "show the work" rail
  // reconciles with the headline instead of ending on a higher number.
  if (gdAcc - newTotals.generalDisability > 0.05) {
    breakdown.push({
      id: "__reg11cap__",
      name: "תקרת תקנה 11(ג) — מגבלת נכות לגפה אחת",
      percentage: null,
      before: gdAcc,
      runningTotal: newTotals.generalDisability,
      isCap: true,
    });
  }

  // 7. Log to database (best-effort — never fail the main request on log error).
  //    Skipped for live estimates: nothing is persisted until the user consents
  //    and requests the full result.
  if (!isLive) try {
    const logQueryText =
      "INSERT INTO disease_calculations(calculation_data, claim_type) VALUES($1, $2)";
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
      safeClaimType,
    ];
    await pool.query(logQueryText, logValues);
  } catch (logErr) {
    // Log server-side only — don't surface DB errors to the client
    console.error("[calculate] Failed to log calculation to database:", logErr);
  }

  // NOTE: The artificial 2-second setTimeout that was here has been removed.
  // It was holding a server thread open on every request — a DoS amplifier.

  return NextResponse.json({ newTotals, breakdown, impairments, capNotices });
}

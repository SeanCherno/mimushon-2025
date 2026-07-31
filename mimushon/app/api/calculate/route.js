import { NextResponse } from "next/server";
import pool from "../../../lib/db";
import { modes, findDiseasesById } from "../../../lib/data";
import { checkCsrfOrigin } from "../../../lib/csrf";
import { rateLimit, getClientIp } from "../../../lib/rateLimit";

export const dynamic = 'force-dynamic';

// ── Validation constants ──────────────────────────────────────────────────────
const MAX_DISEASES = 20; // Hard cap — prevents DoS amplification attacks

// ── Reg. 11(ג) per-organ cap engine ───────────────────────────────────────────
// The combined-values rule is total = 1 − Π(1 − pᵢ), which is associative — so we
// combine each organ's impairments internally, cap that organ at its ceiling, then
// combine the capped organ values together. That is exactly reg. 11(ג): several
// impairments of one limb / joint / eye can't exceed the value of amputating /
// ankylosing / blinding that same structure.
//
// Impairments carry structured tags (added to diseases.json): `capRegion`
// ("arm"|"leg"|"eye") on the disease and `side` ("right"|"left") on the severity.
// CEILINGS maps region+side to the value that caps that organ.
//
// SAFETY: we only cap where we can determine the organ AND the side (so we never
// conflate two different limbs). For the arm, `capLevel` on the disease encodes the
// anatomical segment (1 = shoulder/upper-arm, 2 = elbow/forearm, 3 = wrist/hand/
// fingers); the group ceiling is the amputation value of the MOST PROXIMAL damaged
// segment (reg. 11(ג)(2) — "amputation of the damaged part"). Values are the
// shoulder / below-deltoid / wrist disarticulation percentages per side; each is an
// upper bound for everything distal to it, so a mis-level can only over-estimate,
// never under-count.
//
// Legs and eyes are tagged (capRegion) but deliberately NOT hard-capped: their
// severities don't encode side (0/91 legs, 1/144 eyes), so grouping would wrongly
// merge a left and right limb and under-count bilateral cases. They get the
// non-blocking notice only, until side becomes a structured input.
const ARM_CEILINGS = {
  1: { right: 80, left: 70 }, // shoulder / upper arm
  2: { right: 70, left: 60 }, // elbow / forearm
  3: { right: 60, left: 50 }, // wrist / hand / fingers
};

// Combine a list of percentages via the combined-values (residual-capacity) rule.
function combineValues(percentages) {
  let acc = 0;
  percentages.forEach((p) => { acc += (1 - acc / 100) * p; });
  return acc;
}

// Combined total that enforces the reg. 11(ג) arm ceiling. Two or more impairments
// on the same arm+side are combined and capped at the amputation value of their
// most-proximal segment; everything else combines individually. A single impairment
// is never capped (reg. 11(ג) applies to "several impairments"). With no qualifying
// arm group this is byte-for-byte the plain combined-values total.
function combinedTotalWithCaps(counting) {
  const groups = new Map(); // `${region}:${side}` -> { side, members, minLevel }
  const singles = [];
  counting.forEach((imp) => {
    if (imp.capRegion !== "arm" || !imp.side) { singles.push(imp.percentage); return; }
    const key = `${imp.capRegion}:${imp.side}`;
    if (!groups.has(key)) groups.set(key, { side: imp.side, members: [], minLevel: Infinity });
    const g = groups.get(key);
    g.members.push(imp.percentage);
    g.minLevel = Math.min(g.minLevel, imp.capLevel ?? 1); // default proximal = safest
  });
  const groupValues = [];
  for (const g of groups.values()) {
    if (g.members.length < 2) { singles.push(...g.members); continue; } // single: uncapped
    const ceiling = ARM_CEILINGS[g.minLevel]?.[g.side] ?? ARM_CEILINGS[1][g.side];
    groupValues.push(Math.min(combineValues(g.members), ceiling));
  }
  return combineValues([...groupValues, ...singles]);
}

// ── Same-limb notice (non-blocking; does not change the number) ────────────────
function limbLabel(region, side) {
  const organ = region === "arm" ? "יד" : "רגל";
  if (side === "right") return `${organ} ימין`;
  if (side === "left") return `${organ} שמאל`;
  return `אותה ${organ}`;
}

// One notice per limb+side carrying 2+ impairments. Tagged entries come straight
// from the structured `capRegion` / `side` fields (no more free-text parsing).
function buildCapNotices(limbTagged) {
  const groups = new Map(); // `${region}|${side}` -> count
  limbTagged.forEach(({ region, side }) => {
    if (region !== "arm" && region !== "leg") return;
    const key = `${region}|${side ?? "unknown"}`;
    groups.set(key, (groups.get(key) || 0) + 1);
  });
  const notices = [];
  for (const [key, count] of groups) {
    if (count < 2) continue;
    const [region, side] = key.split("|");
    const sideKey = side === "unknown" ? null : side;
    notices.push(
      `שים/י לב: בחרת ${count} ליקויים ב${limbLabel(region, sideKey)}. לפי תקנה 11(ג), ` +
      `סך הנכות המשוקללת בשל כמה פגימות באותה גפה אינו יכול לעלות על אחוזי הנכות ` +
      `שנקבעו לקטיעת אותו חלק פגוע. ייתכן שהוועדה הרפואית תחיל תקרה זו, כך שהתוצאה ` +
      `בפועל תהיה נמוכה מהחישוב המשוקלל המוצג כאן.`
    );
  }
  return notices;
}

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

    // Structured reg. 11(ג) tags: region + anatomical level on the disease, side
    // on the severity.
    const capRegion = fullDisease.capRegion ?? null;
    const capLevel = fullDisease.capLevel ?? null;
    const side = foundSeverity.side ?? null;

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

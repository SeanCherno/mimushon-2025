import { NextResponse } from "next/server";
import pool from "../../../lib/db";
import { modes, findDiseasesById } from "../../../lib/data";
import { checkCsrfOrigin } from "../../../lib/csrf";
import { rateLimit, getClientIp } from "../../../lib/rateLimit";

export const dynamic = 'force-dynamic';

// ── Validation constants ──────────────────────────────────────────────────────
const MAX_DISEASES = 20; // Hard cap — prevents DoS amplification attacks

// ── Reg. 11(ג) per-organ cap engine ───────────────────────────────────────────
// The combined-values rule is total = 1 − Π(1 − pᵢ), which is associative — so
// we can combine each organ's impairments internally, cap that organ at its
// ceiling, then combine the capped organ values together. That is exactly the
// structure reg. 11(ג) describes (a joint / limb / eye can't exceed the value of
// ankylosis / amputation / blindness of that same structure).
//
// CAP_GROUPS is intentionally EMPTY. Populating real ceilings requires NII domain
// review — tagging each impairment with its limb+side/joint/eye and the ceiling
// value for that structure — and is deliberately NOT auto-generated here: a wrong
// ceiling would UNDER-count a real claimant, which is worse than the gap. With no
// groups configured this reduces byte-for-byte to the plain combined-values total.
// Schema for each entry: { ceiling: <0-100 number>, match: (impairment) => boolean }.
const CAP_GROUPS = [];

// Combine a list of percentages via the combined-values (residual-capacity) rule.
function combineValues(percentages) {
  let acc = 0;
  percentages.forEach((p) => { acc += (1 - acc / 100) * p; });
  return acc;
}

// Combined total that honors any configured per-organ ceilings. Falls through to
// the plain combined-values total when no cap group is configured or matches.
function combinedTotalWithCaps(counting, capGroups) {
  if (!capGroups || capGroups.length === 0) {
    return combineValues(counting.map((i) => i.percentage));
  }
  const remaining = [...counting];
  const groupValues = [];
  capGroups.forEach((g) => {
    const members = remaining.filter((imp) => g.match(imp));
    if (members.length === 0) return;
    for (let k = remaining.length - 1; k >= 0; k--) {
      if (members.includes(remaining[k])) remaining.splice(k, 1);
    }
    const raw = combineValues(members.map((m) => m.percentage));
    groupValues.push(Math.min(raw, g.ceiling)); // apply the 11(ג) ceiling
  });
  return combineValues([...groupValues, ...remaining.map((i) => i.percentage)]);
}

// ── Same-limb detection (for the non-blocking reg. 11(ג) notice) ───────────────
// We can't *enforce* the cap without domain-reviewed ceilings, but we can warn a
// user who has stacked several impairments on one limb that the committee will
// apply a ceiling. Region comes from the subcategory; side is parsed from the
// (server-resolved) severity description, where it lives as free text.
const ARM_SUBCATS = new Set([
  "כתפיים", "מרפק", "זרוע וכף יד", "אצבעות הידיים",
  "פציעות שרירי הכתף", "פציעות שרירי המרפק",
]);
const LEG_SUBCATS = new Set([
  "רגל (ירך ושוק)", "ברך", "כף רגל", "אצבעות הרגליים",
]);

function limbOf(subName) {
  if (ARM_SUBCATS.has(subName)) return "arm";
  if (LEG_SUBCATS.has(subName)) return "leg";
  return null;
}

function sideOf(desc) {
  if (!desc) return "unknown";
  if (/ימין|ימנית/.test(desc)) return "right";
  if (/שמאל|שמאלית/.test(desc)) return "left";
  return "unknown";
}

function limbLabel(limb, side) {
  const organ = limb === "arm" ? "יד" : "רגל";
  if (side === "right") return `${organ} ימין`;
  if (side === "left") return `${organ} שמאל`;
  return `אותה ${organ}`;
}

// Build non-blocking notices: one per limb+side that carries 2+ impairments.
function buildCapNotices(limbTagged) {
  const groups = new Map(); // `${limb}|${side}` -> count
  limbTagged.forEach(({ limb, side }) => {
    if (!limb) return;
    const key = `${limb}|${side}`;
    groups.set(key, (groups.get(key) || 0) + 1);
  });
  const notices = [];
  for (const [key, count] of groups) {
    if (count < 2) continue;
    const [limb, side] = key.split("|");
    notices.push(
      `שים/י לב: בחרת ${count} ליקויים ב${limbLabel(limb, side)}. לפי תקנה 11(ג), ` +
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
  const limbTagged = []; // { limb, side } per counted impairment, for the notice
  chosenDiseasesWithSeverities.forEach((entry) => {
    const { disease: fullDisease, subCategory } = findDiseasesById(entry.disease.id, true);
    if (!fullDisease) return; // Unknown disease — skip gracefully

    const foundSeverity = fullDisease.severities.find(
      (sev) => sev.severityId === entry.selectedSeverity.severityId
    );
    if (!foundSeverity) return;

    impairments.push({
      id: entry.disease.id,
      name: entry.disease.name,
      severityId: foundSeverity.severityId,
      percentage: foundSeverity.percentage ?? 0,
      countForDisability: !!foundSeverity.countForDisability,
      countForTax: !!foundSeverity.countForTax,
      countForSpecial: !!foundSeverity.countForSpecial,
    });

    // Tag limb + side for the reg. 11(ג) same-limb notice (disability degree only).
    if (foundSeverity.countForDisability) {
      const limb = limbOf(subCategory?.name);
      if (limb) limbTagged.push({ limb, side: sideOf(foundSeverity.description) });
    }
  });

  // Non-blocking reg. 11(ג) notices — surfaced to the user, they do NOT alter the
  // computed number (we don't have domain-reviewed ceilings to enforce the cap).
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
    // combinedTotalWithCaps === plain combined-values while CAP_GROUPS is empty.
    newTotals[mode.id] = combinedTotalWithCaps(counting, CAP_GROUPS);
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

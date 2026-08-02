// Pure calculation logic for the Israeli combined-values method and the
// reg. 11(ג) per-organ ceiling. Extracted from the API route so it can be unit
// tested in isolation (no Next/DB imports here).
//
// Reg. 11(ג): several impairments of one limb/joint/eye can't exceed the value of
// amputating/ankylosing/blinding that structure. We only enforce it for the ARM,
// where impairments carry a structured side (right/left) and an anatomical
// `capLevel` (1 = shoulder/upper-arm, 2 = elbow/forearm, 3 = wrist/hand/fingers).
// The group ceiling is the amputation value of the most-proximal damaged segment.
// Legs/eyes are not hard-capped (their severities carry no side, so grouping could
// merge two different limbs and under-count) — they get the notice only.

export const ARM_CEILINGS = {
  1: { right: 80, left: 70 }, // shoulder / upper arm
  2: { right: 70, left: 60 }, // elbow / forearm
  3: { right: 60, left: 50 }, // wrist / hand / fingers
};

// Combine a list of percentages via the combined-values (residual-capacity) rule:
// total = 1 − Π(1 − pᵢ). Order-independent.
export function combineValues(percentages) {
  let acc = 0;
  percentages.forEach((p) => { acc += (1 - acc / 100) * p; });
  return acc;
}

// Combined total that enforces the reg. 11(ג) arm ceiling. Two or more impairments
// on the same arm+side are combined and capped at the amputation value of their
// most-proximal segment; everything else combines individually. A single
// impairment is never capped (reg. 11(ג) applies to "several impairments"). With no
// qualifying arm group this is byte-for-byte the plain combined-values total.
export function combinedTotalWithCaps(counting) {
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

// Hebrew label for a limb + side, used in the same-limb notice.
export function limbLabel(region, side) {
  const organ = region === "arm" ? "יד" : "רגל";
  if (side === "right") return `${organ} ימין`;
  if (side === "left") return `${organ} שמאל`;
  return `אותה ${organ}`;
}

// Non-blocking notices: one per limb+side carrying 2+ impairments. `limbTagged`
// entries come from the structured `capRegion` / `side` fields.
export function buildCapNotices(limbTagged) {
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

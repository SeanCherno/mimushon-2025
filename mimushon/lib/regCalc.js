// Pure calculation logic for the Israeli combined-values method and the
// reg. 11(ג) per-organ ceiling. Extracted from the API route so it can be unit
// tested in isolation (no Next/DB imports here).
//
// Reg. 11(ג): several impairments of one limb/joint/eye can't exceed the value of
// amputating/ankylosing/blinding that structure. We enforce the LIMB rule (ג)(2)
// for arms and legs. Each impairment carries a `capRegion` (arm/leg), an anatomical
// `capLevel`, and a `side` (right/left); the group ceiling is the amputation value
// of the most-proximal damaged segment on that limb+side.
//
// Arm side comes from the severity (the book grades arms by dominance). Leg side
// isn't in the book — the user picks it — so a leg impairment only participates in
// a cap once its side is set (otherwise it stays uncapped, never under-counted).
// Eyes are not capped yet (acuity is already a combined table; separate-condition
// eye caps would need per-eye side too).
export const ARM_CEILINGS = {
  1: { right: 80, left: 70 }, // shoulder / upper arm
  2: { right: 70, left: 60 }, // elbow / forearm
  3: { right: 60, left: 50 }, // wrist / hand / fingers
};

// Leg amputation ceilings by segment (side-independent value — legs aren't graded
// by dominance). Source §46–48: hip/thigh 80, knee 65, shin/ankle 55, foot/toes 30.
export const LEG_CEILINGS = { 1: 80, 2: 65, 3: 55, 4: 30 };

// The reg-11(ג) ceiling for a limb group at its most-proximal segment.
function ceilingFor(region, level, side) {
  if (region === "arm") return ARM_CEILINGS[level]?.[side] ?? ARM_CEILINGS[1][side];
  if (region === "leg") return LEG_CEILINGS[level] ?? LEG_CEILINGS[1];
  return null;
}

// Combine a list of percentages via the combined-values (residual-capacity) rule:
// total = 1 − Π(1 − pᵢ). Order-independent.
export function combineValues(percentages) {
  let acc = 0;
  percentages.forEach((p) => { acc += (1 - acc / 100) * p; });
  return acc;
}

// Combined total that enforces the reg. 11(ג) limb ceiling. Two or more impairments
// on the same limb (arm/leg) + side are combined and capped at the amputation value
// of their most-proximal segment; everything else combines individually. A single
// impairment is never capped (reg. 11(ג) applies to "several impairments"), and an
// impairment with no side is never capped. With no qualifying limb group this is
// byte-for-byte the plain combined-values total.
export function combinedTotalWithCaps(counting) {
  const groups = new Map(); // `${region}:${side}` -> { region, side, members, minLevel }
  const singles = [];
  counting.forEach((imp) => {
    const region = imp.capRegion === "arm" || imp.capRegion === "leg" ? imp.capRegion : null;
    if (!region || !imp.side) { singles.push(imp.percentage); return; }
    const key = `${region}:${imp.side}`;
    if (!groups.has(key)) groups.set(key, { region, side: imp.side, members: [], minLevel: Infinity });
    const g = groups.get(key);
    g.members.push(imp.percentage);
    g.minLevel = Math.min(g.minLevel, imp.capLevel ?? 1); // default proximal = safest
  });
  const groupValues = [];
  for (const g of groups.values()) {
    if (g.members.length < 2) { singles.push(...g.members); continue; } // single: uncapped
    const ceiling = ceilingFor(g.region, g.minLevel, g.side);
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

import { describe, it, expect } from "vitest";
import {
  combineValues,
  combinedTotalWithCaps,
  buildCapNotices,
  limbLabel,
  ARM_CEILINGS,
} from "../lib/regCalc";

// Helpers to build impairment objects the engine expects.
const arm = (percentage, side, capLevel) => ({ percentage, capRegion: "arm", side, capLevel });
const plain = (percentage, capRegion = null, side = null) => ({ percentage, capRegion, side });

describe("combineValues (Israeli combined-values method)", () => {
  it("returns the single value for one impairment", () => {
    expect(combineValues([40])).toBeCloseTo(40, 6);
  });
  it("combines on residual capacity, not addition", () => {
    // 50 then 30 of the remaining 50% => 50 + 15 = 65
    expect(combineValues([50, 30])).toBeCloseTo(65, 6);
  });
  it("is order-independent", () => {
    expect(combineValues([50, 40, 30])).toBeCloseTo(combineValues([30, 40, 50]), 9);
  });
  it("never exceeds 100", () => {
    expect(combineValues([90, 90, 90])).toBeLessThan(100);
  });
});

describe("combinedTotalWithCaps — reg. 11(ג) arm ceiling", () => {
  it("is inert for non-arm impairments (equals plain combine)", () => {
    const imps = [plain(50), plain(40, "leg"), plain(30, "eye")];
    expect(combinedTotalWithCaps(imps)).toBeCloseTo(combineValues([50, 40, 30]), 9);
  });

  it("does NOT cap a single arm impairment", () => {
    expect(combinedTotalWithCaps([arm(65, "right", 3)])).toBeCloseTo(65, 6);
  });

  it("caps a distal-only right-arm stack at the wrist ceiling (60)", () => {
    // wrist+hand, both level 3 => ceiling 60
    expect(combinedTotalWithCaps([arm(50, "right", 3), arm(45, "right", 3)])).toBeCloseTo(60, 6);
  });

  it("uses the MOST PROXIMAL segment's ceiling for a mixed stack", () => {
    // forearm(L2)+wrist(L3)+hand(L3) => minLevel 2 => ceiling 70
    const total = combinedTotalWithCaps([arm(45, "right", 2), arm(40, "right", 3), arm(35, "right", 3)]);
    expect(total).toBeCloseTo(70, 6);
  });

  it("does NOT cap when a proximal (shoulder) impairment is present and total is below 80", () => {
    // shoulder(L1)+hand(L3) => ceiling 80; raw 76 < 80 => unchanged
    expect(combinedTotalWithCaps([arm(60, "right", 1), arm(40, "right", 3)])).toBeCloseTo(76, 6);
  });

  it("applies the lower LEFT (non-dominant) ceiling", () => {
    // left distal stack => ceiling 50
    expect(combinedTotalWithCaps([arm(50, "left", 3), arm(45, "left", 3)])).toBeCloseTo(50, 6);
  });

  it("keeps right and left arms as SEPARATE limbs (no merge, no cap)", () => {
    const total = combinedTotalWithCaps([arm(55, "right", 3), arm(55, "left", 3)]);
    expect(total).toBeCloseTo(combineValues([55, 55]), 9);
  });

  it("treats an arm impairment with unknown side as uncapped (never under-counts)", () => {
    const total = combinedTotalWithCaps([arm(60, null, 3), arm(55, null, 3)]);
    expect(total).toBeCloseTo(combineValues([60, 55]), 9);
  });

  it("never returns a capped value above the configured ceiling", () => {
    const total = combinedTotalWithCaps([arm(70, "right", 3), arm(70, "right", 3), arm(70, "right", 3)]);
    expect(total).toBeLessThanOrEqual(ARM_CEILINGS[3].right + 1e-9);
  });
});

describe("buildCapNotices", () => {
  it("emits one notice per limb+side with 2+ impairments", () => {
    const notices = buildCapNotices([
      { region: "arm", side: "right" },
      { region: "arm", side: "right" },
      { region: "arm", side: "left" }, // only one — no notice
    ]);
    expect(notices).toHaveLength(1);
    expect(notices[0]).toContain("יד ימין");
  });
  it("emits nothing for a single impairment", () => {
    expect(buildCapNotices([{ region: "arm", side: "right" }])).toHaveLength(0);
  });
  it("ignores non-limb regions", () => {
    expect(buildCapNotices([{ region: "eye" }, { region: "eye" }])).toHaveLength(0);
  });
});

describe("limbLabel", () => {
  it("labels arm sides", () => {
    expect(limbLabel("arm", "right")).toBe("יד ימין");
    expect(limbLabel("arm", "left")).toBe("יד שמאל");
  });
  it("labels legs and unknown side", () => {
    expect(limbLabel("leg", "right")).toBe("רגל ימין");
    expect(limbLabel("arm", null)).toBe("אותה יד");
  });
});

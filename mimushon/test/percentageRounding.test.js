import { describe, it, expect } from "vitest";
import { roundDisabilityPercentage } from "../lib/percentageRounding";

describe("roundDisabilityPercentage — clause 19א rounding", () => {
  it("rounds general disability UP (pension-entitling degree)", () => {
    expect(roundDisabilityPercentage("generalDisability", 64.1)).toBe(65);
    expect(roundDisabilityPercentage("generalDisability", 65.0)).toBe(65);
  });

  it("rounds special services UP as well", () => {
    expect(roundDisabilityPercentage("specialServices", 74.01)).toBe(75);
  });

  it("rounds tax income to NEAREST (different legal regime)", () => {
    expect(roundDisabilityPercentage("taxIncome", 89.4)).toBe(89);
    expect(roundDisabilityPercentage("taxIncome", 89.5)).toBe(90);
  });

  it("treats null/undefined as 0", () => {
    expect(roundDisabilityPercentage("generalDisability", null)).toBe(0);
    expect(roundDisabilityPercentage("generalDisability", undefined)).toBe(0);
  });
});

import { describe, it, expect } from "vitest";
import { reg15Ceiling } from "../lib/reg15";

describe("reg15Ceiling — תקנה 15 occupational uplift", () => {
  it("raises by up to half for a degree of 20% or more", () => {
    expect(reg15Ceiling(20)).toBe(30);
    expect(reg15Ceiling(40)).toBe(60);
    expect(reg15Ceiling(66)).toBe(99);
  });

  it("caps a boosted degree at 100%", () => {
    expect(reg15Ceiling(70)).toBe(100); // 70*1.5=105 -> 100
    expect(reg15Ceiling(80)).toBe(100);
  });

  it("caps the result at 19% when the base is under 20%", () => {
    expect(reg15Ceiling(15)).toBe(19); // 15*1.5=22.5 -> 19
    expect(reg15Ceiling(18)).toBe(19);
  });

  it("does not invent an uplift beyond ×1.5 for small bases under the 19% cap", () => {
    expect(reg15Ceiling(10)).toBe(15); // 10*1.5=15, below the 19 cap
  });

  it("handles a zero base", () => {
    expect(reg15Ceiling(0)).toBe(0);
  });
});

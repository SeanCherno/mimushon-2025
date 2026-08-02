import { describe, it, expect } from "vitest";
import diseasesData from "../lib/diseases.json";

// Flatten every disease (top-level and under subcategories) with its context.
function allDiseases() {
  const out = [];
  for (const cat of diseasesData.categories) {
    (cat.diseases || []).forEach((d) => out.push({ disease: d, cat }));
    for (const sub of cat.subcategories || []) {
      (sub.diseases || []).forEach((d) => out.push({ disease: d, cat, sub }));
    }
  }
  return out;
}

const diseases = allDiseases();
const idSet = new Set(diseases.map(({ disease }) => disease.id));

describe("diseases.json integrity", () => {
  it("has diseases to validate", () => {
    expect(diseases.length).toBeGreaterThan(300);
  });

  it("every severityId is unique across the whole dataset", () => {
    const seen = new Map();
    const dupes = [];
    for (const { disease } of diseases) {
      for (const sev of disease.severities || []) {
        if (!sev.severityId) continue;
        if (seen.has(sev.severityId)) dupes.push(sev.severityId);
        seen.set(sev.severityId, true);
      }
    }
    expect(dupes).toEqual([]);
  });

  it("every linked disease id resolves to a real disease", () => {
    const broken = [];
    for (const { disease } of diseases) {
      for (const sev of disease.severities || []) {
        const links = Array.isArray(sev.linkedDiseaseIds)
          ? sev.linkedDiseaseIds
          : sev.linkedDiseaseId
            ? [sev.linkedDiseaseId]
            : [];
        for (const l of links) if (!idSet.has(l)) broken.push(`${disease.id}->${l}`);
      }
    }
    expect(broken).toEqual([]);
  });

  it("every disease has at least one severity", () => {
    const empty = diseases
      .filter(({ disease }) => !Array.isArray(disease.severities) || disease.severities.length === 0)
      .map(({ disease }) => disease.id);
    expect(empty).toEqual([]);
  });

  it("all severity percentages are numbers within 0–100", () => {
    const bad = [];
    for (const { disease } of diseases) {
      for (const sev of disease.severities || []) {
        if (sev.percentage == null) continue; // linked/placeholder rows may omit it
        if (typeof sev.percentage !== "number" || sev.percentage < 0 || sev.percentage > 100) {
          bad.push(`${disease.id}:${sev.severityId}=${sev.percentage}`);
        }
      }
    }
    expect(bad).toEqual([]);
  });

  it("capRegion, when present, is arm|leg|eye", () => {
    const bad = diseases
      .filter(({ disease }) => disease.capRegion && !["arm", "leg", "eye"].includes(disease.capRegion))
      .map(({ disease }) => `${disease.id}=${disease.capRegion}`);
    expect(bad).toEqual([]);
  });

  it("capLevel only appears on arm diseases and is 1|2|3", () => {
    const bad = [];
    for (const { disease } of diseases) {
      if (disease.capLevel == null) continue;
      if (disease.capRegion !== "arm") bad.push(`${disease.id} capLevel on non-arm`);
      else if (![1, 2, 3].includes(disease.capLevel)) bad.push(`${disease.id} capLevel=${disease.capLevel}`);
    }
    expect(bad).toEqual([]);
  });

  it("every arm disease has a capLevel (so the ceiling is well-defined)", () => {
    const missing = diseases
      .filter(({ disease }) => disease.capRegion === "arm" && disease.capLevel == null)
      .map(({ disease }) => disease.id);
    expect(missing).toEqual([]);
  });

  it("severity.side, when present, is right|left", () => {
    const bad = [];
    for (const { disease } of diseases) {
      for (const sev of disease.severities || []) {
        if (sev.side && !["right", "left"].includes(sev.side)) {
          bad.push(`${disease.id}:${sev.severityId}=${sev.side}`);
        }
      }
    }
    expect(bad).toEqual([]);
  });
});

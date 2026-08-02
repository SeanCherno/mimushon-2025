// Reg. 15 (נפגעי עבודה): the committee may raise the stable degree by up to HALF
// (×1.5), considering occupation + age, when the person can't return to their
// occupation AND the injury caused a significant, lasting income drop. Caps
// (reg. 15(א)): a base degree under 20% may not exceed 19% after the increase;
// otherwise it may not exceed 100%.

// The most the committee could reach for a given base degree.
export function reg15Ceiling(base) {
  const full = base * 1.5;
  return Math.round(base < 20 ? Math.min(full, 19) : Math.min(full, 100));
}

// Per National Insurance regulation clause 19א ("עיגול דרגות"): a pension-entitling
// disability degree, when fractional, is always rounded UP — not to the nearest
// whole number. That governs generalDisability and specialServices (both NII
// disability benefits). taxIncome is a tax exemption under the Income Tax
// Ordinance, a different legal regime with no rounding rule confirmed here, so
// it keeps standard nearest-rounding.
const ROUND_UP_MODES = new Set(["generalDisability", "specialServices"]);

export function roundDisabilityPercentage(modeId, value) {
  const v = value ?? 0;
  return ROUND_UP_MODES.has(modeId) ? Math.ceil(v) : Math.round(v);
}

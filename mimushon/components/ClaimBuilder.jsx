'use client';

import { useState, useEffect } from "react";
import ImpairmentCard from "./ImpairmentCard";
import ImpairmentPicker from "./ImpairmentPicker";
import CombinationPanel from "./CombinationPanel";
import { roundDisabilityPercentage } from "../lib/percentageRounding";

/* ─────────────────────────────────────────────────────────────────────────────
   ClaimBuilder — the single-surface accretive calculator.

   Mirrors the committee's own determination sequence (National Insurance
   regulations, ch. 2): build a list of impairments → grade each one → watch the
   weighted combination build (reg 12ב) → give active consent → see the full
   result. Claim type is an optional refinement here, not a blocking first gate,
   because it never changes the medical percentage (only which thresholds the
   result explains).

   State ownership: the builder owns pure view state it does not need to persist
   (which claim-type panel is open). The stack, grades, expanded card, picker
   visibility and consent are owned by the parent Calculator so they survive
   navigation and session restore.
───────────────────────────────────────────────────────────────────────────── */

const CLAIM_TYPES = [
  { id: "illness", label: "מחלה", icon: "🩺" },
  { id: "work_accident", label: "תאונת עבודה", icon: "🏗️" },
  { id: "idf_disabled", label: 'נכה צה"ל', icon: "🎗️" },
  { id: "other", label: "אחר / כללי", icon: "📋" },
];

export default function ClaimBuilder({
  categories,
  chosenDiseasesWithSeverities,
  calcData,
  isFetchingCalc,
  claimType,
  onClaimTypeSelect,
  workAccidentAnswers,
  onWorkAccidentComplete,
  expandedId,
  onToggleCard,
  isPickerOpen,
  onOpenPicker,
  onClosePicker,
  consent,
  onConsentChange,
  onDiseaseSelect,
  onSeverityChange,
  onRemoveDisease,
  onNavigateToLinkedDisease,
  onCommonConditionClick,
  onCategorySelected,
  onCalculate,
  onStartOver,
}) {
  const [mobileSheetOpen, setMobileSheetOpen] = useState(false);

  const hasImpairments = chosenDiseasesWithSeverities.length > 0;
  const gradedEntries = chosenDiseasesWithSeverities.filter((e) => e.selectedSeverity);
  const gradedCount = gradedEntries.length;
  const ungradedCount = chosenDiseasesWithSeverities.length - gradedCount;
  const chosenIds = new Set(chosenDiseasesWithSeverities.map((e) => e.disease.id));

  const breakdown = calcData?.breakdown ?? [];
  const total = calcData?.newTotals?.generalDisability ?? 0;
  const displayTotal = roundDisabilityPercentage("generalDisability", total);

  // Server-resolved per-impairment percentages, keyed by disease id, for chips.
  const pctById = new Map((calcData?.impairments ?? []).map((i) => [i.id, i.percentage]));

  // Close the mobile sheet on Escape (dialog semantics).
  useEffect(() => {
    if (!mobileSheetOpen) return;
    const onKey = (e) => e.key === "Escape" && setMobileSheetOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileSheetOpen]);

  const panel = (
    <CombinationPanel
      breakdown={breakdown}
      total={total}
      gradedCount={gradedCount}
      ungradedCount={ungradedCount}
      isFetching={isFetchingCalc}
      consent={consent}
      onConsentChange={onConsentChange}
      onCalculate={() => {
        setMobileSheetOpen(false);
        onCalculate();
      }}
    />
  );

  return (
    <div dir="rtl">
      <div className="text-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-indigo-800 mb-1">מחשבון אחוזי נכות</h2>
        <p className="text-sm text-gray-500 max-w-xl mx-auto">
          מוסיפים את המחלות והליקויים, בוחרים דרגת חומרה לכל אחד, ורואים את אחוז
          הנכות המשוקלל נבנה שלב-אחר-שלב — בדיוק כפי שהוועדה הרפואית מחשבת אותו.
        </p>
      </div>

      {/* Optional claim-type refinement */}
      <div className="mb-6 bg-white rounded-xl border border-indigo-200 p-4">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-3">
          <span className="text-sm font-semibold text-indigo-800">סוג התביעה</span>
          <span className="text-xs text-gray-500">
            רשות — לא משנה את אחוז הנכות, רק את ההסברים והספים שיוצגו בתוצאה
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {CLAIM_TYPES.map((type) => {
            const active = claimType === type.id;
            return (
              <button
                key={type.id}
                type="button"
                onClick={() => onClaimTypeSelect(active ? null : type.id)}
                aria-pressed={active}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border-2 text-sm font-medium transition ${
                  active
                    ? "border-indigo-600 bg-indigo-600 text-white"
                    : "border-indigo-300 bg-white text-indigo-700 hover:bg-indigo-50 hover:border-indigo-500"
                }`}
              >
                <span aria-hidden="true">{type.icon}</span>
                <span>{type.label}</span>
              </button>
            );
          })}
        </div>

        {claimType === "work_accident" && (
          <p className="mt-3 text-xs text-gray-600 bg-indigo-50 border border-indigo-100 rounded-lg px-3 py-2">
            תחילה מחשבים את אחוז הנכות הרפואי כאן. שאלון דרגת אי-הכושר (המסלול השני
            של גמלת נכות מעבודה) יופיע בתוצאה, לאחר שהאחוז הרפואי חושב — בדיוק בסדר
            שבו הדברים נקבעים בפועל.
          </p>
        )}
      </div>

      {/* Two-column: builder + live rail.
          The rail only appears once at least one impairment has been added — on
          first run the builder takes the full width instead of showing an empty
          "—" panel occupying a third of the screen. */}
      <div className="flex flex-col lg:flex-row-reverse gap-6">
        {/* Live rail (desktop) */}
        {hasImpairments && (
          <aside className="hidden lg:block lg:w-[340px] shrink-0">
            <div className="sticky top-24">{panel}</div>
          </aside>
        )}

        {/* Builder column */}
        <div className="flex-1 min-w-0 space-y-4">
          {/* Impairment stack */}
          {hasImpairments && (
            <div className="space-y-3">
              {chosenDiseasesWithSeverities.map((entry) => (
                <ImpairmentCard
                  key={entry.disease.id}
                  entry={entry}
                  percentage={entry.selectedSeverity ? pctById.get(entry.disease.id) : null}
                  expanded={expandedId === entry.disease.id}
                  onToggle={() => onToggleCard(entry.disease.id)}
                  onRemove={onRemoveDisease}
                  onSeverityChange={onSeverityChange}
                  onNavigateToLinkedDisease={onNavigateToLinkedDisease}
                  chosenDiseasesWithSeverities={chosenDiseasesWithSeverities}
                />
              ))}
            </div>
          )}

          {/* Add-impairment surface */}
          {!hasImpairments || isPickerOpen ? (
            <ImpairmentPicker
              categories={categories}
              onDiseaseSelected={onDiseaseSelect}
              onCommonConditionClick={onCommonConditionClick}
              onCategorySelected={onCategorySelected}
              onClose={onClosePicker}
              chosenIds={chosenIds}
              canClose={hasImpairments}
            />
          ) : (
            <button
              type="button"
              onClick={onOpenPicker}
              className="w-full p-4 bg-white border-2 border-dashed border-indigo-400 rounded-xl text-indigo-700 font-semibold hover:bg-indigo-50 transition flex items-center justify-center gap-2"
            >
              <span className="text-lg leading-none">+</span>
              הוספת מחלה או ליקוי
            </button>
          )}

          {hasImpairments && (
            <div className="flex justify-center pt-1">
              <button
                type="button"
                onClick={onStartOver}
                className="text-sm text-gray-500 hover:text-gray-700 underline"
              >
                איפוס המחשבון
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile sticky summary bar — opens the panel sheet */}
      {gradedCount > 0 && (
        <div className="lg:hidden fixed inset-x-0 bottom-0 z-30 bg-white border-t border-indigo-200 shadow-[0_-4px_12px_rgba(0,0,0,0.06)] px-4 py-3">
          <button
            type="button"
            onClick={() => setMobileSheetOpen(true)}
            className="w-full flex items-center justify-between gap-3 bg-indigo-600 text-white rounded-xl px-4 py-3 hover:bg-indigo-700 transition"
          >
            <span className="flex items-center gap-2 text-sm font-semibold">
              <span>אחוז משוקלל</span>
              <span className="text-xl font-extrabold tabular-nums">~{displayTotal}%</span>
            </span>
            <span className="text-sm font-semibold">הצגת הפירוט והתוצאה ←</span>
          </button>
        </div>
      )}

      {/* Mobile sheet */}
      {mobileSheetOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/50 flex items-end"
          onClick={() => setMobileSheetOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="סיכום החישוב"
            className="w-full max-h-[88vh] overflow-y-auto bg-indigo-50 rounded-t-2xl p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-base font-bold text-indigo-800">סיכום החישוב</h2>
              <button
                type="button"
                onClick={() => setMobileSheetOpen(false)}
                aria-label="סגירה"
                className="p-1 text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {panel}
          </div>
        </div>
      )}

      {/* Spacer so the sticky mobile bar never covers the last control */}
      {gradedCount > 0 && <div className="lg:hidden h-24" aria-hidden="true" />}
    </div>
  );
}

'use client';

import SeverityPicker from "./SeverityPicker";

/* ─────────────────────────────────────────────────────────────────────────────
   ImpairmentCard — one impairment in the accretive builder stack.

   Collapsed: the impairment name, its chosen grade (first line of the severity
   description) and the section percentage as a chip, or an amber "needs a grade"
   prompt when ungraded. Expanded: the full SeverityPicker inline.

   Props:
     entry            — { disease, selectedSeverity }
     percentage       — resolved section % for the chosen grade (server-provided) | null
     expanded         — is this card open
     onToggle()       — open/close this card (accordion behaviour lives in the builder)
     onRemove(id)     — remove this impairment
     onSeverityChange, onNavigateToLinkedDisease — passed to the picker
     chosenDiseasesWithSeverities
───────────────────────────────────────────────────────────────────────────── */

export default function ImpairmentCard({
  entry,
  percentage,
  expanded,
  onToggle,
  onRemove,
  onSeverityChange,
  onNavigateToLinkedDisease,
  chosenDiseasesWithSeverities,
}) {
  const { disease, selectedSeverity } = entry;
  const graded = !!selectedSeverity;
  const gradeLine = graded ? selectedSeverity.description.split("\n")[0] : null;

  return (
    <div
      dir="rtl"
      id={`imp-card-${disease.id}`}
      className={`rounded-xl border bg-white transition-colors ${
        expanded
          ? "border-indigo-400 shadow-sm"
          : graded
            ? "border-indigo-200"
            : "border-amber-300"
      }`}
    >
      {/* Header — click to expand/collapse */}
      <div className="flex items-stretch">
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={expanded}
          className="flex-1 min-w-0 text-right p-4 flex items-start gap-3 rounded-xl hover:bg-indigo-50/50 transition"
        >
          {/* Status dot */}
          <span
            aria-hidden="true"
            className={`mt-1 shrink-0 h-2.5 w-2.5 rounded-full ${graded ? "bg-indigo-500" : "bg-amber-400"}`}
          />
          <span className="flex-1 min-w-0">
            <span className="block font-semibold text-gray-900 truncate">{disease.name}</span>
            {graded ? (
              <span className="block text-sm text-gray-600 mt-0.5 line-clamp-2">{gradeLine}</span>
            ) : (
              <span className="block text-sm font-medium text-amber-700 mt-0.5">
                יש לבחור דרגת חומרה
              </span>
            )}
          </span>

          {/* Percentage chip */}
          {graded && typeof percentage === "number" && (
            <span className="shrink-0 self-center text-sm font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-full px-2.5 py-1 tabular-nums">
              {percentage}%
            </span>
          )}

          {/* Chevron */}
          <svg
            className={`shrink-0 self-center h-5 w-5 text-indigo-400 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Remove */}
        <button
          type="button"
          onClick={() => onRemove(disease.id)}
          title={`הסרת ${disease.name}`}
          aria-label={`הסרת ${disease.name}`}
          className="shrink-0 px-3 flex items-center text-gray-500 hover:text-red-600 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Expanded picker */}
      {expanded && (
        <div className="border-t border-indigo-100 p-4">
          <SeverityPicker
            disease={disease}
            chosenDiseasesWithSeverities={chosenDiseasesWithSeverities}
            onSeverityChange={onSeverityChange}
            onNavigateToLinkedDisease={onNavigateToLinkedDisease}
          />
        </div>
      )}
    </div>
  );
}

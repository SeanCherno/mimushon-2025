'use client';

import { useState } from "react";
import { roundDisabilityPercentage } from "../lib/percentageRounding";

/* ─────────────────────────────────────────────────────────────────────────────
   CombinationPanel — the live "show the work" rail.

   It renders the general-disability degree exactly as the medical committee
   builds it under regulation 12ב(ב): impairments combined highest-first, each
   taking its percentage of the *remaining* earning capacity (הכושר המופחת). The
   running total ticks up as the claimant grades each impairment.

   It also carries the legally-required active consent checkbox and the primary
   "see full result" action — consent must be ticked before the action fires.

   Props:
     breakdown      — ordered steps [{ id, name, percentage, before, runningTotal }]
     total          — raw general-disability total (unrounded)
     gradedCount    — impairments with a grade chosen
     ungradedCount  — impairments added but not yet graded
     isFetching     — a recalculation is in flight (subtle "updating" cue)
     consent        — bool, lifted to the builder
     onConsentChange(bool)
     onCalculate()  — proceed to full results (only called when consent is true)
───────────────────────────────────────────────────────────────────────────── */

const round = (v) => roundDisabilityPercentage("generalDisability", v);

export default function CombinationPanel({
  breakdown = [],
  total = 0,
  gradedCount = 0,
  ungradedCount = 0,
  isFetching = false,
  consent,
  onConsentChange,
  onCalculate,
  capNotices = [],
}) {
  const [shake, setShake] = useState(false);

  const displayTotal = round(total);
  const hasResult = gradedCount > 0;
  // A single impairment isn't "combined" — the weighted-combination framing
  // (and its one-line "base point" breakdown) is noise for that common case.
  const isCombined = breakdown.length >= 2;

  const handleCalculateClick = () => {
    if (!hasResult) return;
    if (!consent) {
      setShake(true);
      setTimeout(() => setShake(false), 700);
      return;
    }
    onCalculate();
  };

  return (
    <div className="bg-indigo-50 rounded-xl border border-indigo-200 p-5" dir="rtl">
      <style>{`
        @keyframes cp-shake {
          0%,100% { transform: translateX(0); }
          20% { transform: translateX(-6px); }
          40% { transform: translateX(6px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
        }
        .cp-shake { animation: cp-shake 0.6s ease; }
        @media (prefers-reduced-motion: reduce) {
          .cp-shake { animation: none; }
        }
      `}</style>

      <div className="flex items-baseline justify-between gap-2 mb-1">
        <h2 className="text-base font-bold text-indigo-800">
          {isCombined ? "אחוז הנכות המשוקלל" : "אחוז הנכות הרפואי"}
        </h2>
        {isFetching && (
          <span className="text-xs text-indigo-500" aria-live="polite">מעדכן…</span>
        )}
      </div>

      {/* Live running estimate */}
      <div className="flex items-end gap-2 mb-1" aria-live="polite">
        <span className="text-5xl font-extrabold text-indigo-700 tabular-nums leading-none">
          {hasResult ? displayTotal : "—"}
        </span>
        {hasResult && <span className="text-2xl font-bold text-indigo-400 mb-0.5">%</span>}
      </div>
      <p className="text-xs text-gray-500 mb-3">
        {hasResult
          ? isCombined
            ? "אומדן משוקלל — מתעדכן בזמן אמת"
            : "אומדן — מתעדכן בזמן אמת"
          : "בחר/י מחלות ודרג/י אותן כדי לראות את החישוב נבנה"}
      </p>

      {/* This is the medical percentage, not the benefit itself. */}
      {hasResult && (
        <p className="text-[11px] text-gray-600 bg-white border border-indigo-100 rounded-lg px-3 py-2 leading-relaxed mb-4">
          זהו <strong className="text-indigo-800">האחוז הרפואי</strong> בלבד. הזכאות
          לקצבה בפועל תלויה גם בספי הזכאות ובדרגת אי-כושר שנקבעת בנפרד — פירוט מלא
          יופיע בתוצאה.
        </p>
      )}

      {/* Reg. 11(ג) same-limb ceiling notice(s) — informational, does not change
          the number above. */}
      {hasResult && capNotices.map((notice, i) => (
        <div key={i} className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mb-4 flex items-start gap-2">
          <span className="text-amber-600 shrink-0 text-xs" aria-hidden="true">⚠️</span>
          <p className="text-[11px] text-amber-900 leading-relaxed">{notice}</p>
        </div>
      ))}

      {/* The worked combination — regulation 12ב, highest impairment first.
          Only shown for 2+ impairments; a single-line "base point" breakdown is
          noise for one impairment. */}
      {isCombined && (
        <div className="bg-white rounded-lg border border-indigo-100 p-3 mb-4">
          <p className="text-xs font-semibold text-indigo-700 mb-1">איך זה מחושב</p>
          <p className="text-[11px] text-gray-600 leading-relaxed mb-2">
            כל מחלה נוספת נספרת רק מתוך אחוזי הבריאות שנותרו — לכן הסכום תמיד קטן
            מחיבור פשוט של האחוזים.
          </p>
          <ol className="space-y-2">
            {breakdown.map((step, i) => {
              const runNow = round(step.runningTotal);
              const runBefore = round(step.before);
              const added = runNow - runBefore;
              const residualBefore = 100 - runBefore;
              return (
                <li key={step.id} className="text-xs">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-gray-700 truncate">{step.name}</span>
                    <span className="shrink-0 font-semibold text-indigo-700 tabular-nums">
                      {step.percentage}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-2 text-[11px] text-gray-500 mt-0.5">
                    <span>
                      {i === 0
                        ? "המחלה החמורה ביותר — נקודת הבסיס"
                        : `${step.percentage}% מתוך ${residualBefore}% הנותרים = +${added}%`}
                    </span>
                    <span className="shrink-0 tabular-nums font-medium text-gray-600">
                      = {runNow}%
                    </span>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      )}

      {/* Partial-result notice */}
      {ungradedCount > 0 && (
        <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mb-4 text-xs text-amber-800">
          <span aria-hidden="true">⚠️</span>
          <span>
            {ungradedCount === 1 ? "מחלה אחת עדיין" : `${ungradedCount} מחלות עדיין`} ללא דרגה —
            האומדן יתעדכן לאחר שתדרג/י אותן.
          </span>
        </div>
      )}

      {/* Committee-discretion + same-organ cap notes (regulations 12ב(ג), 14, 15) */}
      {hasResult && (
        <p className="text-[11px] text-gray-500 leading-relaxed mb-4">
          זהו אומדן. הוועדה רשאית להוסיף עד <strong className="text-gray-600">מחצית</strong> מהדרגה
          לפי גיל ומקצוע (תקנה 15), ומחלה שאינה מופיעה ברשימה מדורגת לפי הדומה לה (תקנה 14).
          {isCombined && " מנגד, כמה ליקויים באותו איבר עשויים להיות מוגבלים לתקרה של אותו איבר — אז המספר בפועל עשוי להיות נמוך יותר."}
        </p>
      )}

      {/* Active consent — legally required, cannot be implicit */}
      <label
        className={`flex items-start gap-2 cursor-pointer select-none rounded-lg p-2 mb-3 transition ${
          shake ? "cp-shake bg-red-50 border border-red-400" : "border border-transparent"
        }`}
      >
        <input
          type="checkbox"
          checked={!!consent}
          onChange={(e) => onConsentChange(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
        />
        <span className="text-xs text-gray-700 leading-relaxed">
          קראתי ואני מסכים/ה ל
          <a className="text-indigo-700 underline" href="/terms" target="_blank" rel="noopener noreferrer">תנאי השימוש</a>
          {" "}ול
          <a className="text-indigo-700 underline" href="/privacy" target="_blank" rel="noopener noreferrer">מדיניות הפרטיות</a>
          . ידוע לי שהמחשבון הוא כלי הערכה בלבד ואינו תחליף לייעוץ מקצועי.
        </span>
      </label>
      {shake && (
        <p className="text-xs text-red-600 font-semibold text-center -mt-1 mb-2">
          יש לאשר את תנאי השימוש כדי להמשיך
        </p>
      )}

      <button
        type="button"
        onClick={handleCalculateClick}
        disabled={!hasResult}
        className="w-full p-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        לצפייה בתוצאה המלאה
      </button>
    </div>
  );
}

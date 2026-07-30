"use client";

import { useState } from "react";

/* ─────────────────────────────────────────────────────────────────────────────
   Reg15Estimator — an interactive estimate of the תקנה 15 occupational uplift
   for work-injury (נפגעי עבודה) claims.

   Reg. 15: the medical committee may raise the stable disability degree by up to
   HALF (×1.5), considering the claimant's occupation and age, but only when it
   finds the person cannot return to their occupation AND the injury caused a
   significant, lasting drop in income (reg. 15(ב)). Caps (reg. 15(א)): if the
   base degree is under 20%, the boosted result may not exceed 19%; otherwise not
   more than 100%. Raising a degree of 20%+ also requires consulting "הרשות"
   (reg. 16א). It is entirely discretionary — this is an estimate, not a ruling.
───────────────────────────────────────────────────────────────────────────── */

// The most the committee could reach for a given base degree, per reg. 15(א).
export function reg15Ceiling(base) {
  const full = base * 1.5;
  return Math.round(base < 20 ? Math.min(full, 19) : Math.min(full, 100));
}

const RETURN_OPTIONS = [
  { id: "same",    label: "כן, חזרתי לעבודתי הקודמת" },
  { id: "adapted", label: "רק לעבודה מותאמת / קלה יותר" },
  { id: "no",      label: "לא, איני מסוגל/ת לחזור לעבודה" },
];

const INCOME_OPTIONS = [
  { id: "yes", label: "כן — ירידה ניכרת ומתמשכת" },
  { id: "no",  label: "לא / ירידה זמנית או קטנה" },
];

function Choice({ name, options, value, onChange }) {
  return (
    <div role="radiogroup" aria-label={name} className="flex flex-col gap-2">
      {options.map((opt) => {
        const active = value === opt.id;
        return (
          <label
            key={opt.id}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg border-2 cursor-pointer transition text-sm ${
              active
                ? "border-indigo-500 bg-indigo-50 text-indigo-900"
                : "border-gray-200 bg-white text-gray-700 hover:border-indigo-300"
            }`}
          >
            <input
              type="radio"
              name={name}
              checked={active}
              onChange={() => onChange(opt.id)}
              className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500 shrink-0"
            />
            <span>{opt.label}</span>
          </label>
        );
      })}
    </div>
  );
}

export default function Reg15Estimator({ basePercentage = 0 }) {
  const [ret, setRet] = useState(null);
  const [incomeDrop, setIncomeDrop] = useState(null);

  if (!basePercentage || basePercentage <= 0) return null;

  const answered = ret !== null && incomeDrop !== null;
  const applicable = answered && ret !== "same" && incomeDrop === "yes";
  const ceiling = reg15Ceiling(basePercentage);
  const partial = ret === "adapted";
  const needsConsultation = basePercentage >= 20;

  return (
    <div className="bg-white rounded-xl border border-indigo-200 shadow-sm p-4" dir="rtl">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-base font-semibold text-indigo-800">⚖️ אומדן תקנה 15 (התאמה תעסוקתית)</span>
      </div>
      <p className="text-xs text-gray-600 mb-4">
        הוועדה רשאית להגדיל את הדרגה הרפואית בעד מחצית, אם הפגיעה מונעת חזרה לעיסוק
        וגרמה לירידה ניכרת ומתמשכת בהכנסה. ענה/י כדי לראות אומדן.
      </p>

      <div className="space-y-4">
        <div>
          <p className="text-sm font-medium text-gray-800 mb-2">האם חזרת לעבודתך או לעיסוקך מלפני הפגיעה?</p>
          <Choice name="חזרה לעבודה" options={RETURN_OPTIONS} value={ret} onChange={setRet} />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-800 mb-2">האם הפגיעה גרמה לירידה ניכרת ומתמשכת בהכנסתך?</p>
          <Choice name="ירידה בהכנסה" options={INCOME_OPTIONS} value={incomeDrop} onChange={setIncomeDrop} />
        </div>
      </div>

      {answered && (
        <div
          className={`mt-4 rounded-lg border p-3 ${
            applicable ? "bg-indigo-50 border-indigo-200" : "bg-gray-50 border-gray-200"
          }`}
          aria-live="polite"
        >
          {applicable ? (
            <>
              <p className="text-sm text-indigo-900 leading-relaxed">
                לפי תשובותיך, ייתכן שתקנה 15 תחול. הוועדה עשויה להעלות את הדרגה מ־
                <strong>{basePercentage}%</strong> עד <strong>~{ceiling}%</strong>
                {partial && " (בעבודה מותאמת ההעלאה נוטה להיות חלקית)"}.
              </p>
              <p className="text-[11px] text-indigo-700 mt-2">
                {basePercentage < 20
                  ? "בדרגה מתחת ל־20%, התוצאה לאחר ההגדלה אינה יכולה לעלות על 19%."
                  : "ההגדלה מוגבלת ל־100%."}
                {needsConsultation && " הגדלת דרגה של 20% ומעלה טעונה התייעצות עם רשות שיקום."}
              </p>
            </>
          ) : (
            <p className="text-sm text-gray-700 leading-relaxed">
              לפי תשובותיך, סביר שתקנה 15 לא תחול, והדרגה צפויה להישאר סביב{" "}
              <strong>{basePercentage}%</strong>.{" "}
              {ret === "same"
                ? "חזרה לעבודה הקודמת בדרך כלל שוללת את ההגדלה."
                : "ללא ירידה ניכרת ומתמשכת בהכנסה, בדרך כלל אין הגדלה."}
            </p>
          )}
          <p className="text-[11px] text-gray-500 mt-2">
            ⚠️ זהו אומדן בלבד. תקנה 15 נתונה לשיקול דעת הוועדה הרפואית, שמתחשבת גם בגיל ובנסיבות.
          </p>
        </div>
      )}
    </div>
  );
}

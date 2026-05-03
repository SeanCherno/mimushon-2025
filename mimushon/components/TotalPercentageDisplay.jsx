import Link from "next/link";
import Tooltip from "./content/Tooltip";

const getExplanation = (modeId, percentage) => {
  if (modeId === "generalDisability") {
    if (percentage === 0) return "לא נמצאה נכות כללית במחלות שנבחרו.";
    if (percentage <= 24) return "אחוזי הנכות נמוכים. ייתכן שתהיה זכאי/ת להטבות קלות. מומלץ לפנות לייעוץ.";
    if (percentage <= 49) return "אחוזי נכות בינוניים. ייתכן שתהיה זכאי/ת לקצבת נכות בסיסית מביטוח לאומי.";
    if (percentage <= 74) return "אחוזי נכות משמעותיים. סביר שתהיה זכאי/ת לקצבת נכות גבוהה יותר מביטוח לאומי.";
    if (percentage <= 89) return "אחוזי נכות גבוהים מאוד. צפויה זכאות לקצבת נכות מקסימלית ועוד הטבות נוספות.";
    return "אחוזי נכות קיצוניים. צפויה זכאות לקצבה המקסימלית וייתכן פטור ממס הכנסה.";
  }
  if (modeId === "taxIncome") {
    if (percentage <= 89) return "עם אחוזים אלו, בדרך כלל אין פטור מלא ממס הכנסה. ייתכנו נקודות זיכוי.";
    return "עם 90% ומעלה, ייתכן שתהיה זכאי/ת לפטור מלא ממס הכנסה על הכנסה מעבודה (עד תקרה שנתית). מומלץ לבדוק עם רואה חשבון.";
  }
  if (modeId === "specialServices") {
    if (percentage === 0) return "לא נמצאה זכאות לשירותים מיוחדים במחלות שנבחרו.";
    return "ייתכן שתהיה זכאי/ת לקצבת שירותים מיוחדים — סיוע כספי לתשלום עבור מטפל/ת אישי/ת.";
  }
  return "";
};

const getModeBarColor = (modeId, percentage) => {
  if (modeId === "generalDisability") {
    if (percentage === 0) return "bg-gray-300";
    if (percentage <= 24) return "bg-blue-400";
    if (percentage <= 49) return "bg-yellow-400";
    if (percentage <= 74) return "bg-orange-400";
    return "bg-red-500";
  }
  if (modeId === "taxIncome") {
    return percentage >= 90 ? "bg-green-500" : "bg-blue-400";
  }
  if (modeId === "specialServices") {
    return percentage === 0 ? "bg-gray-300" : "bg-purple-500";
  }
  return "bg-indigo-400";
};

const WHAT_NOW_LINKS = [
  {
    href: "/articles/how-to-file-claim",
    icon: "📝",
    title: "כיצד מגישים תביעה לביטוח לאומי?",
    desc: "מדריך שלב-אחר-שלב להגשת תביעת נכות",
  },
  {
    href: "/articles/disability-percentage-appeal",
    icon: "⚖️",
    title: "ערעור על אחוזי נכות",
    desc: "מה עושים אם ההחלטה לא משקפת את מצבך",
  },
  {
    href: "/articles/about-book-of-impairments",
    icon: "📖",
    title: "ספר הליקויים",
    desc: "הבסיס החוקי לקביעת אחוזי הנכות",
  },
];

const TotalPercentageDisplay = ({ setCurrentScreen, modes, totalPercentages, chosenDiseasesWithSeverities, onStartOver }) => {
  const allRequiredDocuments = chosenDiseasesWithSeverities.flatMap(entry => entry.disease.requiredDocuments || []);
  const uniqueDocuments = [...new Set(allRequiredDocuments)];

  return (
    <>
      {/* ── Print styles ────────────────────────────────────────────────────── */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { margin: 1cm; size: auto; }
          html, body { height: auto !important; overflow: visible !important; }
          header, footer, nav, .no-print { display: none !important; }
          body * { visibility: hidden; }
          .print-area, .print-area * { visibility: visible; }
          .print-area {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            padding: 16px;
          }
        }
      ` }} />

      <div className="print-area space-y-6" id="total-percentage">

        {/* ── Results header ───────────────────────────────────────────────── */}
        <div className="text-center pb-2 border-b border-indigo-200">
          <div className="flex justify-center items-center gap-3 mb-1">
            <span className="text-4xl">✅</span>
            <h2 className="text-2xl font-bold text-indigo-800">תוצאות החישוב שלך</h2>
          </div>
          <p className="text-sm text-gray-500">להלן הערכת אחוזי הנכות על פי המחלות והחומרות שנבחרו</p>
        </div>

        {/* ── Mobile disease summary (hidden on desktop — sidebar covers it) ── */}
        <div className="md:hidden bg-white rounded-xl border border-indigo-200 shadow-sm p-4">
          <h3 className="text-sm font-semibold text-indigo-700 mb-3 flex items-center gap-2">
            <span>🩺</span> מחלות שנבחרו
          </h3>
          <ul className="space-y-2">
            {chosenDiseasesWithSeverities.map((entry) => (
              <li key={entry.disease.id} className="flex justify-between items-start gap-2 text-sm">
                <span className="font-medium text-gray-800">{entry.disease.name}</span>
                {entry.selectedSeverity && (
                  <span className="shrink-0 text-xs text-indigo-600 bg-indigo-50 border border-indigo-200 rounded-full px-2 py-0.5">
                    {entry.selectedSeverity.percentage}%
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* ── Mode cards ───────────────────────────────────────────────────── */}
        <div className="space-y-4">
          {modes.map(mode => {
            const pct = Math.round(totalPercentages.newTotals?.[mode.id] ?? 0);
            const barColor = getModeBarColor(mode.id, pct);
            const explanation = getExplanation(mode.id, pct);

            return (
              <div key={mode.id} className="bg-white rounded-xl border border-indigo-200 shadow-sm p-4">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-base font-semibold text-indigo-700">{mode.name}</span>
                    <Tooltip content={mode.content} />
                  </div>
                  <span className="text-3xl font-extrabold text-indigo-700">{pct}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3 mb-3 overflow-hidden">
                  <div
                    className={`h-3 rounded-full transition-all duration-500 ${barColor}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <p className="text-sm text-gray-700 bg-indigo-50 rounded-lg px-3 py-2 border border-indigo-100">
                  {explanation}
                </p>
              </div>
            );
          })}
        </div>

        {/* ── Disclaimer ───────────────────────────────────────────────────── */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-3">
          <p className="text-xs text-yellow-800 font-medium">
            ⚠️ המחשבון הינו כלי להערכה בלבד, ואינו מהווה גורם מוסמך לקביעת אחוזי נכות. לקביעה רשמית יש לפנות לרופא מוסמך ו/או לביטוח לאומי.
          </p>
        </div>

        {/* ── Action buttons ───────────────────────────────────────────────── */}
        <div className="no-print flex flex-wrap gap-3 justify-center">
          <button
            onClick={() => setCurrentScreen("diseaseSelection")}
            className="px-5 py-2.5 bg-white text-indigo-700 border-2 border-indigo-400 rounded-lg font-semibold hover:bg-indigo-50 transition"
          >
            הוסף מחלה
          </button>
          <button
            onClick={() => window.print()}
            className="px-5 py-2.5 bg-indigo-100 text-indigo-800 border border-indigo-300 rounded-lg font-semibold hover:bg-indigo-200 transition"
          >
            🖨️ הדפס / שמור PDF
          </button>
          <button
            onClick={onStartOver}
            className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            התחל מחדש
          </button>
        </div>

        {/* ── Required documents ───────────────────────────────────────────── */}
        {uniqueDocuments.length > 0 && (
          <div className="bg-white rounded-xl border border-indigo-200 shadow-sm p-4">
            <h3 className="text-base font-semibold text-indigo-700 mb-3 flex items-center gap-2">
              <span>📋</span> מסמכים נדרשים עבור המחלות שנבחרו
            </h3>
            <ul className="space-y-1">
              {uniqueDocuments.map((doc, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-indigo-400 mt-0.5">•</span>
                  <span>{doc}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* ── What now? ────────────────────────────────────────────────────── */}
        <div className="no-print bg-indigo-50 rounded-xl border border-indigo-200 p-4">
          <h3 className="text-base font-bold text-indigo-800 mb-3 flex items-center gap-2">
            <span>🚀</span> מה עושים עכשיו?
          </h3>
          <div className="space-y-3">
            {WHAT_NOW_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-start gap-3 p-3 bg-white rounded-lg border border-indigo-200 hover:bg-indigo-100 hover:border-indigo-400 transition group"
              >
                <span className="text-2xl shrink-0">{link.icon}</span>
                <div>
                  <p className="text-sm font-semibold text-indigo-700 group-hover:text-indigo-900">
                    {link.title}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">{link.desc}</p>
                </div>
                <span className="mr-auto text-indigo-400 group-hover:text-indigo-600 self-center text-lg">←</span>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </>
  );
};

export default TotalPercentageDisplay;

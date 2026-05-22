import Link from "next/link";
import Tooltip from "./content/Tooltip";
import ContactForm from "./content/ContactForm";
import IncapacityQuestionnaire from "./IncapacityQuestionnaire";

const getExplanation = (modeId, percentage, chosenDiseasesWithSeverities) => {
  if (modeId === "generalDisability") {
    if (percentage === 0) return "לא נמצאה נכות כללית במחלות שנבחרו.";
    if (percentage <= 24) return "אחוזי הנכות נמוכים. הסף המינימלי לקצבת נכות כללית הוא 40% — בטווח זה אין עדיין בסיס לקצבה. ייתכן זכאות להטבות אחרות — מומלץ לפנות לייעוץ.";
    if (percentage <= 39) return "אחוזי הנכות עדיין מתחת לסף המינימלי של 40% הנדרש לקצבת נכות כללית. ייתכן זכאות לנקודות זיכוי במס הכנסה — מומלץ לבדוק עם רואה חשבון.";
    if (percentage <= 59) {
      // The 40% threshold applies when there is a single impairment of ≥25%.
      // The general threshold (without a qualifying single impairment) is 60%.
      const hasHighSingleImpairment = chosenDiseasesWithSeverities?.some(
        e => (e.selectedSeverity?.percentage ?? 0) >= 25
      );
      if (hasHighSingleImpairment) {
        return "הגעת לסף של 40% הנדרש לקצבת נכות כללית (בשל ליקוי בודד של 25% ומעלה). זכאות בפועל תלויה גם בדרגת אי-כושר של 50% ומעלה, שנקבעת בנפרד על ידי ביטוח לאומי.";
      }
      return `אחוזי הנכות עדיין מתחת לסף הכללי של 60% הנדרש לקצבה ללא ליקוי בודד מוגדר. אם אחד הליקויים עומד על 25% ומעלה — הסף יורד ל-40%. מומלץ לבדוק עם יועץ נכות.`;
    }
    if (percentage <= 74) return "עברת את הסף הרפואי לקצבת נכות כללית. שלב הבא: ביטוח לאומי קובע את דרגת אי-הכושר — מדד נפרד שבוחן עד כמה הנכות פוגעת ביכולת ההשתכרות. דרגת אי-הכושר (60%–100%) היא שקובעת את גובה הקצבה בפועל.";
    if (percentage <= 89) return "אחוזי נכות גבוהים — עברת את הסף הרפואי בבירור. שלב הבא: ביטוח לאומי קובע את דרגת אי-הכושר בנפרד, לפי השפעת הנכות על יכולת ההשתכרות. היא תקבע אם תקבל 60%, 65%, 74% או 100% — וזה שקובע את סכום הקצבה.";
    return "אחוזי נכות גבוהים מאוד — עברת את הסף הרפואי. שלב הבא: ביטוח לאומי קובע את דרגת אי-הכושר בנפרד, לפי השפעת הנכות על יכולת ההשתכרות. היא תקבע אם תקבל 60%, 65%, 74% או 100% — וזה שקובע את סכום הקצבה.";
  }
  if (modeId === "taxIncome") {
    if (percentage <= 89) return "עם אחוזים אלו, בדרך כלל אין פטור מלא ממס הכנסה. ייתכנו נקודות זיכוי — מומלץ לבדוק עם רואה חשבון. לפטור ממס לא נדרשת דרגת אי-כושר — האחוזים הרפואיים בלבד קובעים.";
    return "עם 90% ומעלה, ייתכן שתהיה זכאי/ת לפטור מלא ממס הכנסה על הכנסה מעבודה (עד תקרה שנתית). לפטור זה לא נדרשת דרגת אי-כושר — האחוזים הרפואיים בלבד קובעים. מומלץ לבדוק עם רואה חשבון.";
  }
  if (modeId === "specialServices") {
    if (percentage === 0) return "לא נמצאה זכאות לשירותים מיוחדים במחלות שנבחרו.";
    if (percentage < 60) return `נמצאה נכות רלוונטית לשירותים מיוחדים (${percentage}%), אך זהו מתחת לסף של 60% הנדרש למי שמקבל קצבת נכות כללית, ומתחת ל-75% הנדרש למי שאינו מקבל קצבה כזו.`;
    if (percentage < 75) return "אתה/את עשוי/ה לעמוד בסף לשירותים מיוחדים — אם אתה/את כבר מקבל/ת קצבת נכות כללית, הסף הוא 60%. אם לא — הסף הוא 75%. בנוסף לאחוזי הנכות, ביטוח לאומי בוחן מידת התלות בעזרת הזולת בפעולות היומיום (ADL). מומלץ לתעד את הצורך בעזרה.";
    return "אחוזי הנכות עוברים את סף ה-75% — עשוי/ה להיות זכאי/ת לשירותים מיוחדים גם ללא קצבת נכות כללית. הזכאות מותנית גם במבחן תלות בפעולות היומיום (ADL) שנקבע על ידי ביטוח לאומי.";
  }
  return "";
};

const getModeBarColor = () => "bg-indigo-500";

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

/* ── Work-accident personalised result ──────────────────────────────────────
   Combines the questionnaire answers with the calculated percentage to produce
   a single actionable card shown only for תאונת עבודה users.
─────────────────────────────────────────────────────────────────────────── */
function getWorkAccidentResult(answers, pct) {
  const { recognized, reported, aggravating } = answers ?? {};
  const hasAggravating = aggravating === 'yes' || aggravating === 'maybe';

  // ── Percentage tier ──────────────────────────────────────────────────────
  let pctLabel, pctColor;
  if (pct >= 20) {
    pctLabel = `${pct}% — מעל הסף (20%): זכאות אפשרית לקצבת נכות מעבודה חודשית`;
    pctColor = 'green';
  } else if (pct >= 9) {
    pctLabel = `${pct}% — בטווח המענק (9%–19.9%): זכאות אפשרית למענק חד-פעמי`;
    pctColor = 'yellow';
  } else {
    pctLabel = `${pct}% — מתחת לסף המינימלי (9%): לא נמצאה זכאות`;
    pctColor = 'gray';
  }

  // ── Status-based main message ────────────────────────────────────────────
  let title, body, actions, level;

  // User skipped the questionnaire — show generic percentage-based guidance
  if (!recognized) {
    level   = pct >= 20 ? 'success' : pct >= 9 ? 'info' : 'gray';
    title   = pct >= 20
      ? `האחוזים (${pct}%) עוברים את סף הזכאות לקצבת נכות מעבודה`
      : pct >= 9
      ? `האחוזים (${pct}%) בטווח הזכאות למענק חד-פעמי`
      : `האחוזים (${pct}%) מתחת לסף המינימלי`;
    body    = pct >= 20
      ? 'לקצבת נכות מעבודה חודשית הסף הוא 20% בלבד — ללא צורך בדרגת אי-כושר. מומלץ לוודא שהפגיעה הוכרה על ידי ביטוח לאומי ולפנות לייעוץ.'
      : pct >= 9
      ? 'בטווח 9%–19.9% ניתן מענק חד-פעמי במקום קצבה חודשית. מומלץ לוודא שהפגיעה הוכרה ולפנות לייעוץ.'
      : 'האחוזים מתחת לסף המינימלי של 9%. מומלץ לבחון עם מומחה האם ניתן לשפר את הזכאות.';
    actions = ['פנה/י לייעוץ משפטי לבחינת זכאותך', 'וודא/י שהפגיעה הוכרה רשמית על ידי ביטוח לאומי'];
    return { title, body, actions, level, pctLabel, pctColor, hasAggravating, pct };
  }

  if (recognized === 'rejected') {
    level   = 'urgent';
    title   = 'הפגיעה נדחתה — כדאי לבחון ערעור';
    body    = `ביטוח לאומי דחה את הפגיעה, אך ועדות ערר מקבלות כשליש מהערעורים. על פי חישוב המחשבון אחוזי הנכות עשויים להגיע ל-${pct}%${pct >= 9 ? ', מה שעשוי להצדיק ערעור' : ''}.`;
    actions = ['פנה/י לייעוץ משפטי בהקדם', 'אסוף/י מסמכים רפואיים + ניירת עבודה לערעור'];
  } else if (recognized === 'not_filed' || reported === 'no' || reported === 'unknown') {
    level   = 'action';
    title   = 'טרם הוגשה תביעה — יש לפעול בהקדם';
    body    = pct >= 9
      ? `על פי החישוב ייתכן שתהיה זכאי/ת ל${pct >= 20 ? 'קצבת נכות מעבודה חודשית' : 'מענק חד-פעמי'} (${pct}%). שים/י לב: ישנה התיישנות של 12 חודשים מיום התאונה.`
      : `על פי החישוב האחוזים עומדים על ${pct}% — מתחת לסף הזכאות (9%). מומלץ לבחון עם מומחה האם ניתן לתבוע.`;
    actions = ['הגש/י תביעה לנכות מעבודה (טופס ב-200)', 'אסוף/י: דוח תאונה, מסמכים רפואיים, עדויות'];
  } else if (recognized === 'in_process') {
    level   = 'info';
    title   = 'הפגיעה בתהליך הכרה';
    body    = `על פי החישוב אחוזי הנכות עשויים להגיע ל-${pct}%. ${pct >= 20 ? 'אם הפגיעה תוכר — ייתכן שתהיה זכאי/ת לקצבה חודשית.' : pct >= 9 ? 'אם הפגיעה תוכר — ייתכן שתהיה זכאי/ת למענק חד-פעמי.' : 'האחוזים מתחת לסף הזכאות של 9%.'}`;
    actions = ['המתן/י להחלטת ביטוח לאומי', 'אם תחלוף שנה ללא תשובה — פנה/י לייעוץ'];
  } else {
    // recognized === 'yes'
    level   = pct >= 20 ? 'success' : pct >= 9 ? 'info' : 'gray';
    title   = pct >= 20
      ? 'פגיעה מוכרת — אחוזי הנכות עוברים את הסף (20%)'
      : pct >= 9
      ? 'פגיעה מוכרת — אחוזי הנכות בטווח המענק (9%–19.9%)'
      : 'פגיעה מוכרת — אחוזי הנכות מתחת לסף (9%)';
    body    = pct >= 20
      ? `האחוזים שחושבו (${pct}%) עוברים את הסף של 20% הנדרש לקצבת נכות מעבודה חודשית — ללא צורך בדרגת אי-כושר. גובה הקצבה נקבע לפי אחוז הנכות.`
      : pct >= 9
      ? `האחוזים שחושבו (${pct}%) נמצאים בטווח שמזכה במענק חד-פעמי (9%–19.9%), ולא בקצבה חודשית שוטפת.`
      : `האחוזים שחושבו (${pct}%) מתחת לסף המינימלי של 9% הנדרש לכל זכאות. מומלץ לבחון עם מומחה האם ניתן לשפר.`;
    actions = pct >= 9
      ? ['וודא/י שהאחוזים שנקבעו תואמים את ספר הליקויים', 'פנה/י לייעוץ משפטי לוודא שקיבלת את מלוא הזכאות']
      : ['בחן/י עם מומחה האם ניתן לתבוע לפי מסלול אחר'];
  }

  return { title, body, actions, level, pctLabel, pctColor, hasAggravating, pct };
}

const LEVEL_STYLES = {
  urgent:  { bg: 'bg-red-50',    border: 'border-red-300',    icon: '🚨', titleColor: 'text-red-800'    },
  action:  { bg: 'bg-orange-50', border: 'border-orange-300', icon: '⚡', titleColor: 'text-orange-800' },
  info:    { bg: 'bg-blue-50',   border: 'border-blue-300',   icon: 'ℹ️', titleColor: 'text-blue-800'   },
  success: { bg: 'bg-green-50',  border: 'border-green-300',  icon: '✅', titleColor: 'text-green-800'  },
  gray:    { bg: 'bg-gray-50',   border: 'border-gray-300',   icon: '📋', titleColor: 'text-gray-700'   },
};

const TotalPercentageDisplay = ({ setCurrentScreen, modes, totalPercentages, chosenDiseasesWithSeverities, onStartOver, claimType, workAccidentAnswers }) => {
  const isWorkAccident = claimType === 'work_accident';
  const allRequiredDocuments = chosenDiseasesWithSeverities.flatMap(entry => entry.disease.requiredDocuments || []);
  const uniqueDocuments = [...new Set(allRequiredDocuments)];

  return (
    <>
      {/* ── Print styles ────────────────────────────────────────────────────── */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @media print {
          @page { margin: 1.5cm; size: A4; }
          header, footer, nav, .no-print { display: none !important; }
          .print-area { padding: 0; font-family: Arial, sans-serif; }
          .print-header { display: block !important; }
          body { font-size: 12px; color: #111; }
          .print-area .space-y-6 > * { margin-bottom: 12px; }
          .rounded-xl, .rounded-lg { border-radius: 6px; }
          .shadow-sm { box-shadow: none; }
          .bg-indigo-50, .bg-indigo-700 { background: #f8f9ff !important; color: #111 !important; }
          .text-indigo-700, .text-indigo-800 { color: #3730a3 !important; }
          .border-indigo-200 { border-color: #c7d2fe !important; }
          h2, h3 { color: #1e1b4b; }
          .print-disease-row { display: flex; justify-content: space-between; padding: 4px 0; border-bottom: 1px solid #e5e7eb; font-size: 11px; }
        }
        .print-header { display: none; }
      ` }} />

      <div className="print-area space-y-3" id="total-percentage">

        {/* ── Print-only header (hidden on screen) ─────────────────────────── */}
        <div className="print-header" style={{ marginBottom: '16px', borderBottom: '2px solid #3730a3', paddingBottom: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e1b4b', margin: 0 }}>מימושון — מחשבון אחוזי נכות</div>
              <div style={{ fontSize: '11px', color: '#6b7280', marginTop: '2px' }}>mimushon.co.il</div>
            </div>
            <div style={{ fontSize: '11px', color: '#6b7280', textAlign: 'left' }}>
              תאריך הפקה: {new Date().toLocaleDateString('he-IL')}
            </div>
          </div>
          <div style={{ marginTop: '12px' }}>
            <div style={{ fontSize: '12px', fontWeight: '600', color: '#1e1b4b', marginBottom: '6px' }}>מחלות שנבחרו:</div>
            {chosenDiseasesWithSeverities.map(entry => (
              <div key={entry.disease.id} className="print-disease-row">
                <span>{entry.disease.name}</span>
                <span>{entry.selectedSeverity?.percentage ?? 0}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Results header ───────────────────────────────────────────────── */}
        <div className="text-center pb-2 border-b border-indigo-200">
          <div className="flex justify-center items-center gap-3 mb-1">
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
            const barColor = getModeBarColor();
            const explanation = getExplanation(mode.id, pct, chosenDiseasesWithSeverities);

            return (
              <div key={mode.id}>
                <div className="bg-white rounded-xl border border-indigo-200 shadow-sm p-4">
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

                {/* ── Incapacity questionnaire — general disability only, not for work accidents ── */}
                {mode.id === 'generalDisability' && !isWorkAccident && (
                  <div className="mt-3 mr-4 border-r-2 border-indigo-200 pr-3">
                    <IncapacityQuestionnaire />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ── Work accident block ──────────────────────────────────────── */}
        {isWorkAccident ? (() => {
          const waResult = getWorkAccidentResult(
            workAccidentAnswers,
            Math.round(totalPercentages?.newTotals?.generalDisability ?? 0)
          );
          const s = LEVEL_STYLES[waResult.level] ?? LEVEL_STYLES.info;
          const pctBadgeColor = waResult.pctColor === 'green'
            ? 'bg-green-100 text-green-800 border-green-200'
            : waResult.pctColor === 'yellow'
            ? 'bg-yellow-100 text-yellow-800 border-yellow-200'
            : 'bg-gray-100 text-gray-700 border-gray-200';

          return (
            <div className={`rounded-xl border-2 shadow-sm p-4 ${s.bg} ${s.border}`}>
              {/* Title */}
              <div className="flex items-start gap-3 mb-3">
                <span className="text-2xl shrink-0">{s.icon}</span>
                <div>
                  <p className={`font-bold text-base ${s.titleColor}`}>
                    💼 תאונת עבודה — {waResult.title}
                  </p>
                </div>
              </div>

              {/* Percentage tier badge */}
              <div className={`inline-flex items-center gap-2 text-xs font-semibold rounded-lg px-3 py-1.5 border mb-3 ${pctBadgeColor}`}>
                {waResult.pctLabel}
              </div>

              {/* Body */}
              <p className="text-sm text-gray-700 leading-relaxed mb-4">{waResult.body}</p>

              {/* Regulation 15 callout */}
              {waResult.hasAggravating && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mb-4 text-sm text-amber-800">
                  <strong>⚖️ תקנה 15 עשויה להיות רלוונטית:</strong> ציינת נסיבות עבודה מחמירות. תקנה 15 מאפשרת לוועדה להוסיף עד 50% לאחוזי הנכות — מומלץ לדון בזה עם עורך דין לפני הגשת התביעה.
                </div>
              )}

              {/* Actions */}
              {waResult.actions.length > 0 && (
                <div className="mb-3">
                  <p className="text-xs font-semibold text-gray-600 mb-2">פעולות מומלצות:</p>
                  <ul className="space-y-1.5">
                    {waResult.actions.map((a, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="text-amber-500 mt-0.5 shrink-0">✓</span>
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg px-3 py-2 text-xs text-yellow-800">
                ⚠️ זהו אומדן בלבד — לא קביעה רשמית. תאונות עבודה הן תחום מורכב; מומלץ מאוד לפנות לייעוץ משפטי מקצועי.
              </div>
            </div>
          );
        })() : (
          /* ── Brief work-injury hint for non-work-accident users ──────── */
          <div className="bg-white rounded-xl border border-amber-200 shadow-sm p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-base font-semibold text-amber-700">💼 האם הנכות קשורה לתאונת עבודה?</span>
            </div>
            <p className="text-sm text-gray-700 bg-amber-50 rounded-lg px-3 py-2 border border-amber-100">
              פגיעה בעבודה נבחנת במסלול נפרד לחלוטין מנכות כללית — הסף הוא <strong>20% בלבד</strong> (ללא צורך בדרגת אי-כושר), ותקנה 15 עשויה להוסיף עד 50%. אם הפגיעה שלך קשורה לעבודה — מומלץ מאוד לפנות לייעוץ משפטי נפרד.
            </p>
          </div>
        )}

        {/* ── Disclaimer ───────────────────────────────────────────────────── */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-3">
          <p className="text-xs text-yellow-800 font-medium">
            ⚠️ המחשבון הינו כלי להערכה בלבד, ואינו מהווה גורם מוסמך לקביעת אחוזי נכות. לקביעה רשמית יש לפנות לרופא מוסמך ו/או לביטוח לאומי.
          </p>
        </div>

        {/* ── Action buttons ───────────────────────────────────────────────── */}
        <div className="no-print grid grid-cols-1 sm:grid-cols-4 gap-3">
          <button
            onClick={() => setCurrentScreen("diseaseSelection")}
            className="w-full py-2.5 bg-white text-indigo-700 border-2 border-indigo-400 rounded-lg font-semibold hover:bg-indigo-50 transition"
          >
            הוסף מחלה
          </button>
          <button
            onClick={() => window.print()}
            className="w-full py-2.5 bg-indigo-100 text-indigo-800 border border-indigo-300 rounded-lg font-semibold hover:bg-indigo-200 transition"
          >
            🖨️ הדפס
          </button>
          <button
            onClick={() => window.print()}
            className="w-full py-2.5 bg-indigo-100 text-indigo-800 border border-indigo-300 rounded-lg font-semibold hover:bg-indigo-200 transition"
          >
            💾 שמור כ-PDF
          </button>
          <button
            onClick={onStartOver}
            className="w-full py-2.5 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
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

        {/* ── CTA + Lead form ──────────────────────────────────────────────── */}
        <div className="no-print bg-indigo-700 rounded-xl p-6 text-white">
          <div className="text-center mb-5">
            <h3 className="text-xl font-bold mb-2">רוצה לדעת אם מגיע לך יותר?</h3>
            <p className="text-indigo-200 text-sm">
              עורך דין מומחה לנכות יבחן את המקרה שלך ללא עלות וללא התחייבות — ויגיד לך בדיוק היכן אתה עומד.
            </p>
            <div className="flex justify-center gap-4 mt-3 text-xs text-indigo-200">
              <span>ייעוץ חינמי</span>
              <span>ללא התחייבות</span>
              <span>מומחים בליווי</span>
            </div>
          </div>
          <div className="bg-white rounded-xl p-5">
            <ContactForm variant="compact" percentages={totalPercentages?.newTotals} claimType={claimType} />
          </div>
        </div>

        {/* ── Process timeline ─────────────────────────────────────────────── */}
        <div className="no-print bg-white rounded-xl border border-indigo-200 shadow-sm p-4">
          <h3 className="text-base font-bold text-indigo-800 mb-4 flex items-center gap-2">
            <span>🗓️</span> ציר הזמן הצפוי — מהמחשבון ועד לקצבה
          </h3>
          <div className="space-y-3">
            {[
              {
                step: 1,
                title: 'הגשת תביעה לביטוח לאומי',
                time: 'מיידי',
                desc: 'מגישים טופס תביעה לנכות כללית (ב-250) עם כל המסמכים הרפואיים. ניתן גם להגיש אונליין.',
              },
              {
                step: 2,
                title: 'זימון לוועדה הרפואית',
                time: '1–3 חודשים',
                desc: 'ביטוח לאומי בוחן את הבקשה ומשבץ לוועדה. בדחיפות רפואית ניתן לבקש זירוז.',
              },
              {
                step: 3,
                title: 'ישיבת הוועדה הרפואית',
                time: '10–30 דקות',
                desc: 'הרופא בוועדה בוחן מסמכים ומבצע בדיקה קצרה. ההחלטה על אחוזי הנכות מגיעה בדואר תוך כמה שבועות.',
              },
              {
                step: 4,
                title: 'קביעת דרגת אי-כושר',
                time: '2–4 שבועות',
                desc: 'פקיד תביעות קובע (לנכות כללית) עד כמה הנכות פוגעת ביכולת ההשתכרות. זה קובע את גובה הקצבה בפועל.',
              },
              {
                step: 5,
                title: 'אישור קצבה ותשלום ראשון',
                time: '2–4 שבועות',
                desc: 'לאחר אישור הזכאות, הקצבה מתחילה להשתלם. ייתכן תשלום רטרואקטיבי ממועד הגשת התביעה.',
              },
            ].map(({ step, title, time, desc }) => (
              <div key={step} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-indigo-600 text-white text-sm font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {step}
                </div>
                <div className="flex-1 bg-indigo-50 rounded-lg p-3 border border-indigo-100">
                  <div className="flex flex-wrap justify-between items-start gap-2 mb-1">
                    <span className="text-sm font-semibold text-indigo-800">{title}</span>
                    <span className="text-xs bg-indigo-100 text-indigo-700 rounded-full px-2 py-0.5 shrink-0 border border-indigo-200">{time}</span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-3 text-center">* הזמנים הם הערכה בלבד ועשויים להשתנות לפי עומס ביטוח לאומי ומורכבות המקרה</p>
        </div>

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

'use client';
import { useState } from 'react';

/* ─────────────────────────────────────────────────────────────────────────────
   INCAPACITY DEGREE QUESTIONNAIRE
   Based on NII (ביטוח לאומי) criteria for determining דרגת אי-כושר.

   Factors evaluated by the claims officer + rehabilitation worker:
   • Ability to return to previous occupation (primary factor)
   • Ability to work in any alternative occupation
   • Age (affects retraining potential)
   • Education level (affects retraining potential)
   • Physical limitations: sitting, mobility
   • Cognitive function

   The 4 possible levels: 60%, 65%, 74%, 100%
   Note: 74%+ is paid at the same rate as 100% (NII treats ≥75% as full incapacity)
   Below 50% incapacity → no entitlement to benefit
───────────────────────────────────────────────────────────────────────────── */

const QUESTIONS = [
  {
    id: 'workStatus',
    q: 'מה מצב העסקתך כיום?',
    hint: 'בחר/י את האפשרות הקרובה ביותר למצבך הנוכחי',
    options: [
      { value: 'full',        label: 'עובד/ת במשרה מלאה — כמו לפני הפגיעה' },
      { value: 'reduced',     label: 'עובד/ת, אך בהיקף מופחת בגלל מצב רפואי' },
      { value: 'different',   label: 'עובד/ת בעבודה אחרת, קלה יותר מהקודמת' },
      { value: 'not_medical', label: 'אינני עובד/ת — עצרתי בשל מצב רפואי' },
      { value: 'not_other',   label: 'אינני עובד/ת מסיבות אחרות (עקרת בית, גמלאי, אחר)' },
    ],
  },
  {
    id: 'prevOccupation',
    q: 'מהו סוג עיסוקך לפני הפגיעה?',
    hint: 'סוג העבודה משפיע על יכולת המעבר לעבודה חלופית בעיני הוועדה',
    options: [
      { value: 'physical',     label: 'פיזי / מאמץ גופני — בנייה, חקלאות, תעשייה, מלאכת יד' },
      { value: 'mixed',        label: 'מעורב — עמידה / תנועה (מסחר, שירות, טיפול, בישול)' },
      { value: 'office',       label: 'משרדי / ישיבה — מחשב, ניהול, מינהל, שירות טלפוני' },
      { value: 'professional', label: 'מקצועי-אקדמי — רופא, עורך דין, מהנדס, מורה, רואה חשבון' },
    ],
  },
  {
    id: 'returnToPrev',
    q: 'האם תוכל/י לחזור לעבודתך הקודמת?',
    hint: 'מדובר ביכולת הפיזית/מנטלית — ללא קשר לשאלה אם יש מקום עבודה זמין',
    options: [
      { value: 'full',    label: 'כן, במלואה — אין מניעה רפואית לחזרה מלאה' },
      { value: 'partial', label: 'חלקית בלבד — שעות מופחתות או משימות מוגבלות' },
      { value: 'no',      label: 'לא — הפגיעה מונעת ממני לחזור לאותה עבודה' },
    ],
  },
  {
    id: 'altWork',
    q: 'האם תוכל/י לעבוד בעבודה אחרת, קלה יותר?',
    hint: 'למשל: עבודה משרדית, שירות לקוחות, עבודה מהבית — בהתאם לכישוריך ורמת השכלתך',
    options: [
      { value: 'yes',     label: 'כן — אני מסוגל/ת לעבוד בתפקיד חלופי מתאים' },
      { value: 'limited', label: 'אולי — רק בהיקף מצומצם מאוד ועם מגבלות משמעותיות' },
      { value: 'no',      label: 'לא — אינני מסוגל/ת לעבוד בשום עבודה' },
    ],
  },
  {
    id: 'age',
    q: 'מהו גילך?',
    hint: 'גיל מבוגר מקטין את הסיכוי לרכוש מקצוע חדש בעיני הוועדה',
    options: [
      { value: 'under45', label: 'מתחת ל-45' },
      { value: '45to54',  label: '45–54' },
      { value: '55to59',  label: '55–59' },
      { value: '60plus',  label: '60 ומעלה' },
    ],
  },
  {
    id: 'education',
    q: 'מהי רמת השכלתך?',
    hint: 'השכלה גבוהה מאפשרת הסבה מקצועית — גורם שהוועדה מתחשבת בו',
    options: [
      { value: 'none',       label: 'ללא השכלה פורמלית / יסודי בלבד' },
      { value: 'middle',     label: 'חטיבת ביניים / תיכון ללא בגרות' },
      { value: 'bagrut',     label: 'בגרות מלאה' },
      { value: 'vocational', label: 'הכשרה מקצועית / תעודת מקצוע' },
      { value: 'academic',   label: 'תואר אקדמי (ראשון ומעלה)' },
    ],
  },
  {
    id: 'sitting',
    q: 'כמה זמן תוכל/י לשבת ברצף?',
    hint: 'חשוב לקביעת יכולת ביצוע עבודה משרדית / ישיבה',
    options: [
      { value: 'over4h',  label: 'מעל 4 שעות ברציפות — ללא קושי' },
      { value: '1to4h',   label: '1–4 שעות' },
      { value: 'under1h', label: 'פחות משעה' },
      { value: 'cannot',  label: 'אינני מסוגל/ת לשבת לאורך זמן' },
    ],
  },
  {
    id: 'mobility',
    q: 'כיצד יכולת ההליכה והתנועה שלך?',
    hint: '',
    options: [
      { value: 'normal',      label: 'רגילה / מגבלה קלה בלבד' },
      { value: 'limited',     label: 'מסוגל/ת ללכת אך עם כאבים / מרחק מוגבל' },
      { value: 'significant', label: 'קושי משמעותי — הליכה מוגבלת מאוד' },
      { value: 'assisted',    label: 'זקוק/ה לעזרת אחר בהליכה / כסא גלגלים' },
    ],
  },
  {
    id: 'cognitive',
    q: 'כיצד יכולת הריכוז, הזיכרון והחשיבה שלך?',
    hint: 'רלוונטי גם לעבודות ישיבה ומשרד',
    options: [
      { value: 'normal',      label: 'תקינה' },
      { value: 'mild',        label: 'ירידה קלה — מתמודד/ת אך יש קושי' },
      { value: 'significant', label: 'ירידה משמעותית — קשה להתרכז לאורך זמן' },
    ],
  },
];

/* ── Estimation logic ──────────────────────────────────────────────────────── */
function estimateIncapacity(answers) {
  // Currently working full time at same job → almost certainly below threshold
  if (answers.workStatus === 'full') {
    return {
      level: 'below',
      label: 'מתחת לסף הזכאות',
      color: 'gray',
      text: 'אתה/את עובד/ת במשרה מלאה כפי שעבדת לפני הפגיעה. ביטוח לאומי לא יקבע דרגת אי-כושר המזכה בקצבה כאשר כושר ההשתכרות לא נפגע בפועל.',
    };
  }

  // Can fully return to previous job → below threshold
  if (answers.returnToPrev === 'full') {
    return {
      level: 'below',
      label: 'מתחת לסף הזכאות',
      color: 'gray',
      text: 'אם ניתן לחזור לעבודה הקודמת במלואה, ביטוח לאומי ככל הנראה לא יקבע דרגת אי-כושר המזכה בקצבה חודשית.',
    };
  }

  // Calculate modifier score based on aggravating factors
  const ageScore      = { under45: 0, '45to54': 1, '55to59': 2, '60plus': 3 }[answers.age]      ?? 0;
  const eduScore      = { none: 3, middle: 2, bagrut: 1, vocational: 0, academic: -1 }[answers.education] ?? 0;
  const sittingScore  = { over4h: 0, '1to4h': 1, under1h: 2, cannot: 3 }[answers.sitting]        ?? 0;
  const mobilityScore = { normal: 0, limited: 1, significant: 2, assisted: 3 }[answers.mobility] ?? 0;
  const cogScore      = { normal: 0, mild: 1, significant: 2 }[answers.cognitive]                 ?? 0;
  const totalBoost    = ageScore + eduScore + sittingScore + mobilityScore + cogScore;

  // Core determination matrix: [returnToPrev × altWork] → base level, then boost
  const r = answers.returnToPrev; // 'partial' | 'no'
  const a = answers.altWork;      // 'yes' | 'limited' | 'no'

  if (r === 'partial' && a === 'yes') {
    return {
      level: 60,
      label: '60%',
      color: 'yellow',
      text: 'פגיעה משמעותית ביכולת ההשתכרות, אך נותרת יכולת עבודה חלקית. הוועדה צפויה לקבוע דרגת אי-כושר של 60%.',
    };
  }

  if (r === 'partial' && a === 'limited') {
    if (totalBoost >= 5) return { level: 65, label: '65%', color: 'orange', text: 'יכולת עבודה חלקית בלבד בעבודה הקודמת, ויכולת מוגבלת לעבודה חלופית. בשים לב לגיל, השכלה ומגבלות פיזיות — הוועדה צפויה לקבוע 65%.' };
    return { level: 60, label: '60%', color: 'yellow', text: 'יכולת עבודה חלקית בלבד בעבודה הקודמת. הוועדה צפויה לקבוע דרגת אי-כושר של 60%.' };
  }

  if (r === 'partial' && a === 'no') {
    if (totalBoost >= 6) return { level: 74, label: '74%', color: 'red', text: 'יכולת חלקית בלבד לעבודה הקודמת ואין יכולת עבודה חלופית. בשילוב גיל/השכלה/מגבלות פיזיות — הוועדה צפויה לקבוע 74% אי-כושר (₪3,211/חודש).' };
    return { level: 65, label: '65%', color: 'orange', text: 'יכולת חלקית בלבד לעבודה הקודמת ואין יכולת עבודה חלופית — הוועדה צפויה לקבוע דרגת אי-כושר של 65%.' };
  }

  if (r === 'no' && a === 'yes') {
    if (totalBoost >= 5) return { level: 65, label: '65%', color: 'orange', text: 'אינך יכול/ה לחזור לעבודה הקודמת, אך מסוגל/ת לעבוד בעבודה חלופית. בשים לב לגורמים נוספים — הוועדה צפויה לקבוע 65%.' };
    return { level: 60, label: '60%', color: 'yellow', text: 'אינך יכול/ה לחזור לעבודה הקודמת, אך מסוגל/ת לעבוד בעבודה חלופית מתאימה. הוועדה צפויה לקבוע דרגת אי-כושר של 60%.' };
  }

  if (r === 'no' && a === 'limited') {
    if (totalBoost >= 6) return { level: 74, label: '74%', color: 'red', text: 'אינך יכול/ה לחזור לעבודה הקודמת ויכולת העבודה החלופית מוגבלת מאוד. בשילוב גורמים נוספים — הוועדה צפויה לקבוע 74% אי-כושר (₪3,211/חודש).' };
    return { level: 65, label: '65%', color: 'orange', text: 'אינך יכול/ה לחזור לעבודה הקודמת ויכולת העבודה החלופית מוגבלת מאוד. הוועדה צפויה לקבוע דרגת אי-כושר של 65%.' };
  }

  if (r === 'no' && a === 'no') {
    if (totalBoost >= 5) return { level: 100, label: '100%', color: 'red', text: 'אינך יכול/ה לחזור לעבודה הקודמת ואינך מסוגל/ת לעבוד בשום עבודה אחרת. בשילוב גיל, השכלה ומגבלות פיזיות — הוועדה צפויה לקבוע 100% אי-כושר (₪4,711/חודש).' };
    return { level: 74, label: '74%', color: 'red', text: 'אינך יכול/ה לחזור לעבודה הקודמת ואינך מסוגל/ת לעבוד בשום עבודה. הוועדה צפויה לקבוע 74% אי-כושר (₪3,211/חודש).' };
  }

  return { level: 60, label: '60%', color: 'yellow', text: 'על בסיס התשובות — דרגת אי-כושר משוערת: 60%.' };
}

const COLOR_CLASSES = {
  gray:   { bg: 'bg-gray-50',   border: 'border-gray-200',   badge: 'bg-gray-100 text-gray-700',   bar: 'bg-gray-400'   },
  yellow: { bg: 'bg-yellow-50', border: 'border-yellow-200', badge: 'bg-yellow-100 text-yellow-800', bar: 'bg-yellow-400' },
  orange: { bg: 'bg-orange-50', border: 'border-orange-200', badge: 'bg-orange-100 text-orange-800', bar: 'bg-orange-500' },
  red:    { bg: 'bg-red-50',    border: 'border-red-200',    badge: 'bg-red-100 text-red-800',     bar: 'bg-red-500'    },
};

/* ── Component ─────────────────────────────────────────────────────────────── */
export default function IncapacityQuestionnaire() {
  const [open, setOpen]       = useState(false);
  const [step, setStep]       = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult]   = useState(null);

  const current = QUESTIONS[step];
  const total   = QUESTIONS.length;

  function handleAnswer(value) {
    const next = { ...answers, [current.id]: value };
    setAnswers(next);

    if (step + 1 < total) {
      setStep(step + 1);
    } else {
      setResult(estimateIncapacity(next));
    }
  }

  function reset() {
    setStep(0);
    setAnswers({});
    setResult(null);
  }

  const colors = result ? (COLOR_CLASSES[result.color] ?? COLOR_CLASSES.yellow) : null;

  return (
    <div className="bg-white rounded-xl border border-indigo-200 shadow-sm overflow-hidden">
      {/* Header — always visible */}
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex justify-between items-center px-4 py-4 text-right hover:bg-indigo-50 transition"
      >
        <div className="flex items-center gap-3">
          <span className="text-xl">🧮</span>
          <div className="text-right">
            <p className="text-base font-semibold text-indigo-800">שלב ב׳ — בדיקת דרגת אי-כושר</p>
            <p className="text-xs text-gray-500 mt-0.5">אחוזי הנכות הרפואיים הם כרטיס הכניסה. דרגת אי-הכושר קובעת את גובה הקצבה בפועל</p>
          </div>
        </div>
        <svg
          className={`shrink-0 w-5 h-5 text-indigo-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="border-t border-indigo-100 px-4 pb-5 pt-4">

          {/* Intro — shown before starting */}
          {step === 0 && !result && (
            <div className="mb-4 bg-indigo-50 rounded-lg px-3 py-2 border border-indigo-100 text-xs text-indigo-700">
              <strong>שני שלבים לקצבת נכות כללית:</strong> הוועדה הרפואית קובעת את <strong>אחוזי הנכות הרפואיים</strong> — אלה שחישבת למעלה. אם עברת את הסף (60%, או 40% עם ליקוי בודד של 25%+), עובר הטיפול ל<strong>פקיד תביעות</strong> שקובע בנפרד את <strong>דרגת אי-הכושר</strong> — מדד שבוחן עד כמה הנכות פוגעת ביכולת ההשתכרות שלך. הדרגה (60% / 65% / 74% / 100%) היא שקובעת את סכום הקצבה החודשית. כלי זה מאמד אותה על בסיס הקריטריונים שביטוח לאומי מפרסם.
            </div>
          )}

          {/* Progress bar */}
          {!result && (
            <div className="mb-4">
              <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>שאלה {step + 1} מתוך {total}</span>
                <span>{Math.round(((step) / total) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                <div
                  className="h-1.5 bg-indigo-500 rounded-full transition-all duration-300"
                  style={{ width: `${(step / total) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* Question */}
          {!result && (
            <div>
              <p className="text-base font-semibold text-gray-800 mb-1">{current.q}</p>
              {current.hint && (
                <p className="text-xs text-gray-400 mb-3">{current.hint}</p>
              )}
              <div className="space-y-2">
                {current.options.map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => handleAnswer(opt.value)}
                    className="w-full text-right px-4 py-3 rounded-lg border border-indigo-200 text-sm text-gray-700 hover:bg-indigo-50 hover:border-indigo-400 transition font-medium"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              {step > 0 && (
                <button
                  onClick={() => setStep(s => s - 1)}
                  className="mt-3 text-xs text-indigo-400 hover:text-indigo-600 underline"
                >
                  ← חזור לשאלה הקודמת
                </button>
              )}
            </div>
          )}

          {/* Result */}
          {result && (
            <div className={`rounded-lg border p-4 ${colors.bg} ${colors.border}`}>
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="text-xs text-gray-500 mb-1">אומדן דרגת אי-כושר</p>
                  <span className={`inline-block text-2xl font-extrabold px-3 py-1 rounded-lg ${colors.badge}`}>
                    {result.label}
                  </span>
                </div>
                {typeof result.level === 'number' && (
                  <div className="text-right text-xs text-gray-500">
                    {result.level === 100
                      ? 'קצבה מקסימלית'
                      : result.level === 74
                      ? 'קצבה גבוהה מאוד'
                      : result.level === 65
                      ? 'קצבה גבוהה'
                      : 'קצבה בסיסית'}
                  </div>
                )}
              </div>

              {typeof result.level === 'number' && (
                <div className="w-full bg-white rounded-full h-2 mb-3 overflow-hidden border border-gray-200">
                  <div
                    className={`h-2 rounded-full ${colors.bar} transition-all duration-500`}
                    style={{ width: `${result.level}%` }}
                  />
                </div>
              )}

              <p className="text-sm text-gray-700 leading-relaxed mb-4">{result.text}</p>

              {/* Level reference table */}
              {result.level !== 'below' && (
                <div className="bg-white rounded-lg border border-gray-200 p-3 mb-4 text-xs">
                  <p className="font-semibold text-gray-600 mb-2">קצבאות נכות כללית 2026:</p>
                  <div className="space-y-1.5">
                    {[
                      { l: '60%',  desc: '2,718 ₪/חודש' },
                      { l: '65%',  desc: '2,894 ₪/חודש' },
                      { l: '74%',  desc: '3,211 ₪/חודש' },
                      { l: '100%', desc: '4,711 ₪/חודש' },
                    ].map(row => (
                      <div
                        key={row.l}
                        className={`flex justify-between px-2 py-1 rounded ${String(result.level) === row.l.replace('%','') ? `${colors.badge} font-bold` : 'text-gray-500'}`}
                      >
                        <span>{row.l}</span>
                        <span>{row.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg px-3 py-2 text-xs text-yellow-800 mb-3">
                ⚠️ זהו אומדן בלבד — לא קביעה רשמית. דרגת אי-הכושר נקבעת על ידי פקיד תביעות בביטוח לאומי בהתחשב גם בחוות דעת רופא ועובד שיקום. מומלץ לפנות לייעוץ משפטי לפני הגשת תביעה.
              </div>

              <button
                onClick={reset}
                className="text-sm text-indigo-600 hover:text-indigo-800 underline"
              >
                ← בצע את השאלון מחדש
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

'use client';
import { useState } from 'react';
import { estimateIncapacity } from '../lib/estimateIncapacity';

/* ─────────────────────────────────────────────────────────────────────────────
   Work-accident incapacity questionnaire — shown as a full step in the
   calculator flow between claim-type selection and disease selection.

   The 9 questions mirror the general IncapacityQuestionnaire but are styled
   in amber to match the work-accident visual theme.

   Props:
     onComplete(answers)  — called when the user finishes all questions
     onBack()             — called when the user wants to go back to claim type
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

export default function WorkAccidentScreen({ onComplete, onBack }) {
  const [step, setStep]       = useState(0);
  const [answers, setAnswers] = useState({});

  const current = QUESTIONS[step];
  const total   = QUESTIONS.length;

  function handleAnswer(value) {
    const next = { ...answers, [current.id]: value };
    setAnswers(next);
    if (step + 1 < total) {
      setStep(step + 1);
    } else {
      onComplete(next);
    }
  }

  return (
    <div dir="rtl">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="text-3xl mb-2">🧮</div>
        <h3 className="text-xl font-bold text-indigo-800 mb-1">שאלון דרגת אי-כושר — תאונת עבודה</h3>
        <p className="text-sm text-gray-500">
          תשובותיך יעזרו לנו להעריך את דרגת אי-הכושר שלך מול ביטוח לאומי
        </p>
      </div>

      {/* Info banner — step 0 only */}
      {step === 0 && (
        <div className="mb-5 bg-indigo-50 rounded-lg px-4 py-3 border border-indigo-200 text-sm text-indigo-800">
          <strong>שני שלבים לגמלת נכות מעבודה:</strong> הוועדה הרפואית קובעת את{' '}
          <strong>אחוזי הנכות הרפואיים</strong> (שלב הבא). אם עברת 20% — ייתכן זכאות לקצבה חודשית.
          בנוסף, פקיד תביעות בוחן את{' '}
          <strong>דרגת אי-הכושר</strong> — מדד שבוחן עד כמה הפגיעה פוגעת ביכולת ההשתכרות שלך.
          שאלון זה מאמד אותה (60% / 65% / 74% / 100%).
        </div>
      )}

      {/* Progress */}
      <div className="mb-5">
        <div className="flex justify-between text-xs text-gray-400 mb-1">
          <span>שאלה {step + 1} מתוך {total}</span>
          <span>{Math.round((step / total) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
          <div
            className="h-2 bg-indigo-500 rounded-full transition-all duration-300"
            style={{ width: `${(step / total) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="bg-white rounded-xl border border-indigo-200 shadow-sm p-5">
        <p className="text-base font-semibold text-gray-800 mb-1">{current.q}</p>
        {current.hint && (
          <p className="text-xs text-gray-400 mb-4">{current.hint}</p>
        )}
        <div className="space-y-2">
          {current.options.map(opt => (
            <button
              key={opt.value}
              onClick={() => handleAnswer(opt.value)}
              className="w-full text-right px-4 py-3 rounded-lg border border-indigo-200 text-sm text-gray-700 hover:bg-indigo-50 hover:border-indigo-400 transition font-medium cursor-pointer"
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-4">
        <button
          onClick={step === 0 ? onBack : () => setStep(s => s - 1)}
          className="text-sm text-gray-400 hover:text-gray-600 underline"
        >
          ← {step === 0 ? 'חזור לבחירת סוג תביעה' : 'חזור לשאלה הקודמת'}
        </button>
        <button
          onClick={() => onComplete(answers)}
          className="text-sm text-indigo-400 hover:text-indigo-600 underline"
        >
          דלג על השאלון ←
        </button>
      </div>
    </div>
  );
}

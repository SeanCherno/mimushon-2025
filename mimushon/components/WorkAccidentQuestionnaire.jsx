'use client';
import { useState } from 'react';

/* ─────────────────────────────────────────────────────────────────────────────
   WORK ACCIDENT QUESTIONNAIRE
   Guides תאונת עבודה users through the key questions that determine their
   entitlement path: recognised injury, regulation 15 aggravation, and whether
   they still need to act (file / appeal).
───────────────────────────────────────────────────────────────────────────── */

const QUESTIONS = [
    {
        id: 'incidentType',
        q: 'מהי סוג הפגיעה שלך?',
        hint: '',
        options: [
            { value: 'accident_work',       label: 'תאונה שאירעה בזמן ביצוע העבודה' },
            { value: 'accident_commute',    label: 'תאונת דרכים בנסיעה מ/אל העבודה' },
            { value: 'occupational_disease',label: 'מחלת מקצוע (נגרמת מחשיפה מקצועית)' },
        ],
    },
    {
        id: 'reported',
        q: 'האם הגשת דוח תאונת עבודה למעסיק?',
        hint: 'דיווח למעסיק הוא תנאי הכרחי להכרה על ידי ביטוח לאומי',
        options: [
            { value: 'yes',     label: 'כן, הגשתי דוח למעסיק' },
            { value: 'no',      label: 'לא הגשתי' },
            { value: 'unknown', label: 'לא ידעתי שצריך / לא זכור לי' },
        ],
    },
    {
        id: 'recognized',
        q: 'האם ביטוח לאומי הכיר בפגיעה כ"פגיעה בעבודה"?',
        hint: '',
        options: [
            { value: 'yes',        label: 'כן, הפגיעה הוכרה רשמית' },
            { value: 'in_process', label: 'הגשתי — בתהליך / טרם קיבלתי תשובה' },
            { value: 'rejected',   label: 'הפגיעה נדחתה על ידי ביטוח לאומי' },
            { value: 'not_filed',  label: 'טרם פניתי לביטוח לאומי כלל' },
        ],
    },
    {
        id: 'aggravating',
        q: 'האם היו נסיבות עבודה שתרמו להחמרת הפגיעה?',
        hint: 'תקנה 15 מאפשרת לוועדה להוסיף עד 50% לאחוזי הנכות כשנסיבות העבודה החמירו את הפגיעה',
        options: [
            { value: 'yes',   label: 'כן — עומס חריג, ציוד לא תקני, חשיפה מיוחדת, הנחיות בעייתיות' },
            { value: 'maybe', label: 'ייתכן — לא בטוח' },
            { value: 'no',    label: 'לא — פגיעה ללא נסיבות מיוחדות' },
        ],
    },
];

function getResult(answers) {
    const { recognized, reported, aggravating } = answers;
    const hasAggravating = aggravating === 'yes' || aggravating === 'maybe';

    if (recognized === 'rejected') {
        return {
            level: 'urgent',
            icon: '🚨',
            title: 'פגיעה שנדחתה — מומלץ מאוד לפנות לייעוץ משפטי',
            text: 'ביטוח לאומי דחה את הפגיעה, אך עדיין ייתכן שניתן לערער. ועדת ערר מקבלת כשליש מהערעורים בנסיבות מתאימות. עורך דין המתמחה בנכויות עבודה יוכל לבחון אם הדחייה הייתה מוצדקת.',
            actions: ['פנה/י לייעוץ משפטי בהקדם', 'אסוף/י את כל המסמכים הרפואיים וניירת העבודה'],
            color: 'red',
        };
    }

    if (recognized === 'not_filed' || reported === 'no' || reported === 'unknown') {
        return {
            level: 'action',
            icon: '⚡',
            title: 'יש לפעול — טרם הוגשה תביעה מלאה',
            text: 'יש להגיש תביעה לביטוח לאומי בהקדם האפשרי. שים/י לב: ישנה התיישנות של 12 חודשים מיום התאונה או מיום גילוי המחלה. מומלץ לפנות לייעוץ לפני ההגשה.',
            actions: [
                'הגשת תביעה לנכות מעבודה (טופס ב-200)',
                'אסוף/י אסמכתאות: דוח תאונה, מסמכים רפואיים, עדויות',
            ],
            color: 'orange',
        };
    }

    if (hasAggravating) {
        return {
            level: 'legal',
            icon: '⚖️',
            title: 'ייתכן שתקנה 15 רלוונטית — כדאי לבחון עם עורך דין',
            text: 'תקנה 15 מאפשרת לוועדה הרפואית להוסיף עד 50% לאחוזי הנכות כאשר נסיבות העבודה הספציפיות (עומס חריג, ציוד לא מתאים, הנחיות בעייתיות) תרמו לפגיעה. זהו תחום מורכב שכדאי לבחון עם מומחה.',
            actions: [
                'פנה/י לייעוץ משפטי לגבי תקנה 15',
                'תעד/י את נסיבות העבודה המחמירות',
            ],
            color: 'amber',
        };
    }

    return {
        level: 'info',
        icon: 'ℹ️',
        title: 'פגיעה מוכרת — בדוק/י שאחוזי הנכות משקפים את מצבך',
        text: 'עם פגיעה מוכרת, הסף לקצבת נכות מעבודה הוא 20% ומעלה — ללא צורך בדרגת אי-כושר. בין 9% ל-19.9% ניתן מענק חד-פעמי במקום קצבה חודשית. כדאי לוודא שהאחוזים שנקבעו תואמים את ספר הליקויים.',
        actions: [
            'בדוק/י שהאחוזים שנקבעו תואמים את ספר הליקויים',
            'עם 20% ומעלה — זכאות לקצבת נכות מעבודה (ללא דרגת אי-כושר)',
        ],
        color: 'blue',
    };
}

const COLORS = {
    red:    { bg: 'bg-red-50',    border: 'border-red-200',    badge: 'bg-red-100 text-red-800'       },
    orange: { bg: 'bg-orange-50', border: 'border-orange-200', badge: 'bg-orange-100 text-orange-800' },
    amber:  { bg: 'bg-amber-50',  border: 'border-amber-200',  badge: 'bg-amber-100 text-amber-800'   },
    blue:   { bg: 'bg-blue-50',   border: 'border-blue-200',   badge: 'bg-blue-100 text-blue-800'     },
};

export default function WorkAccidentQuestionnaire() {
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
            setResult(getResult(next));
        }
    }

    function reset() {
        setStep(0);
        setAnswers({});
        setResult(null);
    }

    const c = result ? (COLORS[result.color] ?? COLORS.blue) : null;

    return (
        <div className="bg-white rounded-xl border border-amber-200 shadow-sm overflow-hidden">
            {/* Header — always visible */}
            <button
                onClick={() => setOpen(o => !o)}
                className="w-full flex justify-between items-center px-4 py-4 text-right hover:bg-amber-50 transition"
            >
                <div className="flex items-center gap-3">
                    <span className="text-xl">⚖️</span>
                    <div className="text-right">
                        <p className="text-base font-semibold text-amber-800">שאלון תאונת עבודה — מה מגיע לך?</p>
                        <p className="text-xs text-gray-500 mt-0.5">
                            תאונת עבודה נבחנת במסלול נפרד — הסף הוא 20% בלבד, ותקנה 15 יכולה להוסיף עד 50%
                        </p>
                    </div>
                </div>
                <svg
                    className={`shrink-0 w-5 h-5 text-amber-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {open && (
                <div className="border-t border-amber-100 px-4 pb-5 pt-4">

                    {/* Intro */}
                    {step === 0 && !result && (
                        <div className="mb-4 bg-amber-50 rounded-lg px-3 py-2 border border-amber-100 text-xs text-amber-800">
                            <strong>תאונת עבודה — מסלול שונה לחלוטין מנכות כללית:</strong> הסף לקצבה חודשית הוא{' '}
                            <strong>20% בלבד</strong> (לא 60%), ואין צורך בדרגת אי-כושר. בין 9% ל-19.9% — מענק חד-פעמי.
                            תקנה 15 יכולה להוסיף עד 50% לאחוזי הנכות.
                        </div>
                    )}

                    {/* Progress bar */}
                    {!result && (
                        <div className="mb-4">
                            <div className="flex justify-between text-xs text-gray-400 mb-1">
                                <span>שאלה {step + 1} מתוך {total}</span>
                                <span>{Math.round((step / total) * 100)}%</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                                <div
                                    className="h-1.5 bg-amber-500 rounded-full transition-all duration-300"
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
                                        className="w-full text-right px-4 py-3 rounded-lg border border-amber-200 text-sm text-gray-700 hover:bg-amber-50 hover:border-amber-400 transition font-medium"
                                    >
                                        {opt.label}
                                    </button>
                                ))}
                            </div>
                            {step > 0 && (
                                <button
                                    onClick={() => setStep(s => s - 1)}
                                    className="mt-3 text-xs text-amber-500 hover:text-amber-700 underline"
                                >
                                    ← חזור לשאלה הקודמת
                                </button>
                            )}
                        </div>
                    )}

                    {/* Result */}
                    {result && (
                        <div className={`rounded-lg border p-4 ${c.bg} ${c.border}`}>
                            <div className="flex items-start gap-3 mb-3">
                                <span className="text-2xl shrink-0">{result.icon}</span>
                                <p className="font-bold text-gray-800 text-sm leading-snug">{result.title}</p>
                            </div>
                            <p className="text-sm text-gray-700 leading-relaxed mb-4">{result.text}</p>

                            {result.actions.length > 0 && (
                                <div className="mb-4">
                                    <p className="text-xs font-semibold text-gray-600 mb-2">פעולות מומלצות:</p>
                                    <ul className="space-y-1">
                                        {result.actions.map((a, i) => (
                                            <li key={i} className="flex items-start gap-2 text-xs text-gray-700">
                                                <span className="text-amber-500 mt-0.5 shrink-0">✓</span>
                                                <span>{a}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg px-3 py-2 text-xs text-yellow-800 mb-3">
                                ⚠️ זהו אומדן בלבד. תאונות עבודה הן תחום מורכב — מומלץ מאוד לפנות לייעוץ משפטי מקצועי.
                            </div>

                            <button
                                onClick={reset}
                                className="text-sm text-amber-600 hover:text-amber-800 underline"
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

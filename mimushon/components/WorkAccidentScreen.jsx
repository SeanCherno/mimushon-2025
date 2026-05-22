'use client';
import { useState } from 'react';

/* ─────────────────────────────────────────────────────────────────────────────
   Work-accident questionnaire shown as a FULL STEP in the calculator flow
   (between claim-type selection and disease selection).
   Props:
     onComplete(answers)  — called when the user finishes all questions
     onBack()             — called when the user wants to go back to claim type
───────────────────────────────────────────────────────────────────────────── */

const QUESTIONS = [
    {
        id: 'incidentType',
        q: 'מהי סוג הפגיעה שלך?',
        hint: '',
        options: [
            { value: 'accident_work',        label: 'תאונה שאירעה בזמן ביצוע העבודה' },
            { value: 'accident_commute',     label: 'תאונת דרכים בנסיעה מ/אל העבודה' },
            { value: 'occupational_disease', label: 'מחלת מקצוע (נגרמת מחשיפה מקצועית)' },
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
                <div className="text-3xl mb-2">⚖️</div>
                <h3 className="text-xl font-bold text-amber-800 mb-1">שאלון תאונת עבודה</h3>
                <p className="text-sm text-gray-500">
                    תשובותיך יעזרו לנו להציג בתוצאות את המידע הרלוונטי ביותר עבורך
                </p>
            </div>

            {/* Info banner */}
            {step === 0 && (
                <div className="mb-5 bg-amber-50 rounded-lg px-4 py-3 border border-amber-200 text-sm text-amber-800">
                    <strong>תאונת עבודה — מסלול שונה לחלוטין מנכות כללית:</strong> הסף לקצבה חודשית הוא{' '}
                    <strong>20% בלבד</strong> (לא 60%), ואין צורך בדרגת אי-כושר. בין 9% ל-19.9% — מענק חד-פעמי.
                    תקנה 15 יכולה להוסיף עד 50% לאחוזי הנכות.
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
                        className="h-2 bg-amber-500 rounded-full transition-all duration-300"
                        style={{ width: `${(step / total) * 100}%` }}
                    />
                </div>
            </div>

            {/* Question */}
            <div className="bg-white rounded-xl border border-amber-200 shadow-sm p-5">
                <p className="text-base font-semibold text-gray-800 mb-1">{current.q}</p>
                {current.hint && (
                    <p className="text-xs text-gray-400 mb-4">{current.hint}</p>
                )}
                <div className="space-y-2">
                    {current.options.map(opt => (
                        <button
                            key={opt.value}
                            onClick={() => handleAnswer(opt.value)}
                            className="w-full text-right px-4 py-3 rounded-lg border border-amber-200 text-sm text-gray-700 hover:bg-amber-50 hover:border-amber-400 transition font-medium cursor-pointer"
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
                    className="text-sm text-amber-500 hover:text-amber-700 underline"
                >
                    דלג על השאלון ←
                </button>
            </div>
        </div>
    );
}

'use client';

const CLAIM_TYPES = [
    {
        id: 'illness',
        label: 'מחלה',
        icon: '🩺',
        desc: 'מחלה כרונית, נכות ממחלה, ליקוי בריאותי שאינו קשור לתאונת עבודה',
    },
    {
        id: 'work_accident',
        label: 'תאונת עבודה',
        icon: '🏗️',
        desc: 'תאונה שאירעה במקום העבודה, בנסיעה מ/אל העבודה, או מחלת מקצוע',
    },
    {
        id: 'idf_disabled',
        label: 'נכה צה"ל',
        icon: '🎗️',
        desc: 'פגיעה, פציעה, או מחלה שנגרמה עקב שירות צבאי',
    },
    {
        id: 'other',
        label: 'אחר / כללי',
        icon: '📋',
        desc: 'למשל: פטור ממס הכנסה, ביטוח פרטי, או שאתם עדיין לא בטוחים לאיזה מסלול לפנות',
    },
];

export default function ClaimTypeSelection({ onSelect }) {
    return (
        <div dir="rtl">
            <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-indigo-800 mb-1">מה סוג תביעתך?</h3>
                <p className="text-sm text-gray-500">
                    הבחירה קובעת אילו הסברים וספים רלוונטיים יוצגו לכם בתוצאות — לא תשנה את אחוז הנכות הרפואי שיחושב. לא בטוחים? אפשר לבחור &quot;אחר / כללי&quot;.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {CLAIM_TYPES.map((type) => (
                    <button
                        key={type.id}
                        onClick={() => onSelect(type.id)}
                        className="flex items-start gap-4 p-4 rounded-xl border-2 bg-white text-right transition cursor-pointer border-indigo-200 hover:border-indigo-500 hover:bg-indigo-50"
                    >
                        <span className="text-2xl w-11 h-11 flex items-center justify-center rounded-lg shrink-0 bg-indigo-100">
                            {type.icon}
                        </span>
                        <div>
                            <p className="font-bold text-base text-indigo-700">{type.label}</p>
                            <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{type.desc}</p>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}

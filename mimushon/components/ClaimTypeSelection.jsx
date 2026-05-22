'use client';

const CLAIM_TYPES = [
    {
        id: 'illness',
        label: 'מחלה',
        icon: '🩺',
        desc: 'מחלה כרונית, נכות ממחלה, ליקוי בריאותי שאינו קשור לתאונת עבודה',
        border: 'border-indigo-200 hover:border-indigo-500',
        bg: 'hover:bg-indigo-50',
        iconBg: 'bg-indigo-100',
        text: 'text-indigo-700',
    },
    {
        id: 'work_accident',
        label: 'תאונת עבודה',
        icon: '🏗️',
        desc: 'תאונה שאירעה במקום העבודה, בנסיעה מ/אל העבודה, או מחלת מקצוע',
        border: 'border-amber-200 hover:border-amber-500',
        bg: 'hover:bg-amber-50',
        iconBg: 'bg-amber-100',
        text: 'text-amber-700',
    },
    {
        id: 'idf_disabled',
        label: 'נכה צה"ל',
        icon: '🎗️',
        desc: 'פגיעה, פציעה, או מחלה שנגרמה עקב שירות צבאי',
        border: 'border-blue-200 hover:border-blue-500',
        bg: 'hover:bg-blue-50',
        iconBg: 'bg-blue-100',
        text: 'text-blue-700',
    },
    {
        id: 'other',
        label: 'אחר',
        icon: '📋',
        desc: 'מצב שאינו נכלל בקטגוריות הנ"ל',
        border: 'border-gray-200 hover:border-gray-400',
        bg: 'hover:bg-gray-50',
        iconBg: 'bg-gray-100',
        text: 'text-gray-600',
    },
];

export default function ClaimTypeSelection({ onSelect }) {
    return (
        <div dir="rtl">
            <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-indigo-800 mb-1">מה סוג תביעתך?</h3>
                <p className="text-sm text-gray-500">
                    בחרו את הקטגוריה המתאימה — הדבר ישפיע על המידע שתראו בתוצאות
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {CLAIM_TYPES.map((type) => (
                    <button
                        key={type.id}
                        onClick={() => onSelect(type.id)}
                        className={`flex items-start gap-4 p-4 rounded-xl border-2 bg-white text-right transition cursor-pointer ${type.border} ${type.bg}`}
                    >
                        <span
                            className={`text-2xl w-11 h-11 flex items-center justify-center rounded-lg shrink-0 ${type.iconBg}`}
                        >
                            {type.icon}
                        </span>
                        <div>
                            <p className={`font-bold text-base ${type.text}`}>{type.label}</p>
                            <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{type.desc}</p>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}

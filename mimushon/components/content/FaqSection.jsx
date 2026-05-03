'use client';

import { useState } from 'react';

const FAQ_ITEMS = [
  {
    q: 'מה זה אחוזי נכות ולמה הם חשובים?',
    a: 'אחוזי נכות הם מדד רפואי-משפטי שנקבע על ידי ביטוח לאומי ומשקף את מידת הפגיעה בכושר התפקוד. הם קובעים את הזכאות לקצבת נכות כללית, פטור ממס הכנסה, קצבת שירותים מיוחדים והטבות נוספות.',
  },
  {
    q: 'האם המחשבון נותן תוצאה רשמית?',
    a: 'לא. המחשבון הוא כלי להערכה בלבד, המבוסס על ספר הליקויים של ביטוח לאומי. הקביעה הרשמית של אחוזי הנכות נעשית על ידי ועדה רפואית של ביטוח לאומי, ועשויה להיות שונה מהערכת המחשבון.',
  },
  {
    q: 'כיצד מחושבים אחוזי נכות כאשר יש מספר מחלות?',
    a: 'ביטוח לאומי משתמש בנוסחת "ירידה נצברת": כל מחלה מפחיתה מ"היכולת הנותרת" ולא מ-100%. כלומר אם יש לך 50% ועוד 30% — הסכום אינו 80% אלא בערך 65%. המחשבון מחשב זאת אוטומטית.',
  },
  {
    q: 'מה הסף המינימלי לזכאות לקצבת נכות?',
    a: 'לקצבת נכות כללית נדרשים לפחות 40% נכות ודרגת אי-כושר של 50% ומעלה (בפועל ביטוח לאומי בוחן גם את יכולת ההשתכרות). לשירותים מיוחדים נדרשים לפחות 60% נכות. לפטור ממס הכנסה — לרוב 90% ומעלה.',
  },
  {
    q: 'מה עושים אחרי שמקבלים את תוצאות המחשבון?',
    a: 'מומלץ לאסוף את כל המסמכים הרפואיים הרלוונטיים ולפנות לרופא המשפחה לקבלת אישורים. לאחר מכן ניתן להגיש תביעה לביטוח לאומי באונליין, בדואר או בסניף. אם האחוזים שנקבעו נמוכים — ניתן לערער בפני ועדת עררים.',
  },
];

export default function FaqSection() {
  const [open, setOpen] = useState(null);

  return (
    <section className="max-w-3xl mx-auto px-4 py-12" dir="rtl">
      <h2 className="text-2xl font-bold text-indigo-800 mb-6 text-center">שאלות נפוצות</h2>
      <div className="space-y-3">
        {FAQ_ITEMS.map((item, i) => (
          <div
            key={i}
            className="bg-white rounded-xl border border-indigo-200 shadow-sm overflow-hidden"
          >
            <button
              className="w-full flex justify-between items-center px-5 py-4 text-right text-indigo-800 font-semibold hover:bg-indigo-50 transition"
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
            >
              <span>{item.q}</span>
              <svg
                className={`shrink-0 w-5 h-5 text-indigo-500 transition-transform duration-200 ${open === i ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${open === i ? 'max-h-96' : 'max-h-0'}`}
            >
              <p className="px-5 pb-4 text-gray-700 text-sm leading-relaxed border-t border-indigo-100 pt-3">
                {item.a}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

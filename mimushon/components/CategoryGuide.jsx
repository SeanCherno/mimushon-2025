'use client';

import React, { useState } from 'react';

const SYMPTOM_GROUPS = [
  { emoji: '🦴', label: 'כאב, שבר, קשיחות במפרקים, עצמות, שרירים', categories: ['category_2'] },
  { emoji: '👁️', label: 'בעיות ראייה, עיניים', categories: ['category_14'] },
  { emoji: '👂', label: 'בעיות שמיעה, אוזניים', categories: ['category_1'] },
  { emoji: '❤️', label: 'לב, כלי דם, לחץ דם', categories: ['category_6', 'category_5'] },
  { emoji: '🫁', label: 'נשימה, ריאות, גרון', categories: ['category_10'] },
  { emoji: '🧠', label: 'נוירולוגיה, עצבים, שיתוק', categories: ['category_9'] },
  { emoji: '😔', label: 'בריאות נפשית, חרדה, דיכאון', categories: ['category_18'] },
  { emoji: '🩸', label: 'דם, סוכרת, הורמונים', categories: ['category_4', 'category_11', 'category_3'] },
  { emoji: '🫃', label: 'עיכול, בטן, כבד', categories: ['cat_gastro'] },
  { emoji: '🚽', label: 'כליות, שתן, אברי מין', categories: ['category_19'] },
  { emoji: '🦷', label: 'פה, שיניים, לסת', categories: ['category_16'] },
  { emoji: '🤲', label: 'עור, כוויות, צלקות', categories: ['category_13'] },
];

export default function CategoryGuide({ categories, onCategoryClick, onClose }) {
  const [selectedGroup, setSelectedGroup] = useState(null);

  const matchedCategories = selectedGroup
    ? categories.filter((cat) => selectedGroup.categories.includes(cat.id))
    : [];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backdropFilter: 'blur(4px)', backgroundColor: 'rgba(0,0,0,0.45)' }}
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        dir="rtl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-indigo-100">
          <h2 className="text-xl font-bold text-indigo-800">
            {selectedGroup ? 'קטגוריות מתאימות עבורך' : 'איזה חלק בגוף / מערכת מפריעה לך?'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition text-2xl leading-none"
            aria-label="סגור"
          >
            ✕
          </button>
        </div>

        <div className="p-5">
          {!selectedGroup ? (
            /* Step 1 — Symptom group grid */
            <div className="grid grid-cols-2 gap-3">
              {SYMPTOM_GROUPS.map((group) => (
                <button
                  key={group.label}
                  onClick={() => setSelectedGroup(group)}
                  className="flex flex-col items-center text-center gap-2 p-4 bg-indigo-50 rounded-xl border-2 border-transparent hover:border-indigo-400 hover:bg-indigo-100 transition"
                >
                  <span className="text-3xl">{group.emoji}</span>
                  <span className="text-sm font-medium text-gray-700 leading-snug">{group.label}</span>
                </button>
              ))}
            </div>
          ) : (
            /* Step 2 — Matched categories */
            <div>
              <p className="text-gray-600 mb-4 text-sm">
                המחלות שלך כנראה נמצאות בקטגוריה/ות הבאות:
              </p>

              {matchedCategories.length > 0 ? (
                <div className="space-y-3 mb-6">
                  {matchedCategories.map((cat) => (
                    <div
                      key={cat.id}
                      className="flex items-center justify-between bg-indigo-50 border-2 border-indigo-300 rounded-xl p-4"
                    >
                      <div className="flex items-center gap-2">
                        {cat.svg && (
                          <img src={cat.svg} alt="" style={{ width: '1.5em' }} />
                        )}
                        <span className="font-semibold text-indigo-800">{cat.name}</span>
                      </div>
                      <button
                        onClick={() => onCategoryClick(cat)}
                        className="bg-indigo-600 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
                      >
                        בחר קטגוריה
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm mb-6">
                  לא נמצאו קטגוריות תואמות. נסה/י לחפש בכל הקטגוריות.
                </p>
              )}

              <div className="flex flex-col gap-2">
                <button
                  onClick={() => setSelectedGroup(null)}
                  className="w-full p-3 bg-white border-2 border-indigo-300 text-indigo-600 rounded-xl font-semibold hover:bg-indigo-50 transition"
                >
                  ← חזור לבחירת תחום
                </button>
                <button
                  onClick={onClose}
                  className="w-full p-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition"
                >
                  הצג את כל הקטגוריות
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

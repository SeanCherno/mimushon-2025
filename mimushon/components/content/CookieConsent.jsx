"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

// Persisted flag so the toast only appears until the visitor acknowledges it.
const STORAGE_KEY = "mimushon-cookie-consent";

const CookieConsent = () => {
  // Start hidden and decide visibility only on the client (after we can read
  // localStorage) to avoid a server/client hydration mismatch.
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      // localStorage blocked (private mode / cookies disabled) — show anyway.
      setVisible(true);
    }
  }, []);

  const accept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "accepted");
    } catch {
      // Ignore write failures; the banner still dismisses for this session.
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="הודעת עוגיות"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-gray-200 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.08)]"
    >
      <div className="max-w-5xl mx-auto px-6 md:px-8 py-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
        <p className="flex-1 text-sm leading-relaxed text-gray-700">
          אתר זה עושה שימוש בעוגיות (cookies) כדי לשפר את חוויית הגלישה ולצורך ניתוח תנועה.
          המשך השימוש באתר מהווה הסכמה לשימוש בעוגיות. למידע נוסף עיינו ב
          <Link href="/privacy" className="font-medium text-indigo-600 hover:underline">
            מדיניות הפרטיות
          </Link>
          .
        </p>
        <button
          type="button"
          onClick={accept}
          className="shrink-0 rounded-lg bg-indigo-600 px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          הבנתי
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;

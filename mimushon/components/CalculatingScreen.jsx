'use client';
import { useEffect, useState } from 'react';

const STEPS = [
  'בודק ספר הליקויים...',
  'מחשב שילובי אחוזים...',
  'מכין את התוצאות שלך...',
];

export default function CalculatingScreen() {
  const [stepIndex, setStepIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  // Advance step text every ~600ms
  useEffect(() => {
    const id = setInterval(() => {
      setStepIndex(i => (i + 1) % STEPS.length);
    }, 620);
    return () => clearInterval(id);
  }, []);

  // Smooth progress bar over 2 seconds (never quite reaches 100 until done)
  useEffect(() => {
    const start = performance.now();
    const duration = 1900; // slightly under 2s so it never "completes" early
    let raf;

    function tick(now) {
      const elapsed = now - start;
      const pct = Math.min(92, (elapsed / duration) * 92); // cap at 92%
      setProgress(pct);
      if (elapsed < duration) raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div dir="rtl" className="flex flex-col items-center justify-center py-16 gap-8 select-none">
      {/* Pulsing icon */}
      <div className="relative flex items-center justify-center">
        <span className="absolute inline-flex h-20 w-20 rounded-full bg-indigo-300 opacity-30 animate-ping" />
        <div className="relative z-10 w-20 h-20 rounded-full bg-indigo-600 flex items-center justify-center shadow-lg">
          <svg className="w-9 h-9 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M9 7H7a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V9a2 2 0 00-2-2h-2M9 7a2 2 0 012-2h2a2 2 0 012 2M9 7h6m-3 4v4m-2-2h4" />
          </svg>
        </div>
      </div>

      {/* Text */}
      <div className="text-center space-y-2">
        <p className="text-lg font-bold text-indigo-800">מחשב אחוזי נכות</p>
        <p className="text-sm text-indigo-500 h-5 transition-all duration-300">{STEPS[stepIndex]}</p>
      </div>

      {/* Progress bar */}
      <div className="w-64 bg-indigo-100 rounded-full h-2 overflow-hidden">
        <div
          className="h-2 bg-indigo-500 rounded-full"
          style={{ width: `${progress}%`, transition: 'width 80ms linear' }}
        />
      </div>
    </div>
  );
}

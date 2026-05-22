'use client';

import React from 'react';

const steps = [
  { id: 'claimTypeSelection', label: 'סוג תביעה', number: 1 },
  { id: 'diseaseSelection',   label: 'בחר מחלה',  number: 2 },
  { id: 'severitySelection',  label: 'בחר חומרה', number: 3 },
  { id: 'results',            label: 'תוצאות',    number: 4 },
];

// Screens that belong to the same visual step as another screen
const SCREEN_ALIAS = {
  workAccidentQuestionnaire: 'claimTypeSelection',
};

export default function ProgressBar({ currentScreen }) {
  const resolvedScreen = SCREEN_ALIAS[currentScreen] || currentScreen;
  const currentIndex = steps.findIndex((s) => s.id === resolvedScreen);

  return (
    <div dir="rtl" className="flex items-center justify-center mb-6 select-none" aria-label="שלבי המחשבון">
      {steps.map((step, idx) => {
        const isCompleted = idx < currentIndex;
        const isActive = idx === currentIndex;
        const isFuture = idx > currentIndex;

        return (
          <React.Fragment key={step.id}>
            {/* Step pill */}
            <div className="flex flex-col items-center gap-1">
              <div className="relative flex items-center justify-center">
                {/* Pulse ring for active step */}
                {isActive && (
                  <span className="absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-60 animate-ping" />
                )}
                <div
                  className={[
                    'relative z-10 flex items-center justify-center rounded-full font-bold text-sm transition-colors duration-300',
                    'h-9 w-9',
                    isCompleted
                      ? 'bg-indigo-600 text-white'
                      : isActive
                        ? 'bg-indigo-500 text-white ring-2 ring-indigo-300'
                        : 'bg-gray-200 text-gray-500',
                  ].join(' ')}
                >
                  {isCompleted ? (
                    /* Checkmark for completed */
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    step.number
                  )}
                </div>
              </div>
              <span
                className={[
                  'text-xs font-medium whitespace-nowrap',
                  isCompleted || isActive ? 'text-indigo-700' : 'text-gray-400',
                ].join(' ')}
              >
                {step.label}
              </span>
            </div>

            {/* Connector line between steps */}
            {idx < steps.length - 1 && (
              <div
                className={[
                  'flex-1 h-0.5 mx-2 mb-4 rounded transition-colors duration-300',
                  idx < currentIndex ? 'bg-indigo-500' : 'bg-gray-200',
                ].join(' ')}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

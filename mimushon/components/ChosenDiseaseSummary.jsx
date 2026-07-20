'use client';

import { useState } from "react";

const ChosenDiseasesSummary = ({
    modes,
    chosenDiseasesWithSeverities,
    onCalculate,
    setCurrentScreen,
    onRemoveDisease,
    onAddDisease,
    isMobileView = false,
    onClose,
}) => {
    const [tosAccepted, setTosAccepted] = useState(false);
    const [tosShake, setTosShake] = useState(false);

    const handleCalculateClick = () => {
        if (!tosAccepted && chosenDiseases.length > 0) {
            setTosShake(true);
            setTimeout(() => setTosShake(false), 700);
            return;
        }
        onCalculate(chosenDiseases);
        setCurrentScreen("results");
    };

    const chosenDiseases = chosenDiseasesWithSeverities.filter(
        (entry) => entry.selectedSeverity
    );

    const getModeApplicability = (severity) => {
        const applicableModes = modes
            .filter((mode) => severity[mode.dataKey])
            .map((mode) => mode.name);
        if (applicableModes.length === 0) return "(לא רלוונטי לחישוב)";
        return `(רלוונטי ל: ${applicableModes.join(", ")})`;
    };

    return (
        <div
            className={
                isMobileView
                    ? "h-full flex flex-col p-2"
                    : "sticky top-24 bg-indigo-50 p-6 rounded-xl shadow-lg border border-indigo-200"
            }
        >
            {isMobileView && (
                <button
                    onClick={onClose}
                    className="absolute cursor-pointer top-3 left-3 text-gray-600 hover:text-gray-900 z-10 p-1 rounded-full hover:bg-gray-100"
                >
                    <svg
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            )}
            <h2 className="text-xl font-bold text-indigo-800 mb-4 px-3">המחלות שנבחרו</h2>
            {chosenDiseases.length > 0 ? (
                <div className="space-y-4 flex-grow">
                    {chosenDiseases.map((entry) => (
                        <div
                            key={entry.disease.id}
                            className="bg-white p-3 rounded-lg shadow-sm border border-indigo-200"
                        >
                            <div className="flex items-center justify-between">
                                <p className="text-md font-semibold text-gray-800">
                                    {entry.disease.name}
                                </p>
                                <button
                                    onClick={() => onRemoveDisease(entry.disease.id)}
                                    className="p-1 bg-gray-600 text-white cursor-pointer rounded-full hover:bg-gray-500"
                                    title="Remove Disease"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
                            {entry.selectedSeverity ? (
                                <div className="text-sm text-gray-700 mt-1">
                                    "{entry.selectedSeverity.description.split("\n")[0]}"
                                    <p className="text-xs text-gray-500">
                                        {getModeApplicability(entry.selectedSeverity)}
                                    </p>
                                </div>
                            ) : (
                                <p className="font-bold text-sm text-gray-700 mt-1 border border-red-500">
                                    יש לבחור דרגת חומרה
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex-grow flex items-center justify-center">
                    <p className="text-indigo-700 text-center">יש לבחור מחלות כדי לצפות בסיכום</p>
                </div>
            )}
            <style>{`
                @keyframes tos-shake {
                    0%,100% { transform: translateX(0); }
                    20% { transform: translateX(-6px); }
                    40% { transform: translateX(6px); }
                    60% { transform: translateX(-4px); }
                    80% { transform: translateX(4px); }
                }
                .tos-shake { animation: tos-shake 0.6s ease; }
            `}</style>
            <div className="mt-6 space-y-3">
                {/* TOS checkbox */}
                <label
                    className={`flex items-start gap-2 cursor-pointer select-none rounded-lg p-2 transition-all duration-200 ${tosShake ? 'tos-shake bg-red-50 border border-red-400' : 'border border-transparent'}`}
                >
                    <input
                        type="checkbox"
                        checked={tosAccepted}
                        onChange={(e) => setTosAccepted(e.target.checked)}
                        className="mt-0.5 h-4 w-4 shrink-0 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                    />
                    <span className="text-xs text-gray-700 leading-relaxed">
                        קראתי ואני מסכים/ה ל
                        <a className="text-indigo-700 underline" href="/terms" target="_blank">תנאי השימוש</a>
                        {" "}ול
                        <a className="text-indigo-700 underline" href="/privacy" target="_blank">מדיניות הפרטיות</a>
                        . ידוע לי שהמחשבון הוא כלי הערכה בלבד ואינו תחליף לייעוץ מקצועי.
                    </span>
                </label>
                {tosShake && (
                    <p className="text-xs text-red-600 font-semibold text-center -mt-1">
                        יש לאשר את תנאי השימוש לפני המשך
                    </p>
                )}

                <button
                    onClick={handleCalculateClick}
                    disabled={chosenDiseases.length === 0}
                    id="submit-diseases"
                    name="submit-diseases"
                    className="w-full p-3 cursor-pointer bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    חשב אחוזי נכות
                </button>
                {isMobileView && (
                    <>
                        <button
                            onClick={onAddDisease}
                            className="w-full p-3 cursor-pointer bg-white text-indigo-700 border-2 border-indigo-400 rounded-lg font-semibold hover:bg-indigo-50 transition"
                        >
                            + הוסף מחלה
                        </button>
                        <button
                            onClick={onClose}
                            className="w-full p-3 cursor-pointer bg-gray-100 text-gray-700 border border-gray-300 rounded-lg font-semibold hover:bg-gray-200 transition"
                        >
                            סגור סיכום
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default ChosenDiseasesSummary;

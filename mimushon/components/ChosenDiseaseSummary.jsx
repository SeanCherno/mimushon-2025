const ChosenDiseasesSummary = ({
    modes,
    chosenDiseasesWithSeverities,
    onCalculate,
    setCurrentScreen,
    onRemoveDisease,
    isMobileView = false,
    onClose,
}) => {
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
                    : "sticky top-24 bg-purple-50 p-6 rounded-xl shadow-lg border border-purple-200"
            }
        >
            {isMobileView && (
                <button
                    onClick={onClose}
                    className="absolute cursor-pointer top-4 right-4 text-gray-600 hover:text-gray-900 z-10"
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
            <h2 className="text-xl font-bold text-indigo-800 mb-4">המחלות שנבחרו</h2>
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
                                    className="p-1 bg-slate-600 text-white cursor-pointer rounded-full hover:bg-slate-500"
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
            <div className="mt-6 space-y-3">
                <button
                    onClick={() => {
                        onCalculate(chosenDiseases);
                        setCurrentScreen("results");
                    }}
                    disabled={chosenDiseases.length === 0}
                    id="submit-diseases"
                    name="submit-diseases"
                    className="w-full p-3 cursor-pointer bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition disabled:bg-gray-400"
                >
                    חשב אחוזי נכות
                </button>
                {isMobileView && (
                    <button
                        onClick={onClose}
                        className="w-full p-3 cursor-pointer bg-gray-600 text-white p-2 rounded-lg font-semibold hover:bg-gray-700"
                    >
                        סגור סיכום
                    </button>
                )}
                <p className="text-xs text-slate-700 text-center">המשך לחישוב סופי של אחוזי הנכות מהווה אישור של <a className="text-blue-700 underline" href="/terms" target="_blank">תנאי השימוש</a> ושל <a className="text-blue-700 underline" href="privacy" target="_blank">מדיניות הפרטיות</a></p>
            </div>
        </div>
    );
};

export default ChosenDiseasesSummary;

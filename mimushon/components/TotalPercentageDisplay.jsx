import { useState } from "react";
import Tooltip from "./content/Tooltip";

const TotalPercentageDisplay = ({ setCurrentScreen, modes, totalPercentages, chosenDiseasesWithSeverities, onStartOver }) => {
  const [showBreakdown, setShowBreakdown] = useState(false);
  const allRequiredDocuments = chosenDiseasesWithSeverities.flatMap(entry => entry.disease.requiredDocuments || []);
  const uniqueDocuments = [...new Set(allRequiredDocuments)];

  return (
    <div id="total-percentage" className="p-6 bg-indigo-100 rounded-lg border-2 border-indigo-300 text-center">
      <div className="space-y-3">
        {modes.map(mode => (
          <div key={mode.id} className="relative flex justify-between items-center bg-white p-3 rounded-lg shadow-sm">
            <span className="text-lg font-semibold text-indigo-700">{mode.name}:</span>
            <span className="text-2xl font-bold text-indigo-600">{Math.round(totalPercentages.newTotals[mode.id])}%</span>
            <Tooltip content={mode.content} />
          </div>
        ))}
      </div>

      <div className="mt-4">
        <button
          onClick={() => setShowBreakdown(prev => !prev)}
          className="w-full flex items-center justify-between p-3 bg-indigo-200 text-indigo-800 rounded-lg font-semibold hover:bg-indigo-300 transition duration-200"
        >
          <span>פירוט המחלות שנבחרו</span>
          <svg
            className={`w-5 h-5 transform transition-transform duration-200 ${showBreakdown ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {showBreakdown && (
          <div className="mt-2 space-y-2 text-right">
            {chosenDiseasesWithSeverities
              .filter(entry => entry.selectedSeverity)
              .map(entry => (
                <div key={entry.disease.id} className="bg-white p-3 rounded-lg border border-indigo-200 shadow-sm">
                  <p className="font-semibold text-gray-800">{entry.disease.name}</p>
                  <p className="text-sm text-gray-600 mt-1">"{entry.selectedSeverity.description.split("\n")[0]}"</p>
                </div>
              ))}
          </div>
        )}
      </div>

      {uniqueDocuments.length > 0 && (
        <div className="mt-6 text-right">
          <h3 className="text-lg font-semibold text-indigo-700 mb-2">מסמכים נדרשים עבור המחלות שנבחרו:</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-1 inline-block text-right">
            {uniqueDocuments.map((doc, index) => (
              <li key={index} className="text-sm">{doc}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <button
          onClick={onStartOver}
          className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
        >
          התחל מחדש
        </button>
        <button
          onClick={() => setCurrentScreen("diseaseSelection")}
          className="flex-1 px-6 py-3 bg-white text-slate-800 border border-indigo-400 rounded-lg font-semibold hover:bg-indigo-50 transition"
        >
          הוסף מחלה נוספת
        </button>
      </div>
      <p className="text-xs text-indigo-700 mt-4">המחשבון הינו כלי להערכה בלבד, ואינו מהווה גורם מוסמך לקביעת אחוזי נכות.</p>
    </div>
  );
};

export default TotalPercentageDisplay;

import Tooltip from "./content/Tooltip";

const TotalPercentageDisplay = ({ setCurrentScreen, modes, totalPercentages, chosenDiseasesWithSeverities, onStartOver }) => {
  const allRequiredDocuments = chosenDiseasesWithSeverities.flatMap(entry => entry.disease.requiredDocuments || []);
  const uniqueDocuments = [...new Set(allRequiredDocuments)];

  return (
    <div id="total-percentage" className="mt-8 p-6 bg-indigo-100 rounded-lg border-2 border-indigo-300 text-center">
            <div className="space-y-3">
                {modes.map(mode => (
                    <div key={mode.id} className="relative flex justify-between items-center bg-white p-3 rounded-lg shadow-sm">
                         <span className="text-lg font-semibold text-indigo-700">{mode.name}:</span>
                         <span className="text-2xl font-bold text-indigo-600">{Math.round(totalPercentages.newTotals[mode.id])}%</span>  
                         <Tooltip content={mode.content} />
                    </div>
                ))}
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
      <button onClick={onStartOver} className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition">
        התחל מחדש
      </button>
      <button onClick={() => {setCurrentScreen("diseaseSelection")}} className="mx-4 flex-1 p-3 bg-slate-500 text-white text-slate-800 rounded-lg font-semibold hover:bg-slate-400 transition">
        הוסף מחלה נוספת
      </button>
      <p className="text-xs text-indigo-700 mt-2">המחשבון הינו כלי להערכה בלבד, ואינו מהווה גורם מוסמך לקביעת אחוזי נכות.</p>
    </div>
  );
};

export default TotalPercentageDisplay;
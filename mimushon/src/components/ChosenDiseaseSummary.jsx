import { useEffect } from "react";

const ChosenDiseasesSummary = ({ modes, chosenDiseasesWithSeverities, onCalculate, setCurrentScreen, onRemoveDisease, onEmptyList }) => {
 const chosenDiseases = chosenDiseasesWithSeverities.filter(entry => entry.selectedSeverity);

  // const modeToCountKey = {
  //   'generalDisability': 'countForDisability',
  //   'taxIncome': 'countForTax',
  //   'specialServices': 'countForSpecial'
  // };
  // const currentModeCountKey = modeToCountKey[currentMode];

    const getModeApplicability = (severity) => {
        const applicableModes = modes
            .filter(mode => severity[mode.dataKey])
            .map(mode => mode.name);
        if (applicableModes.length === 0) return "(לא רלוונטי לחישוב)";
        return `(רלוונטי ל: ${applicableModes.join(', ')})`;
    };

  if (chosenDiseasesWithSeverities.length === 0) {
    onEmptyList()
  }

  // return chosenDiseases.length > 0 ? (
  //   <div className="mb-8 p-6 bg-indigo-100 rounded-xl border-2 border-indigo-300">
  //     <h2 className="text-xl font-bold text-indigo-800 mb-4">המחלות שנבחרו:</h2>
  //     <div className="space-y-4">
  //       {chosenDiseases.map((entry, index) => (
  //         <div key={entry.disease.id} className="flex items-center justify-between bg-indigo-50 p-3 rounded-lg shadow-sm border border-indigo-200">
  //           <div>
  //             <p className="text-lg font-semibold text-gray-800">{entry.disease.name}</p>
  //             {entry.selectedSeverity ? (
  //               <p className="text-md text-gray-700 ml-2">
  //                  "{entry.selectedSeverity.description.split("\n")[0]}" - <span className="font-bold text-indigo-700">{entry.selectedSeverity.percentage}%</span>
  //               </p>
  //             ) : (
  //               <p className="text-sm text-gray-600 ml-2">לא נבחרה עדיין דרגת חומרה.</p>
  //             )}
  //           </div>
  //           <p className="text-sm text-gray-500 mt-1">
  //             {getModeApplicability(entry.selectedSeverity)}
  //           </p>
  //           <button
  //             onClick={() => onRemoveDisease(entry.disease.id)}
  //             className="ml-4 p-2 bg-slate-700 text-white rounded-full hover:bg-slate-600 transition duration-200 ease-in-out"
  //             title="Remove Disease"
  //           >
  //              <svg
  //       xmlns="http://www.w3.org/2000/svg"
  //       className="h-5 w-10"
  //       viewBox="0 0 24 24"
  //       fill="none"
  //       stroke="currentColor"
  //       strokeWidth="2"
  //       strokeLinecap="round"
  //       strokeLinejoin="round"
  //   >
  //       <polyline points="3 6 5 6 21 6"></polyline>
  //       <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
  //       <line x1="10" y1="11" x2="10" y2="17"></line>
  //       <line x1="14" y1="11" x2="14" y2="17"></line>
  //   </svg>
  //           </button>
  //         </div>
  //       ))}
  //     </div>
  //   </div>
  // ) : <div></div>;

      return (
        <div className="p-6 bg-indigo-100 rounded-xl border-2 border-indigo-300 h-full flex flex-col">
            <h2 className="text-xl font-bold text-indigo-800 mb-4">המחלות שנבחרו</h2>
            {chosenDiseases.length > 0 ? (
                <div className="space-y-4 flex-grow">
                    {chosenDiseases.map((entry) => (
                        <div key={entry.disease.id} className="bg-white p-3 rounded-lg shadow-sm border border-indigo-200">
                           <div className="flex items-center justify-between">
                             <p className="text-md font-semibold text-gray-800">{entry.disease.name}</p>
                             <button
                                onClick={() => onRemoveDisease(entry.disease.id)}
                                className="p-1 bg-slate-600 text-white rounded-full hover:bg-slate-500"
                                title="Remove Disease"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                           </div>
                            <p className="text-sm text-gray-700 mt-1">
                                "{entry.selectedSeverity.description.split("\n")[0]}" - <span className="font-bold text-indigo-700">{entry.selectedSeverity.percentage}%</span>
                            </p>
                            <p className="text-xs text-gray-500">{getModeApplicability(entry.selectedSeverity)}</p>
                        </div>
                        
                    ))}
                </div>
            ) : (
                <div className="flex-grow flex items-center justify-center">
                    <p className="text-indigo-700 text-center">עדיין לא נבחרו מחלות.</p>
                </div>
            )}
            <div className="mt-6 space-y-3">
                 {/* <button 
                    onClick={onAddNew}
                    className="w-full p-3 bg-slate-400 text-white rounded-lg font-semibold hover:bg-slate-500 transition"
                 >
                    הוסף מחלה חדשה
                </button> */}
                <button 
                    onClick={() =>{ onCalculate(chosenDiseasesWithSeverities); setCurrentScreen("results")}}
                    disabled={chosenDiseases.length === 0}
                    className="w-full p-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition disabled:bg-gray-400"
                >
                    חשב אחוזי נכות
                </button>
            </div>
        </div>
    );
};

export default ChosenDiseasesSummary;
import React, { useState } from "react";

const SeverityTable = ({ disease, onSeverityChange, chosenDiseasesWithSeverities }) => {

      const [rightLabel, setRightLabel] = useState(null);
    const [topLabel, setTopLabel] = useState(null);
  //  const modeToCountKey = {
  //   'generalDisability': 'countForDisability',
  //   'taxIncome': 'countForTax',
  //   'specialServices': 'countForSpecial'
  // };
  // const currentModeCountKey = modeToCountKey[currentMode];

  const currentDiseaseEntry = chosenDiseasesWithSeverities.find(
    entry => entry.disease.id === disease.id
  );
  const selectedSeverityForThisDisease = currentDiseaseEntry ? currentDiseaseEntry.selectedSeverity : null;

  // Map severities to a lookup object by severityId for quick access
  const severitiesById = disease.severities.reduce((acc, sev) => {
    acc[sev.severityId] = sev;
    return acc;
  }, {});

  // Validate tableRows existence
  if (!disease.tableRows || !Array.isArray(disease.tableRows) || disease.tableRows.length === 0) {
    console.error("Missing or invalid tableRows definition for disease:", disease.name, disease.tableRows);
    return (
      <div className="mb-8 p-6 bg-red-100 rounded-xl border border-red-400 text-red-800" dir="rtl">
        שגיאה: חסרה או לא תקינה הגדרת שורות הטבלה עבור מחלה זו. אנא וודא/י שהנתונים ב-JSON תקינים.
      </div>
    );
  }

      const handleConfirmClick = () => {
        if (!rightLabel || !topLabel) {
            return; 
        }

        const selectedRow = disease.tableRows.find(row => row.header === rightLabel);
        const columnIndex = disease.tableColumns.findIndex(col => col === topLabel);

        // --- Logic for Original Data Structure ---
        if (selectedRow && columnIndex !== -1) {
            // 1. Find the ID from the grid
            const severityId = selectedRow.severityIdsInRow[columnIndex - 1]; // -1 to account for header column
            
            // 2. Look up the full severity object in the map
            const severity = severitiesById[severityId]; 
            
            if (severity) {
                onSeverityChange(disease, severity);
            }
        }
    };

  // Determine column headers dynamically from the first row's severityIds, if tableColumns not fully defined
  // For this manual tableRows approach, tableColumns should define the headers explicitly.
  const columnHeaders = disease.tableColumns.slice(1); // Exclude the first column header (for rows)

  return (!disease.topLabel && !disease.sideLabel) ? (
    <div className={`mb-8 p-4 sm:p-6 rounded-xl`} dir="rtl">
       {disease.topLabel && (
        <h3 className="text-xl font-bold text-center text-indigo-800 mb-4">
          {disease.topLabel}
        </h3>
      )}

      {/* 2. Flex Container: Wraps both the side label and the table */}
      <div className="flex items-center gap-1">
        
        {/* 3. Side Label: Rotated text */}
        {disease.sideLabel && (
           <div className="flex-shrink-0">
             <p className="text-lg font-semibold text-indigo-700 transform -rotate-90 whitespace-nowrap">
               {disease.sideLabel}
             </p>
           </div>
        )}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-indigo-300 rounded-lg shadow-sm">
          <thead>
            <tr className="bg-indigo-200 text-indigo-700 uppercase text-sm leading-normal">
              <th className={`py-3 ${disease.eyesightTable ? "px-1" : "px-6"} text-right`}>{disease.tableColumns[0]}</th>
              {columnHeaders.map((colHeader, idx) => (
                <th key={idx} className={`py-3 ${disease.eyesightTable ? "px-1" : "px-6"} text-right`}>{colHeader}</th>
              ))}
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {disease.tableRows.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-b border-gray-200 hover:bg-gray-100">
                <td className={`py-3 ${disease.eyesightTable ? "px-1" : "px-6"} text-right font-semibold`}>{row.header}</td> {/* Row header */}
                {row.severityIdsInRow.map((severityId, colIndex) => {
                  const severity = severitiesById[severityId];
                  // Check if severity exists AND is relevant for the current mode
                  const isRelevantAndExists = severity
                  const isChecked = selectedSeverityForThisDisease && severity && selectedSeverityForThisDisease.severityId === severity.severityId;

                  return (
                    <td key={colIndex} className={`py-3 ${disease.eyesightTable ? "px-1" : "px-6"} text-right whitespace-nowrap`}>
                      {isRelevantAndExists ? (
                        <label className="inline-flex items-center cursor-pointer">
                          <input
                            type="radio"
                            id={`severity-${disease.id}-${severity.severityId}`}
                            name={`severity-${disease.id}`}
                            className="form-radio h-5 w-5 text-green-600 rounded-full border-gray-300 focus:ring-green-500"
                            checked={isChecked}
                            onChange={() => onSeverityChange(disease, severity)}
                          />
                          <span className="ml-2">{disease.eyesightTable ? "" : severity.percentage + "%"}</span>
                        </label>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  )

   :
        <div className="mb-8 p-4 sm:p-6 rounded-xl bg-indigo-50 border border-indigo-600" dir="rtl">
            <div className="space-y-6 bg-white p-6 border border-indigo-300 rounded-lg shadow">
                
                {disease.topLabel && (
                    <div>
                        <label htmlFor="top-label-select" className="block text-lg font-semibold text-indigo-800 mb-2">
                            {disease.topLabel}
                        </label>
                        <select
                            id="top-label-select"
                            value={topLabel || ""}
                            onChange={(e) => setTopLabel(e.target.value)}
                            className="w-full p-3 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                        >
                            <option value="" disabled>בחר/י ערך...</option>
                            {disease.tableColumns.slice(1).map((colName, index) => (
                                <option key={index} value={colName}>{colName}</option>
                            ))}
                        </select>
                    </div>
                )}

                {disease.sideLabel && (
                    <div>
                        <label htmlFor="side-label-select" className="block text-lg font-semibold text-indigo-800 mb-2">
                            {disease.sideLabel}
                        </label>
                        <select
                            id="side-label-select"
                            value={rightLabel || ""}
                            onChange={(e) => setRightLabel(e.target.value)}
                            className="w-full p-3 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                        >
                            <option value="" disabled>בחר/י ערך...</option>
                            {disease.tableRows.map((row, index) => (
                                <option key={index} value={row.header}>{row.header}</option>
                            ))}
                        </select>
                    </div>
                )}
            </div>

            <div className="mt-6">
                <button
                    onClick={handleConfirmClick}
                    disabled={!rightLabel || !topLabel}
                    className="w-full p-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-all duration-200 ease-in-out disabled:bg-gray-400 disabled:cursor-not-allowed shadow-md disabled:shadow-none"
                >
                    חשב אחוז נכות
                </button>
            </div>

            {/* {selectedSeverity && (
                <div className="mt-6 p-4 bg-indigo-100 rounded-lg text-center transition-all duration-300 ease-in-out">
                    <span className="text-xl font-bold text-indigo-900">
                        אחוז נכות: {selectedSeverity.percentage}%
                    </span>
                    <p className="text-sm text-indigo-700 mt-1">
                      (תיאור: {selectedSeverity.description})
                    </p>
                </div>
            )} */}
        </div>
    
};

export default SeverityTable
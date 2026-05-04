'use client'

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
    <div className="mb-8 rounded-xl" dir="rtl">

      {/* ── Desktop / tablet: scrollable table ─────────────────────────── */}
      <div className="hidden sm:block overflow-x-auto rounded-xl border border-indigo-200 shadow-sm">
        <table className="min-w-full bg-white text-sm">
          <thead>
            <tr className="bg-indigo-100 text-indigo-700 text-xs uppercase">
              <th className={`py-3 ${disease.eyesightTable ? "px-2" : "px-4"} text-right font-semibold whitespace-nowrap`}>
                {disease.tableColumns[0]}
              </th>
              {columnHeaders.map((colHeader, idx) => (
                <th key={idx} className={`py-3 ${disease.eyesightTable ? "px-2" : "px-4"} text-center font-semibold whitespace-nowrap`}>
                  {colHeader}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {disease.tableRows.map((row, rowIndex) => (
              <tr key={rowIndex} className={rowIndex % 2 === 0 ? "bg-white" : "bg-indigo-50/40"}>
                <td className={`py-3 ${disease.eyesightTable ? "px-2" : "px-4"} text-right font-semibold text-gray-700 whitespace-nowrap`}>
                  {row.header}
                </td>
                {row.severityIdsInRow.map((severityId, colIndex) => {
                  const severity = severitiesById[severityId];
                  const isChecked = selectedSeverityForThisDisease && severity &&
                    selectedSeverityForThisDisease.severityId === severity.severityId;
                  return (
                    <td key={colIndex} className={`py-3 ${disease.eyesightTable ? "px-2" : "px-4"} text-center`}>
                      {severity ? (
                        <label className="inline-flex items-center justify-center cursor-pointer">
                          <input
                            type="radio"
                            id={`severity-${disease.id}-${severity.severityId}`}
                            name={`severity-${disease.id}`}
                            className={`h-5 w-5 text-indigo-600 border-gray-300 focus:ring-indigo-500 cursor-pointer ${isChecked ? "ring-2 ring-indigo-400" : ""}`}
                            checked={!!isChecked}
                            onChange={() => onSeverityChange(disease, severity)}
                          />
                        </label>
                      ) : (
                        <span className="text-gray-300 text-lg">—</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Mobile: stacked cards ────────────────────────────────────────── */}
      <div className="sm:hidden space-y-3">
        {disease.tableRows.map((row, rowIndex) => (
          <div key={rowIndex} className="bg-white rounded-xl border border-indigo-200 shadow-sm overflow-hidden">
            {/* Row header */}
            <div className="bg-indigo-100 px-4 py-2">
              <p className="text-sm font-bold text-indigo-800">{row.header}</p>
            </div>
            {/* Options grid */}
            <div className="grid grid-cols-2 gap-2 p-3">
              {row.severityIdsInRow.map((severityId, colIndex) => {
                const severity = severitiesById[severityId];
                const colLabel = columnHeaders[colIndex];
                const isChecked = selectedSeverityForThisDisease && severity &&
                  selectedSeverityForThisDisease.severityId === severity.severityId;
                if (!severity) return (
                  <div key={colIndex} className="flex items-center justify-between px-3 py-2 rounded-lg bg-gray-50 opacity-40">
                    <span className="text-xs text-gray-500">{colLabel}</span>
                    <span className="text-gray-300">—</span>
                  </div>
                );
                return (
                  <label
                    key={colIndex}
                    className={`flex items-center justify-between gap-2 px-3 py-2 rounded-lg border-2 cursor-pointer transition ${
                      isChecked
                        ? "border-indigo-500 bg-indigo-50"
                        : "border-gray-200 bg-white hover:border-indigo-300"
                    }`}
                  >
                    <span className="text-xs font-medium text-gray-700 leading-snug">{colLabel}</span>
                    <input
                      type="radio"
                      name={`severity-${disease.id}`}
                      className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500 shrink-0"
                      checked={!!isChecked}
                      onChange={() => onSeverityChange(disease, severity)}
                    />
                  </label>
                );
              })}
            </div>
          </div>
        ))}
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
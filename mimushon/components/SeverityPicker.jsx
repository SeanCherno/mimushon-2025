'use client'

import React, { useState } from "react";
import SeverityTable from "./SeverityTable";
import BMICalculator from "./content/BmiCalculator";
import Tooltip from "./content/Tooltip";
import ScoringSystemQuestionnaire from "./ScoringSystemQuestionnaire";
import ConditionalQuestionnaire from "./ConditionalQuestionnaire";

/* ─────────────────────────────────────────────────────────────────────────────
   SeverityPicker — the grade-selection body, embeddable inside an impairment
   card. It is the old full-screen SeveritySelection stripped of its page chrome
   (back arrow, big title, "add disease" footer) so it can live inline within a
   card in the accretive builder.

   It preserves every input mode the data model supports:
     • radio list of graded descriptions (with linked-section "מעבר" buttons)
     • matrix table (displayAsTable + tableRows)  → delegated to SeverityTable
     • two-dropdown lookup (topLabel / sideLabel)  → delegated to SeverityTable
     • interactive scoring / conditional questionnaires that suggest a grade
     • the "how do I know which section" guide accordion
     • required-documents accordion
     • the BMI helper for disease_68

   Props:
     disease                        — the full disease object being graded
     chosenDiseasesWithSeverities   — so the picker can reflect the current pick
     onSeverityChange(disease, sev) — commit a grade
     onNavigateToLinkedDisease(targets, linkedSeverityId) — jump to linked section
───────────────────────────────────────────────────────────────────────────── */

const SeverityPicker = ({
  disease,
  chosenDiseasesWithSeverities,
  onSeverityChange,
  onNavigateToLinkedDisease,
}) => {
  const [showInteractiveGuide, setShowInteractiveGuide] = useState(false);
  const [isGuiding, setIsGuiding] = useState(false);
  const [showDocuments, setShowDocuments] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

  if (!disease) return null;

  const currentDiseaseEntry = chosenDiseasesWithSeverities.find(
    (entry) => entry.disease.id === disease.id
  );
  const selectedSeverityForThisDisease = currentDiseaseEntry
    ? currentDiseaseEntry.selectedSeverity
    : null;

  const handleSeveritySuggestion = (suggestedSeverity) => {
    onSeverityChange(disease, suggestedSeverity);
    setShowInteractiveGuide(false);
    setIsGuiding(false);
  };

  const hasScoringQuestionnaire = disease.scoringQuestionnaire;
  const hasConditionalQuestionnaire = disease.conditionalQuestionnaire;
  const displayAsTable = disease.displayAsTable;

  // Some sections grade the "dominant" vs "non-dominant" side differently. The
  // term "דומיננטי" is unclear to many users, so show a one-line explainer
  // whenever this disease's grades or table columns reference it.
  const usesDominantSide =
    disease.severities?.some((s) => s.description?.includes("דומיננט")) ||
    disease.tableColumns?.some((c) => c?.includes("דומיננט"));

  return (
    <div dir="rtl" className="space-y-4">
      {/* Image gallery (illustrative) */}
      {disease.imageUrls && disease.imageUrls.length > 0 && (
        <div className="p-3 bg-gray-50 rounded-lg overflow-x-auto whitespace-nowrap border border-gray-200">
          {disease.imageUrls.map((url, index) => (
            <img
              key={index}
              src={url}
              width={500}
              alt={`${disease.name} ${index + 1}`}
              className="inline-block h-auto rounded-lg shadow-sm ml-3 last:ml-0 border border-gray-300"
              onError={(e) => {
                e.target.src =
                  "https://placehold.co/400x200/94A3B8/FFFFFF?text=Image+Not+Found";
              }}
            />
          ))}
        </div>
      )}

      {/* Interactive severity guide (only for diseases that define one) */}
      {(hasScoringQuestionnaire || hasConditionalQuestionnaire) && !displayAsTable && (
        <div>
          {!showInteractiveGuide ? (
            <button
              type="button"
              onClick={() => {
                setShowInteractiveGuide(true);
                setIsGuiding(true);
              }}
              className="w-full relative bg-indigo-500 text-white p-3 rounded-lg font-semibold hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition shadow-sm"
            >
              התחלת מדריך אינטראקטיבי לקביעת דרגה
              <span className="absolute top-1 left-1 bg-indigo-100 text-indigo-800 text-xs font-bold px-2 py-0.5 rounded-full">
                מומלץ
              </span>
            </button>
          ) : (
            <>
              {hasScoringQuestionnaire && (
                <ScoringSystemQuestionnaire
                  questionnaireData={disease.scoringQuestionnaire}
                  severities={disease.severities}
                  onSuggestSeverity={handleSeveritySuggestion}
                  onCancel={() => {
                    setShowInteractiveGuide(false);
                    setIsGuiding(false);
                  }}
                />
              )}
              {hasConditionalQuestionnaire && (
                <ConditionalQuestionnaire
                  questionnaire={disease.conditionalQuestionnaire}
                  severities={disease.severities}
                  onSuggestSeverity={handleSeveritySuggestion}
                  onCancel={() => {
                    setShowInteractiveGuide(false);
                    setIsGuiding(false);
                  }}
                />
              )}
            </>
          )}
        </div>
      )}

      {/* "Which section applies to me?" guide */}
      {disease.guide && (
        <div>
          <button
            type="button"
            onClick={() => setShowGuide(!showGuide)}
            aria-expanded={showGuide}
            className="w-full flex items-center justify-between p-3 bg-indigo-100 text-indigo-800 rounded-lg font-semibold hover:bg-indigo-200 transition"
          >
            <span>איך אדע איזו דרגה מתאימה לי?</span>
            <svg
              className={`w-5 h-5 transition-transform duration-200 ${showGuide ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {showGuide && (
            <div className="preserve-whitespace mt-2 bg-gray-50 p-4 rounded-lg border border-indigo-200 text-gray-800">
              {disease.guide}
            </div>
          )}
        </div>
      )}

      {/* Dominant-side explainer — shown only for sections that grade the
          dominant vs non-dominant side differently. */}
      {usesDominantSide && (
        <div className="flex items-start gap-2 rounded-lg border border-indigo-200 bg-indigo-50 px-3 py-2 text-xs text-indigo-900">
          <svg xmlns="http://www.w3.org/2000/svg" className="mt-0.5 h-4 w-4 shrink-0 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="leading-relaxed">
            הצד ה<strong>דומיננטי</strong> הוא <strong>היד/הרגל החזקה</strong> — זו שבה את/ה משתמש/ת באופן טבעי (למשל היד שבה כותבים). הצד הלא-דומיננטי הוא הצד החלש יותר.
          </span>
        </div>
      )}

      {/* The grade selector itself */}
      {displayAsTable && !isGuiding ? (
        <SeverityTable
          disease={disease}
          onSeverityChange={onSeverityChange}
          chosenDiseasesWithSeverities={chosenDiseasesWithSeverities}
        />
      ) : (
        !isGuiding && (
          <div>
            <p className="text-xs text-gray-600 bg-indigo-50 border border-indigo-100 rounded-lg px-3 py-2 mb-3">
              בחר/י את התיאור הקרוב ביותר למצבך. הקביעה הסופית והמחייבת נעשית תמיד
              על ידי הוועדה הרפואית — לא על ידי המחשבון.
            </p>
            {disease.severities && disease.severities.length > 0 ? (
              <div role="radiogroup" aria-label={`דרגת חומרה עבור ${disease.name}`}>
                {disease.severities.map((severity, index) => {
                  // A severity may link to one section (linkedDiseaseId) or several
                  // (linkedDiseaseIds) when the regulation says "set by the
                  // appropriate section". Normalize both into one list.
                  const linkTargets =
                    Array.isArray(severity.linkedDiseaseIds) &&
                    severity.linkedDiseaseIds.length > 0
                      ? severity.linkedDiseaseIds
                      : severity.linkedDiseaseId
                        ? [severity.linkedDiseaseId]
                        : [];
                  const hasLink = linkTargets.length > 0;
                  const isSelected =
                    selectedSeverityForThisDisease?.severityId === severity.severityId ||
                    selectedSeverityForThisDisease?.description === severity.description;
                  const inputId = `severity-${disease.id}-${index}`;
                  const [firstLine, ...restLines] = severity.description.split("\n");

                  return (
                    <label
                      key={severity.severityId || index}
                      htmlFor={inputId}
                      className={`flex items-start gap-3 p-3 mb-2 rounded-lg border-2 transition ${
                        hasLink || severity.disabled
                          ? "border-gray-200 bg-gray-50/60"
                          : isSelected
                            ? "border-indigo-500 bg-indigo-50 cursor-pointer"
                            : "border-gray-200 bg-white hover:border-indigo-300 hover:bg-indigo-50/40 cursor-pointer"
                      }`}
                    >
                      <input
                        type="radio"
                        id={inputId}
                        name={`severity-${disease.id}`}
                        disabled={hasLink || severity.disabled}
                        checked={!!isSelected}
                        onChange={() => onSeverityChange(disease, severity)}
                        className="mt-1 h-4 w-4 shrink-0 text-indigo-600 border-gray-300 focus:ring-indigo-500 cursor-pointer disabled:cursor-default"
                      />
                      <span className="flex-1 text-sm text-gray-700 leading-relaxed">
                        {restLines.length > 0 ? (
                          <>
                            <span>{firstLine}</span>
                            <span className="relative">
                              <Tooltip content={restLines.join("\n")} />
                            </span>
                          </>
                        ) : (
                          firstLine
                        )}
                      </span>
                      {hasLink && (
                        <button
                          type="button"
                          onClick={() =>
                            onNavigateToLinkedDisease(
                              linkTargets,
                              severity.linkedSeverityId,
                              disease.id
                            )
                          }
                          className="shrink-0 inline-flex items-center gap-1 px-3 py-1.5 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition shadow-sm"
                          title="מעבר לסעיף הקשור"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          {linkTargets.length > 1 ? "למעבר" : "מעבר"}
                        </button>
                      )}
                    </label>
                  );
                })}
              </div>
            ) : (
              <p className="text-gray-600 text-sm">לא נמצאו דרגות עבור מחלה זו.</p>
            )}
          </div>
        )
      )}

      {/* BMI helper for the one disease that needs it */}
      {disease.id === "disease_68" && <BMICalculator />}

      {/* Required documents */}
      {disease.requiredDocuments && disease.requiredDocuments.length > 0 && (
        <div>
          <button
            type="button"
            onClick={() => setShowDocuments(!showDocuments)}
            aria-expanded={showDocuments}
            className="w-full flex items-center justify-between p-3 bg-indigo-100 text-indigo-800 rounded-lg font-semibold hover:bg-indigo-200 transition"
          >
            <span>אילו מסמכים כדאי להכין?</span>
            <svg
              className={`w-5 h-5 transition-transform duration-200 ${showDocuments ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {showDocuments && (
            <div className="mt-2 bg-gray-50 p-4 rounded-lg border border-indigo-200 text-gray-800">
              <p className="font-semibold text-sm mb-2">
                הוועדה הרפואית עשויה לבקש מסמכים, תוצאות בדיקות ומכתבי סיכום. עבור{" "}
                {disease.name} מומלץ להכין:
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                {disease.requiredDocuments.map((doc, index) => (
                  <li key={index}>{doc}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SeverityPicker;

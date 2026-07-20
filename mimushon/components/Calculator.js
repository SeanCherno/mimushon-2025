"use client";

import React, { useState, useEffect, useRef } from "react";
import SeveritySelection from "../components/SeveritySelection";
import TotalPercentageDisplay from "../components/TotalPercentageDisplay";
import ChosenDiseasesSummary from "../components/ChosenDiseaseSummary";
import LoadingSpinner from "../components/util/LoadingSpinner";
import DiseaseSelectionScreen from "../components/DiseaseSelectionScreen";
import ProgressBar from "../components/ProgressBar";
import ClaimTypeSelection from "../components/ClaimTypeSelection";
import WorkAccidentScreen from "../components/WorkAccidentScreen";
import CalculatingScreen from "../components/CalculatingScreen";

export default function Calculator({ initialCategories }) {
  const [chosenDiseasesWithSeverities, setChosenDiseasesWithSeverities] =
    useState([]);
  const [selectedDiseaseForSeverityView, setSelectedDiseaseForSeverityView] =
    useState([]);
  const [totalPercentages, setTotalPercentages] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [calcError, setCalcError] = useState(false);
  const [currentScreen, setCurrentScreen] = useState("claimTypeSelection");
  const [categories, setCategories] = useState(initialCategories);
  const [showInfo, setShowInfo] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [isMobileSummaryOpen, setIsMobileSummaryOpen] = useState(false);
  const [isASeveritySelected, setIsASeveritySelected] = useState(false);
  const [liveTotals, setLiveTotals] = useState(null);
  const [claimType, setClaimType] = useState(null);
  const [workAccidentAnswers, setWorkAccidentAnswers] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const liveCalcTimerRef = useRef(null);

  const SESSION_KEY = 'mimushon_calc_state';

  // ── Restore state from sessionStorage on mount ─────────────────────────
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(SESSION_KEY);
      if (!saved) return;
      const parsed = JSON.parse(saved);
      const { diseases, screen, totals, savedClaimType, waAnswers } = parsed;

      // Sessions created before claimType was introduced have no savedClaimType.
      // Always require it so users aren't silently skipped past the new first step.
      if (!savedClaimType) {
        sessionStorage.removeItem(SESSION_KEY);
        return;
      }

      setClaimType(savedClaimType);
      if (diseases && diseases.length > 0) setChosenDiseasesWithSeverities(diseases);
      if (screen && screen !== 'severitySelection' && screen !== 'workAccidentQuestionnaire') setCurrentScreen(screen);
      if (totals && Object.keys(totals).length > 0) setTotalPercentages(totals);
      if (waAnswers) setWorkAccidentAnswers(waAnswers);
    } catch (e) {
      sessionStorage.removeItem(SESSION_KEY);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Persist state to sessionStorage whenever it changes ────────────────
  useEffect(() => {
    try {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify({
        diseases: chosenDiseasesWithSeverities,
        screen: currentScreen,
        totals: totalPercentages,
        savedClaimType: claimType,
        waAnswers: workAccidentAnswers,
      }));
    } catch (e) { /* quota exceeded or private browsing — silent */ }
  }, [chosenDiseasesWithSeverities, currentScreen, totalPercentages, claimType, workAccidentAnswers]);

  const modes = [
    {
      id: "generalDisability",
      name: "נכות כללית",
      dataKey: "countForDisability",
      content:
        "קצבה חודשית המשולמת למי שכושר העבודה שלו נפגע עקב מצבו הרפואי. גובה הקצבה נקבע לפי אחוזי הנכות ודרגת אי-הכושר שנקבעה.",
    },
    {
      id: "taxIncome",
      name: "מס הכנסה",
      dataKey: "countForTax",
      content:
        "נכות רפואית בשיעור של 90% ומעלה (או במקרים מסוימים, פחות מכך) עשויה לזכות בפטור מלא מתשלום מס הכנסה על הכנסות מיגיעה אישית, עד לתקרה שנתית.",
    },
    {
      id: "specialServices",
      name: "שירותים מיוחדים",
      dataKey: "countForSpecial",
      content:
        "מיועדת לאנשים הזקוקים לעזרה משמעותית בביצוע פעולות יומיומיות (כמו הלבשה, רחצה, אכילה). הקצבה נועדה לסייע במימון מטפל/ת.",
    },
  ];

  useEffect(() => {
    const section = document.getElementById("severitySelection");
    if (section) {
      section.scrollIntoView({
        behavior: "smooth", // This makes the scroll smooth
        block: "start", // Aligns the top of the element with the top of the viewport
      });
    }
  }, [selectedDiseaseForSeverityView]);

  useEffect(() => {
    const filteredDiseases = chosenDiseasesWithSeverities.filter(
      (disease) => disease.selectedSeverity
    );

    const findSeverity = filteredDiseases.filter(
      (disease) => disease.disease.id === selectedDiseaseForSeverityView.id
    );

    console.log(filteredDiseases);
    console.log(findSeverity);

    if (findSeverity.length > 0) {
      setIsASeveritySelected(true);
    } else {
      setIsASeveritySelected(false);
    }
  }, [selectedDiseaseForSeverityView]);

  useEffect(() => {
    // Only redirect when the user has already passed the claim type screen and
    // removes all their diseases — don't fire on initial mount where the array
    // is empty by default (that would stomp claimTypeSelection).
    if (
      chosenDiseasesWithSeverities.length === 0 &&
      currentScreen !== 'claimTypeSelection'
    ) {
      setCurrentScreen("diseaseSelection");
    }
  }, [chosenDiseasesWithSeverities]); // eslint-disable-line react-hooks/exhaustive-deps

  // Close mobile summary when the user navigates via the header menu
  useEffect(() => {
    const close = () => setIsMobileSummaryOpen(false);
    window.addEventListener('header-nav', close);
    return () => window.removeEventListener('header-nav', close);
  }, []);

  // Auto-calculate live totals whenever all chosen diseases have a severity
  useEffect(() => {
    if (liveCalcTimerRef.current) {
      clearTimeout(liveCalcTimerRef.current);
    }

    const allHaveSeverity =
      chosenDiseasesWithSeverities.length > 0 &&
      chosenDiseasesWithSeverities.every((entry) => entry.selectedSeverity);

    if (!allHaveSeverity) {
      return;
    }

    liveCalcTimerRef.current = setTimeout(async () => {
      try {
        const response = await fetch('/api/calculate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chosenDiseasesWithSeverities }),
        });
        const data = await response.json();
        setLiveTotals(data);
      } catch (err) {
        console.error('Live calculation failed:', err);
      }
    }, 600);

    return () => {
      if (liveCalcTimerRef.current) {
        clearTimeout(liveCalcTimerRef.current);
      }
    };
  }, [chosenDiseasesWithSeverities]);

  const handleFinalCalculation = async (chosenDiseases, modeKey) => {
    try {
      window.dataLayer?.push({ event: 'calc_calculated', disease_count: chosenDiseases.length });
    } catch (e) {}

    setIsCalculating(true);
    setIsMobileSummaryOpen(false);

    const section = document.getElementById("calculator");
    if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });

    try {
      // Run the API call and a minimum 2-second delay in parallel.
      // The user sees the calculating screen for at least 2s regardless of API speed.
      const [response] = await Promise.all([
        fetch(`/api/calculate`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chosenDiseasesWithSeverities: chosenDiseases, claimType }),
        }),
        new Promise(resolve => setTimeout(resolve, 2000)),
      ]);

      const data = await response.json();
      setTotalPercentages(data);
      setCalcError(false);

      try {
        window.dataLayer?.push({ event: 'calc_contact_form_submitted' });
      } catch (e) {}
    } catch (error) {
      console.error("Failed to calculate percentage:", error);
      setCalcError(true);
    } finally {
      setIsCalculating(false);
      setCurrentScreen("results");
    }
  };

  // Handle selection of a disease from the dropdown/list
  const handleDiseaseSelect = (disease) => {
    if (disease) {
      try {
        window.dataLayer?.push({ event: 'calc_disease_selected', disease_id: disease.id, disease_name: disease.name });
      } catch (e) {}

      // Set the disease for severity viewing
      setSelectedDiseaseForSeverityView(disease);
      //setFormSubmitted(false);
      setCurrentScreen("severitySelection");

      // Add the disease to chosenDiseasesWithSeverities if not already present
      setChosenDiseasesWithSeverities((prevChosen) => {
        if (!prevChosen?.some((entry) => entry.disease.id === disease.id)) {
          return [...prevChosen, { disease: disease, selectedSeverity: null }];
        }
        return prevChosen;
      });
    }
  };

  // Handle checkbox changes for severities
  const handleSeverityChange = (disease, severity) => {
    try {
      window.dataLayer?.push({ event: 'calc_severity_selected', disease_id: disease.id, severity_id: severity.severityId });
    } catch (e) {}

    //setCurrentScreen("summary");
    setIsASeveritySelected(true);

    setChosenDiseasesWithSeverities((prevChosen) => {
      const updatedChosen = prevChosen.map((entry) =>
        entry.disease.id === disease.id
          ? { ...entry, selectedSeverity: severity }
          : entry
      );
      return updatedChosen;
    });
    // Removed automatic linking here, it will now only happen via the explicit button
  };

  const handleNavigateToLinkedDisease = async (
    linkedDiseaseId,
    linkedSeverityId
  ) => {
    setIsLoading(true);
    const response = await fetch(`/api/diseases/${linkedDiseaseId}`);
    const data = await response.json();

    const linkedDisease = data.disease;
    if (linkedDisease) {
      console.log(data);
      // Set the selected disease for viewing
      setSelectedDiseaseForSeverityView(linkedDisease);
      if (data.subCategory) {
        setSelectedSubCategory(data.subCategory);
      }
      setSelectedCategory(data.category);

      setChosenDiseasesWithSeverities((prevChosen) => {
        const existingEntryIndex = prevChosen.findIndex(
          (entry) => entry.disease.id === linkedDisease.id
        );
        let newSelectedSeverity = null; // Default to null

        if (linkedSeverityId) {
          // If a specific linkedSeverityId is provided, find and use it
          newSelectedSeverity = linkedDisease.severities.find(
            (s) => s.severityId === linkedSeverityId
          );
          if (!newSelectedSeverity) {
            console.warn(
              `Linked severity with ID ${linkedSeverityId} not found in disease ${linkedDisease.name}.`
            );
          }
        }

        if (existingEntryIndex > -1) {
          // Update existing entry with the new selected severity (or null)
          return prevChosen.map((entry, index) =>
            index === existingEntryIndex
              ? { ...entry, selectedSeverity: newSelectedSeverity }
              : entry
          );
        } else {
          // Add new entry with the new selected severity (or null)
          return [
            ...prevChosen,
            { disease: linkedDisease, selectedSeverity: newSelectedSeverity },
          ];
        }
      });
      setIsLoading(false);
    } else {
      console.warn(`Linked disease with ID ${linkedDiseaseId} not found.`);
    }
  };

  const handleRemoveDisease = (diseaseIdToRemove) => {
    setChosenDiseasesWithSeverities((prevChosen) => {
      const updatedList = prevChosen.filter(
        (entry) => entry.disease.id !== diseaseIdToRemove
      );
      // If the removed disease was the one currently being viewed, clear the view
      if (
        selectedDiseaseForSeverityView &&
        selectedDiseaseForSeverityView.id === diseaseIdToRemove
      ) {
        setSelectedDiseaseForSeverityView(null);
        //setFormSubmitted(false);
      }
      if (updatedList.length === 0) {
        setCurrentScreen("diseaseSelection");
      }
      return updatedList;
    });
  };

  const handleAddDiseaseAndCloseModal = () => {
    setSelectedCategory(null);
    setSelectedSubCategory(null);
    setCurrentScreen("diseaseSelection");
    setIsMobileSummaryOpen(false);
  };

  const handleProceedAndCloseModal = () => {
    setCurrentScreen("userInfo");
    setIsMobileSummaryOpen(false);
  };

  const handleCommonConditionClick = async (diseaseId) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/diseases/${diseaseId}`);
      const data = await response.json();
      const disease = data.disease;
      if (disease) {
        handleDiseaseSelect(disease);
      } else {
        console.warn(`Common condition disease not found: ${diseaseId}`);
      }
    } catch (err) {
      console.error("Failed to load common condition disease:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartOver = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setChosenDiseasesWithSeverities([]);
    setSelectedCategory(null);
    setSelectedSubCategory(null);
    setTotalPercentages({});
    setLiveTotals(null);
    setCalcError(false);
    setClaimType(null);
    setWorkAccidentAnswers(null);
    setCurrentScreen("claimTypeSelection");
    const section = document.getElementById("calculator");
    if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case "claimTypeSelection":
        return (
          <ClaimTypeSelection
            onSelect={(type) => {
              setClaimType(type);
              if (type === 'work_accident') {
                setCurrentScreen("workAccidentQuestionnaire");
              } else {
                setCurrentScreen("diseaseSelection");
              }
            }}
          />
        );
      case "workAccidentQuestionnaire":
        return (
          <WorkAccidentScreen
            onComplete={(answers) => {
              setWorkAccidentAnswers(answers);
              setCurrentScreen("diseaseSelection");
            }}
            onBack={() => {
              setClaimType(null);
              setCurrentScreen("claimTypeSelection");
            }}
          />
        );
      case "diseaseSelection":
        return (
          <DiseaseSelectionScreen
            categories={categories}
            onDiseaseSelected={handleDiseaseSelect}
            chosenDiseases={chosenDiseasesWithSeverities}
            setCurrentScreen={setCurrentScreen}
            showInfo={showInfo}
            setShowInfo={setShowInfo}
            setSelectedCategory={setSelectedCategory}
            selectedCategory={selectedCategory}
            setSelectedSubCategory={setSelectedSubCategory}
            selectedSubCategory={selectedSubCategory}
            onStartOver={handleStartOver}
            onCategorySelected={(name) => {
              try {
                window.dataLayer?.push({ event: 'calc_category_selected', category_name: name });
              } catch (e) {}
            }}
            onCommonConditionClick={handleCommonConditionClick}
          />
        );
      case "severitySelection":
        return (
          <SeveritySelection
            key={selectedDiseaseForSeverityView.id} // This is the key fix
            selectedDiseaseForSeverityView={selectedDiseaseForSeverityView}
            onSeverityChange={handleSeverityChange}
            chosenDiseasesWithSeverities={chosenDiseasesWithSeverities}
            onNavigateToLinkedDisease={handleNavigateToLinkedDisease}
            onCancel={() => setCurrentScreen("diseaseSelection")}
            setCurrentScreen={setCurrentScreen}
            selectedCategory={selectedCategory}
            selectedSubCategory={selectedSubCategory}
            setSelectedSubCategory={setSelectedSubCategory}
            setSelectedCategory={setSelectedCategory}
            isASeveritySelected={isASeveritySelected}
          />
        );
      case "results":
        if (isLoading) return <LoadingSpinner asOverlay={true} />;
        if (calcError) return (
          <div className="text-center py-12 space-y-4" dir="rtl">
            <p className="text-2xl">⚠️</p>
            <p className="text-gray-700 font-semibold">אירעה שגיאה בחישוב. אנא נסה/י שוב.</p>
            <button
              onClick={() => handleFinalCalculation(chosenDiseasesWithSeverities)}
              className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              נסה שוב
            </button>
          </div>
        );
        return (
          <TotalPercentageDisplay
            totalPercentages={totalPercentages}
            chosenDiseasesWithSeverities={chosenDiseasesWithSeverities}
            isLoading={isLoading}
            onStartOver={handleStartOver}
            modes={modes}
            setCurrentScreen={setCurrentScreen}
            claimType={claimType}
            workAccidentAnswers={workAccidentAnswers}
          />
        );
      default:
        <DiseaseSelectionScreen
          categories={categories}
          onDiseaseSelected={handleDiseaseSelect}
          chosenDiseases={chosenDiseasesWithSeverities}
          setCurrentScreen={setCurrentScreen}
          showInfo={showInfo}
          setShowInfo={setShowInfo}
          setSelectedCategory={setSelectedCategory}
          selectedCategory={selectedCategory}
          setSelectedSubCategory={setSelectedSubCategory}
          selectedSubCategory={selectedSubCategory}
          onStartOver={handleStartOver}
          onCategorySelected={(name) => {
            try {
              window.dataLayer?.push({ event: 'calc_category_selected', category_name: name });
            } catch (e) {}
          }}
        />;
    }
  };

  return (
    <div className="assistant-400">
      <div>
        {isLoading && <LoadingSpinner asOverlay={true} />}
        <div className="bg-indigo-50">
          <div id="calculator"></div>
          <div className="mt-3 p-4 sm:p-8 font-sans text-gray-800 flex items-center justify-center">
            <div
              className="bg-white p-6 sm:p-10 rounded-xl shadow-2xl w-full border border-indigo-200"
              dir="rtl"
            >
              <h2 className="no-print text-3xl sm:text-4xl font-semibold text-center text-indigo-800 mb-1 sm:mb-8">
                מחשבון אחוזי נכות למחלות
              </h2>

              <div
                className="flex flex-col md:flex-row-reverse gap-8"
                dir="rtl"
              >
                {/* Sidebar */}
                <aside className="no-print w-full md:w-1/3 hidden md:block">
                  <ChosenDiseasesSummary
                    chosenDiseasesWithSeverities={chosenDiseasesWithSeverities}
                    onRemoveDisease={handleRemoveDisease}
                    onAddDisease={() => setCurrentScreen("diseaseSelection")}
                    onProceed={() => setCurrentScreen("userInfo")}
                    modes={modes}
                    onCalculate={handleFinalCalculation}
                    setCurrentScreen={setCurrentScreen}
                  />
                </aside>

                {/* Mobile FAB and Modal */}

                <div className="no-print md:hidden">
                  {chosenDiseasesWithSeverities.filter(
                    (disease) => disease.selectedSeverity
                  ).length > 0 && (
                    <button
                      onClick={() => setIsMobileSummaryOpen(true)}
                      className="fixed inset-x-0 bottom-6 mx-auto w-1/2 z-30 bg-indigo-600 border border-black text-white px-4 py-2.5 rounded-full shadow-lg hover:bg-indigo-700 transition flex flex-col items-center justify-center gap-0.5"
                      aria-label="View Summary"
                    >
                      {/* Disease count line */}
                      <span className="text-xs text-indigo-200 leading-none">
                        {chosenDiseasesWithSeverities.filter(d => d.selectedSeverity).length} מחלות נבחרו
                      </span>

                      {/* Main action row */}
                      <span className="flex items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                          />
                        </svg>
                        <span className="font-semibold text-sm leading-none">
                          חשב אחוזי נכות
                          {liveTotals?.newTotals?.generalDisability != null && (
                            <span className="mr-1 font-bold">
                              ~{Math.round(liveTotals.newTotals.generalDisability)}%
                            </span>
                          )}
                        </span>
                      </span>
                    </button>
                  )}

                  {isMobileSummaryOpen && (
                    <div
                      className={`fixed inset-0 bg-black/75 z-40 ${
                        isMobileSummaryOpen ? "" : "pointer-events-none"
                      }`}
                      onClick={() => setIsMobileSummaryOpen(false)}
                    >
                      <div
                        className={`fixed inset-y-0 mt-16 right-0 w-full max-w-sm bg-indigo-50 shadow-xl p-4 transform transition-transform ${
                          isMobileSummaryOpen ? "opacity-100" : "opacity-0"
                        }`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div
                          className={`modal-panel absolute top-0 bottom-0 right-0 w-full max-w-sm bg-indigo-50 shadow-xl p-4 ${
                            isMobileSummaryOpen
                              ? "translate-x-0"
                              : "translate-x-full"
                          }`}
                        >
                          <ChosenDiseasesSummary
                            chosenDiseasesWithSeverities={
                              chosenDiseasesWithSeverities
                            }
                            onRemoveDisease={handleRemoveDisease}
                            onAddDisease={handleAddDiseaseAndCloseModal}
                            onEmptyList={() => {
                              setCurrentScreen("diseaseSelection");
                              setIsMobileSummaryOpen(false);
                            }}
                            onProceed={handleProceedAndCloseModal}
                            isMobileView={true}
                            onClose={() => setIsMobileSummaryOpen(false)}
                            modes={modes}
                            onCalculate={handleFinalCalculation}
                            setCurrentScreen={setCurrentScreen}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Main Content */}
                <div className="w-full md:w-2/3">
                  {!isCalculating && currentScreen !== 'results' && (
                    <ProgressBar currentScreen={currentScreen} />
                  )}
                  {isCalculating ? <CalculatingScreen /> : renderScreen()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

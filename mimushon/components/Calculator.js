"use client";

import React, { useState, useEffect } from "react";
import SeveritySelection from "../components/SeveritySelection";
import TotalPercentageDisplay from "../components/TotalPercentageDisplay";
import ChosenDiseasesSummary from "../components/ChosenDiseaseSummary";
import LoadingSpinner from "../components/util/LoadingSpinner";
import DiseaseSelectionScreen from "../components/DiseaseSelectionScreen";

export default function Calculator({ initialCategories }) {
  const [chosenDiseasesWithSeverities, setChosenDiseasesWithSeverities] =
    useState([]);
  const [selectedDiseaseForSeverityView, setSelectedDiseaseForSeverityView] =
    useState([]);
  const [totalPercentages, setTotalPercentages] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [currentScreen, setCurrentScreen] = useState("diseaseSelection");
  const [categories, setCategories] = useState(initialCategories);
  const [showInfo, setShowInfo] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [isMobileSummaryOpen, setIsMobileSummaryOpen] = useState(false);
  const [isASeveritySelected, setIsASeveritySelected] = useState(false);

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
    if (chosenDiseasesWithSeverities.length === 0) {
      setCurrentScreen("diseaseSelection");
    }
  }, [chosenDiseasesWithSeverities]);

  const handleFinalCalculation = async (chosenDiseases, modeKey) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/calculate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chosenDiseasesWithSeverities: chosenDiseases,
        }),
      });
      const data = await response.json();
      setTotalPercentages(data);
    } catch (error) {
      console.error("Failed to calculate percentage:", error);
      setTotalPercentages(null); // Or some error state
    } finally {
      setIsLoading(false);
      setIsMobileSummaryOpen(false);

      const section = document.getElementById("final-percentage");
      if (section) {
        section.scrollIntoView({
          behavior: "smooth", // This makes the scroll smooth
          block: "start", // Aligns the top of the element with the top of the viewport
        });
      }
    }
  };

  // Handle selection of a disease from the dropdown/list
  const handleDiseaseSelect = (disease) => {
    if (disease) {
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
    setCurrentScreen("diseaseSelection");
    setIsMobileSummaryOpen(false);
  };

  const handleProceedAndCloseModal = () => {
    setCurrentScreen("userInfo");
    setIsMobileSummaryOpen(false);
  };

  const handleStartOver = () => {
    setChosenDiseasesWithSeverities([]);
    setSelectedCategory(null);
    setSelectedSubCategory(null);
    // setFormSubmitted(false);
    setCurrentScreen("diseaseSelection");
  };

  const renderScreen = () => {
    switch (currentScreen) {
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
          />
        );
      case "severitySelection":
        return (
          <SeveritySelection
            key={selectedDiseaseForSeverityView.id}
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
            onCalculate={handleFinalCalculation}
            modes={modes}
          />
        );
      case "results":
        return isLoading ? (
          <LoadingSpinner asOverlay={true} />
        ) : (
          <TotalPercentageDisplay
            totalPercentages={totalPercentages}
            chosenDiseasesWithSeverities={chosenDiseasesWithSeverities}
            isLoading={isLoading}
            onStartOver={handleStartOver}
            modes={modes}
            setCurrentScreen={setCurrentScreen}
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
        />;
    }
  };

  return (
    <div className="assistant-400">
      <div>
        {isLoading && <LoadingSpinner asOverlay={true} />}
        <div className=" bg-gradient-to-br from-indigo-50 to-indigo-50">
          <div id="calculator"></div>
          <div className="mt-3 p-4 sm:p-8 font-sans text-gray-800 flex items-center justify-center">
            <div
              className="bg-white p-6 sm:p-10 rounded-xl shadow-2xl w-full border border-indigo-200"
              dir="rtl"
            >
              <h2 className="text-3xl sm:text-4xl font-semibold text-center text-indigo-800 mb-4 sm:mb-6">
                מחשבון אחוזי נכות למחלות
              </h2>

              {/* Step indicator */}
              <div className="flex items-center justify-center gap-2 mb-6 text-sm font-medium" dir="rtl">
                {[
                  { key: "diseaseSelection", label: "בחירת מחלה", step: 1 },
                  { key: "severitySelection", label: "בחירת דרגה", step: 2 },
                  { key: "results", label: "חישוב", step: 3 },
                ].map(({ key, label, step }, i, arr) => {
                  const isActive = currentScreen === key;
                  const isDone =
                    (key === "diseaseSelection" && (currentScreen === "severitySelection" || currentScreen === "results")) ||
                    (key === "severitySelection" && currentScreen === "results");
                  return (
                    <React.Fragment key={key}>
                      <div className="flex flex-col items-center gap-1">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${isActive ? "bg-indigo-600 text-white" : isDone ? "bg-indigo-300 text-white" : "bg-indigo-100 text-indigo-400"}`}>
                          {isDone ? (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                            </svg>
                          ) : step}
                        </div>
                        <span className={`text-xs ${isActive ? "text-indigo-700 font-semibold" : "text-indigo-400"}`}>{label}</span>
                      </div>
                      {i < arr.length - 1 && (
                        <div className={`h-0.5 w-10 mb-4 rounded transition-colors ${isDone ? "bg-indigo-400" : "bg-indigo-100"}`} />
                      )}
                    </React.Fragment>
                  );
                })}
              </div>

              <div
                className="flex flex-col md:flex-row-reverse gap-8"
                dir="rtl"
              >
                {/* Sidebar */}
                <aside className="w-full md:w-1/3 hidden md:block">
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

                <div className="md:hidden">
                  {chosenDiseasesWithSeverities.filter(
                    (disease) => disease.selectedSeverity
                  ).length > 0 && (
                    <button
                      onClick={() => setIsMobileSummaryOpen(true)}
                      className="fixed inset-x-0 bottom-6 mx-auto w-1/2 z-30 bg-indigo-600 border border-black text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition flex items-center justify-center"
                      aria-label="View Summary"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 6h16M4 10h16M4 14h10"
                        />
                      </svg>
                      <p className="px-3">סיכום מחלות</p>
                      {chosenDiseasesWithSeverities.filter(
                        (disease) => disease.selectedSeverity
                      ).length > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center border-2 border-white">
                          {
                            chosenDiseasesWithSeverities.filter(
                              (disease) => disease.selectedSeverity
                            ).length
                          }
                        </span>
                      )}
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
                          className={`modal-panel absolute top-0 bottom-0 right-0 w-full max-w-sm bg-purple-50 shadow-xl p-4 ${
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
                <div className="w-full md:w-2/3">{renderScreen()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState, useEffect, useRef } from "react";
import TotalPercentageDisplay from "../components/TotalPercentageDisplay";
import LoadingSpinner from "../components/util/LoadingSpinner";
import CalculatingScreen from "../components/CalculatingScreen";
import ClaimBuilder from "../components/ClaimBuilder";
import { useFocusTrap } from "../lib/useFocusTrap";
import { track } from "../lib/analytics";

export default function Calculator({ initialCategories }) {
  const [chosenDiseasesWithSeverities, setChosenDiseasesWithSeverities] = useState([]);
  const [totalPercentages, setTotalPercentages] = useState({});
  const [calcData, setCalcData] = useState(null); // live { newTotals, breakdown, impairments }
  const [isFetchingCalc, setIsFetchingCalc] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [calcError, setCalcError] = useState(false);
  const [currentScreen, setCurrentScreen] = useState("builder"); // 'builder' | 'results'
  const [categories] = useState(initialCategories);
  const [claimType, setClaimType] = useState(null);
  const [workAccidentAnswers, setWorkAccidentAnswers] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);

  // Builder view state
  const [expandedId, setExpandedId] = useState(null);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [consent, setConsent] = useState(false);

  // When a severity references more than one linked section, this holds the
  // fetched candidates so the user can pick which one to jump to.
  const [linkMenu, setLinkMenu] = useState(null);

  const liveCalcTimerRef = useRef(null);
  const linkMenuRef = useFocusTrap(!!linkMenu); // a11y: trap focus in the link dialog
  const SESSION_KEY = "mimushon_calc_state";

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

  // ── Restore state from sessionStorage on mount ─────────────────────────────
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(SESSION_KEY);
      if (!saved) return;
      const { diseases, totals, savedClaimType, waAnswers } = JSON.parse(saved);
      if (diseases && diseases.length > 0) {
        setChosenDiseasesWithSeverities(diseases);
        // Reopen the first impairment that still needs a grade, if any.
        const firstUngraded = diseases.find((e) => !e.selectedSeverity);
        setExpandedId(firstUngraded ? firstUngraded.disease.id : null);
      }
      if (totals && Object.keys(totals).length > 0) setTotalPercentages(totals);
      if (savedClaimType) setClaimType(savedClaimType);
      if (waAnswers) setWorkAccidentAnswers(waAnswers);
    } catch {
      sessionStorage.removeItem(SESSION_KEY);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Persist to sessionStorage ──────────────────────────────────────────────
  useEffect(() => {
    try {
      sessionStorage.setItem(
        SESSION_KEY,
        JSON.stringify({
          diseases: chosenDiseasesWithSeverities,
          totals: totalPercentages,
          savedClaimType: claimType,
          waAnswers: workAccidentAnswers,
        })
      );
    } catch {
      /* quota exceeded or private browsing — silent */
    }
  }, [chosenDiseasesWithSeverities, totalPercentages, claimType, workAccidentAnswers]);

  // ── Live weighted calculation (debounced), for the "show the work" rail ─────
  useEffect(() => {
    if (liveCalcTimerRef.current) clearTimeout(liveCalcTimerRef.current);

    const graded = chosenDiseasesWithSeverities.filter((e) => e.selectedSeverity);
    if (graded.length === 0) {
      setCalcData(null);
      setIsFetchingCalc(false);
      return;
    }

    liveCalcTimerRef.current = setTimeout(async () => {
      setIsFetchingCalc(true);
      try {
        const res = await fetch("/api/calculate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          // live: true — this is an unconsented estimate; the server must not log it.
          body: JSON.stringify({ chosenDiseasesWithSeverities: graded, live: true }),
        });
        const data = await res.json();
        setCalcData(data);
      } catch (err) {
        console.error("Live calculation failed:", err);
      } finally {
        setIsFetchingCalc(false);
      }
    }, 350);

    return () => {
      if (liveCalcTimerRef.current) clearTimeout(liveCalcTimerRef.current);
    };
  }, [chosenDiseasesWithSeverities]);

  // ── Full reset (fired when the user clicks the header logo) ────────────────
  useEffect(() => {
    const handleReset = () => {
      setChosenDiseasesWithSeverities([]);
      setTotalPercentages({});
      setCalcData(null);
      setIsFetchingCalc(false);
      setIsLoading(false);
      setCalcError(false);
      setCurrentScreen("builder");
      setClaimType(null);
      setWorkAccidentAnswers(null);
      setIsCalculating(false);
      setExpandedId(null);
      setIsPickerOpen(false);
      setConsent(false);
      setLinkMenu(null);
      try { sessionStorage.removeItem(SESSION_KEY); } catch {}
      if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "instant" });
    };
    window.addEventListener("calculator-reset", handleReset);
    return () => window.removeEventListener("calculator-reset", handleReset);
  }, []);

  // Close the mobile summary sheet when navigating via the header menu is
  // handled inside ClaimBuilder; nothing needed here.

  // Close the linked-section picker on Escape (dialog semantics).
  useEffect(() => {
    if (!linkMenu) return;
    const onKey = (e) => e.key === "Escape" && setLinkMenu(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [linkMenu]);

  // ── Handlers ───────────────────────────────────────────────────────────────
  const handleDiseaseSelect = (disease) => {
    if (!disease) return;
    track("calc_disease_selected", { disease_id: disease.id, disease_name: disease.name });

    setChosenDiseasesWithSeverities((prev) =>
      prev.some((entry) => entry.disease.id === disease.id)
        ? prev
        : [...prev, { disease, selectedSeverity: null }]
    );
    setExpandedId(disease.id);
    setIsPickerOpen(false);
    scrollCardIntoView(disease.id);
  };

  const handleSeverityChange = (disease, severity) => {
    track("calc_severity_selected", { disease_id: disease.id, severity_id: severity.severityId });

    setChosenDiseasesWithSeverities((prev) =>
      prev.map((entry) =>
        entry.disease.id === disease.id ? { ...entry, selectedSeverity: severity } : entry
      )
    );
    // Intentionally do NOT auto-collapse the card here. Collapsing a tall card
    // (image, table, questionnaire) removes hundreds of px of height and yanks
    // the viewport onto unrelated content below. The card shows its graded state
    // in place; the user collapses it or moves on when ready.
  };

  const fetchDisease = (id) =>
    fetch(`/api/diseases/${id}`).then((response) => response.json());

  // Gently bring a just-added card's grading options into view — only if it's
  // off-screen (block:'nearest'), and instantly when reduced motion is set.
  const scrollCardIntoView = (id) => {
    requestAnimationFrame(() => {
      const el = document.getElementById(`imp-card-${id}`);
      if (!el) return;
      const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
      el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "nearest" });
    });
  };

  // Add (or update) a linked disease to the stack and open its card.
  //
  // When the user follows a "מעבר" link, the regulation is saying this
  // impairment's grade is determined *by the target section* — it is not a
  // second, separate impairment. So we REPLACE the source card with the target
  // rather than leaving the source sitting in the stack forever ungraded (it
  // could never be graded — its only relevant option is the disabled link).
  // `sourceDiseaseId` is the card the link was clicked from.
  const applyLinkedDisease = (data, linkedSeverityId, sourceDiseaseId) => {
    const linkedDisease = data && data.disease;
    if (!linkedDisease) {
      console.warn("Linked disease not found in fetched payload.");
      return;
    }

    setChosenDiseasesWithSeverities((prev) => {
      let preselected = null;
      if (linkedSeverityId) {
        preselected =
          linkedDisease.severities.find((s) => s.severityId === linkedSeverityId) || null;
      }

      // Drop the source card (unless it *is* the target, e.g. a self-referential
      // link) so no orphaned "needs a grade" card is left behind.
      let next = prev.filter(
        (entry) =>
          !(sourceDiseaseId && sourceDiseaseId !== linkedDisease.id && entry.disease.id === sourceDiseaseId)
      );

      const idx = next.findIndex((entry) => entry.disease.id === linkedDisease.id);
      if (idx > -1) {
        return next.map((entry, i) =>
          i === idx ? { ...entry, selectedSeverity: preselected } : entry
        );
      }
      return [...next, { disease: linkedDisease, selectedSeverity: preselected }];
    });

    setExpandedId(linkedDisease.id);
    setIsPickerOpen(false);
    scrollCardIntoView(linkedDisease.id);
  };

  // `targets` is a single id (legacy) or an array (a severity mapping to several
  // regulation sections). One target navigates straight; several open a picker.
  const handleNavigateToLinkedDisease = async (targets, linkedSeverityId, sourceDiseaseId) => {
    const ids = Array.isArray(targets) ? targets : [targets];
    if (ids.length === 0) return;

    setIsLoading(true);
    try {
      if (ids.length === 1) {
        const data = await fetchDisease(ids[0]);
        applyLinkedDisease(data, linkedSeverityId, sourceDiseaseId);
        return;
      }
      const datas = await Promise.all(ids.map(fetchDisease));
      const options = datas
        .map((data) =>
          data && data.disease
            ? { id: data.disease.id, name: data.disease.name, data }
            : null
        )
        .filter(Boolean);

      if (options.length === 1) {
        applyLinkedDisease(options[0].data, linkedSeverityId, sourceDiseaseId);
      } else if (options.length > 1) {
        setLinkMenu({ options, linkedSeverityId, sourceDiseaseId });
      }
    } catch (err) {
      console.error("Failed to load linked disease(s):", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePickLinkedDisease = (option) => {
    const linkedSeverityId = linkMenu?.linkedSeverityId;
    const sourceDiseaseId = linkMenu?.sourceDiseaseId;
    setLinkMenu(null);
    applyLinkedDisease(option.data, linkedSeverityId, sourceDiseaseId);
  };

  const handleRemoveDisease = (idToRemove) => {
    setChosenDiseasesWithSeverities((prev) => {
      const updated = prev.filter((entry) => entry.disease.id !== idToRemove);
      if (updated.length === 0) setIsPickerOpen(true);
      return updated;
    });
    setExpandedId((cur) => (cur === idToRemove ? null : cur));
  };

  // Which limb the impairment is on — needed for the reg. 11(ג) leg cap, since the
  // book doesn't encode side for legs. Stored on the entry; toggling re-picks.
  const handleSideChange = (diseaseId, side) => {
    setChosenDiseasesWithSeverities((prev) =>
      prev.map((entry) =>
        entry.disease.id === diseaseId
          ? { ...entry, side: entry.side === side ? null : side }
          : entry
      )
    );
  };

  const handleCommonConditionClick = async (diseaseId) => {
    setIsLoading(true);
    try {
      const data = await fetchDisease(diseaseId);
      if (data.disease) handleDiseaseSelect(data.disease);
      else console.warn(`Common condition disease not found: ${diseaseId}`);
    } catch (err) {
      console.error("Failed to load common condition disease:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleCard = (id) => {
    setExpandedId((cur) => (cur === id ? null : id));
  };

  const handleClaimTypeSelect = (type) => {
    setClaimType(type);
    if (type !== "work_accident") setWorkAccidentAnswers(null);
    try {
      if (type) track("calc_claim_type_selected", { claim_type: type });
    } catch {}
  };

  const handleStartOver = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setChosenDiseasesWithSeverities([]);
    setTotalPercentages({});
    setCalcData(null);
    setCalcError(false);
    setClaimType(null);
    setWorkAccidentAnswers(null);
    setExpandedId(null);
    setIsPickerOpen(true);
    setConsent(false);
    setCurrentScreen("builder");
    const section = document.getElementById("calculator");
    if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleFinalCalculation = async () => {
    const graded = chosenDiseasesWithSeverities.filter((e) => e.selectedSeverity);
    if (graded.length === 0) return;

    try {
      track("calc_calculated", { disease_count: graded.length });
    } catch {}

    setIsCalculating(true);
    const section = document.getElementById("calculator");
    if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });

    try {
      // Show the calculating screen for at least 2s regardless of API speed.
      const [response] = await Promise.all([
        fetch("/api/calculate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chosenDiseasesWithSeverities: graded, claimType }),
        }),
        new Promise((resolve) => setTimeout(resolve, 2000)),
      ]);
      const data = await response.json();
      setTotalPercentages(data);
      setCalcError(false);
    } catch (error) {
      console.error("Failed to calculate percentage:", error);
      setCalcError(true);
    } finally {
      setIsCalculating(false);
      setCurrentScreen("results");
    }
  };

  return (
    <div className="assistant-400">
      {isLoading && <LoadingSpinner asOverlay={true} />}

      {/* Linked-section picker — a severity that maps to more than one section */}
      {linkMenu && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          dir="rtl"
          onClick={() => setLinkMenu(null)}
        >
          <div
            ref={linkMenuRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-label="בחירת סעיף"
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-lg font-bold text-indigo-800">לאיזה סעיף לעבור?</h3>
              <button
                onClick={() => setLinkMenu(null)}
                className="text-gray-400 hover:text-gray-600 transition text-2xl leading-none"
                aria-label="סגירה"
              >
                ✕
              </button>
            </div>
            <p className="text-sm text-gray-500 mb-4">
              דרגה זו יכולה להיקבע לפי כמה סעיפים. בחר/י את הסעיף המתאים למצבך:
            </p>
            <div className="space-y-2">
              {linkMenu.options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handlePickLinkedDisease(option)}
                  className="w-full flex items-center justify-between gap-3 text-right p-3 bg-white rounded-lg border-2 border-indigo-200 hover:bg-indigo-50 hover:border-indigo-400 transition font-medium text-indigo-800"
                >
                  <span>{option.name}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="bg-indigo-50">
        <div id="calculator"></div>
        <div className="mt-3 p-4 sm:p-8 text-gray-800 flex items-center justify-center">
          <div
            className="bg-white p-5 sm:p-10 rounded-xl shadow-lg w-full max-w-6xl border border-indigo-200"
            dir="rtl"
          >
            {isCalculating ? (
              <CalculatingScreen />
            ) : currentScreen === "results" ? (
              calcError ? (
                <div className="text-center py-12 space-y-4" dir="rtl">
                  <p className="text-2xl">⚠️</p>
                  <p className="text-gray-700 font-semibold">אירעה שגיאה בחישוב. אנא נסה/י שוב.</p>
                  <button
                    onClick={handleFinalCalculation}
                    className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
                  >
                    נסה שוב
                  </button>
                </div>
              ) : (
                <TotalPercentageDisplay
                  totalPercentages={totalPercentages}
                  chosenDiseasesWithSeverities={chosenDiseasesWithSeverities}
                  impairments={totalPercentages?.impairments}
                  isLoading={isLoading}
                  onStartOver={handleStartOver}
                  onAddImpairment={() => setCurrentScreen("builder")}
                  modes={modes}
                  setCurrentScreen={setCurrentScreen}
                  claimType={claimType}
                  workAccidentAnswers={workAccidentAnswers}
                  onWorkAccidentComplete={setWorkAccidentAnswers}
                />
              )
            ) : (
              <ClaimBuilder
                categories={categories}
                chosenDiseasesWithSeverities={chosenDiseasesWithSeverities}
                calcData={calcData}
                isFetchingCalc={isFetchingCalc}
                claimType={claimType}
                onClaimTypeSelect={handleClaimTypeSelect}
                workAccidentAnswers={workAccidentAnswers}
                onWorkAccidentComplete={setWorkAccidentAnswers}
                expandedId={expandedId}
                onToggleCard={handleToggleCard}
                isPickerOpen={isPickerOpen}
                onOpenPicker={() => setIsPickerOpen(true)}
                onClosePicker={() => setIsPickerOpen(false)}
                consent={consent}
                onConsentChange={setConsent}
                onDiseaseSelect={handleDiseaseSelect}
                onSeverityChange={handleSeverityChange}
                onSideChange={handleSideChange}
                onRemoveDisease={handleRemoveDisease}
                onNavigateToLinkedDisease={handleNavigateToLinkedDisease}
                onCommonConditionClick={handleCommonConditionClick}
                onCategorySelected={(name) => {
                  try {
                    track("calc_category_selected", { category_name: name });
                  } catch {}
                }}
                onCalculate={handleFinalCalculation}
                onStartOver={handleStartOver}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

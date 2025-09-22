import React, { useState, useEffect } from "react";
import SeveritySelection from "./components/SeveritySelection";
import TotalPercentageDisplay from "./components/TotalPercentageDisplay";
import ChosenDiseasesSummary from "./components/ChosenDiseaseSummary";
// import CategoryMenu from "./components/CategoryMenu";
import UserInfoForm from "./components/UserInfoForm";
import LoadingSpinner from "./util/LoadingSpinner";
import DiseaseSelectionScreen from "./components/DiseaseSelectionScreen";
import Header from "./components/content/Header";
import HeroSection from "./components/content/HeroSection";
import HowWeHelpSection from "./components/content/HowWeHelpSection";
import ProcessSection from "./components/content/ProcessSection";
import WhyUsSection from "./components/content/WhyUsSection";
import ContactSection from "./components/content/ContactSection";
import Footer from "./components/content/Footer";
import Tooltip from "./components/content/Tooltip";
import AboutCalculatorSection from "./components/content/AboutCalculatorSection";
import { Routes, Route } from "react-router-dom";
import TermsPage from "./components/content/TermsPage";
import PrivacyPage from "./components/content/PrivacyPage";

function App() {
  // const saveToCookie = (data) => {
  //   // const filteredData = data.map(element => {
  //   //   return {
  //   //     disease: element.disease.id,
  //   //     selectedSeverity: element.selectedSeverity.severityId
  //   //   }
  //   // })
  //   try {
  //     const serializedData = JSON.stringify(data);
  //     console.log(serializedData);
  //     const expirationDate = new Date();
  //     expirationDate.setFullYear(expirationDate.getFullYear() + 1);
  //     document.cookie = `chosenDiseases=${serializedData}; expires=${expirationDate.toUTCString()}; path=/`;
  //   } catch (error) {
  //     console.error("Failed to save to cookie:", error);
  //   }
  // };

  // const loadFromCookie = () => {
  //   try {
  //     const name = "chosenDiseases=";
  //     const decodedCookie = decodeURIComponent(document.cookie);
  //     const ca = decodedCookie.split(";");
  //     for (let i = 0; i < ca.length; i++) {
  //       let c = ca[i];
  //       while (c.charAt(0) === " ") {
  //         c = c.substring(1);
  //       }
  //       if (c.indexOf(name) === 0) {
  //         console.log(JSON.parse(c.substring(name.length, c.length)));
  //         return JSON.parse(c.substring(name.length, c.length));
  //       }
  //     }
  //     return [];
  //   } catch (error) {
  //     console.error("Failed to load from cookie:", error);
  //     return [];
  //   }
  // };

  const [chosenDiseasesWithSeverities, setChosenDiseasesWithSeverities] =
    useState([]);
  const [selectedDiseaseForSeverityView, setSelectedDiseaseForSeverityView] =
    useState([]);
  const [totalPercentages, setTotalPercentages] = useState({});
  // const [userName, setUserName] = useState("");
  // const [userPhone, setUserPhone] = useState("");
  // const [userEmail, setUserEmail] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  // const [currentMode, setCurrentMode] = useState("generalDisability"); // Default mode
  const [isCalculating, setIsCalculating] = useState(false);
  const [diseasesData, setDiseasesData] = useState({});
  const [currentScreen, setCurrentScreen] = useState("diseaseSelection");
  const [categories, setCatergories] = useState([]);
  const [showInfo, setShowInfo] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [showContent, setShowContent] = useState(false);

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
    const fetchDiseases = async () => {
      try {
        const response = await fetch(`/api/diseases`);
        const data = await response.json();
        setDiseasesData(data);
        setCatergories(data.categories);
        // setChosenDiseasesWithSeverities(loadFromCookie());
      } catch (error) {
        console.error("Failed to fetch diseases data:", error);
      }
    };
    fetchDiseases();
  }, []);

  // const currentModeName = modes.find((mode) => mode.id === currentMode).name;
  // const currentModeDataKey = modes.find(
  //   (mode) => mode.id === currentMode
  // ).dataKey;

  // Flatten all diseases for searching across categories
  const allDiseasesFlat = diseasesData?.categories?.flatMap((category) => {
    // 1. Get diseases that are directly inside the category.
    const directDiseases = category.diseases || [];

    // 2. Get all diseases from all sub-categories, if they exist.
    const nestedDiseases =
      category.subcategories?.flatMap((sub) => sub.diseases || []) || [];

    // 3. Return the combined list for this category.
    // The outer flatMap merges the results from all categories.
    return [...directDiseases, ...nestedDiseases];
  });

  // // Filter diseases based on selected category first
  // const diseasesInSelectedCategory = selectedCategory
  //   ? selectedCategory.diseases
  //   : diseasesData?.categories?.flatMap((category) => category.diseases);

  // // Filter diseases further based on the search term
  // const filteredDiseases = diseasesInSelectedCategory?.filter((disease) =>
  //   disease.name.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  // useEffect(() => {
  //   setCurrentScreen("diseaseSelection");
  //   setChosenDiseasesWithSeverities([]);
  // }, [currentMode, currentModeDataKey]);

  useEffect(() => {
    const section = document.getElementById("severitySelection");
    if (section) {
      section.scrollIntoView({
        behavior: "smooth", // This makes the scroll smooth
        block: "start", // Aligns the top of the element with the top of the viewport
      });
    }
  }, [selectedDiseaseForSeverityView]);

  const handleFinalCalculation = async (chosenDiseases, modeKey) => {
    setIsCalculating(true);
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
      console.log(data);
      setTotalPercentages(data);
    } catch (error) {
      console.error("Failed to calculate percentage:", error);
      setTotalPercentages(null); // Or some error state
    } finally {
      setIsCalculating(false);

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
      setFormSubmitted(false);
      setCurrentScreen("severitySelection");

      // Add the disease to chosenDiseasesWithSeverities if not already present
      setChosenDiseasesWithSeverities((prevChosen) => {
        if (!prevChosen?.some((entry) => entry.disease.id === disease.id)) {
          return [...prevChosen, { disease: disease, selectedSeverity: null }];
        }
        return prevChosen;
      });
    } else {
      console.log("failed");
    }
  };

  // Handle checkbox changes for severities
  const handleSeverityChange = (disease, severity) => {
    setCurrentScreen("summary");

    const section = document.getElementById("calculator");
    if (section) {
      section.scrollIntoView({
        behavior: "smooth", // This makes the scroll smooth
        block: "start", // Aligns the top of the element with the top of the viewport
      });
    }

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

  const handleNavigateToLinkedDisease = (linkedDiseaseId, linkedSeverityId) => {
    console.log(allDiseasesFlat);
    const linkedDisease = allDiseasesFlat.find((d) => d.id === linkedDiseaseId);
    if (linkedDisease) {
      // Set the selected disease for viewing
      setSelectedDiseaseForSeverityView(linkedDisease);

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
    } else {
      console.warn(`Linked disease with ID ${linkedDiseaseId} not found.`);
    }
  };

  const handleRemoveDisease = (diseaseIdToRemove) => {
    setChosenDiseasesWithSeverities((prevChosen) => {
      const updatedList = prevChosen.filter(
        (entry) => entry.disease.id !== diseaseIdToRemove
      );
      console.log(updatedList);
      // If the removed disease was the one currently being viewed, clear the view
      if (
        selectedDiseaseForSeverityView &&
        selectedDiseaseForSeverityView.id === diseaseIdToRemove
      ) {
        setSelectedDiseaseForSeverityView(null);
        setFormSubmitted(false);
      }
      if (updatedList.length === 0) {
        setCurrentScreen("diseaseSelection");
      }
      return updatedList;
    });
  };

  const handleUserInfoFormSubmit = ({ name, phone, email }) => {
    // setUserName(name);
    // setUserPhone(phone);
    // setUserEmail(email);

    setFormSubmitted(true);
    handleFinalCalculation(chosenDiseasesWithSeverities);
    setCurrentScreen("results");
    // In a real application, you would send this data to a backend or do something with it.
    console.log("User Info Submitted:", { name, phone, email });
  };

  const handleStartOver = () => {
    setChosenDiseasesWithSeverities([]);
    setFormSubmitted(false);
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
          />
        );
      case "summary":
        return (
          <>
            <ChosenDiseasesSummary
              chosenDiseasesWithSeverities={chosenDiseasesWithSeverities}
              onRemoveDisease={handleRemoveDisease}
              onAddDisease={() => setCurrentScreen("diseaseSelection")}
              onProceed={() => setCurrentScreen("userInfo")}
              modes={modes}
            />
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setCurrentScreen("diseaseSelection")}
                className="flex-1 p-3 bg-slate-400 text-white rounded-lg font-semibold hover:bg-slate-600 transition"
              >
                הוסף/י מחלה נוספת
              </button>
              <button
                onClick={() => {
                  handleFinalCalculation(chosenDiseasesWithSeverities);
                  setCurrentScreen("results");
                }}
                className="flex-1 p-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
              >
                המשך לחישוב
              </button>
            </div>
          </>
        );
      // case "userInfo":
      //   return (
      //     <UserInfoForm
      //       onBack={() => setCurrentScreen("summary")}
      //       onFormSubmit={handleUserInfoFormSubmit}
      //     />
      //   );
      case "results":
        return isCalculating ? (
          <LoadingSpinner asOverlay={true} />
        ) : (
          <TotalPercentageDisplay
            totalPercentages={totalPercentages}
            chosenDiseasesWithSeverities={chosenDiseasesWithSeverities}
            isCalculating={isCalculating}
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
        />;
    }
  };

  const HomePage = () => (
    <div className="assistant-400">
      <main>
        <div className=" bg-gradient-to-br from-indigo-50 to-indigo-50">
          <HeroSection setShowInfo={setShowInfo} />
          <div id="calculator"></div>
          <div className="mt-6 p-4 sm:p-8 font-sans text-gray-800 flex items-center justify-center">
            <div
              className="bg-white p-6 sm:p-10 rounded-xl shadow-2xl w-full max-w-4xl border border-indigo-200"
              dir="rtl"
            >
              <h1 className="text-3xl sm:text-4xl font-semibold text-center text-indigo-800 mb-8">
                מחשבון אחוזי נכות למחלות
              </h1>

              {/* <div className="mb-6 flex flex-row text-center justify-center space-x-2 sm:space-x-4 p-2">
                {modes.map((modeOption) => (
                  <button
                    key={modeOption.id}
                    onClick={() => setCurrentMode(modeOption.id)}
                    className={`relative px-4 py-2 rounded-lg font-semibold flex-1 transition duration-200 ease-in-out
                ${
                  currentMode === modeOption.id
                    ? "bg-indigo-600 text-white shadow-md"
                    : "bg-white text-indigo-700 hover:bg-indigo-100 border border-indigo-300"
                }`}
                  >
                    <Tooltip content={modeOption.content} />
                    {modeOption.name}
                  </button>
                ))}
              </div> */}

              <section>{renderScreen()}</section>
            </div>
          </div>

          {((!selectedCategory && !selectedSubCategory) || showContent) && (
            <>
              <HowWeHelpSection />
              <AboutCalculatorSection />
              <ProcessSection />
              {/* <WhyUsSection /> */}
            </>
          )}
          <ContactSection />
        </div>
      </main>
    </div>
  );

  if (!diseasesData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg">
          <p className="text-2xl font-bold text-indigo-800">טוען נתונים...</p>
          <div className="mt-4 animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header setShowContent={setShowContent} />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;

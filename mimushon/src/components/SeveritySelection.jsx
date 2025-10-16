import React, {useState, useEffect} from "react";
import GenericSeverityQuestionnaire from "./GenericSeverityQuestionnaire";
import SeverityTable from "./SeverityTable";
import BMICalculator from "./content/BmiCalculator";
import Tooltip from "./content/Tooltip"

const SeveritySelection = ({ selectedCategory, selectedSubCategory, setSelectedSubCategory, setSelectedCategory, setCurrentScreen, selectedDiseaseForSeverityView, onSeverityChange, chosenDiseasesWithSeverities, onNavigateToLinkedDisease }) => {
  const [severitySearchTerm, setSeveritySearchTerm] = useState('');
  const [showInteractiveGuide, setShowInteractiveGuide] = useState(false);
  const [isGuiding, setIsGuiding] = useState(false);
  const [showDocuments, setShowDocuments] = useState(false)
  const [showGuide, setShowGuide] = useState(false)
  const [back, setBack] = useState(null)

  // const modeToCountKey = {
  //   'generalDisability': 'countForDisability',
  //   'taxIncome': 'countForTax',
  //   'specialServices': 'countForSpecial'
  // };
  // const currentModeCountKey = modeToCountKey[currentMode];

  useEffect(() => {
    setBack(selectedCategory)
    console.log(selectedCategory)
  }, [selectedCategory])

  useEffect(() => {
    setBack(selectedSubCategory)
    console.log(selectedSubCategory)
  }, [selectedSubCategory])

  if (!selectedDiseaseForSeverityView) {
    return null;
  }

  // Find the currently selected severity for the disease being viewed
  const currentDiseaseEntry = chosenDiseasesWithSeverities.find(
    entry => entry.disease.id === selectedDiseaseForSeverityView.id
  );
  const selectedSeverityForThisDisease = currentDiseaseEntry ? currentDiseaseEntry.selectedSeverity : null;

  const filteredSeverities = selectedDiseaseForSeverityView.severities.filter(severity =>
    (isGuiding ? true : severity.description.toLowerCase().includes(severitySearchTerm.toLowerCase()))
  );

  const handleBack = () => {
     if (selectedSubCategory) {
            setSelectedSubCategory(back); // Treat it like a subcategory with its diseases
        } else {
        setSelectedCategory(back);
        }
        setCurrentScreen('diseaseSelection')
  }

  const handleSeveritySuggestion = (suggestedSeverity) => {
    onSeverityChange(selectedDiseaseForSeverityView, suggestedSeverity);
    setShowInteractiveGuide(false); // Close guide after suggestion
    setIsGuiding(false); // Reset guiding state
    setSeveritySearchTerm(''); // Clear search term
  };

  const hasQuestionnaire = selectedDiseaseForSeverityView.questionnaire &&
                           selectedDiseaseForSeverityView.questionnaire.questions &&
                           selectedDiseaseForSeverityView.questionnaire.questions.length > 0;

  const displayAsTable = selectedDiseaseForSeverityView.displayAsTable; // Re-added this line

  return (
    <div id="severitySelection" className="p-4 sm:p-6 bg-indigo-50 rounded-xl border border-indigo-200">
      <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg sm:text-2xl font-bold text-indigo-800 mb-4">
        בחר דרגה עבור: <span className="text-indigo-500">{selectedDiseaseForSeverityView.name}</span>
      </h2>
     <button 
  onClick={handleBack} 
  className="flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:underline"
>
  <svg height="25px" width="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M12.2929 4.29289C12.6834 3.90237 13.3166 3.90237 13.7071 4.29289L20.7071 11.2929C21.0976 11.6834 21.0976 12.3166 20.7071 12.7071L13.7071 19.7071C13.3166 20.0976 12.6834 20.0976 12.2929 19.7071C11.9024 19.3166 11.9024 18.6834 12.2929 18.2929L17.5858 13H4C3.44772 13 3 12.5523 3 12C3 11.4477 3.44772 11 4 11H17.5858L12.2929 5.70711C11.9024 5.31658 11.9024 4.68342 12.2929 4.29289Z" fill="#5a67d8"></path> </g></svg>
  <span>חזור</span>
</button>
      </div>
      {/* {selectedDiseaseForSeverityView.description && 
      <p className="text-indigo-600 text-m mb-6">{selectedDiseaseForSeverityView.description} </p>}
      Image Gallery */}
      {selectedDiseaseForSeverityView.imageUrls && selectedDiseaseForSeverityView.imageUrls.length > 0 && (
        <div className="mb-6 p-4 bg-gray-100 rounded-lg overflow-x-auto whitespace-nowrap scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
          {selectedDiseaseForSeverityView.imageUrls.map((url, index) => (
            <img
              key={index}
              src={url}
              width={500}
              alt={`${selectedDiseaseForSeverityView.name} ${index + 1}`}
              className="inline-block h-auto rounded-lg shadow-md mr-4 last:mr-0 border border-gray-300"
              onError={(e) => { e.target.src = 'https://placehold.co/400x200/94A3B8/FFFFFF?text=Image+Not+Found'; }}
            />
          ))}
        </div>
      )}

      {hasQuestionnaire && !displayAsTable && (
        <div className="mb-4">
          {!showInteractiveGuide && (
            <button
              onClick={() => { setShowInteractiveGuide(true); setIsGuiding(true); }}
              className="w-full relative bg-indigo-500 text-white p-3 rounded-lg font-semibold hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200 ease-in-out shadow-md"
            >
              התחל מדריך אינטראקטיבי לקביעת חומרה
              <span className="absolute top-1 right-1 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full animate-pulse transform -translate-y-1/2 translate-x-1/2">
                חדש
              </span>
            </button>
          )}
          {showInteractiveGuide && (
            <GenericSeverityQuestionnaire
              questionnaireData={selectedDiseaseForSeverityView.questionnaire}
              severities={selectedDiseaseForSeverityView.severities}
              onSuggestSeverity={handleSeveritySuggestion}
              onCancel={() => { setShowInteractiveGuide(false); setIsGuiding(false); }}
            />
          )}
        </div>
      )}

      {selectedDiseaseForSeverityView.guide && 
       <div className="mb-4">
          <button
            onClick={() => {
              setShowGuide(!showGuide)
            }}
            className="w-full flex items-center justify-between p-3 bg-indigo-200 text-indigo-800 rounded-lg font-semibold hover:bg-indigo-300 transition duration-200 ease-in-out"
          >
            <span>איך אדע באיזה סעיף לבחור?</span>
            <svg
              className={`w-5 h-5 transform transition-transform duration-200`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
           </button>
          {showGuide && 
          <div className="preserve-whitespace mt-2 bg-slate-50 p-4 rounded-lg border border-indigo-200 text-slate-800 space-y-1">
          {/* <ul className="mt-2 list-disc list-inside bg-slate-50 p-4 rounded-lg border border-indigo-200 text-indigo-800 space-y-1"> */}
            {/* <p className="font-semibold">הועדה הרפואית עשויה לבקש מסמכים, תוצאות של בדיקות ומכתבי סיכום שיעזרו לה להבין את מצבכם הרפואי לעומק. <br /><br />עבור {selectedDiseaseForSeverityView.name} מומלץ להכין את המסמכים הבאים:</p> */}
            {selectedDiseaseForSeverityView.guide} 
          {/* </ul> */}
          </div>}
          </div>}

      {displayAsTable && !isGuiding ? 
        <SeverityTable
          disease={selectedDiseaseForSeverityView}
          onSeverityChange={onSeverityChange}
          chosenDiseasesWithSeverities={chosenDiseasesWithSeverities}
        />
      : !isGuiding && ( // Only show manual filter and options if not in interactive guide
         <div className="pr-2 mb-6">
        {selectedDiseaseForSeverityView.severities.length > 0 ? (
          filteredSeverities.map((severity, index) => (
            <div key={index} className="flex items-start mb-3">
              <input
                type="radio"
                disabled={severity.linkedDiseaseId || severity.disabled}
                id={`severity-${selectedDiseaseForSeverityView.id}-${index}`}
                name={`severity-${selectedDiseaseForSeverityView.id}`} // Group radio buttons by disease
                className="text-indigo-600 rounded-full border-gray-300 focus:ring-indigo-500 cursor-pointer"
                style={{height: "15px", width: "15px", marginTop: "5px"}}
                checked={selectedSeverityForThisDisease && selectedSeverityForThisDisease.description === severity.description}
                onChange={() => onSeverityChange(selectedDiseaseForSeverityView, severity)} // Pass both disease and severity
              />
              <label htmlFor={`severity-${selectedDiseaseForSeverityView.id}-${index}`} className="ml-3 text-base text-gray-700 cursor-pointer preserve-whitespace">
                <span className="font-medium"> &nbsp;{severity.percentage}%:</span> 

                {severity.description.includes("\n") ?
               <span className="px-4 rounded-lg transition duration-200 ease-in-out"> 
               <span>{severity.description.split("\n")[0]}</span>
               <span className="relative">{<Tooltip style={{}} content={severity.description.split("\n").splice(1).join("\n")} />}</span>
               </span>
                 :
                severity.description}
              </label>
                  {severity.linkedDiseaseId && (
                      <button
                        onClick={() => onNavigateToLinkedDisease(severity.linkedDiseaseId, severity.linkedSeverityId)}
                        className="ml-4 px-3 py-1 bg-indigo-500 text-white text-sm rounded-lg hover:bg-indigo-600 transition duration-200 ease-in-out shadow-sm flex items-center"
                        title="מעבר למחלה קשורה"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        מעבר
                      </button>
                    )}
            </div>
            
          ))
        ) : (
          <p className="text-gray-600">לא נמצאו דרגות עבור המחלה שנבחרה.</p>
        )}
      </div>
      )}

      {selectedDiseaseForSeverityView.id === "disease_68" && 
      <><BMICalculator /></>}

       {selectedDiseaseForSeverityView.requiredDocuments && selectedDiseaseForSeverityView.requiredDocuments.length > 0 && (
        <div className="mb-4">
          <button
            onClick={() => {
              setShowDocuments(!showDocuments)
            }}
            className="w-full flex items-center justify-between p-3 bg-indigo-200 text-indigo-800 rounded-lg font-semibold hover:bg-indigo-300 transition duration-200 ease-in-out"
          >
            <span>אילו מסמכים צריך להכין?</span>
            <svg
              className={`w-5 h-5 transform transition-transform duration-200`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
           </button>
          {showDocuments && 
          <div>
          <ul className="mt-2 list-disc list-inside bg-slate-50 p-4 rounded-lg border border-indigo-200 text-slate-800 space-y-1">
            <p className="font-semibold">הועדה הרפואית עשויה לבקש מסמכים, תוצאות של בדיקות ומכתבי סיכום שיעזרו לה להבין את מצבכם הרפואי לעומק. <br /><br />עבור {selectedDiseaseForSeverityView.name} מומלץ להכין את המסמכים הבאים:</p>
            {selectedDiseaseForSeverityView.requiredDocuments.map((doc, index) => (
              <li key={index}>{doc}</li>
            ))} 
          </ul>
          </div>}
        </div>
      )}

    </div>
  );
};

export default SeveritySelection;
import React, { useState, useEffect } from "react";

const ConditionalQuestionnaire = ({ questionnaire, severities, onSuggestSeverity, onCancel }) => {
  const [currentQuestionId, setCurrentQuestionId] = useState(questionnaire.startQuestionId);
  const [answers, setAnswers] = useState({});
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setCurrentQuestionId(questionnaire.startQuestionId);
    setAnswers({});
    setHistory([]);
  }, [questionnaire]);

  const handleAnswer = (option, questionId) => {
    setAnswers({ ...answers, [questionId]: option.label });
    if (option.nextQuestionId) {
      setHistory([...history, questionId]);
      setCurrentQuestionId(option.nextQuestionId);
    } else if (option.severityId) {
      onSuggestSeverity(severities.find(s => s.severityId === option.severityId));
    }
  };

  const handleBack = () => {
    const prevQuestionId = history.pop();
    setHistory([...history]);
    setCurrentQuestionId(prevQuestionId);
  };

  const currentQuestion = questionnaire.questions[currentQuestionId];

  return (
    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 mt-4" dir="rtl">
      <h3 className="font-semibold text-lg text-gray-800 mb-3">מדריך מותנה</h3>
      <div className="mb-4 p-3 bg-white border border-gray-300 rounded-lg">
        <p className="font-medium text-gray-700 mb-2">{currentQuestion.text}</p>
        <div className="flex flex-col space-y-2">
          {currentQuestion.options.map((option, index) => (
            <button key={index} onClick={() => handleAnswer(option, currentQuestionId)} className="px-4 py-2 bg-indigo-500 cursor-pointer text-white rounded-lg hover:bg-indigo-600 transition duration-200 ease-in-out text-right">
              {option.label}
            </button>
          ))}
        </div>
      </div>
      <div className="flex justify-between mt-4">
        {history.length > 0 && <button onClick={handleBack} className="px-4 cursor-pointer py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400">חזור</button>}
        <button onClick={onCancel} className="px-4 py-2 cursor-pointer bg-red-500 text-white rounded-lg hover:bg-red-400">ביטול</button>
      </div>
    </div>
  );
};

export default ConditionalQuestionnaire;
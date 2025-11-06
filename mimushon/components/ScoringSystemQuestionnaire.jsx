'use client'

import React, { useState } from "react"

const ScoringSystemQuestionnaire = ({ questionnaireData, severities, onSuggestSeverity, onCancel }) => {
  const [currentAnswers, setCurrentAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const allQuestionsAnswered = questionnaireData.questions.every(q => currentAnswers.hasOwnProperty(q.id));

  const handleAnswerChange = (questionId, value) => {
    setCurrentAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
    let totalScore = 0;
    questionnaireData.questions.forEach(question => {
      const selectedOptionValue = currentAnswers[question.id];
      const selectedOption = question.options.find(opt => opt.value === selectedOptionValue);
      if (selectedOption && typeof selectedOption.points === 'number') {
        totalScore += selectedOption.points;
      }
    });


    let suggestedSeverity = null;

    for (const rule of questionnaireData.rules) {
      let matchesRule = true;

      if (rule.answers) {
        for (const [questionId, expectedValue] of Object.entries(rule.answers)) {
          if (currentAnswers[questionId] !== expectedValue) {
            matchesRule = false;
            break;
          }
        }
      }

      if (matchesRule && rule.scoreRange) {
        const [minScore, maxScore] = rule.scoreRange;
        if (totalScore < minScore || totalScore > maxScore) {
          matchesRule = false;
        }
      }

      if (matchesRule) {
        const foundSeverity = severities.find(s => s.description === rule.suggestedSeverityDescription);
        if (foundSeverity) {
          suggestedSeverity = foundSeverity;
          break;
        }
      }
    }

    if (!suggestedSeverity) {
      console.warn("No specific severity matched for the score, falling back.");
      suggestedSeverity = severities[0] || null;
    }
    onSuggestSeverity(suggestedSeverity);
  };

  return (
    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 mt-4" dir="rtl">
      <h3 className="font-semibold text-lg text-gray-800 mb-3">מדריך מבוסס ניקוד</h3>
      {questionnaireData.questions.map((question) => (
        <div key={question.id} className="mb-3">
          <p className="text-gray-700 font-bold mb-2">{question.text}</p>
          <div className="flex flex-col space-y-2">
            {question.options.map(option => (
              <label key={option.value} className="inline-flex items-center">
                <input type="radio" className="form-radio text-blue-600" name={question.id} value={option.value} checked={currentAnswers[question.id] === option.value} onChange={() => handleAnswerChange(question.id, option.value)} disabled={submitted} />
                <span className="mr-2 text-gray-700">{option.label} (+{option.points} נק')</span>
              </label>
            ))}
          </div>
        </div>
      ))}
      <div className="flex justify-end space-x-3 mt-4">
        <button onClick={onCancel} className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400">ביטול</button>
        <button onClick={handleSubmit} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50" disabled={submitted || !allQuestionsAnswered}>קבע חומרה</button>
      </div>
      {submitted && <p className="text-center text-sm text-green-700 mt-3">החומרה הוצעה!</p>}
    </div>
  );
}

export default ScoringSystemQuestionnaire
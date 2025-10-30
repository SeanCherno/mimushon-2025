import React from "react";

const CalculatorExplanation = ({ showContent, setShowContent }) => {
    return (<div className="flex justify-center">
        <div className="w-3/4">
            <div className="px-3">
                <button
                    onClick={() => {
                        setShowContent(!showContent);
                    }}
                    className="w-full border border-indigo-200 flex items-center justify-between p-3 bg-white rounded-lg cursor-pointer font-semibold hover:bg-indigo-300 transition duration-200 ease-in-out"
                >
                    <span>איך עובדת שיטת החישוב?</span>
                    <svg
                        className={`w-5 h-5 transform transition-transform duration-200`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                        ></path>
                    </svg>
                </button>
            </div>

            {showContent && (
                <div className="px-3">
                    <ol className="mt-2 list-decimal list-inside bg-slate-50 p-4 rounded-lg border border-indigo-200 space-y-1">
                        <p className="font-semibold">
                            זה לא חיבור פשוט — זו שיטה מבוססת, שקופה וברורה. <br />
                            <br />
                        </p>
                        <li>מתחילים מהליקוי עם אחוז הנכות הגבוה ביותר, מתוך 100%.</li>
                        <li>הליקוי הבא מחושב מתוך האחוזים שנותרו, לא מתוך 100%.</li>
                        <li>כל ליקוי נוסף מחושב מתוך מה שנותר לאחר הקודם.</li>
                        <li>
                            התוצאות מכל שלב מצטברות — ואם מתקבל שבר, הוא מעוגל כלפי מעלה.
                        </li>
                        <br />
                        <br />
                        <p className="font-semibold">
                            כך מתקבל אחוז נכות משוקלל, שמייצג בצורה מדויקת את ההשפעה המצטברת
                            של הליקויים שלך, בהתאם לתקנות הביטוח הלאומי.
                        </p>
                    </ol>
                </div>
            )}
        </div></div>)
}

export default CalculatorExplanation
import React from "react";

const CalculatorExplanation = ({ showContent, setShowContent }) => {
    return (

        <section className="py-16 md:py-24 bg-indigo-50">
            <div className="container mx-auto px-6">
                <div className="lg:flex lg:items-center lg:gap-16">
                    <div className="lg:w-1/2">
                        <h3 className="text-3xl md:text-4xl font-bold text-gray-900">איך עובד החישוב?</h3>
                        <p className="mt-4 text-lg text-gray-600"> זה לא חיבור פשוט — זו שיטה מבוססת, שקופה וברורה.</p>

                        <div className="px-3">
                            <ol className="mt-2 list-decimal list-inside rounded-lg space-y-1 text-gray-600 text-lg">
                                <li>מתחילים מהליקוי עם אחוז הנכות הגבוה ביותר, מתוך 100%.</li>
                                <li>הליקוי הבא מחושב מתוך האחוזים שנותרו, לא מתוך 100%.</li>
                                <li>כל ליקוי נוסף מחושב מתוך מה שנותר לאחר הקודם.</li>
                                <li>
                                    התוצאות מכל שלב מצטברות — ואם מתקבל שבר, הוא מעוגל כלפי מעלה.
                                </li>
                                <br />
                                <br />
                                <p className="font-semibold text-gray-800">
                                    כך מתקבל אחוז נכות משוקלל, שמייצג בצורה מדויקת את ההשפעה המצטברת
                                    של הליקויים שלך, בהתאם לתקנות הביטוח הלאומי.
                                </p>
                            </ol>
                        </div>
                    </div>
                    <div className="lg:w-1/2 mt-10 lg:mt-0">
                        <img src="/images/calculation.webp" alt="תהליך בירוקרטי" className="rounded-lg shadow-2xl w-full h-auto object-cover" />
                    </div>
                </div>
            </div>
        </section>)
}

export default CalculatorExplanation
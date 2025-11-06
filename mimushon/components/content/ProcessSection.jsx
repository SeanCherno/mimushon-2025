const ProcessSection = () => (
    <section id="process" className="py-16 md:py-24 bg-indigo-50">
        <div className="container mx-auto px-6">
            <div className="lg:flex lg:items-center lg:gap-16">
                <div className="lg:w-1/2 mt-10 lg:mt-0">
                    <img src="/images/bureaucracy.webp" alt="תהליך בירוקרטי" className="rounded-lg shadow-2xl w-full h-auto object-cover" />
                </div>
                <div className="lg:w-1/2">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">לא הולכים לאיבוד בבירוקרטיה</h2>
                    <p className="mt-4 text-lg text-gray-600">הגשת תביעה לקצבת נכות יכולה להיות תהליך מורכב ומתיש. בדיוק בשביל זה אנחנו כאן - לעשות לך סדר.</p>

                    {/* UPDATED: Timeline structure for process steps */}
                    <div className="mt-12 space-y-10">
                        {/* Step 1 */}
                        <div className="relative flex items-start">
                            <div className="absolute top-12 right-6 -ml-px h-full w-0.5 border-l-2 border-dotted border-gray-300" aria-hidden="true"></div>
                            <div className="z-10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-indigo-600 text-white font-bold text-lg">1</div>
                            <div className="ms-6">
                                <h4 className="text-xl font-semibold text-gray-800">איסוף החומר הרפואי</h4>
                                <p className="text-gray-600 mt-1">הכל מתחיל בתיעוד. יש לאסוף את כל המסמכים הרפואיים הרלוונטיים: סיכומי ביקורים, חוות דעת מומחים, תוצאות בדיקות ועוד.</p>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="relative flex items-start">
                            <div className="absolute top-12 right-6 -ml-px h-full w-0.5 border-l-2 border-dotted border-gray-300" aria-hidden="true"></div>
                            <div className="z-10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-indigo-600 text-white font-bold text-lg">2</div>
                            <div className="ms-6">
                                <h4 className="text-xl font-semibold text-gray-800">הגשת התביעה</h4>
                                <p className="text-gray-600 mt-1">מילוי מדויק ומפורט של טופס התביעה וצירוף כל המסמכים. טעות קטנה בשלב זה יכולה לעכב את התהליך כולו.</p>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="relative flex items-start">
                            <div className="absolute top-12 right-6 -ml-px h-full w-0.5 border-l-2 border-dotted border-gray-300" aria-hidden="true"></div>
                            <div className="z-10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-indigo-600 text-white font-bold text-lg">3</div>
                            <div className="ms-6">
                                <h4 className="text-xl font-semibold text-gray-800">זימון לוועדה רפואית</h4>
                                <p className="text-gray-600 mt-1">הוועדה בודקת אותך וקובעת את אחוזי הנכות הרפואית שלך בהתבסס על המסמכים והבדיקה הפיזית.</p>
                            </div>
                        </div>

                        {/* Step 4 */}
                        <div className="relative flex items-start">
                            <div className="z-10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-indigo-600 text-white font-bold text-lg">4</div>
                            <div className="ms-6">
                                <h4 className="text-xl font-semibold text-gray-800">קבלת ההחלטה וערעור</h4>
                                <p className="text-gray-600 mt-1">לאחר קבלת ההחלטה, אם אינך מרוצה, ניתן לערער. זהו שלב קריטי בו ייצוג משפטי יכול לעשות את כל ההבדל.</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>
);

export default ProcessSection;
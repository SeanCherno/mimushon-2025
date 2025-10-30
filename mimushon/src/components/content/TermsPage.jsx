import React from 'react';

// This component contains the formatted Terms of Service page.
// For the styles to apply correctly, make sure your project is set up with Tailwind CSS
// and the 'Assistant' font is linked in your main public/index.html file.
const TermsPage = () => {
    // Custom styles can be included directly like this for self-contained components,
    // or moved to a separate CSS file in a larger project.
    const customStyles = `
        .prose h2 {
            font-size: 1.5rem; /* 24px */
            font-weight: 600;
            margin-top: 2rem;
            margin-bottom: 1rem;
            border-bottom: 1px solid #e5e7eb;
            padding-bottom: 0.5rem;
        }
        .prose p, .prose ul {
            margin-bottom: 1rem;
            line-height: 1.75;
        }
        .prose ul {
            list-style-position: inside;
        }
    `;

    return (
        <>
            <style>{customStyles}</style>
            <div className="py-12 sm:py-16 bg-indigo-50">
                <div className="container mx-auto px-6 max-w-4xl bg-white p-8 sm:p-12 rounded-lg shadow-md">

                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">תנאי שימוש</h1>
                    <p className="text-sm text-gray-500 text-center mb-10">עדכון אחרון: 26 באוגוסט 2025</p>

                    <div className="prose prose-lg max-w-none text-right">
                        <p>ברוכים הבאים לאתר "מימושון" (להלן: "האתר"). השימוש באתר, לרבות מחשבון אחוזי הנכות (להלן: "המחשבון") והתכנים המוצגים בו, כפוף לתנאים המפורטים להלן. אנא קראו אותם בעיון.</p>

                        <h2>1. הסכמה לתנאים</h2>
                        <p>עצם השימוש באתר מהווה הסכמה בלתי מסויגת לתנאי שימוש אלו. אם אינך מסכים לתנאים, הנך מתבקש לא לעשות שימוש באתר.</p>

                        <h2>2. אופי השירות והמחשבון</h2>
                        <ul className="list-disc space-y-2">
                            <li><strong>כלי להערכה בלבד:</strong> המחשבון והמידע באתר נועדו לספק הערכה ראשונית ומידע כללי בלבד. הם אינם מהווים תחליף לייעוץ רפואי, משפטי או מקצועי אחר.</li>
                            <li><strong>אינו מהווה ייעוץ:</strong> המידע באתר אינו מהווה ייעוץ משפטי או המלצה לנקיטת הליכים. כל החלטה שתקבלו על סמך המידע באתר היא על אחריותכם בלבד.</li>
                            <li><strong>אין הבטחת תוצאה:</strong> תוצאות המחשבון הן סימולציה המבוססת על "ספר הליקויים" של המוסד לביטוח לאומי. אין בתוצאה זו כדי להבטיח או לחייב את קביעתה של ועדה רפואית, שהיא הגורם המוסמך היחיד לקבוע אחוזי נכות.</li>
                        </ul>

                        <h2>3. היעדר יחסי עורך דין-לקוח</h2>
                        <p>השימוש באתר, לרבות פנייה דרך טופס יצירת הקשר, אינו יוצר יחסי עורך דין-לקוח בין המשתמש לבין מפעילי האתר או מי מטעמם.</p>

                        <h2>4. הגבלת אחריות</h2>
                        <ul className="list-disc space-y-2">
                            <li>השירות באתר ניתן "כפי שהוא" (As Is). מפעילי האתר לא יישאו באחריות לכל נזק, ישיר או עקיף, שייגרם למשתמש או לצד שלישי כלשהו כתוצאה מהשימוש במידע המופיע באתר או מהסתמכות עליו.</li>
                            <li>מפעילי האתר אינם מתחייבים שהשירות יהיה נקי מתקלות, שגיאות או וירוסים.</li>
                        </ul>

                        <h2>5. קניין רוחני</h2>
                        <p>כל זכויות הקניין הרוחני באתר, לרבות עיצובו, קוד המקור, התכנים והמחשבון, שייכות במלואן ל"מימושון". אין להעתיק, להפיץ, לשכפל או לעשות שימוש מסחרי כלשהו בתכני האתר ללא קבלת אישור מראש ובכתב.</p>

                        <h2>6. קישורים חיצוניים</h2>
                        <p>האתר עשוי להכיל קישורים לאתרים חיצוניים. מפעילי האתר אינם אחראים לתוכן, למהימנות או למדיניות הפרטיות של אתרים אלו.</p>

                        <h2>7. שינויים בתנאי השימוש</h2>
                        <p>אנו שומרים לעצמנו את הזכות לעדכן את תנאי השימוש מעת לעת, על פי שיקול דעתנו הבלעדי. המשך השימוש באתר לאחר עדכון התנאים יהווה הסכמה לתנאים המעודכנים.</p>

                        <h2>8. סמכות שיפוט</h2>
                        <p>על תנאי שימוש אלו יחולו דיני מדינת ישראל. סמכות השיפוט הבלעדית בכל סכסוך הנוגע לאתר ולשימוש בו תהיה נתונה לבתי המשפט המוסמכים במחוז תל אביב.</p>

                        <hr className="my-8" />

                        <p>לכל שאלה בנוגע לתנאי השימוש, ניתן לפנות אלינו דרך עמוד "צור קשר".</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TermsPage;
import React from 'react';

// This component contains the formatted Privacy Policy page.
// For the styles to apply correctly, make sure your project is set up with Tailwind CSS
// and the 'Assistant' font is linked in your main public/index.html file.
const PrivacyPage = () => {
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
                    
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">מדיניות פרטיות</h1>
                    <p className="text-sm text-gray-500 text-center mb-10">עדכון אחרון: 26 באוגוסט 2025</p>
                    
                    <div className="prose prose-lg max-w-none text-right">
                        <p>"מימושון" (להלן: "האתר") מכבד את פרטיות המשתמשים. מסמך זה מפרט את האופן שבו אנו אוספים, משתמשים ושומרים על המידע הנאסף באתר.</p>

                        <h2>1. איזה מידע אנו אוספים?</h2>
                        <ul className="list-disc space-y-2">
                            <li><strong>מידע הנמסר באופן יזום:</strong> כאשר אתם פונים אלינו דרך טופס יצירת הקשר, אנו אוספים את הפרטים שסיפקתם, כגון שם, מספר טלפון ותוכן הפנייה.</li>
                            <li><strong>מידע שאינו מזהה אישית:</strong> אנו עשויים לאסוף מידע סטטיסטי ואנונימי על השימוש באתר, כגון סוג הדפדפן, כתובת IP (באופן אנונימי), ודפים שנצפו. מידע זה משמש לשיפור השירות ואינו מקושר לפרטים אישיים.</li>
                            <li><strong>מחשבון הנכות:</strong> המחשבון אינו שומר או אוסף מידע אישי או רפואי כלשהו שהזנתם. החישוב מתבצע באופן מקומי בדפדפן שלכם והמידע נמחק עם סגירת הדף.</li>
                        </ul>

                        <h2>2. כיצד אנו משתמשים במידע?</h2>
                        <ul className="list-disc space-y-2">
                            <li><strong>לצורך מתן שירות:</strong> המידע שתמסרו בטופס יצירת הקשר ישמש אך ורק כדי לחזור אליכם, להבין את צרכיכם ולספק את השירות המבוקש.</li>
                            <li><strong>חיבור לגורם מקצועי:</strong> במידה ותביעו הסכמה מפורשת לכך במהלך שיחה עמנו, אנו עשויים להעביר את פרטיכם לעורך דין מומחה ומהימן מהרשת המקצועית שלנו, על מנת שיוכל לסייע לכם. <strong>לעולם לא נעביר את פרטיכם לצד שלישי ללא הסכמתכם המפורשת.</strong></li>
                            <li><strong>לשיפור האתר:</strong> מידע סטטיסטי ואנונימי משמש אותנו לניתוח דפוסי שימוש ולשיפור חווית המשתמש באתר.</li>
                        </ul>

                        <h2>3. אבטחת מידע</h2>
                        <p>אנו נוקטים באמצעי אבטחה סבירים כדי להגן על המידע הנמסר לנו. עם זאת, חשוב לזכור כי העברת מידע באינטרנט אינה מאובטחת במאה אחוז, ואיננו יכולים להבטיח את ביטחון המידע באופן מוחלט.</p>

                        <h2>4. Cookies (עוגיות)</h2>
                        <p>האתר עשוי להשתמש ב"עוגיות" (Cookies) לצורך תפעולו השוטף והתקין, ובכלל זה כדי לאסוף נתונים סטטיסטיים אודות השימוש באתר ולשיפור חווית הגלישה. באפשרותכם להימנע מקבלת עוגיות על ידי שינוי ההגדרות בדפדפן שלכם.</p>

                        <h2>5. זכויותיכם</h2>
                        <p>אתם זכאים לעיין במידע שנאסף עליכם (בכפוף להזדהות) ולבקש את תיקונו או מחיקתו, בהתאם להוראות החוק.</p>

                        <h2>6. שינויים במדיניות הפרטיות</h2>
                        <p>אנו שומרים לעצמנו את הזכות לעדכן מדיניות זו מעת לעת. אנו ממליצים לחזור ולעיין בדף זה מדי פעם.</p>
                        
                        <hr className="my-8" />

                        <p>לכל שאלה בנוגע למדיניות הפרטיות, ניתן לפנות אלינו דרך עמוד "צור קשר".</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PrivacyPage;
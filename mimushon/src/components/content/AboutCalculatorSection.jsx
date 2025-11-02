import FeatureListItem from "./FeatureListItem";

const AboutCalculatorSection = () => (
    <section id="about-calculator" className="bg-indigo-50 py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-6">
            <div className="lg:flex lg:items-center lg:gap-12">
                <div className="lg:w-1/2">
                    <img src="/images/medical-history.webp" alt="אישה עובדת על מחשב" className="rounded-lg shadow-2xl w-full h-auto object-cover" />
                </div>
                <div className="lg:w-1/2 mt-10 lg:mt-0">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">כיצד המחשבון עובד?</h2>
                    <p className="mt-4 text-lg text-gray-600">כדי לספק לכם הערכה מדויקת ככל הניתן, בנינו את המחשבון על בסיס התקנות הרשמיות של המוסד לביטוח לאומי.</p>
                    <ul className="mt-8 space-y-4 text-lg text-gray-600">
                        <FeatureListItem>
                            <strong className="font-semibold text-gray-800">מבוסס על "ספר הליקויים":</strong> החישובים מתבססים על רשימת הליקויים והסעיפים המופיעה בתקנות הביטוח הלאומי, הידועה כ"ספר הליקויים". זהו המסמך שעליו מסתמכות הוועדות הרפואיות.
                        </FeatureListItem>
                        <FeatureListItem>
                            <strong className="font-semibold text-gray-800">חישוב נכות משוקללת:</strong> במקרים של מספר פגיעות, המחשבון יודע לבצע חישוב משוקלל, בדומה לאופן שבו הוועדה הרפואית מחשבת את אחוז הנכות הכולל, ולא פשוט מחבר את האחוזים.
                        </FeatureListItem>
                        <FeatureListItem>
                            <strong className="font-semibold text-gray-800">כלי להכוונה: </strong> חשוב לזכור שהמחשבון הוא כלי עזר להערכה ראשונית. התוצאה הסופית נקבעת אך ורק על ידי רופא הוועדה הרפואית, הלוקח בחשבון את מלוא התיק הרפואי והבדיקה הפיזית.
                        </FeatureListItem>
                    </ul>
                </div>
            </div>
        </div>
        <div id="calculation-exp" />
    </section>
);

export default AboutCalculatorSection
import FeatureListItem from "./FeatureListItem";

const WhyUsSection = () => (
    <section id="why-us" className="py-8 md:py-24 bg-indigo-50">
        <div className="container mx-auto px-6">
            <div className="lg:flex lg:items-center lg:gap-12 flex-row-reverse">
                <div className="lg:w-1/2">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">קבלו שליטה על התהליך</h2>
                    <p className="mt-4 text-lg text-gray-600">ההתמודדות עם הבירוקרטיה הרפואית יכולה להיות מתסכלת. המטרה שלנו היא לתת לכם את הכלים והידע כדי לנווט במערכת בביטחון, ולהבין בדיוק איפה אתם עומדים.</p>
                    <ul className="mt-8 space-y-4 text-lg text-gray-600">
                        <FeatureListItem>
                            <strong className="font-semibold text-gray-800">הופכים את המורכב לפשוט:</strong> אנחנו מסבירים "מאחורי הקלעים" של הוועדות הרפואיות, מפרקים את המונחים המשפטיים המבלבלים ומספקים בהירות.
                        </FeatureListItem>
                        <FeatureListItem>
                            <strong className="font-semibold text-gray-800">הכנה ממוקדת לוועדה:</strong> נסייע לכם להבין אילו מסמכים הם קריטיים, כיצד להתכונן נכון לבדיקה ואיך להציג את המקרה שלכם בצורה הברורה והאפקטיבית ביותר.
                        </FeatureListItem>
                        <FeatureListItem>
                            <strong className="font-semibold text-gray-800">גישה למומחים, כשצריך:</strong> אם בשלב כלשהו תרגישו שהמקרה שלכם מורכב מדי או שאתם זקוקים לייצוג, נוכל לחבר אתכם עם עורכי דין מנוסים מהרשת המקצועית שלנו. ההחלטה תמיד נשארת בידיים שלכם.
                        </FeatureListItem>
                    </ul>
                </div>
                <div className="lg:w-1/2 mt-10 lg:mt-0">
                    <img src="/images/doctor-lawyer.webp" alt="צוות מקצועי" className="rounded-lg shadow-2xl w-full h-auto object-cover" />
                </div>
            </div>
        </div>
    </section>
);

export default WhyUsSection;
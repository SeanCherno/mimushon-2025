import InfoCard from "./InfoCard";

const HowWeHelpSection = () => {
    return (
        <section className="py-8 md:py-8 bg-indigo-50">
            <div className="container mt-6 mx-auto px-6 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">הליווי שלנו, השקט הנפשי שלך</h2>
                <div className="max-w-2xl mx-auto space-y-10 text-right">
                    <InfoCard number={1} title="הערכה ראשונית (חינם)">
                        השתמש במחשבון שלנו כדי לקבל מושג ראשוני על היקף זכויותיך. זהו הצעד הראשון והחשוב ביותר.
                    </InfoCard>
                    <InfoCard number={2} title="הבנת התהליך">
                        אנו נסביר לך בפשטות על השלבים השונים בתהליך התביעה, מהגשת המסמכים ועד להתנהלות מול הוועדה הרפואית.
                    </InfoCard>
                    <InfoCard number={3} title="חיבור לעורכי דין מומחים">
                        אנו עובדים עם רשת של עורכי דין שנבחרו בקפידה, בעלי ניסיון מוכח בתביעות מול ביטוח לאומי וחברות ביטוח.
                    </InfoCard>
                </div>
            </div>
        </section>
    );
}

export default HowWeHelpSection;

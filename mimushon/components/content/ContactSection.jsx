import ContactForm from "./ContactForm";

const ContactSection = () => {
    return (
        <section id="contact" className="bg-indigo-700 text-white py-16 md:py-24">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl md:text-4xl font-bold">יש לכם שאלה? דברו איתנו.</h2>
                {/* Lawyer/expert-consultation copy commented out — free-tool framing for now:
                    <h2>אל תתמודדו עם זה לבד.</h2>
                    "הבירוקרטיה יכולה להיות מכשול, אבל היא לא צריכה לעצור אותך מלקבל את מה שמגיע לך. שיחת ייעוץ ראשונית עם המומחים שלנו היא ללא עלות וללא כל התחייבות." */}
                <p className="mt-4 text-lg max-w-3xl mx-auto">
                    מימושון הוא כלי חינמי לחלוטין. אם יש לכם שאלה על המחשבון או על אחוזי הנכות — השאירו פרטים ונחזור אליכם.
                </p>
                <div className="max-w-xl mx-auto mt-10 bg-white rounded-xl shadow-xl p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">השאירו פרטים ונחזור אליכם עוד היום</h3>
                    <ContactForm />
                </div>
            </div>
        </section>
    );
};

export default ContactSection;

const ContactSection = () => (
    <section id="contact" className="bg-indigo-700 text-white py-16 md:py-24">
        <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold">אל תתמודדו עם זה לבד.</h2>
            <p className="mt-4 text-lg max-w-3xl mx-auto">הבירוקרטיה יכולה להיות מכשול, אבל היא לא צריכה לעצור אותך מלקבל את מה שמגיע לך. שיחת ייעוץ ראשונית עם המומחים שלנו היא ללא עלות וללא כל התחייבות.</p>
            
            <div className="max-w-xl mx-auto mt-10">
                <form className="bg-white p-8 rounded-lg shadow-xl text-right">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">השאירו פרטים ונחזור אליכם עוד היום</h3>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">*שם מלא</label>
                        <input type="text" id="name" className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">*טלפון</label>
                        <input type="tel" id="phone" className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="hearot" className="block text-gray-700 text-sm font-bold mb-2">הערות</label>
                        <textarea id="hearot" className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="text-center">
                        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg text-lg w-full transition duration-300" type="submit">
                            שלח/י וקבל/י שיחת ייעוץ
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </section>
);

export default ContactSection;
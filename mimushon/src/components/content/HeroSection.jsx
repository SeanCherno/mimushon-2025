const HeroSection = ({ setShowContent }) => (
    <section
        className="text-white py-20 md:py-32 bg-cover bg-center"
        style={{ backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/hero-photo.webp')" }}
    >
        <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-4xl font-bold leading-tight mb-4">מיצוי זכויות רפואיות: בחר את הליקויים שלך וקבל אחוז נכות משוקלל — עם הסבר צעד-אחר-צעד</h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto">מימושון מנגיש את השיטה הרשמית: אתה מזין את הליקויים — והמחשבון מראה איך החישוב נעשה, שלב אחר שלב.</p>
            {/* <a href="#calculator" className="mt-8 inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300">התחל כאן עם המחשבון</a> */}
            <p className="text-lg md:text-xl max-w-2xl mt-6 mx-auto">חשב עכשיו את אחוז הנכות באופן ברור, שקוף ותומך.</p>
            <div className="mt-5 md:flex md:flex-cols md:justify-center text-center">
                <a href="#calculator" className="mt-3 md:mt-8 w-60 mx-2 inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg text-sm sm:text-lg transition duration-300">למחשבון</a>
                <a href="#calculation-exp" onClick={() => { setShowContent(true) }} className="mt-3 md:mt-8 w-60 mx-2 inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg text-sm sm:text-lg transition duration-300">איך עובד החישוב</a>
            </div>
            <div className="mb-11 sm:mb-1"></div>
        </div>
    </section>
);

export default HeroSection;
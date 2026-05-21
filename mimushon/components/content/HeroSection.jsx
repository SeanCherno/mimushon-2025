import Image from "next/image";

const HeroSection = ({ setShowContent }) => (
    <section
        className="text-white py-20 md:py-32 relative overflow-hidden" // 1. Added relative & overflow-hidden, removed bg classes
    // 2. Removed the style prop
    >
        {/* 3. Added the img tag as an absolute background */}
        <Image
            src="/images/hero-photo.webp"
            alt="רקע" // 4. Added alt text for accessibility
            className="absolute inset-0 w-full h-full object-cover object-center"
            width={1920}
            height={1080}
            priority
        />

        {/* 5. Kept the dark overlay in its own div to ensure text readability */}
        <div
            className="absolute inset-0"
            style={{ backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))" }}
        ></div>

        {/* 6. Added 'relative' to the content container to lift it above the img and overlay */}
        <div className="container mx-auto px-6 text-center relative">
            <h1 className="text-4xl md:text-4xl font-bold leading-tight mb-4">מיצוי זכויות רפואיות: בחר את הליקויים שלך וקבל אחוז נכות משוקלל — עם הסבר צעד-אחר-צעד</h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto">מימושון מנגיש את השיטה הרשמית: אתה מזין את הליקויים — והמחשבון מראה איך החישוב נעשה, שלב אחר שלב.</p>
            {/* <a href="#calculator" className="mt-8 inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300">התחל כאן עם המחשבון</a> */}
            <p className="text-lg md:text-xl max-w-2xl mt-6 mx-auto">חשב עכשיו את אחוז הנכות באופן ברור, שקוף ותומך.</p>
            <div className="mt-5 md:flex md:flex-cols md:justify-center text-center">
                <a href="#calculator" className="mt-3 md:mt-8 w-60 mx-2 inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg text-sm sm:text-lg transition duration-300">מחשבון</a>
                <a href="#calculation-exp" className="mt-3 md:mt-8 w-60 mx-2 inline-block bg-slate-100 hover:bg-indigo-200 text-slate-800 font-bold py-3 px-8 rounded-lg text-sm sm:text-lg transition duration-300 border border-indigo-700">איך עובד החישוב</a>
            </div>
            <div className="mb-11 sm:mb-1"></div>
        </div>
    </section>
);

export default HeroSection;
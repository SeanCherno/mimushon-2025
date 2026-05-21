import Link from "next/link";

const Footer = () => (
    <footer className="bg-gray-800 text-white py-8 md:flex md:flex-cols">
        <div className="container mx-auto px-6 text-center flex-2">
            <p>&copy; 2026 כל הזכויות שמורות | מימושון</p>
            <p className="text-sm text-gray-400 mt-2">האתר מספק מידע כללי בלבד ואינו מהווה ייעוץ משפטי.</p>
        </div>
        <div className="flex-1 text-center mt-10 md:mt-0">
            <p className="font-semibold mb-3">קישורים</p>
            <Link href="/terms" className="hover:underline">תנאי שימוש</Link>
            <br />
            <Link href="/privacy" className="hover:underline">מדיניות פרטיות</Link>
        </div>
    </footer>
);

export default Footer;
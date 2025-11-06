import Link from "next/link";

const Footer = () => (
    <footer className="bg-gray-800 text-white py-8 flex flex-cols">
        <div className="container mx-auto px-6 text-center flex-2">
            <p>&copy; 2025 כל הזכויות שמורות | מימושון</p>
            <p className="text-sm text-gray-400 mt-2">האתר מספק מידע כללי בלבד ואינו מהווה ייעוץ משפטי.</p>
        </div>
        <div className="flex-1 text-center">
            <p className="font-semibold mb-3">קישורים</p>
            <Link href="/terms">תנאי שימוש</Link>
            <br />
            <Link href="/privacy">מדיניות פרטיות</Link>
        </div>
    </footer>
);

export default Footer;
import Link from "next/link";

const Footer = () => (
    <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-6 flex flex-col md:flex-row md:items-center md:justify-between text-center gap-8">
            <div>
                <p>&copy; 2026 כל הזכויות שמורות | מימושון</p>
                <p className="text-sm text-gray-400 mt-2">האתר מספק מידע כללי בלבד ואינו מהווה ייעוץ משפטי.</p>
            </div>
            <div>
                <p className="font-semibold mb-3">קישורים</p>
                <Link href="/terms" className="hover:underline">תנאי שימוש</Link>
                <br />
                <Link href="/privacy" className="hover:underline">מדיניות פרטיות</Link>
            </div>
        </div>
    </footer>
);

export default Footer;
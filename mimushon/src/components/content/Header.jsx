const Header = ({ setShowContent }) => (
    <header className="bg-white shadow-md sticky top-0 z-50">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
            <div className="text-2xl font-bold text-indigo-600">
                <a href="/">מימושון</a>
            </div>
            <div className="hidden md:flex space-x-8 font-semibold text-gray-800">
                <a href="#calculator" onClick={() => setShowContent(true)} className="hover:text-indigo-600">מחשבון נכות</a>
                <a href="#process" onClick={() => setShowContent(true)} className="hover:text-indigo-600">התהליך</a>
                <a href="#why-us" onClick={() => setShowContent(true)} className="hover:text-indigo-600">למה אנחנו?</a>
                <a href="#contact" onClick={() => setShowContent(true)} className="hover:text-indigo-600">צרו קשר</a>
            </div>
            <div className="md:hidden">
                {/* Mobile menu button can be added here */}
            </div>
        </nav>
    </header>
);

export default Header;
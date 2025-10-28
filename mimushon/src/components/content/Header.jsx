import React, { useState } from "react";

const Header = ({ setShowContent }) => {
    // State to manage the mobile menu's open/closed status
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    /**
     * Handles clicks on mobile navigation links.
     * It calls the prop function and closes the mobile menu.
     */
    const handleMobileLinkClick = () => {
        if (setShowContent) {
            setShowContent(true);
        }
        setIsMobileMenuOpen(false); // Close menu on click
    };

    /**
     * Handles clicks on desktop navigation links.
     */
    const handleDesktopLinkClick = () => {
        if (setShowContent) {
            setShowContent(true);
        }
    };

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <nav className="bg-white border-gray-200">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    {/* Logo */}
                    <a
                        href="/"
                        className="flex items-center space-x-3 rtl:space-x-reverse"
                    >
                        <img
                            src="/logo.png"
                            alt="מימושון"
                            className="mt-3" // Use fixed height for better alignment
                            width="150px"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "/logo.png";
                            }}
                        />
                    </a>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} // Toggle state on click
                        type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
                        aria-controls="navbar-default"
                        aria-expanded={isMobileMenuOpen} // Reflect state
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg
                            className="w-5 h-5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 17 14"
                        >
                            {/* Conditionally render hamburger or close icon */}
                            {isMobileMenuOpen ? (
                                // "X" icon (approximated)
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M1 1l15 12M1 13L16 1"
                                />
                            ) : (
                                // "Hamburger" icon
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M1 1h15M1 7h15M1 13h15"
                                />
                            )}
                        </svg>
                    </button>

                    {/* Menu Links (Desktop and Mobile) */}
                    <div
                        className={`w-full md:block md:w-auto ${isMobileMenuOpen ? "block" : "hidden"
                            }`} // Toggle visibility based on state
                        id="navbar-default"
                    >
                        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:gap-x-6 md:mt-0 md:border-0 md:bg-white">
                            <li>
                                <a
                                    href="#calculator"
                                    onClick={
                                        isMobileMenuOpen
                                            ? handleMobileLinkClick
                                            : handleDesktopLinkClick
                                    }
                                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-indigo-600 md:p-0"
                                >
                                    מחשבון נכות
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#about-calculator"
                                    onClick={
                                        isMobileMenuOpen
                                            ? handleMobileLinkClick
                                            : handleDesktopLinkClick
                                    }
                                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-indigo-600 md:p-0"
                                >
                                    על המחשבון
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#process"
                                    onClick={
                                        isMobileMenuOpen
                                            ? handleMobileLinkClick
                                            : handleDesktopLinkClick
                                    }
                                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-indigo-600 md:p-0"
                                >
                                    התהליך
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#contact"
                                    onClick={
                                        isMobileMenuOpen
                                            ? handleMobileLinkClick
                                            : handleDesktopLinkClick
                                    }
                                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-indigo-600 md:p-0"
                                >
                                    צרו קשר
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;

'use client'

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const Header = ({ setShowContent }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const dispatchNavEvent = () => window.dispatchEvent(new CustomEvent('header-nav'));

    const handleMobileLinkClick = () => {
        if (setShowContent) setShowContent(true);
        setIsMobileMenuOpen(false);
        dispatchNavEvent();
    };

    const handleDesktopLinkClick = () => {
        if (setShowContent) setShowContent(true);
        dispatchNavEvent();
    };

    /**
     * For hash links (e.g. /#calculator) that point to sections on the home page:
     * if we're already on '/', snap to the top first and then smoothly scroll
     * down to the target — so the motion is always "downward".
     * If we're on a different page, let Next.js navigate normally (the
     * PageTransitionWrapper animation gives the same downward feel).
     */
    const handleHashLinkClick = (e, hash, isMobile = false) => {
        if (setShowContent) setShowContent(true);
        if (isMobile) setIsMobileMenuOpen(false);
        dispatchNavEvent();

        if (typeof window !== 'undefined' && window.location.pathname === '/') {
            e.preventDefault();
            const el = document.getElementById(hash);
            if (el) {
                window.scrollTo({ top: 0, behavior: 'instant' });
                setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 16);
            }
        }
    };

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <nav className="bg-white border-gray-200">
                <div className="max-w-screen-xl mx-auto px-3 py-2">

                    {/* ── Top bar ─────────────────────────────────────────────── */}
                    <div className="flex items-center justify-between relative h-12">

                        {/* Burger / close — right side on mobile, hidden on desktop */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            type="button"
                            className="md:hidden inline-flex items-center justify-center p-2 w-10 h-10 text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 cursor-pointer"
                            aria-controls="navbar-default"
                            aria-expanded={isMobileMenuOpen}
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                {isMobileMenuOpen ? (
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1l15 12M1 13L16 1" />
                                ) : (
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                                )}
                            </svg>
                        </button>

                        {/* Logo — centered on mobile, left-of-nav on desktop */}
                        <Link
                            href="/"
                            className="absolute right-1/2 translate-x-1/2 md:static md:translate-x-0 flex items-center mt-2 md:mt-0"
                        >
                            <Image
                                src="/logo.png"
                                alt="מימושון"
                                height={50}
                                width={110}
                                onError={(e) => { e.target.onerror = null; e.target.src = "/logo.png"; }}
                            />
                        </Link>

                        {/* Spacer — balances the burger on mobile so logo stays centered; invisible on desktop */}
                        <div className="md:hidden w-10 h-10" aria-hidden="true" />

                        {/* Desktop nav links — hidden on mobile */}
                        <ul className="hidden md:flex flex-row gap-x-6 font-medium">
                            <li className="ml-6">
                                <Link href="/#calculator" onClick={(e) => handleHashLinkClick(e, 'calculator')} className="text-gray-900 hover:text-indigo-600 transition">מחשבון נכות</Link>
                            </li>
                            <li>
                                <Link href="/#about-calculator" onClick={(e) => handleHashLinkClick(e, 'about-calculator')} className="text-gray-900 hover:text-indigo-600 transition">על המחשבון</Link>
                            </li>
                            <li>
                                <Link href="/about-us" onClick={handleDesktopLinkClick} className="text-gray-900 hover:text-indigo-600 transition">מי אנחנו?</Link>
                            </li>
                            <li>
                                <Link href="/#contact" onClick={(e) => handleHashLinkClick(e, 'contact')} className="text-gray-900 hover:text-indigo-600 transition">צרו קשר</Link>
                            </li>
                            <li>
                                <Link href="/articles" onClick={handleDesktopLinkClick} className="text-gray-900 hover:text-indigo-600 transition">מאמרים</Link>
                            </li>
                        </ul>
                    </div>

                    {/* ── Mobile dropdown menu ─────────────────────────────────── */}
                    <div
                        className={`md:hidden ${isMobileMenuOpen ? "block" : "hidden"}`}
                        id="navbar-default"
                    >
                        <ul className="font-medium flex flex-col mt-2 border border-gray-100 rounded-lg bg-gray-50 p-3 space-y-1">
                            <li>
                                <Link href="/#calculator" onClick={(e) => handleHashLinkClick(e, 'calculator', true)} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100">מחשבון נכות</Link>
                            </li>
                            <li>
                                <Link href="/#about-calculator" onClick={(e) => handleHashLinkClick(e, 'about-calculator', true)} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100">על המחשבון</Link>
                            </li>
                            <li>
                                <Link href="/about-us" onClick={handleMobileLinkClick} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100">מי אנחנו?</Link>
                            </li>
                            <li>
                                <Link href="/#contact" onClick={(e) => handleHashLinkClick(e, 'contact', true)} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100">צרו קשר</Link>
                            </li>
                            <li>
                                <Link href="/articles" onClick={handleMobileLinkClick} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100">מאמרים</Link>
                            </li>
                        </ul>
                    </div>

                </div>
            </nav>
        </header>
    );
};

export default Header;

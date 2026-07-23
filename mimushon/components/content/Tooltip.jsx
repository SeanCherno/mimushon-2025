'use client'

import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { createPortal } from 'react-dom';

/**
 * An icon-based tooltip component.
 *
 * On desktop (pointer / hover devices) it opens a small popup next to the icon,
 * defaulting to the left and flipping to the right if it overflows the viewport.
 *
 * On mobile it instead shows the content as a toast fixed to the top of the
 * screen when the user taps the icon.
 */
const Tooltip = ({ content }) => {
    const [isVisible, setIsVisible] = useState(false);
    // State to control conditional rendering for unmount animation
    const [isMounted, setIsMounted] = useState(false);
    const [direction, setDirection] = useState('left');
    const popupRef = useRef(null);

    // Detect mobile (below Tailwind's `sm` breakpoint / no hover pointer).
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const query = window.matchMedia('(max-width: 639px), (hover: none)');
        const update = () => setIsMobile(query.matches);
        update();
        query.addEventListener('change', update);
        return () => query.removeEventListener('change', update);
    }, []);

    // --- Mobile toast state ---
    const [toastVisible, setToastVisible] = useState(false);
    const [toastMounted, setToastMounted] = useState(false);
    const toastTimer = useRef(null);

    // This effect runs first to set the correct position
    useLayoutEffect(() => {
        // Only run this check if we're trying to show the tooltip
        // We depend on isMounted, not isVisible
        if (isMounted && direction === 'left' && popupRef.current) {
            const rect = popupRef.current.getBoundingClientRect();
            if (rect.left < 0) {
                setDirection('right');
            }
        }
    }, [isMounted, direction, content]); // Re-check if visibility, direction, or content changes

    // This effect runs *after* the position is set, to fade in
    useLayoutEffect(() => {
        if (isMounted) {
            // We use a small timeout to allow the position effect to run
            // and apply its changes before we make the tooltip visible.
            // This prevents a "flicker" of the tooltip in the wrong position.
            const timer = setTimeout(() => {
                setIsVisible(true); // Trigger fade-in
            }, 0); // 0ms timeout is enough to batch this in the next paint
            return () => clearTimeout(timer);
        }
    }, [isMounted]);

    // Fade the toast in once it has mounted
    useEffect(() => {
        if (toastMounted) {
            const timer = setTimeout(() => setToastVisible(true), 0);
            return () => clearTimeout(timer);
        }
    }, [toastMounted]);

    // Clean up any pending timer on unmount
    useEffect(() => () => {
        if (autoHideTimer.current) clearTimeout(autoHideTimer.current);
        if (toastTimer.current) clearTimeout(toastTimer.current);
    }, []);

    // Auto-hide timer ref (used for touch/mobile fade-out)
    const autoHideTimer = useRef(null);

    // Show the tooltip and RESET its direction
    const handleShow = () => {
        setDirection('left'); // Reset the direction
        setIsMounted(true);  // Mount the component
        // Auto-dismiss after 2.5s (mainly useful on touch screens)
        if (autoHideTimer.current) clearTimeout(autoHideTimer.current);
        autoHideTimer.current = setTimeout(() => {
            handleHide();
        }, 2500);
    };

    // Hide the tooltip
    const handleHide = () => {
        if (autoHideTimer.current) clearTimeout(autoHideTimer.current);
        setIsVisible(false); // Trigger fade-out
    };

    // Handle the end of the fade-out transition
    const handleTransitionEnd = () => {
        if (!isVisible) {
            setIsMounted(false); // Unmount component after fade-out
        }
    };

    // --- Mobile toast handlers ---
    const showToast = () => {
        setToastMounted(true);
        if (toastTimer.current) clearTimeout(toastTimer.current);
        toastTimer.current = setTimeout(() => {
            setToastVisible(false); // Trigger fade-out
        }, 3500);
    };

    const hideToast = () => {
        if (toastTimer.current) clearTimeout(toastTimer.current);
        setToastVisible(false);
    };

    const handleToastTransitionEnd = () => {
        if (!toastVisible) {
            setToastMounted(false); // Unmount after fade-out
        }
    };

    // Handle a tap on the icon (mobile shows a top toast, desktop toggles popup)
    const handleActivate = (e) => {
        e.preventDefault();
        if (isMobile) {
            toastMounted ? hideToast() : showToast();
        } else {
            isMounted ? handleHide() : handleShow();
        }
    };

    // --- Dynamic Class Definitions ---

    // Base classes for the popup
    const popupBaseClasses = "z-50 absolute w-48 sm:w-64 p-3 bg-gray-800 text-white text-sm rounded-lg shadow-lg transition-opacity duration-300 text-center pointer-events-none";

    // Positional classes based on direction state
    const popupPositionClasses = direction === 'left'
        ? "top-1/2 -translate-y-1/2 right-full mr-2" // Open to the left
        : "top-1/2 -translate-y-1/2 left-full ml-2";  // Open to the right

    // Arrow classes based on direction state
    const arrowClasses = direction === 'left'
        ? "absolute top-1/2 -translate-y-1/2 left-full w-0 h-0 border-y-4 border-y-transparent border-l-8 border-l-gray-800"
        : "absolute top-1/2 -translate-y-1/2 right-full w-0 h-0 border-y-4 border-y-transparent border-r-8 border-r-gray-800";

    // Visibility class
    const visibilityClass = isVisible ? "opacity-100" : "opacity-0";

    return (
        // Container div. This is the element that gets positioned in the parent.
        // It's also the trigger for hover/focus.
        <div
            className="absolute top-1 right-1 sm:top-1 sm:right-1"
            onMouseEnter={isMobile ? undefined : handleShow}
            onMouseLeave={isMobile ? undefined : handleHide}
            onFocus={isMobile ? undefined : handleShow}
            onBlur={isMobile ? undefined : handleHide}
            onTouchStart={handleActivate}
            tabIndex="0"
        >
            {/* Icon */}
            <svg className="w-4 h-4 sm:w-4 sm:h-4 text-gray-500 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>

            {/* Desktop popup - CONDITIONALLY RENDERED */}
            {!isMobile && isMounted && (
                <div
                    ref={popupRef}
                    className={`${popupBaseClasses} ${popupPositionClasses} ${visibilityClass}`}
                    role="tooltip"
                    onTransitionEnd={handleTransitionEnd}
                >
                    {content}
                    {/* Arrow */}
                    <div className={arrowClasses}></div>
                </div>
            )}

            {/* Mobile toast - fixed to the top of the screen, rendered via portal */}
            {isMobile && toastMounted && typeof document !== 'undefined' && createPortal(
                <div
                    className={`fixed top-4 left-1/2 -translate-x-1/2 z-[100] w-[90vw] max-w-sm p-3 bg-gray-800 text-white text-sm rounded-lg shadow-lg text-center transition-opacity duration-300 ${toastVisible ? 'opacity-100' : 'opacity-0'}`}
                    role="status"
                    onClick={hideToast}
                    onTransitionEnd={handleToastTransitionEnd}
                >
                    {content}
                </div>,
                document.body
            )}
        </div>
    );
};

export default Tooltip

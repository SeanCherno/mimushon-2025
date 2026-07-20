'use client'

import React, { useState, useRef, useLayoutEffect } from 'react';

/**
 * An icon-based tooltip component that defaults to opening on the left,
 * but flips to the right if it overflows the left side of the viewport.
 *
 * This component positions itself absolutely at the top-right of its
 * nearest relative parent.
 */
const Tooltip = ({ content }) => {
    const [isVisible, setIsVisible] = useState(false);
    // NEW: State to control conditional rendering for unmount animation
    const [isMounted, setIsMounted] = useState(false);
    const [direction, setDirection] = useState('left');
    const popupRef = useRef(null);

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

    // NEW: Handle the end of the fade-out transition
    const handleTransitionEnd = () => {
        if (!isVisible) {
            setIsMounted(false); // Unmount component after fade-out
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
            onMouseEnter={handleShow}
            onMouseLeave={handleHide}
            onFocus={handleShow}
            onBlur={handleHide}
            onTouchStart={(e) => { e.preventDefault(); isMounted ? handleHide() : handleShow(); }}
            tabIndex="0"
        >
            {/* Icon */}
            <svg className="w-4 h-4 sm:w-4 sm:h-4 text-gray-500 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>

            {/* Popup - NOW CONDITIONALLY RENDERED */}
            {isMounted && (
                <div
                    ref={popupRef}
                    className={`${popupBaseClasses} ${popupPositionClasses} ${visibilityClass}`}
                    role="tooltip"
                    onTransitionEnd={handleTransitionEnd} // NEW: Listen for transition end
                >
                    {content}
                    {/* Arrow */}
                    <div className={arrowClasses}></div>
                </div>
            )}
        </div>
    );
};

export default Tooltip
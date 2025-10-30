import React, { useState, useRef, useLayoutEffect } from 'react';
// We don't need ReactDOM.render or createRoot for this file.
// This component will be rendered by the host environment.

/**
 * A tooltip component that defaults to opening on the left,
 * but flips to the right if it overflows the left side of the viewport.
 */
const Tooltip = ({ content }) => {
    const [isVisible, setIsVisible] = useState(false);
    // Default direction is 'left'
    const [direction, setDirection] = useState('left');
    const popupRef = useRef(null);

    // useLayoutEffect runs sync after render but before paint
    useLayoutEffect(() => {
        // Only run this check if we're trying to show the tooltip
        // and its current direction is 'left'
        if (isVisible && direction === 'left' && popupRef.current) {

            // Get the bounding box of the popup
            const rect = popupRef.current.getBoundingClientRect();

            // If the left edge is off-screen (less than 0)
            if (rect.left < 0) {
                // Set direction to 'right'
                // This will cause a re-render before paint,
                // so the user only sees the final, correct position.
                setDirection('right');
            }
        }
    }, [isVisible, direction, content]); // Re-check if visibility, direction, or content changes

    // Show the tooltip
    const handleShow = () => setIsVisible(true);

    // Hide the tooltip and reset its direction
    const handleHide = () => {
        setIsVisible(false);
        // Reset direction to default when hiding
        setDirection('left');
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
            tabIndex="0" // Make it focusable for accessibility
        >
            {/* Icon */}
            <svg className="w-4 h-4 sm:w-4 sm:h-4 text-slate-500 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>

            {/* Popup */}
            <div
                ref={popupRef}
                className={`${popupBaseClasses} ${popupPositionClasses} ${visibilityClass}`}
                role="tooltip"
            >
                {content}
                {/* Arrow */}
                <div className={arrowClasses}></div>
            </div>
        </div>
    );
};

export default Tooltip
'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

export default function PageTransitionWrapper({ children }) {
    const pathname = usePathname();
    const ref = useRef(null);

    useEffect(() => {
        // Snap to the top of the new page instantly (no smooth-scroll upward motion)
        window.scrollTo({ top: 0, behavior: 'instant' });

        const el = ref.current;
        if (!el) return;
        el.classList.remove('page-enter');
        void el.offsetWidth; // force reflow so the class removal is committed before re-adding
        el.classList.add('page-enter');

        // Remove the class once the animation finishes.
        // This is critical: a CSS transform on an ancestor breaks position:fixed for
        // all descendants (they become positioned relative to the transformed element,
        // not the viewport). Removing 'page-enter' after it runs keeps the animation
        // without permanently breaking fixed-position children (e.g. the mobile FAB).
        const handleAnimationEnd = () => el.classList.remove('page-enter');
        el.addEventListener('animationend', handleAnimationEnd, { once: true });
        return () => el.removeEventListener('animationend', handleAnimationEnd);
    }, [pathname]);

    return (
        <div ref={ref} className="page-enter">
            {children}
        </div>
    );
}

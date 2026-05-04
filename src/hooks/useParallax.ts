import { useEffect, useRef, useState } from 'react';

/**
 * useParallax
 *
 * Returns a `translateY` CSS value (in px) that shifts at `speed`× the scroll rate.
 * - speed = 0  → element scrolls with the page (no effect)
 * - speed = 0.5 → element moves at half scroll speed (classic parallax)
 * - speed < 0  → element moves in opposite direction
 *
 * Automatically disables when `prefers-reduced-motion: reduce` is active.
 * Runs on `requestAnimationFrame` for smooth, jank-free 60fps updates.
 */
export function useParallax(speed: number): number {
    const [offset, setOffset] = useState(0);
    const rafRef = useRef<number | null>(null);
    const scrollRef = useRef(0);

    useEffect(() => {
        // Respect reduced-motion user preference
        const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (motionQuery.matches) return;

        const handleScroll = () => {
            scrollRef.current = window.scrollY;
            if (rafRef.current !== null) return; // already scheduled
            rafRef.current = requestAnimationFrame(() => {
                setOffset(scrollRef.current * speed);
                rafRef.current = null;
            });
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        // Set initial value in case page loads mid-scroll
        setOffset(window.scrollY * speed);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
        };
    }, [speed]);

    return offset;
}

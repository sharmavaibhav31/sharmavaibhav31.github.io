import { useEffect } from 'react';

/**
 * useIntersectionObserver
 * Wires a single IntersectionObserver that watches all `.reveal` elements
 * and adds `.is-visible` when they enter the viewport.
 * Call once at page level.
 */
export function useIntersectionObserver() {
    useEffect(() => {
        const elements = document.querySelectorAll<HTMLElement>('.reveal');

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12, rootMargin: '-40px 0px' }
        );

        elements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);
}

/**
 * useScrollReveal — alias for backwards compatibility
 */
export const useScrollReveal = useIntersectionObserver;

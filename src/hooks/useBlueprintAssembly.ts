import { useState, useEffect, useRef } from 'react';

export interface AssemblyState {
    gridVisible: boolean;
    linesDrawing: boolean;
    peripheralNodes: boolean;
    centralNode: boolean;
    complete: boolean;
    reducedMotion: boolean;
}

/**
 * Controls the blueprint assembly animation sequence.
 * 
 * Timeline:
 *   0ms   — Grid fades in (150ms duration)
 *   100ms — Lines begin drawing (250ms duration)
 *   250ms — Peripheral nodes stagger in (120ms each, 40ms stagger)
 *   550ms — Central node locks into place (150ms duration)
 *   700ms — Sequence complete
 * 
 * If prefers-reduced-motion is enabled, everything renders immediately.
 */
export function useBlueprintAssembly(): AssemblyState {
    const reducedMotion = useRef(
        typeof window !== 'undefined'
            ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
            : false
    ).current;

    const [state, setState] = useState<AssemblyState>({
        gridVisible: reducedMotion,
        linesDrawing: reducedMotion,
        peripheralNodes: reducedMotion,
        centralNode: reducedMotion,
        complete: reducedMotion,
        reducedMotion,
    });

    useEffect(() => {
        if (reducedMotion) return;

        // Reset state on mount (handles StrictMode remount)
        setState({
            gridVisible: false,
            linesDrawing: false,
            peripheralNodes: false,
            centralNode: false,
            complete: false,
            reducedMotion: false,
        });

        // Step 1: Grid fade in at 0ms
        const t1 = setTimeout(() => {
            setState(s => ({ ...s, gridVisible: true }));
        }, 10); // Tiny delay to ensure reset takes effect first

        // Step 2: Lines begin drawing at 100ms
        const t2 = setTimeout(() => {
            setState(s => ({ ...s, linesDrawing: true }));
        }, 100);

        // Step 3: Peripheral nodes at 250ms
        const t3 = setTimeout(() => {
            setState(s => ({ ...s, peripheralNodes: true }));
        }, 250);

        // Step 4: Central node at 550ms
        const t4 = setTimeout(() => {
            setState(s => ({ ...s, centralNode: true }));
        }, 550);

        // Complete at 700ms
        const t5 = setTimeout(() => {
            setState(s => ({ ...s, complete: true }));
        }, 700);

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
            clearTimeout(t4);
            clearTimeout(t5);
        };
    }, [reducedMotion]);

    return state;
}

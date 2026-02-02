/**
 * useGsapContext Hook
 * Creates a GSAP context for component-scoped animations
 */

import { useEffect, useRef } from 'react';
import { gsap } from '../utils/gsap';

export function useGsapContext<T extends HTMLElement = HTMLDivElement>() {
    const ref = useRef<T>(null);
    const contextRef = useRef<gsap.Context | null>(null);

    useEffect(() => {
        if (!ref.current) return;

        // Create a GSAP context scoped to the ref
        contextRef.current = gsap.context(() => { }, ref.current);

        return () => {
            // Cleanup all animations in this context
            contextRef.current?.revert();
        };
    }, []);

    return { ref, context: contextRef };
}

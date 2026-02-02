import { useRef, useLayoutEffect, memo } from 'react';
import { gsap } from '../../utils/gsap';
import styles from './Breather.module.css';

function BreatherComponent() {
    const textRef = useRef<HTMLParagraphElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(textRef.current, {
                scrollTrigger: {
                    trigger: textRef.current,
                    start: 'top 80%',
                },
                y: 30,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
            });
        });

        return () => ctx.revert();
    }, []);

    return (
        <section className={styles.breather}>
            <p className={styles.text} ref={textRef}>
                Ile Ijo is more than just a dance company;<br />
                it is a living, breathing archive of movement,<br />
                culture, and shared human experience.
            </p>
        </section>
    );
}

// Memoize for better performance - this component has no props
export const Breather = memo(BreatherComponent);
Breather.displayName = 'Breather';

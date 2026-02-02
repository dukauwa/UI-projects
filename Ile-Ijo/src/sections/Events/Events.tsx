/**
 * Gallery Section
 * Keith Greenbaum style - staggered masonry with light background
 */

import { useRef, useLayoutEffect, memo } from 'react';
import { gsap } from '../../utils/gsap';
import { EVENTS_GALLERY_ITEMS } from '../../data/gallery';
import styles from './Events.module.css';

function EventsComponent() {
    const sectionRef = useRef<HTMLElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const items = gsap.utils.toArray<HTMLElement>(`.${styles.item}`);

            gsap.from(items, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                },
                y: 60,
                opacity: 0,
                duration: 0.8,
                stagger: 0.06,
                ease: 'power3.out',
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className={styles.gallery} id="gallery" ref={sectionRef}>
            <div className={styles.container}>
                {/* Header */}
                <header className={styles.header}>
                    <span className={styles.filterLabel}>Gallery</span>
                </header>

                {/* Masonry Grid */}
                <div className={styles.grid}>
                    {EVENTS_GALLERY_ITEMS.map((item) => (
                        <div key={item.id} className={`${styles.item} ${styles[item.height]}`}>
                            <img
                                src={item.image}
                                alt=""
                                className={styles.image}
                                loading="lazy"
                            />
                            <span className={styles.index}>{item.index}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// Memoize for better performance - this component has no props
export const Events = memo(EventsComponent);
Events.displayName = 'Events';

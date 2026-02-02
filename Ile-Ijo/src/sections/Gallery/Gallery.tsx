/**
 * Gallery Section
 * Visual showcase of past events and culture with masonry grid
 */

import { useLayoutEffect, useRef, memo } from 'react';
import { gsap } from '../../utils/gsap';
import { GALLERY_ITEMS } from '../../data/gallery';
import styles from './Gallery.module.css';

function GalleryComponent() {
    const sectionRef = useRef<HTMLElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Animate gallery items on scroll
            const items = gridRef.current?.querySelectorAll(`.${styles.item}`);
            if (!items) return;

            gsap.from(items, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                    toggleActions: 'play none none none',
                },
                y: 60,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
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
                    <span className={styles.eyebrow}>Our Moments</span>
                    <h2 className={styles.title}>Gallery</h2>
                </header>

                {/* Masonry Grid */}
                <div className={styles.grid} ref={gridRef}>
                    {GALLERY_ITEMS.map((item) => (
                        <div
                            key={item.id}
                            className={`${styles.item} ${styles[item.size]}`}
                        >
                            <img
                                src={item.src}
                                alt={item.title}
                                className={styles.image}
                                loading="lazy"
                            />
                            <div className={styles.overlay}>
                                <span className={styles.itemTitle}>{item.title}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// Memoize for better performance - this component has no props
export const Gallery = memo(GalleryComponent);
Gallery.displayName = 'Gallery';

/**
 * Announcement Section
 * Highlights upcoming events with a bold, high-contrast design
 */

import { useRef, useLayoutEffect, memo } from 'react';
import { gsap } from '../../utils/gsap';
import styles from './Announcement.module.css';
import { GALLERY_IMAGES, getOptimizedImageUrl } from '../../data/gallery';

// Use shared gallery images to avoid duplication
const ANNOUNCEMENTS = [
    {
        id: 1,
        title: 'Spring Celebration',
        image: getOptimizedImageUrl(GALLERY_IMAGES.festival, 800),
        location: 'The Grand Hall Lagos',
        type: 'Private Event',
        index: '(01)',
        isNew: true,
    },
    {
        id: 2,
        title: 'Movement Workshop',
        image: getOptimizedImageUrl(GALLERY_IMAGES.party1, 800),
        location: 'Dance Studio London',
        type: 'Workshop',
        index: '(02)',
        isNew: true,
    },
    {
        id: 3,
        title: 'Cultural Exchange',
        image: getOptimizedImageUrl(GALLERY_IMAGES.dj, 800),
        location: 'Art Center New York',
        type: 'Community',
        index: '(03)',
        isNew: false,
    },
    {
        id: 4,
        title: 'Rhythm & Soul',
        image: getOptimizedImageUrl(GALLERY_IMAGES.event1, 800),
        location: 'Underground Berlin',
        type: 'Nightlife',
        index: '(04)',
        isNew: false,
    },
    {
        id: 5,
        title: 'Afro-House Night',
        image: getOptimizedImageUrl(GALLERY_IMAGES.dance2, 800),
        location: 'The Warehouse',
        type: 'Club Event',
        index: '(05)',
        isNew: true,
    },
    {
        id: 6,
        title: 'Community Jam',
        image: getOptimizedImageUrl(GALLERY_IMAGES.crowd, 800),
        location: 'Open Space London',
        type: 'Free Session',
        index: '(06)',
        isNew: false,
    },
];

function AnnouncementComponent() {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Animate Title
            gsap.from(titleRef.current, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                },
                y: 100,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
            });

            // Animate Grid Items
            const items = gridRef.current?.children;
            if (items) {
                gsap.from(items, {
                    scrollTrigger: {
                        trigger: gridRef.current,
                        start: 'top 85%',
                    },
                    y: 40,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: 'power2.out',
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className={styles.announcement} ref={sectionRef}>
            <div className={styles.container}>
                <h2 className={styles.headerTitle} ref={titleRef}>ANNOUNCEMENTS</h2>

                <div className={styles.grid} ref={gridRef}>
                    {ANNOUNCEMENTS.map((item) => (
                        <article key={item.id} className={styles.card}>
                            <div className={styles.imageWrapper}>
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className={styles.image}
                                    loading="lazy"
                                />
                            </div>

                            <div className={styles.content}>
                                {/* Row 1: Title + New Badge */}
                                <div className={styles.row}>
                                    <div className={styles.titleWrapper}>
                                        <h3 className={styles.title}>{item.title}</h3>
                                        {item.isNew && <span className={styles.badge}>NEW</span>}
                                    </div>
                                    <span className={styles.metaRight}>{item.type} &nbsp; {item.index}</span>
                                </div>

                                {/* Row 2: Location */}
                                <div className={styles.row}>
                                    <span className={styles.meta}>{item.location}</span>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

// Memoize for better performance - this component has no props
export const Announcement = memo(AnnouncementComponent);
Announcement.displayName = 'Announcement';

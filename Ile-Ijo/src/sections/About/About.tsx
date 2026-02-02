/**
 * About Section
 * Features Alter Ego style cursor trail - distance-based image spawning with magnetic follow
 */

import { useRef, useEffect, useCallback, memo } from 'react';
import { gsap } from '../../utils/gsap';
import { TRAIL_IMAGES } from '../../data/gallery';
import styles from './About.module.css';

// Configuration
const SPAWN_DISTANCE = 80; // Pixels moved before spawning new image

function AboutComponent() {
    const sectionRef = useRef<HTMLElement>(null);
    const trailContainerRef = useRef<HTMLDivElement>(null);
    const imageIndexRef = useRef(0);
    const lastPosRef = useRef({ x: 0, y: 0 });
    const zIndexRef = useRef(1);
    const isActiveRef = useRef(false);
    const hasMovedRef = useRef(false);
    const rafIdRef = useRef<number | null>(null);
    const pendingMousePos = useRef<{ x: number; y: number } | null>(null);

    // Calculate distance between two points
    const getDistance = (x1: number, y1: number, x2: number, y2: number) => {
        return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    };

    // Spawn image at cursor position
    const spawnImage = useCallback((x: number, y: number) => {
        if (!trailContainerRef.current) return;

        // Create trail image div
        const trailImg = document.createElement('div');
        trailImg.className = styles.trailImage;

        // Set background image
        const imgUrl = TRAIL_IMAGES[imageIndexRef.current % TRAIL_IMAGES.length];
        trailImg.style.backgroundImage = `url(${imgUrl})`;

        // Position at cursor (will transition to final position)
        trailImg.style.left = `${x}px`;
        trailImg.style.top = `${y}px`;

        // Z-index for stacking (newer on top)
        trailImg.style.zIndex = String(zIndexRef.current++);

        // Random rotation for organic feel
        const rotation = (Math.random() - 0.5) * 24; // ±12 degrees
        trailImg.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;

        trailContainerRef.current.appendChild(trailImg);
        imageIndexRef.current++;

        // Generate organic, irregular "rip" shape using polygon
        // Creates a chaotic star-like tear that will morph into rectangle
        const generateOrganicTear = () => {
            // Center point with randomness
            const cx = 50 + (Math.random() - 0.5) * 20; // 40-60%
            const cy = 50 + (Math.random() - 0.5) * 20;

            // Generate 8-12 points radiating from center with varying distances
            const numPoints = 8 + Math.floor(Math.random() * 5);
            const points: string[] = [];

            for (let i = 0; i < numPoints; i++) {
                const angle = (i / numPoints) * Math.PI * 2;
                // Vary the radius dramatically for chaotic look (5-25% from center)
                const radius = 5 + Math.random() * 20;
                const px = cx + Math.cos(angle) * radius;
                const py = cy + Math.sin(angle) * radius;
                points.push(`${px}% ${py}%`);
            }

            return `polygon(${points.join(', ')})`;
        };

        const organicTear = generateOrganicTear();
        const fullRect = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)';

        // Paper tear reveal: organic shape → full rectangle (slower, eased)
        gsap.fromTo(
            trailImg,
            {
                clipPath: organicTear,
                opacity: 0.6,
            },
            {
                clipPath: fullRect,
                opacity: 1,
                duration: 1.2, // Slower reveal
                ease: 'power2.out',
            }
        );

        // Paper tear exit: collapse back to organic shape (slower, eased)
        gsap.to(trailImg, {
            clipPath: organicTear,
            opacity: 0,
            duration: 0.7, // Slower exit
            delay: 1.5, // Wait for reveal (1.2s) + brief pause
            ease: 'power2.inOut', // Smooth ease both ways
            onComplete: () => {
                trailImg.remove();
            },
        });
    }, []);

    // Process mouse position - RAF throttled for better performance
    const processMousePosition = useCallback(() => {
        rafIdRef.current = null;
        const pos = pendingMousePos.current;
        if (!pos || !sectionRef.current || !isActiveRef.current) return;

        const { x, y } = pos;

        // First movement - initialize last position
        if (!hasMovedRef.current) {
            lastPosRef.current = { x, y };
            hasMovedRef.current = true;
            spawnImage(x, y);
            return;
        }

        // Calculate distance from last spawn
        const distance = getDistance(
            x,
            y,
            lastPosRef.current.x,
            lastPosRef.current.y
        );

        // Spawn new image when moved enough distance
        if (distance >= SPAWN_DISTANCE) {
            spawnImage(x, y);
            lastPosRef.current = { x, y };
        }
    }, [spawnImage]);

    // Handle mouse move - RAF throttled for performance
    const handleMouseMove = useCallback(
        (e: MouseEvent) => {
            if (!sectionRef.current || !isActiveRef.current) return;

            const rect = sectionRef.current.getBoundingClientRect();
            pendingMousePos.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            };

            // Throttle using RAF - only process once per frame
            if (rafIdRef.current === null) {
                rafIdRef.current = requestAnimationFrame(processMousePosition);
            }
        },
        [processMousePosition]
    );

    // Handle mouse enter/leave
    const handleMouseEnter = useCallback(() => {
        isActiveRef.current = true;
        hasMovedRef.current = false;
    }, []);

    const handleMouseLeave = useCallback(() => {
        isActiveRef.current = false;
        hasMovedRef.current = false;
    }, []);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        // Use passive listeners for better performance
        section.addEventListener('mousemove', handleMouseMove, { passive: true });
        section.addEventListener('mouseenter', handleMouseEnter);
        section.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            section.removeEventListener('mousemove', handleMouseMove);
            section.removeEventListener('mouseenter', handleMouseEnter);
            section.removeEventListener('mouseleave', handleMouseLeave);
            // Cancel any pending RAF on cleanup
            if (rafIdRef.current !== null) {
                cancelAnimationFrame(rafIdRef.current);
            }
        };
    }, [handleMouseMove, handleMouseEnter, handleMouseLeave]);

    return (
        <section className={styles.about} id="about" ref={sectionRef}>
            {/* Cursor Trail Container */}
            <div className={styles.trailContainer} ref={trailContainerRef} />

            {/* Header */}
            <header className={styles.header}>
                <h2 className={styles.title}>ABOUT ILE IJO</h2>
                <span className={styles.date}>10-04-2024</span>
            </header>

            {/* Body Copy */}
            <div className={styles.body}>
                <p className={styles.paragraph}>
                    <strong>Ilé Ijo is a cultural experience celebrating movement, rhythm, and community.</strong>{' '}
                    We bring people together through the universal language of dance, creating spaces where
                    cultures connect and stories unfold through motion.
                </p>

                <p className={styles.paragraph}>
                    Born from a passion for African dance traditions and contemporary expression,
                    our events are a masterful blend of vibrant energy, world-class DJs, and an
                    atmosphere that feels like home. Based in <strong>London</strong>, we've built a
                    community of dance lovers who share our vision.
                </p>

                <p className={styles.emphasis}>
                    Because a gathering became a movement. A movement became a culture.
                    And culture is about to become legendary.
                </p>
            </div>
        </section>
    );
}

// Memoize for better performance - this component has no props
export const About = memo(AboutComponent);
About.displayName = 'About';

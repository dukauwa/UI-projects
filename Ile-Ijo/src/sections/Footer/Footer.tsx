import { useRef, useLayoutEffect, useEffect, memo } from 'react';
import { gsap } from '../../utils/gsap';
import styles from './Footer.module.css';

// Declare UnicornStudio on window for TypeScript
declare global {
    interface Window {
        UnicornStudio?: {
            isInitialized?: boolean;
            init: () => void;
        };
    }
}

function FooterComponent() {
    const marqueeRef = useRef<HTMLDivElement>(null);
    const webglRef = useRef<HTMLDivElement>(null);

    // Load Unicorn Studio script
    useEffect(() => {
        const loadUnicornStudio = () => {
            const u = window.UnicornStudio;
            if (u && u.init) {
                u.init();
            } else {
                window.UnicornStudio = { isInitialized: false, init: () => { } };
                const script = document.createElement('script');
                script.src = 'https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.0.4/dist/unicornStudio.umd.js';
                script.onload = () => {
                    window.UnicornStudio?.init();
                };
                document.head.appendChild(script);
            }
        };

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', loadUnicornStudio);
        } else {
            loadUnicornStudio();
        }

        // Remove Unicorn Studio badge - optimized to minimize DOM queries
        const removeBadge = () => {
            // Check in the webgl container first (more specific)
            if (webglRef.current) {
                const badges = webglRef.current.querySelectorAll('a[href*="unicorn.studio"]');
                badges.forEach(badge => badge.remove());
            }
            // Fallback to global check
            const globalBadges = document.querySelectorAll('a[href*="unicorn.studio"]');
            globalBadges.forEach(badge => badge.remove());
        };

        // Use MutationObserver only - remove excessive setInterval polling
        // Debounce the observer callback to prevent excessive DOM queries
        let timeoutId: ReturnType<typeof setTimeout>;
        const debouncedRemoveBadge = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(removeBadge, 100);
        };

        const observer = new MutationObserver(debouncedRemoveBadge);

        // Observe only the webgl container if available, otherwise body
        const observeTarget = webglRef.current || document.body;
        observer.observe(observeTarget, { childList: true, subtree: true });

        // Initial check after script loads
        setTimeout(removeBadge, 1000);

        return () => {
            document.removeEventListener('DOMContentLoaded', loadUnicornStudio);
            observer.disconnect();
            clearTimeout(timeoutId);
        };
    }, []);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Infinite Marquee Animation
            const mm = gsap.matchMedia();

            mm.add("(min-width: 0px)", () => {
                gsap.to(marqueeRef.current, {
                    xPercent: -50,
                    ease: "none",
                    duration: 20,
                    repeat: -1,
                });
            });

        });

        return () => ctx.revert();
    }, []);

    return (
        <footer className={styles.footer}>
            {/* Unicorn Studio WebGL Background */}
            <div className={styles.webglBackground}>
                <div
                    ref={webglRef}
                    data-us-project="iMcdX5PHFolnrGMe4k3j"
                    className={styles.webglEmbed}
                />
            </div>

            <div className={styles.container}>
                {/* Top Row */}
                <div className={styles.topRow}>
                    <div className={styles.column}>
                        <span className={styles.label}>
                            Fill the form to get into<br />
                            exclusive house parties.
                        </span>
                    </div>

                    <div className={`${styles.column} ${styles.center}`}>
                        <img src="/logo.svg" alt="Ile Ijo" className={styles.logo} />
                    </div>

                    <div className={`${styles.column} ${styles.right}`}>
                        <span className={styles.label}>Get In Touch</span>
                        <a href="mailto:hello@ileijo.com" className={styles.link}>
                            HELLO@ILEIJO.COM
                        </a>
                    </div>
                </div>

                {/* Bottom Row */}
                <div className={styles.bottomRow}>
                    <span>©2026 ILEIJO.LIFE® ALL RIGHTS RESERVED</span>

                    <div className={styles.socials}>
                        <a href="#" className={styles.socialLink}>FACEBOOK</a>
                        <a href="#" className={styles.socialLink}>FOUNDER</a>
                        <a href="#" className={styles.socialLink}>INSTAGRAM</a>
                    </div>

                    <span>CRAFTED IN LAGOS BY ANTIGRAVITY</span>
                </div>
            </div>

            {/* Huge Marquee */}
            <div className={styles.marqueeContainer}>
                <div className={styles.marqueeText} ref={marqueeRef}>
                    THE RHYTHM STARTS HERE — THE RHYTHM STARTS HERE —
                </div>
            </div>
        </footer>
    );
}

// Memoize for better performance - this component has no props
export const Footer = memo(FooterComponent);
Footer.displayName = 'Footer';

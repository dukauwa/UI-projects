/**
 * GSAP Setup and Configuration
 * Registers plugins and provides utility functions
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, SplitText);

// Default animation settings
export const defaults = {
  duration: 1,
  ease: 'power3.out',
};

// Configure GSAP defaults
gsap.defaults({
  duration: defaults.duration,
  ease: defaults.ease,
});

// ScrollTrigger defaults for consistent behavior
ScrollTrigger.defaults({
  toggleActions: 'play none none reverse',
  start: 'top 80%',
  end: 'bottom 20%',
});

/**
 * Kill all ScrollTriggers and GSAP instances
 * Call this on component unmount
 */
export function cleanupGsap(): void {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  gsap.killTweensOf('*');
}

/**
 * Refresh ScrollTrigger calculations
 * Call after DOM changes or window resize
 */
export function refreshScrollTrigger(): void {
  ScrollTrigger.refresh();
}

/**
 * Create a reveal animation for an element
 */
export function createReveal(
  element: gsap.TweenTarget,
  options: {
    y?: number;
    opacity?: number;
    duration?: number;
    delay?: number;
    stagger?: number;
  } = {}
): gsap.core.Tween {
  const { y = 50, opacity = 0, duration = 1, delay = 0, stagger = 0 } = options;

  return gsap.from(element, {
    y,
    opacity,
    duration,
    delay,
    stagger,
    ease: 'power3.out',
  });
}

/**
 * Create a scroll-triggered reveal animation
 */
export function createScrollReveal(
  element: gsap.TweenTarget,
  trigger: string | Element,
  options: {
    y?: number;
    opacity?: number;
    duration?: number;
    stagger?: number;
    start?: string;
    end?: string;
    scrub?: boolean | number;
  } = {}
): gsap.core.Tween {
  const {
    y = 50,
    opacity = 0,
    duration = 1,
    stagger = 0,
    start = 'top 80%',
    end = 'bottom 20%',
    scrub = false,
  } = options;

  return gsap.from(element, {
    y,
    opacity,
    duration,
    stagger,
    ease: 'power3.out',
    scrollTrigger: {
      trigger,
      start,
      end,
      scrub,
    },
  });
}

/**
 * Create a parallax effect on scroll
 */
export function createParallax(
  element: gsap.TweenTarget,
  trigger: string | Element,
  options: {
    yPercent?: number;
    speed?: number;
  } = {}
): gsap.core.Tween {
  const { yPercent = -20, speed = 1 } = options;

  return gsap.to(element, {
    yPercent: yPercent * speed,
    ease: 'none',
    scrollTrigger: {
      trigger,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  });
}

export { gsap, ScrollTrigger, SplitText };

/**
 * Ile Ijo - Main Application
 * High-fidelity one-page website with optimized loading
 */

import { lazy, Suspense, memo } from 'react';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { Hero } from './sections/Hero/Hero';
import { About } from './sections/About/About';
import './styles/global.css';
import './styles/layout_fixes.css';

// Lazy load below-the-fold sections for better initial load performance
const Announcement = lazy(() => import('./sections/Announcement/Announcement').then(m => ({ default: m.Announcement })));
const Breather = lazy(() => import('./sections/Breather/Breather').then(m => ({ default: m.Breather })));
const Events = lazy(() => import('./sections/Events/Events').then(m => ({ default: m.Events })));
const Footer = lazy(() => import('./sections/Footer/Footer').then(m => ({ default: m.Footer })));

// Loading fallback for lazy-loaded components
const SectionLoader = memo(() => (
  <div style={{ minHeight: '50vh' }} aria-label="Loading section..." />
));
SectionLoader.displayName = 'SectionLoader';

function App() {
  // Initialize smooth scrolling
  useSmoothScroll();

  return (
    <>
      <div className="main-content">
        {/* Above-the-fold content - loaded immediately */}
        <Hero />
        <About />

        {/* Below-the-fold content - lazy loaded */}
        <Suspense fallback={<SectionLoader />}>
          <Announcement />
          <Breather />
          <Events />
        </Suspense>
      </div>
      <Suspense fallback={<SectionLoader />}>
        <Footer />
      </Suspense>
    </>
  );
}

export default memo(App);

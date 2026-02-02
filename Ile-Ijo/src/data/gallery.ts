/**
 * Shared Gallery Data
 * Centralized image data to avoid duplication across components
 */

// Base Unsplash URLs for event/dance photos
export const GALLERY_IMAGES = {
    event1: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7',
    event2: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec',
    dj: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745',
    crowd: 'https://images.unsplash.com/photo-1504680177321-2e6a879aac86',
    concert: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f',
    stage: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea',
    dance1: 'https://images.unsplash.com/photo-1571266028243-e4733b0f0bb0',
    dance2: 'https://images.unsplash.com/photo-1574391884720-bbc3740c59d1',
    party1: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434',
    party2: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad',
    festival: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30',
} as const;

// Helper to generate optimized image URL with width and quality params
export function getOptimizedImageUrl(baseUrl: string, width = 600, quality = 80): string {
    return `${baseUrl}?w=${width}&q=${quality}`;
}

// Gallery items for the Gallery section
export const GALLERY_ITEMS = [
    {
        id: 1,
        src: getOptimizedImageUrl(GALLERY_IMAGES.event1, 800),
        title: 'Lagos Night',
        size: 'large' as const,
    },
    {
        id: 2,
        src: getOptimizedImageUrl(GALLERY_IMAGES.event2),
        title: 'The Movement',
        size: 'medium' as const,
    },
    {
        id: 3,
        src: getOptimizedImageUrl(GALLERY_IMAGES.dj, 400),
        title: 'Rhythm & Soul',
        size: 'small' as const,
    },
    {
        id: 4,
        src: getOptimizedImageUrl(GALLERY_IMAGES.crowd, 400),
        title: 'Community',
        size: 'small' as const,
    },
    {
        id: 5,
        src: getOptimizedImageUrl(GALLERY_IMAGES.concert),
        title: 'Electric Nights',
        size: 'medium' as const,
    },
    {
        id: 6,
        src: getOptimizedImageUrl(GALLERY_IMAGES.stage, 400),
        title: 'Unity',
        size: 'small' as const,
    },
    {
        id: 7,
        src: getOptimizedImageUrl(GALLERY_IMAGES.dance1, 400),
        title: 'Celebration',
        size: 'small' as const,
    },
    {
        id: 8,
        src: getOptimizedImageUrl(GALLERY_IMAGES.dance2),
        title: 'Culture',
        size: 'medium' as const,
    },
];

// Events gallery items (different layout structure)
export const EVENTS_GALLERY_ITEMS = [
    { id: 1, image: getOptimizedImageUrl(GALLERY_IMAGES.event2), height: 'tall' as const, index: '01' },
    { id: 5, image: getOptimizedImageUrl(GALLERY_IMAGES.dj), height: 'short' as const, index: '05' },
    { id: 9, image: getOptimizedImageUrl(GALLERY_IMAGES.dance2), height: 'medium' as const, index: '09' },
    { id: 2, image: getOptimizedImageUrl(GALLERY_IMAGES.party1), height: 'medium' as const, index: '02' },
    { id: 6, image: getOptimizedImageUrl(GALLERY_IMAGES.party2), height: 'tall' as const, index: '06' },
    { id: 10, image: getOptimizedImageUrl(GALLERY_IMAGES.event2), height: 'short' as const, index: '10' },
    { id: 3, image: getOptimizedImageUrl(GALLERY_IMAGES.event1), height: 'tall' as const, index: '03' },
    { id: 7, image: getOptimizedImageUrl(GALLERY_IMAGES.concert), height: 'medium' as const, index: '07' },
    { id: 11, image: getOptimizedImageUrl(GALLERY_IMAGES.event1), height: 'tall' as const, index: '11' },
    { id: 4, image: getOptimizedImageUrl(GALLERY_IMAGES.festival), height: 'short' as const, index: '04' },
    { id: 8, image: getOptimizedImageUrl(GALLERY_IMAGES.stage), height: 'medium' as const, index: '08' },
    { id: 12, image: getOptimizedImageUrl(GALLERY_IMAGES.crowd), height: 'tall' as const, index: '12' },
];

// Trail images for the About section cursor effect
export const TRAIL_IMAGES = [
    getOptimizedImageUrl(GALLERY_IMAGES.event1, 400),
    getOptimizedImageUrl(GALLERY_IMAGES.event2, 400),
    getOptimizedImageUrl(GALLERY_IMAGES.dj, 400),
    getOptimizedImageUrl(GALLERY_IMAGES.crowd, 400),
    getOptimizedImageUrl(GALLERY_IMAGES.concert, 400),
    getOptimizedImageUrl(GALLERY_IMAGES.stage, 400),
    getOptimizedImageUrl(GALLERY_IMAGES.dance1, 400),
    getOptimizedImageUrl(GALLERY_IMAGES.dance2, 400),
];

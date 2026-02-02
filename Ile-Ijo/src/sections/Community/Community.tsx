/**
 * Community Section
 * Testimonials and social proof
 */

import styles from './Community.module.css';

const PLACEHOLDER_TESTIMONIALS = [
    {
        id: 1,
        quote: 'Ile Ijo transformed the way I connect with my cultural roots. Every event is a journey.',
        name: 'Adaora N.',
        role: 'Community Member',
    },
    {
        id: 2,
        quote: 'The energy at these gatherings is unmatched. You can feel the history and the future dancing together.',
        name: 'Kwame A.',
        role: 'Dance Instructor',
    },
    {
        id: 3,
        quote: 'More than events—Ile Ijo creates family. I found my people here.',
        name: 'Fatima B.',
        role: 'Artist',
    },
];

export function Community() {
    return (
        <section className={styles.community} id="community">
            <div className={styles.container}>
                <div className={styles.header}>
                    <p className="text-eyebrow">Our Community</p>
                    <h2 className={styles.title}>Voices</h2>
                </div>

                <div className={styles.testimonials}>
                    {PLACEHOLDER_TESTIMONIALS.map((testimonial) => (
                        <article key={testimonial.id} className={styles.testimonial}>
                            <p className={styles.quote}>{testimonial.quote}</p>
                            <div className={styles.author}>
                                <div className={styles.avatar}>[A]</div>
                                <div className={styles.authorInfo}>
                                    <span className={styles.authorName}>{testimonial.name}</span>
                                    <span className={styles.authorRole}>{testimonial.role}</span>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

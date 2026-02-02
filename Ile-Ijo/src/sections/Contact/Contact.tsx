/**
 * Contact Section
 * Newsletter signup and contact form
 */

import styles from './Contact.module.css';

export function Contact() {
    return (
        <section className={styles.contact} id="contact">
            <div className={styles.container}>
                <div className={styles.header}>
                    <p className="text-eyebrow">Get In Touch</p>
                    <h2 className={styles.title}>Join The Movement</h2>
                    <p className={styles.subtitle}>
                        Subscribe to our newsletter and be the first to know about upcoming events.
                    </p>
                </div>

                <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
                    <div className={styles.inputGroup}>
                        <input
                            type="text"
                            placeholder="First Name"
                            className={styles.input}
                        />
                        <input
                            type="text"
                            placeholder="Last Name"
                            className={styles.input}
                        />
                    </div>
                    <input
                        type="email"
                        placeholder="Email Address"
                        className={styles.input}
                    />
                    <textarea
                        placeholder="Message (optional)"
                        className={`${styles.input} ${styles.textarea}`}
                    />
                    <button type="submit" className="btn btn-primary">
                        Subscribe
                    </button>
                </form>

                <div className={styles.socials}>
                    <a href="#" className={styles.socialLink} aria-label="Instagram">IG</a>
                    <a href="#" className={styles.socialLink} aria-label="Twitter">X</a>
                    <a href="#" className={styles.socialLink} aria-label="YouTube">YT</a>
                </div>
            </div>
        </section>
    );
}

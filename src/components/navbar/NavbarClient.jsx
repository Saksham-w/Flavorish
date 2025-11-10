"use client";

import { useState } from "react";
import styles from "./navbar.module.css";

export function ContactButton() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsContactOpen(true)} className={styles.link}>
        Contact
      </button>

      {/* Contact Modal */}
      {isContactOpen && (
        <div
          className={styles.modalOverlay}
          onClick={() => setIsContactOpen(false)}
        >
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h1 className={styles.modalTitle}>Let's Connect</h1>
              <button
                className={styles.closeButton}
                onClick={() => setIsContactOpen(false)}
                aria-label="Close"
              >
                ×
              </button>
            </div>
            <form
              action="https://getform.io/f/eede88e8-a0db-4fa3-90d7-00ecb59962c8"
              method="POST"
              className={styles.modalForm}
            >
              <div className={styles.formGroup}>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  className={styles.formInput}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className={styles.formInput}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <textarea
                  name="message"
                  placeholder="Enter your message"
                  rows="5"
                  className={styles.formInput}
                  required
                />
              </div>
              <div className={styles.modalActions}>
                <button type="submit" className={styles.primaryButton}>
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export function HomepageLink() {
  const handleHomepageClick = (e) => {
    e.preventDefault();
    window.location.href = "/";
  };

  return (
    <a href="/" onClick={handleHomepageClick} className={styles.link}>
      Homepage
    </a>
  );
}

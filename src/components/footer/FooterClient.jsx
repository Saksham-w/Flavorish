"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { Send } from "lucide-react";
import styles from "./footer.module.css";

// Newsletter Form Component
export const NewsletterForm = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus({ type: "", message: "" });

    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus({ type: "success", message: data.message });
        setEmail("");
        setIsSubscribed(true);

        setTimeout(() => {
          setStatus({ type: "", message: "" });
        }, 5000);
      } else {
        setStatus({
          type: "error",
          message: data.error || "Something went wrong",
        });

        setTimeout(() => {
          setStatus({ type: "", message: "" });
        }, 5000);
      }
    } catch (error) {
      setStatus({
        type: "error",
        message: "Failed to subscribe. Please try again.",
      });

      setTimeout(() => {
        setStatus({ type: "", message: "" });
      }, 5000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className={styles.newsletter} onSubmit={handleSubscribe}>
      <div className={styles.inputWrapper}>
        <input
          type="email"
          placeholder="Your email address"
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isLoading}
        />
        <button
          type="submit"
          className={`${styles.button} ${isSubscribed ? styles.subscribed : ""}`}
          disabled={isLoading || isSubscribed}
        >
          {isLoading ? "..." : isSubscribed ? "✓" : <Send size={16} />}
        </button>
      </div>
      {status.message && (
        <p className={`${styles.statusMessage} ${styles[status.type]}`}>
          {status.message}
        </p>
      )}
    </form>
  );
};

// Home Link with Scroll
export const HomeLink = () => {
  const pathname = usePathname();

  const handleHomeClick = (e) => {
    e.preventDefault();
    if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.location.href = "/";
    }
  };

  return (
    <a
      href="/"
      onClick={handleHomeClick}
      className={styles.link}
      style={{ cursor: "pointer" }}
    >
      Home
    </a>
  );
};

// Contact Button with Modal
export const ContactButton = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsContactOpen(true)}
        className={styles.link}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 0,
          textAlign: "left",
        }}
      >
        Contact
      </button>

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
};

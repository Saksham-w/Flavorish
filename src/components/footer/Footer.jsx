"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Facebook, Instagram, Mail, Phone, Send } from "lucide-react";
import styles from "./Footer.module.css";

const Footer = () => {
  const pathname = usePathname();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const handleHomeClick = (e) => {
    e.preventDefault();
    if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.location.href = "/";
    }
  };

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

        // Auto-hide success message after 5 seconds
        setTimeout(() => {
          setStatus({ type: "", message: "" });
        }, 5000);
      } else {
        setStatus({
          type: "error",
          message: data.error || "Something went wrong",
        });

        // Auto-hide error message after 5 seconds
        setTimeout(() => {
          setStatus({ type: "", message: "" });
        }, 5000);
      }
    } catch (error) {
      setStatus({
        type: "error",
        message: "Failed to subscribe. Please try again.",
      });

      // Auto-hide error message after 5 seconds
      setTimeout(() => {
        setStatus({ type: "", message: "" });
      }, 5000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <footer className={styles.container}>
        <div className={styles.content}>
          {/* Main Footer Content */}
          <div className={styles.grid}>
            {/* Brand Section */}
            <div className={styles.section}>
              <div className={styles.logo}>
                <Image
                  src="/logo.png"
                  alt="flavorish"
                  width={100}
                  height={100}
                  className={styles.logoImage}
                  style={{}}
                />
              </div>
              <div className={styles.socialIcons}>
                <a
                  href="https://www.facebook.com/saksham.shrestha.400/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialIcon}
                  aria-label="Facebook"
                >
                  <Facebook size={20} />
                </a>
                <a
                  href="https://www.instagram.com/saksham_sth/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialIcon}
                  aria-label="Instagram"
                >
                  <Instagram size={20} />
                </a>
                <a
                  href="mailto:sakshamshrestha400@gmail.com"
                  className={styles.socialIcon}
                  aria-label="Email"
                  title="Email: sakshamshrestha400@gmail.com"
                >
                  <Mail size={20} />
                </a>
                <a
                  href="tel:+9779863333036"
                  className={styles.socialIcon}
                  aria-label="Call"
                  title="Call: +977 9863333036"
                >
                  <Phone size={20} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Quick Links</h3>
              <ul className={styles.linkList}>
                <li>
                  <a href="/" onClick={handleHomeClick} className={styles.link}>
                    Home
                  </a>
                </li>
                <li>
                  <Link href="/blog" className={styles.link}>
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/about" className={styles.link}>
                    About Us
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => setIsContactOpen(true)}
                    className={styles.link}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                    }}
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>

            {/* Categories */}
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Categories</h3>
              <ul className={styles.linkList}>
                <li>
                  <Link href="/blog?cat=style" className={styles.link}>
                    Style
                  </Link>
                </li>
                <li>
                  <Link href="/blog?cat=fashion" className={styles.link}>
                    Fashion
                  </Link>
                </li>
                <li>
                  <Link href="/blog?cat=food" className={styles.link}>
                    Food
                  </Link>
                </li>

                <li>
                  <Link href="/blog?cat=style" className={styles.link}>
                    Style
                  </Link>
                </li>
                <li>
                  <Link href="/blog?cat=travel" className={styles.link}>
                    Travel
                  </Link>
                </li>
                <li>
                  <Link href="/blog?cat=general" className={styles.link}>
                    General
                  </Link>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Stay Updated</h3>
              <p className={styles.newsletterText}>
                Subscribe to our newsletter for the latest articles and
                insights.
              </p>
              <form className={styles.newsletter} onSubmit={handleSubscribe}>
                <input
                  type="email"
                  placeholder="Enter your email"
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
                  <Send size={18} />
                  {isLoading
                    ? "..."
                    : isSubscribed
                      ? "Subscribed"
                      : "Subscribe"}
                </button>
              </form>
              {status.message && (
                <p className={`${styles.statusMessage} ${styles[status.type]}`}>
                  {status.message}
                </p>
              )}
            </div>
          </div>

          {/* Bottom Bar */}
          <div className={styles.bottom}>
            <div className={styles.bottomContent}>
              <p className={styles.copyright}>
                © 2025 Saksham Shrestha Blogs. All rights reserved.
              </p>
              <div className={styles.legalLinks}>
                <Link href="/privacy" className={styles.legalLink}>
                  Privacy Policy
                </Link>
                <Link href="/terms" className={styles.legalLink}>
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>

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
};

export default Footer;

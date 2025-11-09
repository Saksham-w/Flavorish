"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Youtube, Send } from "lucide-react";
import styles from "./Footer.module.css";

const Footer = () => {
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
    <footer className={styles.container}>
      <div className={styles.content}>
        {/* Main Footer Content */}
        <div className={styles.grid}>
          {/* Brand Section */}
          <div className={styles.section}>
            <div className={styles.logo}>
              <Image src="/logo.png" alt="Sblog" width={40} height={40} />
              <h2 className={styles.brandName}>Sblog</h2>
            </div>
            <p className={styles.description}>
              Discover insightful stories, creative ideas, and expert
              perspectives on topics that matter to you.
            </p>
            <div className={styles.socialIcons}>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialIcon}
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialIcon}
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialIcon}
              >
                <Youtube size={20} />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialIcon}
              >
                <Image src="/tiktok.png" alt="TikTok" width={18} height={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Quick Links</h3>
            <ul className={styles.linkList}>
              <li>
                <Link href="/" className={styles.link}>
                  Home
                </Link>
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
                <Link href="/contact" className={styles.link}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Categories</h3>
            <ul className={styles.linkList}>
              <li>
                <Link href="/blog?cat=coding" className={styles.link}>
                  Coding
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
                <Link href="/blog?cat=culture" className={styles.link}>
                  Culture
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Stay Updated</h3>
            <p className={styles.newsletterText}>
              Subscribe to our newsletter for the latest articles and insights.
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
                {isLoading ? "..." : isSubscribed ? "Subscribed" : "Subscribe"}
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
  );
};

export default Footer;

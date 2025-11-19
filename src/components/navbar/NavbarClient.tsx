"use client";
import { useState, useEffect, useContext, ReactNode, FormEvent } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import styles from "./navbar.module.css";
import { ThemeContext } from "@/context/ThemeContext";

interface NavbarClientProps {
  children: ReactNode;
}

export function NavbarClient({ children }: NavbarClientProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const { status } = useSession();

  const handleContactSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    try {
      const response = await fetch(
        "https://getform.io/f/eede88e8-a0db-4fa3-90d7-00ecb59962c8",
        {
          method: "POST",
          body: formData,
          headers: { Accept: "application/json" },
        }
      );

      if (response.ok) {
        alert("Message sent! We'll get back to you soon.");
        form.reset();
        setIsContactModalOpen(false);
      } else {
        alert("Oops! There was a problem submitting your form.");
      }
    } catch (error) {
      alert("Oops! There was a problem submitting your form.");
    }
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <nav className={styles.navbar}>
        {/* This renders the logo and nav links from Navbar.jsx */}
        <div style={{ display: "contents" }}>{children}</div>

        {/* Desktop Actions - All in one row */}
        <div className={styles.desktopActions}>
          {status === "unauthenticated" ? (
            <Link href="/login" className={styles.actionLink}>
              Login
            </Link>
          ) : (
            <>
              <Link href="/write" className={styles.actionLink}>
                Write
              </Link>
              <button onClick={() => signOut()} className={styles.actionLink}>
                Logout
              </button>
            </>
          )}

          <ThemeToggleButton />

          <button
            onClick={() => setIsContactModalOpen(true)}
            className={styles.iconButton}
            aria-label="Contact"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={styles.mobileMenuButton}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className={styles.mobileMenu}>
          <Link
            href="/"
            className={styles.mobileLink}
            onClick={closeMobileMenu}
          >
            Home
          </Link>
          <Link
            href="/about"
            className={styles.mobileLink}
            onClick={closeMobileMenu}
          >
            About
          </Link>
          <Link
            href="/blog"
            className={styles.mobileLink}
            onClick={closeMobileMenu}
          >
            Blog
          </Link>
          <Link
            href="/popular"
            className={styles.mobileLink}
            onClick={closeMobileMenu}
          >
            Popular
          </Link>
          <Link
            href="/toprated"
            className={styles.mobileLink}
            onClick={closeMobileMenu}
          >
            Top Rated
          </Link>

          <div className={styles.mobileDivider} />

          {status === "unauthenticated" ? (
            <Link
              href="/login"
              className={styles.mobileLink}
              onClick={closeMobileMenu}
            >
              Login
            </Link>
          ) : (
            <>
              <Link
                href="/write"
                className={styles.mobileLink}
                onClick={closeMobileMenu}
              >
                Write
              </Link>
              <button
                onClick={() => {
                  signOut();
                  closeMobileMenu();
                }}
                className={styles.mobileLink}
              >
                Logout
              </button>
            </>
          )}

          <div className={styles.mobileThemeToggle}>
            <ThemeToggleButton />
          </div>

          <button
            onClick={() => {
              setIsContactModalOpen(true);
              closeMobileMenu();
            }}
            className={styles.mobileContactButton}
          >
            Contact
          </button>
        </div>
      )}

      {/* Contact Modal */}
      {isContactModalOpen && (
        <div
          className={styles.modalOverlay}
          onClick={() => setIsContactModalOpen(false)}
        >
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>Get in Touch</h2>
              <button
                onClick={() => setIsContactModalOpen(false)}
                className={styles.closeButton}
              >
                ×
              </button>
            </div>
            <form onSubmit={handleContactSubmit} className={styles.modalForm}>
              <div className={styles.formGroup}>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  className={styles.formInput}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  className={styles.formInput}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows={4}
                  className={styles.formInput}
                  required
                />
              </div>
              <div className={styles.modalActions}>
                <button type="submit" className={styles.primaryButton}>
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

function ThemeToggleButton() {
  const context = useContext(ThemeContext);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !context) {
    return (
      <button className={styles.iconButton} aria-label="Toggle theme">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="5" />
        </svg>
      </button>
    );
  }

  const { theme, toggle } = context;

  return (
    <button
      onClick={toggle}
      className={styles.iconButton}
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      ) : (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      )}
    </button>
  );
}

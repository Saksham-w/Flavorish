import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Mail, Phone } from "lucide-react";
import styles from "./footer.module.css";
import { NewsletterForm, HomeLink, ContactButton } from "./FooterClient";

// Fetch categories server-side
async function getCategories() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/categories`,
      {
        cache: "no-store",
      }
    );
    if (res.ok) {
      return await res.json();
    }
  } catch (error) {
    console.error("Failed to fetch categories:", error);
  }
  return [];
}

const Footer = async () => {
  const categories = await getCategories();

  return (
    <>
      <footer className={styles.container}>
        <div className={styles.content}>
          {/* Top Section - Brand & Newsletter */}
          <div className={styles.topSection}>
            <div className={styles.brandSection}>
              <div className={styles.logo}>
                <Image
                  src="/logo.png"
                  alt="flavorish"
                  width={80}
                  height={80}
                  className={styles.logoImage}
                />
              </div>
              <p className={styles.brandDescription}>
                Discover Foods, Blogs, Restaurants, and Reviews topic.
              </p>
              <div className={styles.socialIcons}>
                <a
                  href="https://www.facebook.com/saksham.shrestha.400/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialIcon}
                  aria-label="Facebook"
                >
                  <Facebook size={18} />
                </a>
                <a
                  href="https://www.instagram.com/saksham_sth/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialIcon}
                  aria-label="Instagram"
                >
                  <Instagram size={18} />
                </a>
                <a
                  href="mailto:sakshamshrestha400@gmail.com"
                  className={styles.socialIcon}
                  aria-label="Email"
                  title="Email: sakshamshrestha400@gmail.com"
                >
                  <Mail size={18} />
                </a>
                <a
                  href="tel:+9779863333036"
                  className={styles.socialIcon}
                  aria-label="Call"
                  title="Call: +977 9863333036"
                >
                  <Phone size={18} />
                </a>
              </div>
            </div>

            <div className={styles.newsletterSection}>
              <h3 className={styles.newsletterTitle}>Stay in the loop</h3>
              <p className={styles.newsletterText}>
                Join our newsletter to get top stories delivered to your inbox.
              </p>
              <NewsletterForm />
            </div>
          </div>

          {/* Divider */}
          <div className={styles.divider}></div>

          {/* Links Section */}
          <div className={styles.linksSection}>
            {/* Quick Links */}
            <div className={styles.linkColumn}>
              <h4 className={styles.columnTitle}>Navigate</h4>
              <ul className={styles.linkList}>
                <li>
                  <HomeLink />
                </li>
                <li>
                  <Link href="/blog" className={styles.link}>
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/about" className={styles.link}>
                    About
                  </Link>
                </li>
                <li>
                  <ContactButton />
                </li>
              </ul>
            </div>

            {/* Categories */}
            <div className={styles.linkColumn}>
              <h4 className={styles.columnTitle}>Categories</h4>
              <div className={styles.categoriesWrapper}>
                {categories.slice(0, 12).map((category) => (
                  <Link
                    key={category.id || category.slug}
                    href={`/blog?cat=${category.slug}`}
                    className={styles.categoryTag}
                  >
                    {category.title.charAt(0).toUpperCase() +
                      category.title.slice(1)}
                  </Link>
                ))}
              </div>
            </div>

            {/* Legal */}
            <div className={styles.linkColumn}>
              <h4 className={styles.columnTitle}>Legal</h4>
              <ul className={styles.linkList}>
                <li>
                  <Link href="/privacy" className={styles.link}>
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className={styles.link}>
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className={styles.bottom}>
            <p className={styles.copyright}>
              © 2025 Saksham Shrestha Blogs. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;

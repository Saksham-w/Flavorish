import React from "react";
import styles from "./navbar.module.css";
import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "../themeToggle/ThemeToggle";
import AuthLinks from "../authLinks/AuthLinks";
import { ContactButton } from "./NavbarClient";

function Navbar() {
  return (
    <div className={styles.container}>
      <div className={styles.social}>
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Flavorish"
            width={70}
            height={70}
            style={{
              borderRadius: "0.5rem",
              boxShadow: "0 4px 12px rgba(20, 184, 166, 0.15)",
              cursor: "pointer",
            }}
          />
        </Link>
      </div>
      <Link href="/" className={styles.logo}>
        FLAVORISH
      </Link>
      <div className={styles.links}>
        <ThemeToggle />
        <ContactButton />
        <Link href="/about" className={styles.link}>
          About
        </Link>
        <Link href="/blog" className={styles.link}>
          Blog
        </Link>
        <AuthLinks />
      </div>
    </div>
  );
}

export default Navbar;

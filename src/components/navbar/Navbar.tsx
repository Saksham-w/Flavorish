import React from "react";
import styles from "./navbar.module.css";
import Link from "next/link";
import Image from "next/image";
import { NavbarClient } from "./NavbarClient";

function Navbar() {
  return (
    <NavbarClient>
      <div className={styles.container}>
        {/* Logo */}
        <Link href="/" className={styles.logoSection}>
          <div className={styles.logoWrapper}>
            <Image
              src="/logo.png"
              alt="Flavorish"
              width={45}
              height={45}
              className={styles.logoImage}
            />
          </div>
          <span className={styles.logoText}>FLAVORISH</span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className={styles.navLinks}>
          <Link href="/" className={styles.navLink}>
            Home
          </Link>
          <Link href="/about" className={styles.navLink}>
            About
          </Link>
          <Link href="/blog" className={styles.navLink}>
            Blog
          </Link>
          <Link href="/popular" className={styles.navLink}>
            Popular
          </Link>
          <Link href="/toprated" className={styles.navLink}>
            Top Rated
          </Link>
        </nav>

        {/* Right side actions - auth, theme, contact will be added by NavbarClient */}
      </div>
    </NavbarClient>
  );
}

export default Navbar;

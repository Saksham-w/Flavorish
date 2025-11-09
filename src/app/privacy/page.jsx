import React from "react";
import styles from "./privacy.module.css";

export default function PrivacyPolicy() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Privacy Policy</h1>
        <p className={styles.lastUpdated}>Last updated: November 9, 2025</p>

        <section className={styles.section}>
          <h2 className={styles.heading}>Introduction</h2>
          <p className={styles.text}>
            Welcome to Saksham Shrestha Blogs ("we," "our," or "us"). We respect
            your privacy and are committed to protecting your personal data.
            This privacy policy will inform you about how we look after your
            personal data when you visit our website and tell you about your
            privacy rights.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.heading}>Information We Collect</h2>
          <p className={styles.text}>
            We may collect, use, store and transfer different kinds of personal
            data about you:
          </p>
          <ul className={styles.list}>
            <li>
              <strong>Identity Data:</strong> First name, last name, username
            </li>
            <li>
              <strong>Contact Data:</strong> Email address
            </li>
            <li>
              <strong>Technical Data:</strong> IP address, browser type, device
              information
            </li>
            <li>
              <strong>Usage Data:</strong> Information about how you use our
              website and services
            </li>
            <li>
              <strong>Content Data:</strong> Blog posts, comments you create on
              our platform
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.heading}>How We Use Your Information</h2>
          <p className={styles.text}>
            We use your personal data for the following purposes:
          </p>
          <ul className={styles.list}>
            <li>To register you as a new user and manage your account</li>
            <li>To enable you to create and publish blog posts</li>
            <li>
              To allow you to comment on posts and interact with other users
            </li>
            <li>
              To send you newsletter updates about new blog posts (if you
              subscribed)
            </li>
            <li>To improve our website and user experience</li>
            <li>To respond to your inquiries and support requests</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.heading}>Newsletter Subscription</h2>
          <p className={styles.text}>If you subscribe to our newsletter:</p>
          <ul className={styles.list}>
            <li>We will send you email notifications about new blog posts</li>
            <li>
              You can unsubscribe at any time by clicking the unsubscribe link
              in any email
            </li>
            <li>We will never share your email address with third parties</li>
            <li>Your email will only be used for newsletter purposes</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.heading}>Authentication</h2>
          <p className={styles.text}>
            We use Google OAuth for authentication. When you sign in with
            Google:
          </p>
          <ul className={styles.list}>
            <li>
              We receive your name, email address, and profile picture from
              Google
            </li>
            <li>We do not store your Google password</li>
            <li>
              You can revoke access at any time through your Google account
              settings
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.heading}>Cookies</h2>
          <p className={styles.text}>
            We use cookies and similar tracking technologies to:
          </p>
          <ul className={styles.list}>
            <li>Keep you signed in to your account</li>
            <li>Remember your preferences (like theme settings)</li>
            <li>Analyze how our website is used</li>
          </ul>
          <p className={styles.text}>
            You can set your browser to refuse all cookies, but some features of
            our website may not function properly.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.heading}>Data Security</h2>
          <p className={styles.text}>
            We have implemented appropriate security measures to prevent your
            personal data from being accidentally lost, used, or accessed in an
            unauthorized way. However, no method of transmission over the
            Internet is 100% secure.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.heading}>Your Rights</h2>
          <p className={styles.text}>You have the right to:</p>
          <ul className={styles.list}>
            <li>
              <strong>Access:</strong> Request copies of your personal data
            </li>
            <li>
              <strong>Correction:</strong> Request correction of inaccurate data
            </li>
            <li>
              <strong>Deletion:</strong> Request deletion of your personal data
            </li>
            <li>
              <strong>Withdraw consent:</strong> Unsubscribe from newsletters at
              any time
            </li>
            <li>
              <strong>Data portability:</strong> Request transfer of your data
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.heading}>Third-Party Services</h2>
          <p className={styles.text}>
            We use the following third-party services:
          </p>
          <ul className={styles.list}>
            <li>
              <strong>Google OAuth:</strong> For user authentication
            </li>
            <li>
              <strong>MongoDB:</strong> For data storage
            </li>
            <li>
              <strong>Supabase:</strong> For image storage
            </li>
            <li>
              <strong>Resend:</strong> For sending email newsletters
            </li>
          </ul>
          <p className={styles.text}>
            These services have their own privacy policies governing their use
            of your information.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.heading}>Children's Privacy</h2>
          <p className={styles.text}>
            Our service is not intended for children under 13 years of age. We
            do not knowingly collect personal information from children under
            13.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.heading}>Changes to This Policy</h2>
          <p className={styles.text}>
            We may update this privacy policy from time to time. We will notify
            you of any changes by posting the new privacy policy on this page
            and updating the "Last updated" date.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.heading}>Contact Us</h2>
          <p className={styles.text}>
            If you have any questions about this Privacy Policy, please contact
            us at:
          </p>
          <p className={styles.text}>
            <strong>Email:</strong> sakshamshrestha400@gmail.com
          </p>
        </section>
      </div>
    </div>
  );
}

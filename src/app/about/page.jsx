import React from "react";
import styles from "./about.module.css";

export const metadata = {
  title: "About Us | FLAVORISH",
  description:
    "Learn more about FLAVORISH - your destination for insightful stories, creative ideas, and expert perspectives.",
};

const AboutPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>About FLAVORISH</h1>

        <div className={styles.section}>
          <h2 className={styles.heading}>What is FLAVORISH?</h2>
          <p className={styles.text}>
            FLAVORISH is a modern blogging platform where ideas come to life.
            We're passionate about sharing stories that matter, perspectives
            that inspire, and knowledge that empowers. Whether you're here to
            learn something new, explore different viewpoints, or simply enjoy
            quality content, FLAVORISH is your digital destination.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.heading}>What We Do</h2>
          <p className={styles.text}>
            We curate and create content across diverse topics that resonate
            with modern readers:
          </p>
          <ul className={styles.list}>
            <li>
              <strong>Coding & Technology</strong> - Latest tech trends,
              tutorials, and insights
            </li>
            <li>
              <strong>Lifestyle & Culture</strong> - Stories about life,
              society, and human experiences
            </li>
            <li>
              <strong>Fashion & Style</strong> - Fashion trends, style guides,
              and personal expression
            </li>
            <li>
              <strong>Food & Recipes</strong> - Culinary adventures and
              delicious discoveries
            </li>
            <li>
              <strong>Travel & Adventure</strong> - Exploring the world, one
              story at a time
            </li>
          </ul>
        </div>

        <div className={styles.section}>
          <h2 className={styles.heading}>Our Mission</h2>
          <p className={styles.text}>
            We believe in the power of words to inform, inspire, and connect.
            Our mission is to create a space where quality content meets curious
            minds, where every article adds value, and where readers leave with
            something meaningful - be it knowledge, inspiration, or simply a
            fresh perspective.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.heading}>Stay Connected</h2>
          <p className={styles.text}>
            Join our growing community of readers. Subscribe to our newsletter
            to receive the latest articles directly in your inbox, and follow us
            on social media to stay updated with our newest content and
            behind-the-scenes insights.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;

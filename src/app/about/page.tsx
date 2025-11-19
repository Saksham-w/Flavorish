import React from "react";
import styles from "./about.module.css";

export const metadata = {
  title: "About Us | FLAVORISH",
  description:
    "Learn more about FLAVORISH - your ultimate destination for food reviews, culinary discoveries, and sharing your dining experiences with ratings.",
};

const AboutPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>About FLAVORISH</h1>

        <div className={styles.section}>
          <h2 className={styles.heading}>What is FLAVORISH?</h2>
          <p className={styles.text}>
            FLAVORISH is a dedicated food review platform where food lovers
            share their culinary adventures and discoveries. Whether you're a
            food critic, a home cook, or simply someone who loves to explore new
            flavors, FLAVORISH is your go-to destination for authentic food
            reviews, ratings, and delicious recommendations.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.heading}>What We Offer</h2>
          <p className={styles.text}>
            FLAVORISH provides a comprehensive platform for food enthusiasts to:
          </p>
          <ul className={styles.list}>
            <li>
              <strong>Share Food Reviews</strong> - Write detailed reviews of
              restaurants, dishes, and culinary experiences
            </li>
            <li>
              <strong>Rate Your Favorites</strong> - Give star ratings (1-5
              stars) to help others discover the best food
            </li>
            <li>
              <strong>Add Locations</strong> - Pin restaurant locations on maps
              so others can easily find them
            </li>
            <li>
              <strong>Upload Food Photos</strong> - Showcase mouth-watering
              images of your favorite dishes
            </li>
            <li>
              <strong>Discover New Flavors</strong> - Browse reviews from fellow
              food lovers and find your next dining destination
            </li>
            <li>
              <strong>Connect with Foodies</strong> - Join a community of people
              who share your passion for great food
            </li>
          </ul>
        </div>

        <div className={styles.section}>
          <h2 className={styles.heading}>Our Mission</h2>
          <p className={styles.text}>
            We believe that great food deserves to be celebrated and shared. Our
            mission is to create a community where food enthusiasts can
            discover, review, and recommend amazing culinary experiences. Every
            review, every rating, and every recommendation helps food lovers
            make better dining decisions and supports restaurants that truly
            excel.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.heading}>How It Works</h2>
          <p className={styles.text}>
            Getting started with FLAVORISH is simple:
          </p>
          <ul className={styles.list}>
            <li>Sign in with your Google account</li>
            <li>Write a review about any food or restaurant you've tried</li>
            <li>Add a star rating (1-5 stars) to share your experience</li>
            <li>Upload photos to make your review more engaging</li>
            <li>Include the location so others can visit</li>
            <li>
              Browse reviews from other food lovers and discover new places
            </li>
          </ul>
        </div>

        <div className={styles.section}>
          <h2 className={styles.heading}>Join Our Community</h2>
          <p className={styles.text}>
            Whether you're a seasoned food critic or just starting your culinary
            journey, FLAVORISH welcomes you. Share your taste, discover new
            flavors, and help others find their next favorite meal. Together,
            we're building a comprehensive guide to the best food experiences
            around!
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;

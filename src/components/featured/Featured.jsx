import React from 'react'
import styles from './featured.module.css'
import Image from 'next/image';

function Featured() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <b>Hey, Saksham here!</b> Discover my stories and creative ideas
      </h1>
      <div className={styles.post}>
        <div className={styles.imgContainer}>
          <Image src= "/p1.jpeg" alt="Post Image" fill></Image>
        </div>
        <div className={styles.textContainer}>
          <h2 className={styles.postTitle}>My First Post</h2>
          <p className={styles.postDesc}>This is a description of my first post.</p>
          <button className={styles.button}>Read More</button>
        </div>
      </div>
    </div>
  );
};

export default Featured
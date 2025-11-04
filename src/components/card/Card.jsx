import React from "react";
import styles from "./card.module.css";
import Link from "next/link";
import Image from "next/image";

export default function Card({ key, item }) {
  return (
    <div className={styles.container} key={key}>
      <div className={styles.imageContainer}>
        <Image src="/p1.jpeg" alt="" fill className={styles.image} />
      </div>
      <div className={styles.textContainer}>
        <div className={styles.detail}>
          <span className={styles.date}>
            {item.createdAt.substring(0, 10)} -{" "}
          </span>
          <span className={styles.category}>{item.catSlug}</span>
        </div>
        <Link href="/">
          <h1>{item.title}</h1>
        </Link>
        <p className={styles.desc}>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Inventore
          placeat doloribus delectus nemo totam rem optio earum perferendis
          reprehenderit velit, ad possimus exercitationem, assumenda hic!
          Ratione ut voluptate veniam nam.
        </p>
        <Link href="/" className={styles.link}>
          Read More
        </Link>
      </div>
    </div>
  );
}

"use client";

import { usePathname } from "next/navigation";
import ContributeButton from "./ContributeButton";
import styles from "./footer.module.css";

export default function ConditionalContribute() {
  const pathname = usePathname();
  const isWritePage = pathname === "/write";

  if (isWritePage) return null;

  return (
    <div className={styles.contributeSection}>
      <h4 className={styles.contributeTitle}>Got Something Tasty to Share?</h4>
      <p className={styles.contributeText}>
        Share your food experiences, reviews, or stories with the community!
      </p>
      <ContributeButton />
    </div>
  );
}

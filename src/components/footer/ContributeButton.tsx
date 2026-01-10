"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import styles from "./footer.module.css";

const ContributeButton = () => {
  const { status } = useSession();
  const router = useRouter();

  const handleClick = () => {
    if (status === "authenticated") {
      router.push("/write");
    } else {
      router.push("/login");
    }
  };

  return (
    <button className={styles.contributeButton} onClick={handleClick}>
      Contribute
    </button>
  );
};

export default ContributeButton;

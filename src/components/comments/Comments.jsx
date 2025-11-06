"use client";

import Link from "next/link";
import styles from "./comments.module.css";
import Image from "next/image";
import usewr from "swr";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import { useState } from "react";

const fetcher = async (url) => {
  const res = await fetch(url);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Error fetching data");
    throw error;
  }
  return data;
};

const Comments = ({ postSlug }) => {
  const { status } = useSession();

  const { data, isLoading, mutate } = useSWR(
    `http://localhost:3000/api/comments?postSlug=${postSlug}`,
    fetcher
  );

  const [desc, setDesc] = useState("");

  const handleSubmit = async () => {
    if (!desc.trim()) return;

    await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({ desc, postSlug }),
    });
    setDesc(""); // Clear the textarea
    mutate(); // Refresh comments
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Comments <span className={styles.count}>({data?.length || 0})</span>
      </h1>

      {status === "authenticated" ? (
        <div className={styles.writeSection}>
          <div className={styles.write}>
            <textarea
              placeholder="Share your thoughts..."
              className={styles.input}
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
              rows={4}
            />
          </div>
          <button className={styles.button} onClick={handleSubmit}>
            Post Comment
          </button>
        </div>
      ) : (
        <div className={styles.loginPrompt}>
          <p>Join the conversation!</p>
          <Link href="/login" className={styles.loginLink}>
            Sign in to comment
          </Link>
        </div>
      )}

      <div className={styles.comments}>
        {isLoading ? (
          <div className={styles.loading}>Loading comments...</div>
        ) : data?.length === 0 ? (
          <div className={styles.noComments}>
            <p>No comments yet. Be the first to share your thoughts!</p>
          </div>
        ) : (
          data?.map((item) => (
            <div className={styles.comment} key={item._id}>
              <div className={styles.commentHeader}>
                <div className={styles.user}>
                  {item?.user?.image && (
                    <Image
                      src={item.user.image}
                      alt=""
                      width={40}
                      height={40}
                      className={styles.avatar}
                    />
                  )}
                  <div className={styles.userInfo}>
                    <span className={styles.username}>{item.user.name}</span>
                    <span className={styles.date}>
                      {new Date(item.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </div>
              <div className={styles.commentBody}>
                <p className={styles.desc}>{item.desc}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Comments;

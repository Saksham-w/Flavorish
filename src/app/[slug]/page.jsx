import Menu from "@/components/Menu/Menu";
import styles from "./singlePage.module.css";
import Image from "next/image";
import Comments from "@/components/comments/Comments";

const SinglePage = async () => {
  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed iusto
            iure molestias necessitatibus? Blanditiis nam maxime repudiandae,
            totam quos esse?
          </h1>
          <div className={styles.user}>
            <div className={styles.userImageContainer}>
              <Image src="/p1.jpeg" alt="" fill className={styles.avatar} />
            </div>
            <div className={styles.userTextContainer}>
              <span className={styles.username}>John Doe</span>
              <span className={styles.date}>01.01.2024</span>
            </div>
          </div>
        </div>
        <div className={styles.imageContainer}>
          <Image src="/p1.jpeg" alt="" fill className={styles.image} />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.post}>
          <div className={styles.description}>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. In ex
              tenetur aliquam accusamus minima quo maiores, dolorum quis, fugiat
              eaque quas corporis numquam voluptatibus labore?
            </p>
            <h2>Lorem ipsum dolor sit amet.</h2>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. In ex
              tenetur aliquam accusamus minima quo maiores, dolorum quis, fugiat
              eaque quas corporis numquam voluptatibus labore?
            </p>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. In ex
              tenetur aliquam accusamus minima quo maiores, dolorum quis, fugiat
              eaque quas corporis numquam voluptatibus labore?
            </p>
          </div>
          <div className={styles.comment}>
            <Comments />
          </div>
        </div>
        <Menu />
      </div>
    </div>
  );
};

export default SinglePage;

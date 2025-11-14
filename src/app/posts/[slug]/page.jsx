import Menu from "@/components/menu/Menu";
import styles from "./singlePage.module.css";
import Image from "next/image";
import Comments from "@/components/comments/Comments";
import parse from "html-react-parser";
import MenuCategories from "@/components/menuCategories/MenuCategories";
import ImageGallery from "@/components/imageGallery/ImageGallery";

const getData = async (slug) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/posts/${slug}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch post");
  }
  return res.json();
};

const SinglePage = async ({ params }) => {
  const { slug } = await params;
  const data = await getData(slug);

  // Function to extract src URL from iframe code or create embed URL from location name
  const getMapEmbedUrl = (location) => {
    if (!location) return null;

    // If it's an iframe HTML code, extract the src URL
    const srcMatch = location.match(/src=["']([^"']+)["']/);
    if (srcMatch) {
      return srcMatch[1];
    }

    // Check if it's already a Google Maps embed URL
    if (location.includes("google.com/maps/embed")) {
      return location;
    }

    // Otherwise, treat it as a location name and create an embed URL
    return `https://maps.google.com/maps?q=${encodeURIComponent(location)}&z=15&output=embed`;
  };

  const mapEmbedUrl = data?.location ? getMapEmbedUrl(data.location) : null;

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        {/* Featured Image at the top */}
        {data?.img && (
          <div className={styles.imageContainer}>
            <Image src={data?.img} alt="" fill className={styles.image} />
          </div>
        )}

        {/* Title, Subtitle, and User Info */}
        <div className={styles.textContainer}>
          <h1 className={styles.title}>{data?.title}</h1>
          {data?.subtitle && (
            <h2 className={styles.subtitle}>{data.subtitle}</h2>
          )}

          {/* Rating Display */}
          {data?.rating > 0 && (
            <div className={styles.ratingDisplay}>
              <div className={styles.starsDisplay}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill={star <= data.rating ? "rgb(16, 172, 157)" : "none"}
                    stroke={
                      star <= data.rating
                        ? "rgb(16, 172, 157)"
                        : "var(--softTextColor)"
                    }
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={styles.starIcon}
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
              <span className={styles.ratingText}>
                {data.rating} {data.rating === 1 ? "Star" : "Stars"}
              </span>
            </div>
          )}

          <div className={styles.user}>
            {data?.user?.image && (
              <div className={styles.userImageContainer}>
                <Image
                  src={data.user.image}
                  alt=""
                  fill
                  className={styles.avatar}
                />
              </div>
            )}
            <div className={styles.userTextContainer}>
              <span className={styles.username}>{data?.user?.name}</span>
              <span className={styles.date}>
                {new Date(data?.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.post}>
          <div className={styles.description}>{parse(data?.desc || "")}</div>

          {/* Additional Images Gallery */}
          <ImageGallery images={data?.images} />

          {/* Location Map */}
          {data?.location && mapEmbedUrl && (
            <div className={styles.locationSection}>
              <h3 className={styles.locationTitle}>📍 Location</h3>
              {/* Show location name if it's not an iframe/embed code */}
              {!data.location.includes("<iframe") &&
                !data.location.includes("maps/embed") && (
                  <p className={styles.locationName}>{data.location}</p>
                )}
              <div className={styles.mapContainer}>
                <iframe
                  src={mapEmbedUrl}
                  className={styles.mapIframe}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Location Map"
                ></iframe>
              </div>
            </div>
          )}

          {/* Categories section between post and comments */}
          <div className={styles.categoriesSection}>
            <h1 className={styles.categoriesTitle}>Categories</h1>
            <MenuCategories />
          </div>

          <div className={styles.comment}>
            <Comments postSlug={slug} />
          </div>
        </div>
        {/* <Menu /> */}
      </div>
    </div>
  );
};

export default SinglePage;

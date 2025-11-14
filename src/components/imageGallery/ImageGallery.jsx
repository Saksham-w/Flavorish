"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./imageGallery.module.css";

const ImageGallery = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  if (!images || images.length === 0) return null;

  return (
    <>
      <div className={styles.imagesGallery}>
        <h3 className={styles.galleryTitle}>Image Gallery</h3>
        <div className={styles.galleryGrid}>
          {images.map((img, index) => (
            <div
              key={index}
              className={styles.galleryItem}
              onClick={() => setSelectedImage(img)}
            >
              <Image
                src={img}
                alt={`Gallery image ${index + 1}`}
                fill
                className={styles.galleryImage}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className={styles.imageModal}
          onClick={() => setSelectedImage(null)}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.closeButton}
              onClick={() => setSelectedImage(null)}
            >
              ×
            </button>
            <div className={styles.modalImageContainer}>
              <Image
                src={selectedImage}
                alt="Full size image"
                fill
                className={styles.modalImage}
                sizes="100vw"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageGallery;

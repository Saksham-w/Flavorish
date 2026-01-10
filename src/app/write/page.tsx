"use client";

import Image from "next/image";
import styles from "./writePage.module.css";
import { useState, useEffect, ChangeEvent } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase";
import toast from "react-hot-toast";

interface Category {
  id: string;
  slug: string;
  title: string;
}

const WritePage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [catSlug, setCatSlug] = useState("");
  const [rating, setRating] = useState(0);
  const [location, setLocation] = useState("");
  const [publishing, setPublishing] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [editorState, setEditorState] = useState(0);

  const { data, status } = useSession();

  const router = useRouter();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Write your story...",
      }),
    ],
    content: "",
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: styles.textArea,
      },
    },
    onUpdate: () => {
      // Force re-render to update toolbar button states
      setEditorState((prev) => prev + 1);
    },
    onSelectionUpdate: () => {
      // Force re-render when selection changes
      setEditorState((prev) => prev + 1);
    },
  });

  // Redirect if unauthenticated (must be in useEffect)
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  if (status === "loading") {
    return <div className={styles.container}>Loading...</div>;
  }

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (files.length === 0) return;

    setUploading(true);

    try {
      const uploadPromises = files.map(async (file: File) => {
        const fileName = `${Date.now()}_${file.name}`;
        const { data, error } = await supabase.storage
          .from("blog-files")
          .upload(fileName, file);

        if (error) throw error;

        const { data: publicData } = supabase.storage
          .from("blog-files")
          .getPublicUrl(fileName);

        return publicData.publicUrl;
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      setImages((prev: string[]) => [...prev, ...uploadedUrls]);
      toast.success(
        `${uploadedUrls.length} image${uploadedUrls.length > 1 ? "s" : ""} uploaded successfully!`
      );
      setUploading(false);
    } catch (error: any) {
      console.error("Upload error:", error);
      toast.error("Failed to upload images. Please try again.");
      setUploading(false);
    }
  };

  const removeImage = (indexToRemove: number) => {
    setImages((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const handlePublish = async () => {
    if (!editor || !title || !catSlug) {
      toast.error("Please add a title, category, and content");
      return;
    }

    setPublishing(true);
    const publishingToast = toast.loading("Publishing your post...");

    try {
      const content = editor.getHTML();

      const postData: any = {
        title,
        desc: content,
        img: images[0] || "", // First image as header
        images: images,
        rating: rating,
        slug: title.toLowerCase().replace(/\s+/g, "-"),
        catSlug: catSlug || "general",
      };

      // Only add subtitle if it has a value
      if (subtitle && subtitle.trim()) {
        postData.subtitle = subtitle;
      }

      // Only add location if it has a value
      if (location && location.trim()) {
        postData.location = location;
      }

      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to publish post");
      }

      const data = await response.json();
      toast.success("Post published successfully! 🎉", {
        id: publishingToast,
        duration: 3000,
      });

      // Redirect after a short delay to show the success message
      setTimeout(() => {
        router.push(`/posts/${data.slug}`);
      }, 500);
    } catch (error: any) {
      console.error("Error publishing post:", error);
      toast.error(
        error.message || "Failed to publish post. Please try again.",
        {
          id: publishingToast,
        }
      );
      setPublishing(false);
    }
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Title"
        className={styles.input}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="text"
        placeholder="Subtitle"
        className={styles.subtitle}
        value={subtitle}
        onChange={(e) => setSubtitle(e.target.value)}
      />

      <div className={styles.categoryWrapper}>
        <label htmlFor="category" className={styles.label}>
          Select Category
        </label>
        <select
          id="category"
          className={styles.select}
          value={catSlug}
          onChange={(e) => setCatSlug(e.target.value)}
        >
          <option value="">Choose a category...</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.slug}>
              {cat.title.charAt(0).toUpperCase() + cat.title.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Rating Section */}
      <div className={styles.ratingWrapper}>
        <label className={styles.label}>⭐ Rating</label>
        <p className={styles.ratingDescription}>
          Rate this post from 1 to 5 stars
        </p>
        <div className={styles.starsContainer}>
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              className={styles.starButton}
              onClick={() => setRating(star)}
              aria-label={`Rate ${star} stars`}
            >
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill={star <= rating ? "rgb(16, 172, 157)" : "none"}
                stroke={
                  star <= rating ? "rgb(16, 172, 157)" : "var(--softTextColor)"
                }
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={styles.starIcon}
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </button>
          ))}
        </div>
        {rating > 0 && (
          <p className={styles.ratingText}>
            Selected Rating:{" "}
            <span className={styles.ratingValue}>{rating}</span>{" "}
            {rating === 1 ? "Star" : "Stars"}
          </p>
        )}
      </div>

      {/* Location Section */}
      <div className={styles.locationWrapper}>
        <label className={styles.label}>📍 Location</label>
        <p className={styles.locationDescription}>
          Enter a location name (e.g., "Paris, France", "Eiffel Tower") or paste
          the iframe embed code from Google Maps (Share → Embed a map)
        </p>
        <textarea
          placeholder='Enter location name OR paste iframe code: <iframe src="https://www.google.com/maps/embed?pb=..." ...></iframe>'
          className={styles.locationInput}
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          rows={4}
        />
        {location && (
          <div className={styles.locationPreview}>
            <span className={styles.locationValue}>
              {location.includes("<iframe") || location.includes("maps/embed")
                ? "🗺️ Map embed code added"
                : `📍 Location: ${location.length > 50 ? location.substring(0, 50) + "..." : location}`}
            </span>
          </div>
        )}
      </div>

      {/* Single Image Upload Section */}
      <div className={styles.imagesSection}>
        <div className={styles.uploadHeader}>
          <h3 className={styles.uploadTitle}>🖼️ Post Images</h3>
          <p className={styles.uploadDescription}>
            Upload images for your post. The first image will be used as the
            header.
          </p>
        </div>

        <input
          type="file"
          id="postImages"
          multiple
          accept="image/*"
          onChange={handleImageUpload}
          style={{ display: "none" }}
          disabled={uploading}
        />

        <label
          htmlFor="postImages"
          className={`${styles.uploadButton} ${uploading ? styles.uploading : ""}`}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
          <span>{uploading ? "Uploading..." : "Upload Images"}</span>
        </label>

        {images.length > 0 && (
          <div className={styles.imagesGrid}>
            {images.map((img, index) => (
              <div key={index} className={styles.imageCard}>
                {index === 0 && (
                  <div className={styles.headerBadge}>Header</div>
                )}
                <Image
                  src={img}
                  alt={`Image ${index + 1}`}
                  fill
                  className={styles.uploadedImage}
                />
                <button
                  onClick={() => removeImage(index)}
                  className={styles.removeButton}
                  type="button"
                  title="Remove image"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Blog Content Editor */}
      <div className={styles.editorWrapper}>
        {/* Formatting Toolbar */}
        {editor && (
          <div className={styles.toolbar}>
            <button
              onClick={(e) => {
                e.preventDefault();
                editor.chain().focus().toggleBold().run();
              }}
              className={editor.isActive("bold") ? styles.isActive : ""}
              type="button"
            >
              <strong>B</strong>
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                editor.chain().focus().toggleItalic().run();
              }}
              className={editor.isActive("italic") ? styles.isActive : ""}
              type="button"
            >
              <em>I</em>
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                editor.chain().focus().toggleStrike().run();
              }}
              className={editor.isActive("strike") ? styles.isActive : ""}
              type="button"
            >
              <s>S</s>
            </button>
            <span className={styles.divider}></span>
            <button
              onClick={(e) => {
                e.preventDefault();
                editor.chain().focus().toggleHeading({ level: 1 }).run();
              }}
              className={
                editor.isActive("heading", { level: 1 }) ? styles.isActive : ""
              }
              type="button"
            >
              H1
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                editor.chain().focus().toggleHeading({ level: 2 }).run();
              }}
              className={
                editor.isActive("heading", { level: 2 }) ? styles.isActive : ""
              }
              type="button"
            >
              H2
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                editor.chain().focus().toggleHeading({ level: 3 }).run();
              }}
              className={
                editor.isActive("heading", { level: 3 }) ? styles.isActive : ""
              }
              type="button"
            >
              H3
            </button>
            <span className={styles.divider}></span>
            <button
              onClick={(e) => {
                e.preventDefault();
                editor.chain().focus().toggleBulletList().run();
              }}
              className={editor.isActive("bulletList") ? styles.isActive : ""}
              type="button"
            >
              • List
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                editor.chain().focus().toggleOrderedList().run();
              }}
              className={editor.isActive("orderedList") ? styles.isActive : ""}
              type="button"
            >
              1. List
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                editor.chain().focus().toggleBlockquote().run();
              }}
              className={editor.isActive("blockquote") ? styles.isActive : ""}
              type="button"
            >
              " Quote
            </button>
            <span className={styles.divider}></span>
            <button
              onClick={(e) => {
                e.preventDefault();
                editor.chain().focus().setHorizontalRule().run();
              }}
              type="button"
            >
              ―
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                editor.chain().focus().undo().run();
              }}
              disabled={!editor.can().undo()}
              type="button"
            >
              ↶ Undo
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                editor.chain().focus().redo().run();
              }}
              disabled={!editor.can().redo()}
              type="button"
            >
              ↷ Redo
            </button>
          </div>
        )}

        <div className={styles.editor}>
          <EditorContent editor={editor} />
        </div>
      </div>

      <button
        className={styles.publish}
        onClick={handlePublish}
        disabled={publishing || !title || !catSlug}
      >
        {publishing ? "Publishing..." : "Publish"}
      </button>
    </div>
  );
};

export default WritePage;

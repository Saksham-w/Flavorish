"use client";

import Image from "next/image";
import styles from "./writePage.module.css";
import { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase";

const WritePage = () => {
  const [file, setFile] = useState(null);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [media, setMedia] = useState("");
  const [uploading, setUploading] = useState(false);
  const [catSlug, setCatSlug] = useState("");
  const [publishing, setPublishing] = useState(false);
  const [categories, setCategories] = useState([]);
  const [editorState, setEditorState] = useState(0);

  const { data, status } = useSession();

  console.log(data, status);

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

  // Auto-upload when file is selected
  useEffect(() => {
    if (file) {
      handleUpload();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  if (status === "loading") {
    return <div className={styles.container}>Loading...</div>;
  }

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);

    try {
      // Upload to Supabase Storage
      const fileName = `${Date.now()}_${file.name}`;
      const { data, error } = await supabase.storage
        .from("blog-files") // your bucket name
        .upload(fileName, file);

      if (error) {
        console.error("Upload error:", error);
        setUploading(false);
        return;
      }

      // Get public URL
      const { data: publicData } = supabase.storage
        .from("blog-files")
        .getPublicUrl(fileName);

      setMedia(publicData.publicUrl);
      setUploading(false);
      setFile(null);
    } catch (error) {
      console.error("Upload error:", error);
      setUploading(false);
    }
  };

  const handlePublish = async () => {
    if (!editor || !title || !catSlug) {
      alert("Please add a title, category, and content");
      return;
    }

    setPublishing(true);

    try {
      const content = editor.getHTML();

      const postData = {
        title,
        desc: content,
        img: media,
        slug: title.toLowerCase().replace(/\s+/g, "-"),
        catSlug: catSlug || "general",
      };

      // Only add subtitle if it has a value
      if (subtitle && subtitle.trim()) {
        postData.subtitle = subtitle;
      }

      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error("Failed to publish post");
      }

      const data = await response.json();
      alert("Post published successfully!");
      router.push(`/posts/${data.slug}`);
    } catch (error) {
      console.error("Error publishing post:", error);
      alert("Failed to publish post");
    } finally {
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
              {cat.title}
            </option>
          ))}
        </select>
      </div>

      {/* Image Upload Section */}
      <div className={styles.imageSection}>
        <button
          className={styles.button}
          onClick={() => setOpen(!open)}
          disabled={media}
          title={
            media
              ? "You have already added an image"
              : "Add an image to your post"
          }
        >
          <Image src="/plus.png" alt="Add" width={16} height={16} />
          <span className={styles.buttonText}>Add Image</span>
        </button>

        {open && !media && (
          <div className={styles.add}>
            <input
              type="file"
              id="image"
              onChange={(e) => setFile(e.target.files[0])}
              style={{ display: "none" }}
            />
            <button className={styles.addButton} disabled={uploading}>
              <label
                htmlFor="image"
                style={{ cursor: uploading ? "not-allowed" : "pointer" }}
              >
                <Image
                  src="/image.png"
                  alt="Insert Image"
                  width={16}
                  height={16}
                />
              </label>
            </button>

            {/* <button className={styles.addButton}>
              <Image
                src="/external.png"
                alt="Insert File"
                width={16}
                height={16}
              />
            </button>
            <button className={styles.addButton}>
              <Image
                src="/video.png"
                alt="Insert Media"
                width={16}
                height={16}
              />
            </button> */}
          </div>
        )}

        {uploading && <p>Uploading image...</p>}
        {media && (
          <div className={styles.imagePreview}>
            <Image src={media} alt="Uploaded" width={300} height={200} />
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

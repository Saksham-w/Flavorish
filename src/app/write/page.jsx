"use client";

import Image from "next/image";
import styles from "./writePage.module.css";
import { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const WritePage = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");

  const { data, status } = useSession();

  console.log(data, status);

  const router = useRouter();

  if (status === "authenticated") {
    router.push("/");
  }

  if (status === "loading") {
    return <div className={styles.container}>Loading...</div>;
  }

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
  });

  const handlePublish = () => {
    if (editor) {
      const content = editor.getHTML();
      console.log("Title:", title);
      console.log("Content:", content);
      // Add your publish logic here
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
      <div className={styles.editor}>
        <button className={styles.button} onClick={() => setOpen(!open)}>
          <Image src="/plus.png" alt="Add" width={16} height={16} />
        </button>

        {open && (
          <div className={styles.add}>
            <button className={styles.addButton}>
              <Image
                src="/image.png"
                alt="Insert Image"
                width={16}
                height={16}
              />
            </button>
            <button className={styles.addButton}>
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
            </button>
          </div>
        )}

        <EditorContent editor={editor} />
      </div>

      <button className={styles.publish} onClick={handlePublish}>
        Publish
      </button>
    </div>
  );
};

export default WritePage;

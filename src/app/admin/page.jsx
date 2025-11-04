"use client";
import { useState } from "react";

export default function AdminPage() {
  const [formData, setFormData] = useState({
    slug: "",
    title: "",
    desc: "",
    img: "",
    catSlug: "fashion",
    userEmail: "sakshamshresthа400@gmail.com",
  });
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Post created successfully!");
        setResult({ success: true, data });
      } else {
        alert("Error: " + data.message);
        setResult({ success: false, error: data.message });
      }
    } catch (error) {
      alert("Error: " + error.message);
      setResult({ success: false, error: error.message });
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "50px auto", padding: "20px" }}>
      <h1 style={{ marginBottom: "30px" }}>Create New Post</h1>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        <div>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
            }}
          >
            Slug:
          </label>
          <input
            type="text"
            placeholder="my-first-post"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            required
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "16px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </div>

        <div>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
            }}
          >
            Title:
          </label>
          <input
            type="text"
            placeholder="My First Post"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "16px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </div>

        <div>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
            }}
          >
            Description:
          </label>
          <textarea
            placeholder="This is the description..."
            value={formData.desc}
            onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
            required
            rows={5}
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "16px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </div>

        <div>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
            }}
          >
            Image URL (optional):
          </label>
          <input
            type="text"
            placeholder="https://example.com/image.jpg"
            value={formData.img}
            onChange={(e) => setFormData({ ...formData, img: e.target.value })}
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "16px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </div>

        <div>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
            }}
          >
            Category Slug:
          </label>
          <input
            type="text"
            placeholder="fashion"
            value={formData.catSlug}
            onChange={(e) =>
              setFormData({ ...formData, catSlug: e.target.value })
            }
            required
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "16px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </div>

        <div>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
            }}
          >
            User Email:
          </label>
          <input
            type="email"
            placeholder="user@example.com"
            value={formData.userEmail}
            onChange={(e) =>
              setFormData({ ...formData, userEmail: e.target.value })
            }
            required
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "16px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: "15px",
            background: "#0070f3",
            color: "white",
            border: "none",
            cursor: "pointer",
            fontSize: "16px",
            borderRadius: "4px",
            fontWeight: "bold",
          }}
        >
          Create Post
        </button>
      </form>

      {result && (
        <div
          style={{
            marginTop: "30px",
            padding: "15px",
            background: result.success ? "#d4edda" : "#f8d7da",
            borderRadius: "4px",
          }}
        >
          {result.success ? (
            <>
              <h3 style={{ marginTop: 0 }}>✅ Success!</h3>
              <pre style={{ overflow: "auto" }}>
                {JSON.stringify(result.data, null, 2)}
              </pre>
            </>
          ) : (
            <>
              <h3 style={{ marginTop: 0 }}>❌ Error</h3>
              <p>{result.error}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}

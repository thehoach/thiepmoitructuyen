// src/components/forms/ImageListField.jsx
import { useState } from "react";

export default function ImageListField({ value = [], onChange }) {
  const [url, setUrl] = useState("");

  const addImage = () => {
    if (url.trim()) {
      onChange([...(value || []), url.trim()]);
      setUrl("");
    }
  };

  const removeImage = (index) => {
    const updated = [...value];
    updated.splice(index, 1);
    onChange(updated);
  };

  return (
    <div>
      {/* Add new image input */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
        <input
          type="text"
          placeholder="Enter image URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{ flex: 1, padding: "8px" }}
        />
        <button type="button" onClick={addImage}>Add</button>
      </div>

      {/* Preview list */}
      <ul style={{ listStyle: "none", padding: 0, display: "flex", gap: "12px", flexWrap: "wrap" }}>
        {value?.map((img, index) => (
          <li key={index} style={{ position: "relative" }}>
            <img
              src={img}
              alt={`img-${index}`}
              style={{ width: "80px", height: "80px", objectFit: "cover", border: "1px solid #ccc", borderRadius: 4 }}
            />
            <button
              type="button"
              onClick={() => removeImage(index)}
              style={{
                position: "absolute",
                top: 2,
                right: 2,
                backgroundColor: "rgba(255, 0, 0, 0.7)",
                border: "none",
                color: "white",
                borderRadius: "50%",
                width: 20,
                height: 20,
                cursor: "pointer",
                fontWeight: "bold",
                lineHeight: "18px",
                textAlign: "center",
                padding: 0,
              }}
              aria-label="Remove image"
              title="Remove image"
            >
              ×
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

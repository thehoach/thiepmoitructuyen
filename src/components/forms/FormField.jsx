import { useState } from "react";

export default function FormField({ field, value, onChange }) {
  const [inputValue, setInputValue] = useState("");

  if (field.is_array) {
    // Render list of items + input to add new item
    const items = Array.isArray(value) ? value : [];

    const handleAdd = () => {
      if (inputValue.trim()) {
        onChange([...items, inputValue.trim()]);
        setInputValue("");
      }
    };

    const handleRemove = (index) => {
      const newItems = [...items];
      newItems.splice(index, 1);
      onChange(newItems);
    };

    return (
      <div className="array-field">
        {items.map((item, i) => (
          <div key={i} className="array-item">
            {field.type === "images" ? (
              <img
                src={item}
                alt={`preview-${i}`}
                className="preview-image"
                style={{ maxHeight: 60 }}
              />
            ) : (
              <span>{item}</span>
            )}
            <button onClick={() => handleRemove(i)} className="remove-item-btn">
              &times;
            </button>
          </div>
        ))}
        <input
          type="text"
          placeholder={`Add ${field.label}`}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
        />
        <button onClick={handleAdd} className="add-item-btn">
          Add Image
        </button>
      </div>
    );
  }

  // single value field (text, etc)
  return (
    <input
      type={field.type === "images" ? "text" : field.type}
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

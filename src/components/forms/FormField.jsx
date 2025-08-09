// src/components/FormField.jsx
import { useState } from "react";

export default function FormField({ field, value, onChange }) {
  const [inputValue, setInputValue] = useState("");

  const isArray = field.size > 1;
  const items = Array.isArray(value) ? value : [];

  if (isArray) {
    const handleAdd = () => {
      if (!inputValue.trim()) return;
      onChange([...items, inputValue.trim()]);
      setInputValue("");
    };

    const handleRemove = (index) => {
      const newItems = [...items];
      newItems.splice(index, 1);
      onChange(newItems);
    };

    return (
      <div className="array-field">
        {items.map((item, idx) => (
          <div key={idx} className="array-item">
            {field.type === "images" ? <img src={item} alt="" style={{ maxHeight: 60 }} /> : <span>{item}</span>}
            <button onClick={() => handleRemove(idx)}>×</button>
          </div>
        ))}
        <input
          type="text"
          placeholder={`Add ${field.label}`}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
        />
        <button onClick={handleAdd}>Add</button>
      </div>
    );
  }

  return (
    <input
      type={field.type === "images" ? "text" : field.type}
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

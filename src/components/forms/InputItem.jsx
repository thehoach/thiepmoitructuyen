export default function InputItem({ field, value, onChange, onAdd }) {
    if (field.type === "images" || field.type === "text") {
      return (
        <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
          <input
            type="text"
            placeholder={`Add ${field.label}`}
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            style={{ flexGrow: 1, padding: 6 }}
          />
          <button onClick={onAdd} type="button">
            Add
          </button>
        </div>
      );
    }
  
    if (field.type === "textarea") {
      return (
        <div style={{ marginTop: 6 }}>
          <textarea
            placeholder={`Add ${field.label}`}
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            style={{ width: "100%", padding: 6, minHeight: 60 }}
          />
          <button onClick={onAdd} type="button" style={{ marginTop: 4 }}>
            Add
          </button>
        </div>
      );
    }
  
    // You can extend to other types as needed
  
    return null;
  }
  
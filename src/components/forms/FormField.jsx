import ImageListField from "./ImageListField";

export default function FormField({ field, value, onChange }) {
  if (field.is_array) {
    if (field.type === "images") {
      return <ImageListField value={value} onChange={onChange} />;
    }
    // You can add more array-type handlers here later
    return null;
  }

  if (field.type === "text") {
    return (
      <input
        type="text"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        style={{ width: "100%", padding: 8 }}
      />
    );
  }

  if (field.type === "textarea") {
    return (
      <textarea
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        style={{ width: "100%", padding: 8, minHeight: 80 }}
      />
    );
  }

  if (field.type === "date") {
    return (
      <input
        type="date"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        style={{ padding: 8 }}
      />
    );
  }

  return null;
}

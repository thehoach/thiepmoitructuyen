// src/components/forms/StaticForm.jsx
import { useEffect, useState } from "react";
import FormField from "./FormField";
import "./StaticForm.css";

export default function StaticForm({ fields, data, onChange, onValidate }) {
  const [localValid, setLocalValid] = useState(true);

  useEffect(() => {
    const allValid = fields.every((f) =>
      f.size > 1
        ? Array.isArray(data[f.name]) && data[f.name].length === f.size
        : data[f.name] !== ""
    );
    setLocalValid(allValid);
    onValidate?.(allValid);
  }, [fields, data, onValidate]);

  return (
    <div className="static-form-container">
      <h3>Static Fields</h3>
      {fields.map((field) => (
        <div key={field.name} className="static-form-group" style={{ borderColor: !localValid && field.size > 1 && (!Array.isArray(data[field.name]) || data[field.name].length !== field.size) ? "red" : undefined }}>
          <label>
            {field.label}
            {field.size > 1 && (
              <span style={{ color: "#888" }}> (Required: {field.size})</span>
            )}
          </label>
          <FormField field={field} value={data[field.name]} onChange={(v) => onChange(field.name, v)} />
        </div>
      ))}
    </div>
  );
}

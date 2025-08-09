import "./StaticForm.css";
import FormField from "./FormField";

export default function StaticForm({ fields, data, onChange }) {
  return (
    <div className="static-form-container">
      <h3>Static Fields</h3>
      {fields.map((field) => (
        <div key={field.name} className="static-form-group">
          <label>{field.label}</label>
          <FormField
            field={field}
            value={data[field.name]}
            onChange={(val) => onChange(field.name, val)}
          />
        </div>
      ))}
    </div>
  );
}

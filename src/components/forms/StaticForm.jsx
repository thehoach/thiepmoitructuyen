import FormField from "./FormField";

export default function StaticForm({ fields, data, onChange }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <h3>Static Information (same for all cards)</h3>
      {fields.map(field => (
        <div key={field.name} style={{ marginBottom: 12 }}>
          <label><b>{field.label}</b>:</label>
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

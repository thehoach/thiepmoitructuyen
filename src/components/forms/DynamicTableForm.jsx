import FormField from "./FormField";

export default function DynamicTableForm({ fields, rows, onChangeRow, onAddRow, onRemoveRow, extraColumn }) {
  return (
    <div>
      <h3>Dynamic Information (per card)</h3>
      <table border="1" cellPadding="6" style={{ borderCollapse: "collapse", marginBottom: 12, width: "100%" }}>
        <thead>
          <tr>
            {fields.map(field => (
              <th key={field.name}>{field.label}</th>
            ))}
            {extraColumn && <th>Link</th>}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(row => (
            <tr key={row.id}>
              {fields.map(field => (
                <td key={field.name}>
                  <FormField
                    field={field}
                    value={row[field.name]}
                    onChange={(val) => onChangeRow(row.id, field.name, val)}
                  />
                </td>
              ))}
              {extraColumn && <td>{extraColumn(row)}</td>}
              <td>
                <button onClick={() => onRemoveRow(row.id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={onAddRow} style={{ marginBottom: 20 }}>+ Add Row</button>
    </div>
  );
}

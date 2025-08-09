import FormField from "./FormField";
import "./DynamicTableForm.css";

export default function DynamicTableForm({
  fields,
  rows,
  onChangeRow,
  onAddRow,
  onRemoveRow,
  extraColumn,
}) {
  return (
    <div className="dynamic-table-form">
      <h3>Dynamic Cards</h3>

      <table className="dynamic-table">
        <thead>
          <tr>
            {fields.map((field) => (
              <th key={field.name}>{field.label}</th>
            ))}
            <th>Generated Link</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              {fields.map((field) => (
                <td key={field.name}>
                  <div className={field.is_array ? "array-cell-content" : ""}>
                    <FormField
                      field={field}
                      value={row[field.name]}
                      onChange={(val) => onChangeRow(row.id, field.name, val)}
                    />
                  </div>
                </td>
              ))}

              <td className="generated-link-column">
                {extraColumn && extraColumn(row)}
              </td>

              <td>
                <button
                  className="remove-btn"
                  onClick={() => onRemoveRow(row.id)}
                  disabled={rows.length === 1}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="add-row-btn" onClick={onAddRow}>
        Add Card
      </button>
    </div>
  );
}

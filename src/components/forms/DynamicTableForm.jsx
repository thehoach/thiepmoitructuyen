// src/components/forms/DynamicTableForm.jsx
import { useEffect, useState } from "react";
import FormField from "./FormField";
import "./DynamicTableForm.css";

export default function DynamicTableForm({
  fields,
  rows,
  onChangeRow,
  onAddRow,
  onRemoveRow,
  extraColumn,
  validate,
}) {
  const [validityPerRow, setValidityPerRow] = useState([]);

  useEffect(() => {
    const validity = rows.map((row) => {
      const rowValid = fields.every((f) =>
        f.size > 1
          ? Array.isArray(row[f.name]) && row[f.name]?.length === f.size
          : row[f.name] !== ""
      );
      return { id: row.id, valid: rowValid };
    });
    setValidityPerRow(validity);
    validate?.(validity);
  }, [rows, fields, validate]);

  return (
    <div className="dynamic-table-form">
      <h3>Dynamic Cards</h3>
      <table className="dynamic-table">
        <thead>
          <tr>
            {fields.map((f) => (
              <th key={f.name}>
                {f.label}
                {f.size > 1 && <span style={{ color: "#888" }}> (Required: {f.size})</span>}
              </th>
            ))}
            <th>Generated Link</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const rowValid = validityPerRow.find((vr) => vr.id === row.id)?.valid ?? true;
            return (
              <tr key={row.id} style={{ border: rowValid ? undefined : "2px solid red" }}>
                {fields.map((f) => (
                  <td key={f.name}>
                    <FormField field={f} value={row[f.name]} onChange={(v) => onChangeRow(row.id, f.name, v)} />
                  </td>
                ))}
                <td>{extraColumn && extraColumn(row)}</td>
                <td>
                  <button onClick={() => onRemoveRow(row.id)} disabled={rows.length === 1}>
                    Remove
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button onClick={onAddRow}>Add Card</button>
    </div>
  );
}

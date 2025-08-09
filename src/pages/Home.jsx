// src/pages/Home.jsx
import { useState, useEffect } from "react";
import CryptoJS from "crypto-js";
import templateRegistry from "../utils/templateRegistry";
import StaticForm from "../components/forms/StaticForm";
import DynamicTableForm from "../components/forms/DynamicTableForm";
import "./Home.css";

const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;
const defaultTemplateId = "classic";

export default function Home() {
  const [templateId, setTemplateId] = useState(defaultTemplateId);

  const currentTemplateConfig = templateRegistry[templateId] || {};

  const staticFields = currentTemplateConfig.staticData || [];
  const dynamicFields = currentTemplateConfig.dynamicData || [];

  // Reset staticData and dynamicRows whenever template changes
  const [staticData, setStaticData] = useState({});
  const [dynamicRows, setDynamicRows] = useState([{ id: Date.now() }]);

  useEffect(() => {
    // Reset staticData to default empty values per current template
    const defaults = {};
    staticFields.forEach((f) => {
      defaults[f.name] = f.size > 1 ? [] : "";
    });
    setStaticData(defaults);

    // Reset dynamicRows to one empty row with id
    setDynamicRows([{ id: Date.now() }]);
  }, [templateId, staticFields]);

  const handleStaticChange = (name, value) => {
    setStaticData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDynamicChange = (rowId, name, value) => {
    setDynamicRows((prev) =>
      prev.map((row) => (row.id === rowId ? { ...row, [name]: value } : row))
    );
  };

  const addDynamicRow = () => {
    setDynamicRows((prev) => [...prev, { id: Date.now() }]);
  };

  const removeDynamicRow = (rowId) => {
    setDynamicRows((prev) => prev.filter((row) => row.id !== rowId));
  };

  const generateLinks = () => {
    const updatedRows = dynamicRows.map((row) => {
      const payload = {
        template: templateId,
        staticData,
        dynamicData: row,
      };
      const encrypted = CryptoJS.AES.encrypt(
        JSON.stringify(payload),
        SECRET_KEY
      ).toString();
      const url = `${window.location.origin}/card?code=${encodeURIComponent(
        encrypted
      )}`;
      return { ...row, link: url };
    });
    setDynamicRows(updatedRows);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert("Link copied to clipboard!");
    });
  };

  return (
    <div className="home-container">
      <h2>Create Your Invitation Card</h2>

      <div className="template-select">
        <label htmlFor="template-select">Select Template:</label>
        <select
          id="template-select"
          value={templateId}
          onChange={(e) => setTemplateId(e.target.value)}
        >
          {Object.keys(templateRegistry).map((id) => (
            <option key={id} value={id}>
              {templateRegistry[id].name || id}
            </option>
          ))}
        </select>
      </div>

      <StaticForm fields={staticFields} data={staticData} onChange={handleStaticChange} />

      <DynamicTableForm
        fields={dynamicFields}
        rows={dynamicRows}
        onChangeRow={handleDynamicChange}
        onAddRow={addDynamicRow}
        onRemoveRow={removeDynamicRow}
        extraColumn={(row) =>
          row.link ? (
            <div className="link-buttons">
              <a href={row.link} target="_blank" rel="noopener noreferrer">
                Go to Card
              </a>
              <button onClick={() => copyToClipboard(row.link)}>Copy Link</button>
            </div>
          ) : null
        }
      />

      <button className="generate-btn" onClick={generateLinks}>
        Generate Links
      </button>
    </div>
  );
}

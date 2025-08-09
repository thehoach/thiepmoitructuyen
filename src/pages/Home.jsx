import { useState } from "react";
import CryptoJS from "crypto-js";
import templateRegistry from "../utils/templateRegistry";
import StaticForm from "../components/forms/StaticForm";
import DynamicTableForm from "../components/forms/DynamicTableForm";
import "./Home.css";

const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;
const defaultTemplateId = "classic";

export default function Home() {
    const [templateId, setTemplateId] = useState(defaultTemplateId);

    const currentTemplateConfig = templateRegistry[templateId]?.config || {};

    // Separate fields by is_static flag
    const staticFields = currentTemplateConfig.fields?.filter(f => f.is_static) || [];
    const dynamicFields = currentTemplateConfig.fields?.filter(f => !f.is_static) || [];

    // Initialize state for static fields
    const [staticData, setStaticData] = useState(() => {
        let defaults = {};
        staticFields.forEach(f => {
            defaults[f.name] = f.is_array ? [] : "";
        });
        return defaults;
    });

    // Dynamic rows for cards; each card has fields
    const [dynamicRows, setDynamicRows] = useState([
        { id: Date.now() }
    ]);

    const handleStaticChange = (name, value) => {
        setStaticData(prev => ({ ...prev, [name]: value }));
    };

    const handleDynamicChange = (rowId, name, value) => {
        setDynamicRows(prev =>
            prev.map(row => (row.id === rowId ? { ...row, [name]: value } : row))
        );
    };

    const addDynamicRow = () => {
        setDynamicRows(prev => [...prev, { id: Date.now() }]);
    };

    const removeDynamicRow = (rowId) => {
        setDynamicRows(prev => prev.filter(row => row.id !== rowId));
    };

    const generateLinks = () => {
        const updatedRows = dynamicRows.map(row => {
            // Build payload: include staticData + dynamic data per row
            const payload = {
                template: templateId,
                staticData,
                dynamicData: row
            };
            const encrypted = CryptoJS.AES.encrypt(JSON.stringify(payload), SECRET_KEY).toString();
            const url = `${window.location.origin}/card?code=${encodeURIComponent(encrypted)}`;
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
                            {templateRegistry[id].config.name || id}
                        </option>
                    ))}
                </select>
            </div>

            <div className="static-form">
                <StaticForm
                    fields={staticFields}
                    data={staticData}
                    onChange={handleStaticChange}
                />
            </div>

            <div className="dynamic-table-form">
                <DynamicTableForm
                    fields={dynamicFields}
                    rows={dynamicRows}
                    onChangeRow={handleDynamicChange}
                    onAddRow={addDynamicRow}
                    onRemoveRow={removeDynamicRow}  // this removes a row by id
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

            </div>

            <button className="generate-btn" onClick={generateLinks}>
                Generate Links
            </button>
        </div>
    );
}

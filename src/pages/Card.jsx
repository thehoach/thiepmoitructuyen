// src/pages/Card.jsx
import { useSearchParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import CryptoJS from "crypto-js";
import templateRegistry from "../utils/templateRegistry";

const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;

export default function Card() {
  const [searchParams] = useSearchParams();
  const [data, setData] = useState(null);
  const [TemplateComponent, setTemplateComponent] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const code = searchParams.get("code");
    if (!code) {
      setError("No code provided");
      return;
    }
    if (!SECRET_KEY) {
      setError("SECRET_KEY not set (VITE_SECRET_KEY)");
      return;
    }

    try {
      // decodeURIComponent because we encoded when navigating
      const decoded = decodeURIComponent(code);
      const bytes = CryptoJS.AES.decrypt(decoded, SECRET_KEY);
      const plaintext = bytes.toString(CryptoJS.enc.Utf8);
      if (!plaintext) {
        setError("Invalid or corrupted code");
        return;
      }
      const parsed = JSON.parse(plaintext);
      setData(parsed);

      const templateDef = templateRegistry[parsed.template];
      if (!templateDef) {
        setError(`Template not found: ${parsed.template}`);
        return;
      }

      // dynamic import of template component
      templateDef.component().then((mod) => {
        setTemplateComponent(() => mod.default);
      }).catch((e) => {
        console.error(e);
        setError("Failed to load template component");
      });
    } catch (err) {
      console.error(err);
      setError("Decryption failed");
    }
  }, [searchParams]);

  if (error) {
    return (
      <div style={{ padding: 24 }}>
        <h2>Card Page</h2>
        <p style={{ color: "red" }}>{error}</p>
        <Link to="/">Back to Home</Link>
      </div>
    );
  }

  if (!data || !TemplateComponent) {
    return (
      <div style={{ padding: 24 }}>
        <h2>Card Page</h2>
        <p>Loading...</p>
        <Link to="/">Back to Home</Link>
      </div>
    );
  }

  // pass all data (static s_ fields + cards array etc.) to template component
  return (
    <div style={{ padding: 12 }}>
      <TemplateComponent {...data} />
      <div style={{ marginTop: 18 }}>
        <Link to="/">Back to Home</Link>
      </div>
    </div>
  );
}

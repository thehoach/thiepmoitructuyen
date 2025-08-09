export default function DisplayItem({ value, onRemove, showRemove = true, field }) {
    const isImageField = field?.type === "images";
  
    return (
      <div
        style={{
          position: "relative",
          border: "1px solid #ccc",
          padding: 6,
          marginBottom: 4,
          borderRadius: 4,
          background: "#fafafa",
        }}
      >
        {isImageField ? (
          <img
            src={value}
            alt="preview"
            style={{ maxWidth: "100%", maxHeight: 100, display: "block", marginBottom: 4 }}
            onError={(e) => { e.target.src = ""; }} // fallback if invalid url
          />
        ) : (
          <span>{value}</span>
        )}
  
        {showRemove && (
          <button
            onClick={onRemove}
            style={{
              position: "absolute",
              top: 2,
              right: 2,
              border: "none",
              background: "transparent",
              cursor: "pointer",
              color: "red",
              fontWeight: "bold",
              fontSize: 16,
              lineHeight: 1,
            }}
            aria-label="Remove item"
            type="button"
          >
            ×
          </button>
        )}
      </div>
    );
  }
  
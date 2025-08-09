// src/templates/classic/ClassicCard.jsx
import "./ClassicCard.css";

export default function ClassicCard(props) {
  // props contains static fields (s_*) and cards array
  // we expect: props.s_location, props.s_date, props.cards (array)
  const { s_location, s_date, cards = [] } = props;

  return (
    <div className="classic-card-root">
      <div className="classic-card-header">
        <h1>Invitation</h1>
        <div className="classic-meta">
          <div><strong>Location:</strong> {s_location}</div>
          <div><strong>Date:</strong> {s_date}</div>
        </div>
      </div>

      <hr />

      <div className="classic-cards-list">
        {cards.length === 0 && <p>No guest cards generated.</p>}
        {cards.map((card, idx) => (
          <div key={idx} className="classic-card-item">
            <h2>Dear {card.d_name || "Guest"}</h2>
            {card.d_message && <p className="message">{card.d_message}</p>}

            {Array.isArray(card.d_images) && card.d_images.length > 0 && (
              <div className="images">
                {card.d_images.map((src, i) =>
                  src ? (
                    <img key={i} src={src} alt={`img-${i}`} />
                  ) : null
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

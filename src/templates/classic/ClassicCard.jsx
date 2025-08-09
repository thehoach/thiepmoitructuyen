// src/templates/classic/ClassicCard.jsx

export default function ClassicCard(props) {
  return (
    <div>
      <h2>Received Props</h2>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </div>
  );
}

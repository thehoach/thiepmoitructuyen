import "./style.css";

export default function BirthdayCard({ staticData, dynamicData }) {
  return (
    <div className="birthday-card">
      {staticData.banner && (
        <img src={staticData.banner} alt="Banner" className="card-banner" />
      )}
      <h1 className="card-title">{staticData.event_title || "You're Invited!"}</h1>

      <div className="card-body">
        <p>
          <strong>Dear {dynamicData.name},</strong>
        </p>
        <p>You're invited to a special birthday celebration!</p>
        <p>
          <strong>Location:</strong> {staticData.location}
        </p>
        <p>
          <strong>Date:</strong> {staticData.date}
        </p>

        {dynamicData.guest_image?.[0] && (
          <div className="guest-image-wrapper">
            <img src={dynamicData.guest_image} alt="Guest" className="guest-image" />
          </div>
        )}
      </div>
    </div>
  );
}

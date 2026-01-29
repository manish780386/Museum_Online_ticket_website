import SlotCard from "./SlotCard";

const MuseumCard = ({ museum, searchData }) => {
  return (
    <div className="museum-card">
      
      {/* LEFT INFO */}
      <div className="museum-info">
        <h3>{museum.name}</h3>
        <p>📍 {museum.city}</p>
        <p>⭐ {museum.rating}</p>

        <span className={`crowd ${museum.crowd.toLowerCase()}`}>
          Crowd: {museum.crowd}
        </span>

        <p className="price">
          Starting at ₹{museum.price}
        </p>
      </div>

      {/* RIGHT SLOTS */}
      <div className="slots">
        <SlotCard time="10:00 - 11:00" status="available" />
        <SlotCard time="11:00 - 12:00" status="few" />
        <SlotCard time="12:00 - 01:00" status="full" />
      </div>

    </div>
  );
};

export default MuseumCard;

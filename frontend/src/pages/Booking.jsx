import { useLocation, useNavigate } from "react-router-dom";
import "../styles/booking.css";

const PRICE_MAP = {
  Adult: 150,
  Student: 100,
  Child: 70,
  "Senior Citizen": 80,
};

const Booking = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state || !state.visitors)
    return <h2>No booking data ❌</h2>;

  // 🔥 LOGIC: total price from visitors
  const totalPrice = state.visitors.reduce(
    (sum, v) => sum + PRICE_MAP[v.type],
    0
  );

  return (
    <div className="booking-page">
      <h2>Confirm Booking</h2>

      <div className="booking-card">
        <p><b>Museum:</b> {state.museum}</p>
        <p><b>Date:</b> {state.date}</p>
        <p><b>Slot:</b> {state.time}</p>

        <h3>Visitors</h3>
        {state.visitors.map((v, i) => (
          <p key={i}>
            {v.name} – {v.type} – ₹{PRICE_MAP[v.type]}
          </p>
        ))}

        <h2>Total: ₹{totalPrice}</h2>

        <button
          className="pay-btn"
          onClick={() =>
            navigate("/payment", {
              state: { ...state, totalPrice },
            })
          }
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default Booking;

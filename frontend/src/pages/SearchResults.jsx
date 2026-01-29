import { useLocation, useNavigate } from "react-router-dom";
import { MapPin, Calendar, Clock, Ticket } from "lucide-react";
import "../styles/searchResults.css";

const SearchResults = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) return <h2 className="error-text">No data found ❌</h2>;

  return (
    <div className="results-wrapper">
      <div className="result-card">
        <h2 className="museum-title">{state.museum}</h2>

        <div className="info-row">
          <span><MapPin size={18} /> {state.city}</span>
          <span><Calendar size={18} /> {state.date}</span>
          <span><Clock size={18} /> {state.slot}</span>
        </div>

        <button
          className="book-btn"
          onClick={() => navigate("/visitor-details", { state })}
        >
          <Ticket size={20} /> Book Tickets
        </button>
      </div>
    </div>
  );
};

export default SearchResults;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/searchbar.css";

const SearchBar = () => {
  const navigate = useNavigate();

  const cityMuseums = {
    Delhi: ["National Museum", "Science Museum", "Rail Museum"],
    Mumbai: ["Chhatrapati Shivaji Museum", "Nehru Science Centre"],
    Jaipur: ["Albert Hall Museum", "City Palace Museum"],
    Indore: ["Central Museum Indore", "Gandhi Hall Museum"],
  };

  const [formData, setFormData] = useState({
    city: "",
    museum: "",
    date: "",
    slot: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({
      ...p,
      [name]: value,
      ...(name === "city" && { museum: "" }),
    }));
  };

  const handleSearch = () => {
    if (!formData.city || !formData.museum || !formData.date || !formData.slot) {
      alert("Please fill all fields ❌");
      return;
    }
    navigate("/results", { state: formData });
  };

  return (
    <div className="search-card">
      <select name="city" onChange={handleChange}>
        <option value="">Select City</option>
        {Object.keys(cityMuseums).map((city) => (
          <option key={city}>{city}</option>
        ))}
      </select>

      <select
        name="museum"
        onChange={handleChange}
        disabled={!formData.city}
      >
        <option value="">Select Museum</option>
        {cityMuseums[formData.city]?.map((m, i) => (
          <option key={i}>{m}</option>
        ))}
      </select>

      <input type="date" name="date" onChange={handleChange} />

      <select name="slot" onChange={handleChange}>
        <option value="">Select Time Slot</option>
        <option>10:00 AM - 12:00 PM</option>
        <option>12:00 PM - 02:00 PM</option>
        <option>03:00 PM - 05:00 PM</option>
      </select>

      <button onClick={handleSearch}>Search Museums</button>
    </div>
  );
};

export default SearchBar;

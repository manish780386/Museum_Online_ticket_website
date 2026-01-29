import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/visitor.css";

const getVisitorType = (age) => {
  if (age < 10) return "Child";
  if (age < 20) return "Student";
  if (age < 60) return "Adult";
  return "Senior Citizen";
};

const VisitorDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [visitors, setVisitors] = useState([]);

  const handleChange = (i, field, value) => {
    const copy = [...visitors];
    copy[i][field] = value;

    if (field === "age") {
      if (!value || Number(value) <= 0) copy[i].type = "";
      else copy[i].type = getVisitorType(Number(value));
    }
    setVisitors(copy);
  };

  const addVisitor = () => {
    setVisitors([...visitors, { name: "", age: "", type: "" }]);
  };

  const handleNext = () => {
    if (visitors.length === 0) {
      alert("Please add at least one visitor ❌");
      return;
    }
    for (let v of visitors) {
      if (!v.name || !v.age || !v.type) {
        alert("Please fill all visitor details ❌");
        return;
      }
    }

    navigate("/booking", {
      state: {
        ...state,
        visitors,
      },
    });
  };

  return (
    <div className="visitor-page">
      <h2>Visitor Details</h2>

      <div className="visitor-card">
        {visitors.map((v, i) => (
          <div className="visitor-row" key={i}>
            <input
              placeholder="Name"
              value={v.name}
              onChange={(e) => handleChange(i, "name", e.target.value)}
            />
            <input
              type="number"
              placeholder="Age"
              value={v.age}
              onChange={(e) => handleChange(i, "age", e.target.value)}
            />
            <input value={v.type} readOnly placeholder="Type" />
          </div>
        ))}

        <button className="add-btn" onClick={addVisitor}>➕ Add Visitor</button>
        <p className="total">Total Visitors: {visitors.length}</p>
        <button className="next-btn" onClick={handleNext}>Continue ➡️</button>
      </div>
    </div>
  );
};

export default VisitorDetails;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./admin.css";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginAdmin = async () => {
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/admin/login/",
        { username, password }
      );

      if (res.data.success) {
        navigate("/admin/dashboard");
      }
    } catch (err) {
      alert("Invalid Admin Credentials ❌");
    }
  };

  return (
    <div className="admin-login">
      <div className="login-card">
        <h2>🔐 Admin Login</h2>

        <input
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={loginAdmin}>Login</button>
      </div>
    </div>
  );
};

export default AdminLogin;

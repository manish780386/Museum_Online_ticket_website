import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line
} from "recharts";
import "./admin.css";

const AdminDashboard = () => {
  const [stats, setStats] = useState({});
  const [cities, setCities] = useState([]);
  const [daily, setDaily] = useState([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    const statsRes = await axios.get("http://127.0.0.1:8000/api/admin/stats/");
    const cityRes = await axios.get("http://127.0.0.1:8000/api/admin/cities/");
    const dailyRes = await axios.get("http://127.0.0.1:8000/api/admin/daily/");

    setStats(statsRes.data);
    setCities(cityRes.data);
    setDaily(dailyRes.data);
  };

  return (
    <div className="admin-page">
      <h1>📊 Admin Dashboard</h1>

      {/* STATS */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Today Tickets</h3>
          <p>{stats.todayTickets}</p>
        </div>

        <div className="stat-card">
          <h3>Total Visitors</h3>
          <p>{stats.totalVisitors}</p>
        </div>

        <div className="stat-card">
          <h3>Total Revenue</h3>
          <p>₹ {stats.revenue}</p>
        </div>

        <div className="stat-card">
          <h3>Top City</h3>
          <p>{stats.topCity}</p>
        </div>
      </div>

      {/* DAILY TREND */}
      <h2>📈 Daily Ticket Trend</h2>
      <div className="chart-box">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={daily}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="tickets" stroke="#22c55e" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* CITY CHART */}
      <h2>🏙 City Wise Tickets</h2>
      <div className="chart-box">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={cities}>
            <XAxis dataKey="city" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="tickets" fill="#38bdf8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminDashboard;

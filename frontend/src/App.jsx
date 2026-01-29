import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults.jsx";
import Booking from "./pages/Booking.jsx";
import Payment from "./pages/Payment.jsx";
import Ticket from "./pages/Ticket.jsx";

import VisitorDetails from "./pages/VisitorDetails.jsx";

import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";




function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/results" element={<SearchResults />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/ticket" element={<Ticket />} />

        <Route path="/visitor-details" element={<VisitorDetails />} />

         <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard/>} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;

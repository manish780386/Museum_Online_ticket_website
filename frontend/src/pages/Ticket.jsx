import { useLocation } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import jsPDF from "jspdf";
import '../styles/ticket.css'

const Ticket = () => {
  const { state } = useLocation();
  if (!state) return <h2>No Ticket ❌</h2>;

  const downloadPDF = () => {
    const pdf = new jsPDF();
    pdf.text(`Booking ID: ${state.bookingId}`, 20, 30);
    pdf.text(`Museum: ${state.museum}`, 20, 40);
    pdf.text(`Date: ${state.date}`, 20, 50);
    pdf.text(`Slot: ${state.time}`, 20, 60);
    pdf.text(`Amount: ₹${state.totalPrice}`, 20, 70);
    pdf.save("ticket.pdf");
  };

  return (
  <div className="ticket-page">
    <div className="ticket-card">
      <h2>Ticket Confirmed 🎟️</h2>

      <QRCodeCanvas value={state.bookingId} size={150} />

      <button onClick={downloadPDF}>Download PDF</button>
    </div>
  </div>
);

};

export default Ticket;

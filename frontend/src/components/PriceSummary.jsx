const PriceSummary = ({ pricePerTicket, tickets, total }) => {
  return (
    <div className="summary">
      <h3>Price Summary</h3>
      <p>Price per ticket: ₹{pricePerTicket}</p>
      <p>Tickets: {tickets}</p>
      <hr />
      <h4>Total: ₹{total}</h4>
    </div>
  );
};

export default PriceSummary;

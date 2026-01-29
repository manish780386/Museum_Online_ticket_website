const TicketCounter = ({ tickets, setTickets }) => {
  return (
    <div className="counter">
      <label>Number of Tickets</label>

      <div className="controls">
        <button onClick={() => tickets > 1 && setTickets(tickets - 1)}>-</button>
        <span>{tickets}</span>
        <button onClick={() => setTickets(tickets + 1)}>+</button>
      </div>
    </div>
  );
};

export default TicketCounter;

import QRCode from "react-qr-code";

const QRCodeTicket = ({ data }) => {
  return (
    <div style={{ background: "white", padding: "16px" }}>
      <QRCode
        value={JSON.stringify({
          museum: data.museum,
          date: data.date,
          slot: data.time,
          tickets: data.tickets,
          paymentId: data.paymentId,
        })}
      />
    </div>
  );
};

export default QRCodeTicket;

import { useLocation, useNavigate } from "react-router-dom";
import { createOrder, verifyPayment } from "../api/bookingApi";
import "../styles/payment.css";

const Payment = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) return <h2>No payment data ❌</h2>;

  const payNow = async () => {
    try {
      const orderRes = await createOrder(state.totalPrice);
      const order = orderRes.data;

      const options = {
        key: "rzp_test_S83iDmMw0ztokf",
        amount: order.amount,
        currency: "INR",
        name: "Smart Museum Booking",
        description: "Museum Ticket",
        order_id: order.id,
        handler: async (response) => {
          try {
            const verifyRes = await verifyPayment({
              booking_id: "BK" + Date.now(),
              museum: state.museum,
              date: state.date,
              slot: state.slot,
              amount: state.totalPrice,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            });

            navigate("/ticket", {
              state: {
                museum: state.museum,
                date: state.date,
                slot: state.slot,
                totalPrice: state.totalPrice,
                paymentId: response.razorpay_payment_id,
                bookingId: verifyRes.data.booking_id,
              },
            });
          } catch (err) {
            console.error(err.response?.data || err);
            alert("Payment verified but booking failed ❌");
          }
        },
        theme: { color: "#111827" },
      };

      new window.Razorpay(options).open();
    } catch (err) {
      console.error(err);
      alert("Unable to start payment ❌");
    }
  };

  return (
    <div className="payment-page">
      <h2>Complete Payment</h2>
      <div className="payment-card">
        <p><b>Museum:</b> {state.museum}</p>
        <p><b>Total:</b> ₹{state.totalPrice}</p>
        <button className="pay-now" onClick={payNow}>Pay Now</button>
      </div>
    </div>
  );
};

export default Payment;

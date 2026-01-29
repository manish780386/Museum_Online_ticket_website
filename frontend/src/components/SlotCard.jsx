import { useNavigate } from "react-router-dom";

const SlotCard = ({ time, status }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (status === "full") return;

    navigate("/booking", {
      state: { time }
    });
  };

  return (
    <button
      className={`slot ${status}`}
      disabled={status === "full"}
      onClick={handleClick}
    >
      {time}
    </button>
  );
};

export default SlotCard;

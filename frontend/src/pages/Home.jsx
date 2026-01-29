import SearchBar from "../components/SearchBar.jsx";
import "../styles/home.css";

const Home = () => {
  return (
    <div className="home">
      <div className="hero">
        <div className="overlay">
          <h1>🏛️ Explore Museums Smarter</h1>
          <p>Book museum tickets like RedBus — fast, easy & online</p>
          <SearchBar />
        </div>
      </div>
    </div>
  );
};

export default Home;

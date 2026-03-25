import { Link } from "react-router-dom";
import logo from "../assets/LOGO.png";

function Home() {
  return (
    <div className="splash-page">
      <div className="splash-content">
        
        {/* LOGO */}
        <img
          src={logo}
          alt="Manga Automobiles Logo"
          className="splash-logo"
        />

        {/* BUTTON → ROUTES TO CAR LISTINGS */}
        <Link to="/cars" className="splash-btn">
          View Our Cars
        </Link>

      </div>
    </div>
  );
}

export default Home;
import { useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="header">
        <span className="header-title">Manga Automobiles</span>

        <div className="header-right">
          {/* HOME ICON (DESKTOP ONLY) */}
          <Link to="/" className="home-btn desktop-only">
            <svg viewBox="0 0 24 24">
              <path d="M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8h5z" />
            </svg>
          </Link>

          {/* HAMBURGER (MOBILE ONLY) */}
          <button
            className="menu-btn mobile-only"
            onClick={() => setOpen(!open)}
          >
            ☰
          </button>
        </div>
      </header>

      {/* MOBILE MENU */}
      <div className={`mobile-menu ${open ? "active" : ""}`}>
        <ul>
          <li>
            <Link to="/" onClick={() => setOpen(false)}>
              Home
            </Link>
          </li>

          <li>
            <Link to="/account" onClick={() => setOpen(false)}>
              My Account
            </Link>
          </li>

          <li>
            <Link to="/checkout" onClick={() => setOpen(false)}>
              Checkout
            </Link>
          </li>

          <li>
            <Link to="/about" onClick={() => setOpen(false)}>
              Contact Us
            </Link>
          </li>

          <li>
            <Link to="/privacy" onClick={() => setOpen(false)}>
              Search
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Header;
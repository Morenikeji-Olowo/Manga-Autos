import { useState } from "react";

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="header">
      <h1 className="header-title">Manga Automobiles</h1>

      <button onClick={() => setOpen(!open)}>
        ☰
      </button>

      <div className={`mobile-menu ${open ? "active" : ""}`}>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">My Account</a></li>
          <li><a href="#">Checkout</a></li>
          <li><a href="#">About Us</a></li>
          <li><a href="#">Privacy Policy</a></li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
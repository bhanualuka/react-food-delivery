import React, { useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const Navbar = () => {
  const [menu, setMenu] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for hamburger menu

  const { getUniqueCartCount } = useContext(StoreContext);

  return (
    <div className="navbar">
      <Link to="/">
        <div className="logo-Container">
          <h1 className="logo">Saimaster</h1>
        </div>
      </Link>

      {/* Hamburger Menu Icon */}
      <div
        className={`hamburger ${isMenuOpen ? "open" : ""}`}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>

      {/* Menu Links */}
      <ul className={`navbar-menu ${isMenuOpen ? "open" : ""}`}>
        <Link
          to="/"
          onClick={() => {
            setMenu("home");
            setIsMenuOpen(false);
          }}
          className="hoverLinks"
        >
          HOME
        </Link>

        <Link
          to={"/menupage"}
          onClick={() => {
            setMenu("menu");
            setIsMenuOpen(false);
          }}
          className="hoverLinks"
        >
          MENU
        </Link>
        <a
          href="#footer"
          onClick={() => {
            setMenu("contact-us");
            setIsMenuOpen(false);
          }}
          className="hoverLinks"
        >
          CONTACT-US
        </a>
      </ul>

      <div className="navbar-right">
        {/* Cart Icon */}
        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="Cart" />
            {/* <BsCart4 /> */}
          </Link>
          {/* Displaying  count of unique items on the cart logo */}
          <div className={getUniqueCartCount() === 0 ? "" : "dot"}>
            {getUniqueCartCount() > 0 && <span>{getUniqueCartCount()}</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

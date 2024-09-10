import React, { useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const Navbar = () => {
  const [menu, setMenu] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for hamburger menu
  const [searchQuery, setSearchQuery] = useState(""); // State for search input

  const { getTotalCartAmount } = useContext(StoreContext);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <div className="navbar">
        <Link to="/">
          <h1 className="logo">Saimaster.</h1>
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
            className={menu === "home" ? "active" : ""}
          >
            home
          </Link>
          <a
            href="#explore-menu"
            onClick={() => {
              setMenu("menu");
              setIsMenuOpen(false);
            }}
            className={menu === "menu" ? "active" : ""}
          >
            menu
          </a>
          <a
            href="#app-download"
            onClick={() => {
              setMenu("mobile-app");
              setIsMenuOpen(false);
            }}
            className={menu === "mobile-app" ? "active" : ""}
          >
            mobile-app
          </a>
          <a
            href="#footer"
            onClick={() => {
              setMenu("contact-us");
              setIsMenuOpen(false);
            }}
            className={menu === "contact-us" ? "active" : ""}
          >
            contact-us
          </a>
        </ul>

        <div className="navbar-right">
          {/* Search Input */}
          <div className="navbar-search">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button type="button">
              <img src={assets.search_icon} alt="Search" />
            </button>
          </div>

          {/* Cart Icon */}
          <div className="navbar-search-icon">
            <Link to="/cart">
              <img src={assets.basket_icon} alt="" />
            </Link>
            <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;

import React, { useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const Navbar = () => {
  const [menu, setMenu] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for hamburger menu

  const { getTotalCartAmount } = useContext(StoreContext);

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
          {/*  <a
            href="#app-download"
            onClick={() => {
              setMenu("mobile-app");
              setIsMenuOpen(false);
            }}
            className={menu === "mobile-app" ? "active" : ""}
          >
            mobile-app
          </a> */}
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
          {/* Cart Icon */}
          <div className="navbar-search-icon">
            <Link to="/cart">
              <img src={assets.basket_icon} alt="Cart" />
            </Link>
            <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;

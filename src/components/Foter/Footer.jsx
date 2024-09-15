import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          {/* <img src={assets.logo} alt="" /> */}
          <Link to={"/"}>
            <h1>Saimaster.</h1>
          </Link>
          <p>
            A simple and easy-to-use food delivery app made with React.js.
            Explore a variety of dishes and order your favorite meals with just
            a few clicks. Saimaster makes it quick and convenient to get
            delicious food delivered right to your door.{" "}
            <i style={{ fontSize: "10px" }}>
              Jai Sai Master Jai Bapuji Maharaj
            </i>
          </p>

          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2> GET IN TOUCH</h2>
          <ul>
            <li>+1-358-758-1457</li>
            <li>contact@saimaster.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        Copyright 2024 &copy; Saimaster.com - All Rights Reserved.
      </p>
    </div>
  );
};

export default Footer;

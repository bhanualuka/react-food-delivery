import "./App.css";
import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./components/Foter/Footer";
import LoginPopup from "./components/LoginPopup/LoginPopup";

function App() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {/* <div className="jaisaimasterjaibapujimaharaj">
        <h1>Jai Sai master Jai Bapuji Maharaj</h1>
        <h1>Sri Sachidhaanandha Sadhuguru Sainath Maharaj ki jai</h1>
        <h1>
          Sri Sachidhaanandha Sadhuguru Aliveelu Mangamma Sahitha bardwaj
          maharaj ki jai
        </h1>
        <h1>Sri Sachidhaanandha Sadhuguru Nampally baba maharaj ki jai</h1>
        <h1>
          Sri Sachidhaananadha Sadhuguru Maniamma Sahitha Bapuji Maharaj ki jai
        </h1>
      </div> */}

      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}

      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;

import "./App.css";
import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import Footer from "./components/Foter/Footer";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import FoodDetailPage from "./components/FoodDetails/FoodDetail";
// import Header from "./components/Header/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import Payment from "./pages/Payment/Payment";
import ExploreMenu from "./components/ExploreMenu/ExploreMenu";
import MenuPage from "./pages/Payment/ExploreMenuPage/MenuPage";

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
        {/* <Header /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/food/:id" element={<FoodDetailPage />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/exploremenu" element={<ExploreMenu />} />
          <Route path="/menupage" element={<MenuPage />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;

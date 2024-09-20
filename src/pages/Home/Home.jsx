// import AppDownload from "../../components/AppDownload/AppDownload";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";
import Header from "../../components/Header/Header";
import "./Home.css";
import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";

const Home = () => {
  const [category, setCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <>
      <Header />
      {/* <ExploreMenu category={category} setCategory={setCategory} /> */}
      {/* <Navbar onSearch={handleSearch} /> */}
      <FoodDisplay category={category} searchTerm={searchTerm} />
      {/* <AppDownload /> */}
    </>
  );
};

export default Home;

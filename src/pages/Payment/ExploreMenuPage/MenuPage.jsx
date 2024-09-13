import React from "react";
import ExploreMenu from "../../../components/ExploreMenu/ExploreMenu";
import FoodDisplay from "../../../components/FoodDisplay/FoodDisplay";
import { useState } from "react";

const MenuPage = () => {
  const [category, setCategory] = useState("All");

  return (
    <>
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
    </>
  );
};

export default MenuPage;

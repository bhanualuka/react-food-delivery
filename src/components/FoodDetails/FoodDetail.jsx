import React, { useContext, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import "./FoodDetails.css";

const FoodDetailPage = () => {
  const { id } = useParams();
  const { food_list, cartItems, addToCart, removeFromCart } =
    useContext(StoreContext);

  const navigate = useNavigate();

  const selectedFood = food_list.find((item) => item._id === id);

  if (!selectedFood) {
    return <div>Food item not found</div>;
  }

  const handleProceedToPayment = () => {
    navigate("/cart");
  };

  return (
    <div className="foodDetails-container">
      <div className="food-detail-page">
        <div className="food-image">
          <img src={selectedFood.image} alt={selectedFood.name} />
        </div>
        <div className="food-info">
          <h2>{selectedFood.name}</h2>
          <p>{selectedFood.description}</p>
          <p className="price">
            Price: &#8377;
            {selectedFood.price}
          </p>

          <div className="increment-decrement-buttons">
            <button
              className="decrement-btn"
              onClick={() => removeFromCart(selectedFood._id)}
            >
              -
            </button>
            <span> {cartItems[selectedFood._id] || 0}</span>
            <button
              className="increment-btn"
              onClick={() => addToCart(selectedFood._id)}
            >
              +
            </button>
          </div>

          <div className="proceed-to-cart">
            <button className="proceed-btn" onClick={handleProceedToPayment}>
              Go To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDetailPage;

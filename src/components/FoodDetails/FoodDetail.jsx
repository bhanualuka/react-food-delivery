import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import "./FoodDetails.css";

const FoodDetailPage = () => {
  const { id } = useParams(); // Get food ID from URL
  const { food_list, cartItems, addToCart, removeFromCart } =
    useContext(StoreContext);

  const navigate = useNavigate(); // Hook for programmatic navigation

  // Find the selected food item from the context (or fetch if you have an API)
  const selectedFood = food_list.find((item) => item._id === id);

  if (!selectedFood) {
    return <div>Food item not found</div>;
  }

  // Handler for "Proceed to Payment" button
  const handleProceedToPayment = () => {
    navigate("/cart"); // Navigate to the Cart page
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
          <p>Price: ${selectedFood.price}</p>

          {/* Increment-Decrement Buttons */}
          <div className="increment-decrement-buttons">
            <button
              className="quantity-btn"
              id="decrement-btn"
              onClick={() => removeFromCart(selectedFood._id)}
            >
              -
            </button>
            <span>Quantity: {cartItems[selectedFood._id] || 0}</span>
            <button
              className="increment-btn"
              onClick={() => addToCart(selectedFood._id)}
            >
              +
            </button>
          </div>

          {/* Proceed to Payment Button */}
          <div className="proceed-to-cart">
            <button className="proceed-btn" onClick={handleProceedToPayment}>
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDetailPage;

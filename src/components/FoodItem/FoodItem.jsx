import React, { useContext } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
// import "./FoodItem.css";
import "./Fooditem.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);
  const navigate = useNavigate();

  const handleItemClick = () => {
    // Navigate to the detail page for the clicked food item
    navigate(`/food/${id}`);
  };

  return (
    <div className="food-item" onClick={handleItemClick}>
      <div className="food-item-img-container">
        <img className="food-item-img" src={image} alt={name} />
        {!cartItems[id] ? (
          <img
            className="add"
            onClick={(e) => {
              e.stopPropagation(); // Prevent navigation when clicking on the cart icon
              addToCart(id);
            }}
            src={assets.add_icon_white}
            alt="Add to Cart"
          />
        ) : (
          <div
            className="food-item-counter"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              onClick={() => removeFromCart(id)}
              src={assets.remove_icon_red}
              alt="Remove from Cart"
            />
            <p>{cartItems[id]}</p>
            <img
              onClick={() => addToCart(id)}
              src={assets.add_icon_green}
              alt="Add More"
            />
          </div>
        )}
      </div>

      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="Rating" />
        </div>

        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  );
};

export default FoodItem;

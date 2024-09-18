import React, { useContext, useState } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineDelete } from "react-icons/md";

const Cart = () => {
  const {
    cartItems,
    food_list,
    removeFromCart,
    addToCart,
    getTotalCartAmount,
    removeItemCompletely,
  } = useContext(StoreContext);

  const navigate = useNavigate(); // Initialize useNavigate to handle navigation

  const handleProceedToPayment = () => {
    const totalAmount = getTotalCartAmount();
    const cartItemsList = food_list.filter((item) => cartItems[item._id] > 0);
    navigate("/payment", { state: { totalAmount, cartItemsList } }); // Pass cart items list and total amount via state
  };

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />

        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={index}>
                <div className="cart-items-item">
                  <Link to={`/food/${item._id}`}>
                    <img src={item.image} alt={item.name} />
                  </Link>
                  <p className="titleName">{item.name}</p>
                  <p className="priceName"> &#8377; {item.price}</p>

                  <div className="cart-buttons">
                    <div className="cart-item-quantity">
                      <button
                        className="quantity-btn"
                        onClick={() => removeFromCart(item._id)}
                      >
                        -
                      </button>
                      <p className="quantity-number">{cartItems[item._id]}</p>
                      <button
                        className="quantity-btn"
                        id="incremantButton"
                        onClick={() => addToCart(item._id)}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <p className="totalPrice">
                    &#8377; {item.price * cartItems[item._id]}
                  </p>
                  <p
                    onClick={() => removeItemCompletely(item._id)}
                    className="cross"
                  >
                    <MdOutlineDelete />
                  </p>
                </div>
                <hr />
              </div>
            );
          }
          return null;
        })}
      </div>

      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p> &#8377; {getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p> &#8377; {getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>
                &#8377;
                {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
              </b>
            </div>
          </div>
          {/* Navigation to Payment Page */}
          <button
            className="proceedToPayment"
            onClick={handleProceedToPayment} // Call handler function
          >
            PROCEED TO PAYMENT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;

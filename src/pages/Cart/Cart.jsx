import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineDelete } from "react-icons/md";
import useIsMobile from "../../customHook/MobileCustomHook";
import { Button } from "react-bootstrap";
// import useIsMobile from "../../hooks/useIsMobile"; // Import the hook

const Cart = () => {
  const {
    cartItems,
    food_list,
    removeFromCart,
    addToCart,
    getTotalCartAmount,
    removeItemCompletely,
  } = useContext(StoreContext);

  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleProceedToPayment = () => {
    const totalAmount = getTotalCartAmount();
    const cartItemsList = food_list.filter((item) => cartItems[item._id] > 0);
    navigate("/payment", { state: { totalAmount, cartItemsList } });
  };

  const totalCartAmount = getTotalCartAmount();
  const hasItemsInCart = totalCartAmount > 0; // Check if there are any items in the cart

  return (
    <div className="cart">
      {isMobile ? (
        // Mobile Cart Layout
        hasItemsInCart ? (
          <div className="cart-items-mobile">
            {food_list.map((item, index) => {
              if (cartItems[item._id] > 0) {
                return (
                  <div key={index} className="cart-item-mobile">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="item-image-mobile"
                    />
                    <div className="item-details-mobile">
                      <p>{item.name}</p>
                      <p>Price: &#8377; {item.price}</p>
                      <div className="mobile-cart-buttons">
                        <button
                          className="decremant"
                          onClick={() => removeFromCart(item._id)}
                        >
                          -
                        </button>
                        <span>{cartItems[item._id]}</span>
                        <button
                          className="incremant"
                          onClick={() => addToCart(item._id)}
                        >
                          +
                        </button>
                      </div>
                      <p>Total: &#8377; {item.price * cartItems[item._id]}</p>
                      <Button
                        variant="danger"
                        className="removeItem"
                        onClick={() => removeItemCompletely(item._id)}
                      >
                        Remove{" "}
                      </Button>
                      {/*  <MdOutlineDelete
                        className="deleteIcon"
                        onClick={() => removeItemCompletely(item._id)}
                      /> */}
                    </div>
                  </div>
                );
              }
              return null;
            })}
            <div className="cart-total-mobile">
              <h2>Total: &#8377; {totalCartAmount}</h2>
              <button onClick={handleProceedToPayment}>
                Proceed to Payment
              </button>
            </div>
          </div>
        ) : (
          <div className="cart-empty-mobile">
            <img src="/emptycartimg.webp" alt="Cart is empty" />
            <h2>Your cart is empty</h2>
            <Link to="/menupage">
              <button>Browse Menu</button>
            </Link>
          </div>
        )
      ) : // Desktop Cart Layout cartpage
      hasItemsInCart ? (
        <>
          <div className="cart-items">
            {/* Your existing cart items layout */}
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
                          <p className="quantity-number">
                            {cartItems[item._id]}
                          </p>
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

          {/* Cart totals section */}
          <div className="cart-bottom">
            <div className="cart-total">
              <h2>Cart Totals</h2>
              <div>
                <div className="cart-total-details">
                  <p>Subtotal</p>
                  <p> &#8377; {totalCartAmount}</p>
                </div>
                <hr />
                <div className="cart-total-details">
                  <p>Delivery Fee</p>
                  <p> &#8377; {totalCartAmount === 0 ? 0 : 2}</p>
                </div>
                <hr />
                <div className="cart-total-details">
                  <b>Total</b>
                  <b>
                    &#8377;
                    {totalCartAmount === 0 ? 0 : totalCartAmount + 2}
                  </b>
                </div>
              </div>
              <button
                className="proceedToPayment"
                onClick={handleProceedToPayment}
              >
                PROCEED TO PAYMENT
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="cart-empty">
          <img
            src="/emptycartimg.webp"
            alt="Cart is empty"
            className="empty-cart-image"
          />
          <div className="cart-empty-details">
            <h2>Your cart is empty</h2>
            <Link to="/menupage">
              <button className="browse-menu-button">Browse Menu</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

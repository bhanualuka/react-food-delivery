import { createContext, useState } from "react";
import { food_list } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});

  // Add item to cart
  const addToCart = (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
  };

  // Remove item from cart
  const removeFromCart = (itemId) => {
    if (cartItems[itemId] > 1) {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    } else {
      removeItemCompletely(itemId);
    }
  };

  // Remove item completely from cart
  const removeItemCompletely = (itemId) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev };
      delete updatedCart[itemId];
      return updatedCart;
    });
  };

  // Calculate total cart amount
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  // New function to count unique items in the cart
  const getUniqueCartCount = () => {
    return Object.keys(cartItems).length;
  };

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    removeItemCompletely,
    getTotalCartAmount,
    getUniqueCartCount,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;

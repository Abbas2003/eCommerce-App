import React, { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartSubtotal, setCartSubtotal] = useState(0); // Separate state for cart subtotal
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart items and subtotal from localStorage on initial mount
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cartItems")) || [];
    const storedSubtotal = parseFloat(localStorage.getItem("cartSubtotal")) || 0;
    setCartItems(items);
    setCartSubtotal(storedSubtotal);
    setIsLoaded(true);
  }, []);

  // Save cart items and subtotal to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      localStorage.setItem("cartSubtotal", cartSubtotal.toString());
    }
  }, [cartItems, cartSubtotal, isLoaded]);

  // Function to calculate total subtotal for the cart
  const calculateTotalSubtotal = (items) => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Add item to cart and calculate subtotal
  const addToCart = (item) => {
    const existingItemIndex = cartItems.findIndex((data) => data.id === item.id);
    let updatedCartItems;

    if (existingItemIndex === -1) {
      // If item does not exist, add it with quantity 1
      updatedCartItems = [...cartItems, { ...item, quantity: 1 }];
    } else {
      // If item already exists, update its quantity
      updatedCartItems = cartItems.map((data, index) =>
        index === existingItemIndex ? { ...data, quantity: data.quantity + 1 } : data
      );
    }

    setCartItems(updatedCartItems);

    // Calculate and set the total subtotal for the entire cart
    const updatedSubtotal = calculateTotalSubtotal(updatedCartItems);
    setCartSubtotal(updatedSubtotal);
  };

  // Update quantity of items in the cart and recalculate subtotal
  const updateCart = (item, type) => {
    const updatedCartItems = cartItems.map((data) =>
      data.id === item.id
        ? {
            ...data,
            quantity: type === "plus" ? data.quantity + 1 : Math.max(data.quantity - 1, 0),
          }
        : data
    );

    setCartItems(updatedCartItems);

    // Calculate and set the total subtotal for the entire cart
    const updatedSubtotal = calculateTotalSubtotal(updatedCartItems);
    setCartSubtotal(updatedSubtotal);
  };

  // Remove item from cart and recalculate subtotal
  const removeFromCart = (item) => {
    const updatedCartItems = cartItems.filter((data) => data.id !== item.id);
    setCartItems(updatedCartItems);

    // Calculate and set the total subtotal for the entire cart
    const updatedSubtotal = calculateTotalSubtotal(updatedCartItems);
    setCartSubtotal(updatedSubtotal);
  };

  // Clear all items in the cart and reset subtotal
  const clearCart = () => {
    setCartItems([]);
    setCartSubtotal(0);
    localStorage.removeItem("cartItems");
    localStorage.removeItem("cartSubtotal");
  };

  // Check if item is added to the cart
  const isItemAdded = (item) => {
    return cartItems.find((data) => data.id === item.id) || null;
  };

  return (
    <CartContext.Provider
      value={{
        addToCart,
        updateCart,
        removeFromCart,
        isItemAdded,
        clearCart,
        cartItems,
        cartSubtotal, 
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;

import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleCart = () => {
    setCartOpen((prev) => !prev);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, cartOpen, toggleCart }}>
      {children}
    </CartContext.Provider>
  );
};

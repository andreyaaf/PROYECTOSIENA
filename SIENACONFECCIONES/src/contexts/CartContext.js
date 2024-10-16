import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const useCartActions = () => {
  const context = useContext(CartContext);
  return {
    addToCart: context.addToCart,
    removeFromCart: context.removeFromCart,
    clearCart: context.clearCart,
    updateQuantity: context.updateQuantity,
  };
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  const addToCart = (product) => {
    setCart((prev) => {
      const existingProduct = prev.find(item => item.id === product.id);
      if (existingProduct) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + product.quantity } : item
        );
      }
      return [...prev, { ...product, quantity: product.quantity }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const updateQuantity = (id, newQuantity) => {
    setCart((prev) => {
      return prev.map(item =>
        item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item // Asegura que la cantidad no baje de 1
      );
    });
  };

  const toggleCart = () => {
    setCartOpen((prev) => !prev);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, updateQuantity, cartOpen, toggleCart }}>
      {children}
    </CartContext.Provider>
  );
};

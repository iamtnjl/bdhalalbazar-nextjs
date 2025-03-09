// context/CartProvider.tsx
import APIKit from "@/common/helpers/APIKit";
import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Load cart from local storage on mount
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(savedCart);
  }, []);

  // Save cart to local storage on update
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Add to Cart (Optimistic Update)
  const addToCart = async (productId, quantity = 1) => {
    const newCart = [...cart];
    const existingItem = newCart.find((item) => item.productId === productId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      newCart.push({ productId, quantity });
    }

    setCart(newCart);

    // Sync with backend (don't block UI update)
    APIKit.public
      .cart({ productId, quantity })
      .catch(() => console.error("Failed to sync cart with backend"));
  };

  // Update quantity (Optimistic Update)
  const updateQuantity = async (productId, quantity) => {
    if (quantity < 1) return removeFromCart(productId);

    const newCart = cart.map((item) =>
      item.productId === productId ? { ...item, quantity } : item
    );

    setCart(newCart);

    APIKit.public
      .cart({ productId, quantity })
      .catch(() => console.error("Failed to sync cart with backend"));
  };

  // Remove from cart
  const removeFromCart = (productId) => {
    const newCart = cart.filter((item) => item.productId !== productId);
    setCart(newCart);

    APIKit.public
      .cart({ productId, quantity: 0 }) // Send removal to backend
      .catch(() => console.error("Failed to sync cart with backend"));
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateQuantity, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

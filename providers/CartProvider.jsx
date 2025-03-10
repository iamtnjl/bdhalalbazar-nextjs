import { createContext, useContext, useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import APIKit from "@/common/helpers/APIKit";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const queryClient = useQueryClient();

  // Load cart from local storage and sync with backend
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");

    if (savedCart.length > 0) {
      setCart(savedCart);

      // Sync entire cart with backend on mount
      APIKit.public
        .cart(savedCart)
        .catch(() => console.error("Failed to sync cart with backend"));
    }
  }, []);

  // Save cart to local storage, sync with backend, and invalidate query
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));

    if (cart.length > 0) {
      APIKit.public
        .cart(cart)
        .then(() => {
          queryClient.invalidateQueries({ queryKey: ["/cart"] });
        })
        .catch(() => console.error("Failed to sync cart with backend"));
    }
  }, [cart, queryClient]);

  // Add to Cart (Optimistic Update)
  const addToCart = (productId, quantity = 1) => {
    const newCart = [...cart];
    const existingItem = newCart.find((item) => item.productId === productId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      newCart.push({ productId, quantity });
    }

    setCart(newCart);
  };

  // Update quantity (Optimistic Update)
  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return removeFromCart(productId);

    const newCart = cart.map((item) =>
      item.productId === productId ? { ...item, quantity } : item
    );

    setCart(newCart);
  };

  // Remove from cart
  const removeFromCart = async (productId) => {
    try {
      // Optimistically update local cart
      const newCart = cart.filter((item) => item.productId !== productId);
      setCart(newCart);

      // Call delete API
      await APIKit.public.deleteCart(productId);

      // Invalidate "cart" query to refetch updated cart data
      queryClient.invalidateQueries({ queryKey: ["/cart"] });
    } catch (error) {
      console.error("Failed to remove item from cart:", error);
    }
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

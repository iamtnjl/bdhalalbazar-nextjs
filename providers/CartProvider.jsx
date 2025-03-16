import { createContext, useContext, useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import APIKit from "@/common/helpers/APIKit";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [deviceId, setDeviceId] = useState(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    // Ensure this runs only on the client side
    if (typeof window !== "undefined") {
      const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCart(storedCart);

      let storedDeviceId = localStorage.getItem("deviceId");

      if (!storedDeviceId) {
        storedDeviceId = crypto.randomUUID();
        localStorage.setItem("deviceId", storedDeviceId);
      }

      setDeviceId(storedDeviceId);
    }
  }, []);

  useEffect(() => {
    if (!deviceId) return;

    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));

      APIKit.public
        .cart({ deviceId, cart })
        .then(() => {
          queryClient.invalidateQueries({ queryKey: ["/cart"] });
        })
        .catch(() => console.error("Failed to sync cart with backend"));
    }
  }, [cart, deviceId, queryClient]);

  const addToCart = (productId, quantity = 1) => {
    setCart((prevCart) => {
      const newCart = [...prevCart];
      const existingItem = newCart.find((item) => item.productId === productId);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        newCart.push({ productId, quantity });
      }

      localStorage.setItem("cart", JSON.stringify(newCart));
      return newCart;
    });
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return removeFromCart(productId);

    setCart((prevCart) => {
      const newCart = prevCart.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      );

      localStorage.setItem("cart", JSON.stringify(newCart));
      return newCart;
    });
  };

  const removeFromCart = async (productId) => {
    try {
      setCart((prevCart) => {
        const newCart = prevCart.filter((item) => item.productId !== productId);
        localStorage.setItem("cart", JSON.stringify(newCart));
        return newCart;
      });

      await APIKit.public.deleteCart(deviceId, productId);
      queryClient.invalidateQueries({ queryKey: ["/cart"] });
    } catch (error) {
      console.error("Failed to remove item from cart:", error);
    }
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
    queryClient.invalidateQueries({ queryKey: ["/cart"] });
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

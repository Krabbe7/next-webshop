import { useEffect, useState } from "react";
import { User } from "../types";
import { CartItem } from "@/app/types";

export function useUpdateCartCount(user: User | null) {
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const updateCartCount = () => {
      const cartKey = user ? `cart_${user.id}` : "cart_guest";

      const storedCart = localStorage.getItem(cartKey);

      const cart: CartItem[] = JSON.parse(storedCart || "[]");

      const total = cart.reduce((sum, item) => sum + item.quantity, 0);

      setCartItems(cart);
      setCartCount(total);
    };

    updateCartCount();

    window.addEventListener("cartUpdated", updateCartCount);

    return () => {
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, [user]);

  return {
    cartCount,
    setCartCount,
    cartItems,
    setCartItems,
  };
}

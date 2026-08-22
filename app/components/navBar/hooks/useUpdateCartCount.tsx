import { useEffect, useState } from "react";
import { User } from "../types";

export function useUpdateCartCount(user: User | null) {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      const cartKey = user ? `cart_${user.id}` : "cart_guest";

      const raw = localStorage.getItem(cartKey);

      const cart = JSON.parse(raw || "[]");

      const total = cart.reduce(
        (sum: number, item: any) => sum + item.quantity,
        0,
      );

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
  };
}

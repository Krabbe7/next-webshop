import { useEffect, useState } from "react";
import type { CartItem } from "../types";

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    const key = user ? `cart_${user.id}` : "cart_guest";

    setCart(JSON.parse(localStorage.getItem(key) || "[]"));
  }, []);

  return cart;
}

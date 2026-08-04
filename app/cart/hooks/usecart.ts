"use client";

import { useEffect, useState } from "react";

import type { CartItem } from "../types";

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadCart() {
    let cartKey = "cart_guest";

    try {
      const res = await fetch("http://localhost:5000/api/users/user", {
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();

        cartKey = `cart_${data.user.id}`;
      }
    } catch {}

    const savedCart = JSON.parse(localStorage.getItem(cartKey) || "[]");

    setCart(savedCart);

    setLoading(false);
  }

  useEffect(() => {
    loadCart();

    window.addEventListener("cartUpdated", loadCart);

    return () => {
      window.removeEventListener("cartUpdated", loadCart);
    };
  }, []);

  return {
    cart,
    loading,
  };
}

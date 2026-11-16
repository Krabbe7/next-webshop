"use client";

import { useEffect, useRef, useState } from "react";
import type { CartItem } from "../../types";

async function getCartKey(): Promise<string> {
  try {
    const res = await fetch("http://localhost:5000/api/users/user", {
      credentials: "include",
    });

    if (res.ok) {
      const data = await res.json();

      return `cart_${data.user.id}`;
    }
  } catch (error) {
    console.error("Kunne ikke hente bruger:", error);
  }

  return "cart_guest";
}

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  const cartKeyRef = useRef<string | null>(null);

  async function loadCart() {
    const cartKey = await getCartKey();
    cartKeyRef.current = cartKey;

    try {
      const savedCart = JSON.parse(localStorage.getItem(cartKey) || "[]");

      setCart(savedCart);
    } catch (error) {
      console.error("Kunne ikke læse cart fra localStorage:", error);
      setCart([]);
    }

    setLoading(false);
  }

  async function clearCart() {
    const cartKey = cartKeyRef.current ?? (await getCartKey());

    console.log("clearCart sletter:", cartKey);

    localStorage.removeItem(cartKey);
    setCart([]);

    window.dispatchEvent(new Event("cartUpdated"));
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
    reloadCart: loadCart,
    clearCart,
  };
}

"use client";

import { useEffect, useState } from "react";
import { getCart } from "../lib/cart";

export default function CartPage() {
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    setCart(getCart());
  }, []);

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Kurv</h1>

      {cart.map((item) => (
        <div key={item.id}>
          <h3>{item.title}</h3>

          <p>Antal: {item.quantity}</p>

          <p>{item.price} kr.</p>
        </div>
      ))}
    </main>
  );
}

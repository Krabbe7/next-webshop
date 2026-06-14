"use client";

import { useEffect, useState } from "react";
import styles from "./cartPage.module.css";
import Image from "next/image";

export default function CartPage() {
  const [cart, setCart] = useState<any[]>([]);

  const getCart = () => {
    const user = JSON.parse(localStorage.getItem("user") || "null");

    const cartKey = user ? `cart_${user.id}` : "cart_guest";

    return JSON.parse(localStorage.getItem(cartKey) || "[]");
  };

  useEffect(() => {
    setCart(getCart());
  }, []);

  const removeItem = (id: number) => {
    const user = JSON.parse(localStorage.getItem("user") || "null");

    const cartKey = user ? `cart_${user.id}` : "cart_guest";

    const updatedCart = cart.filter((item) => item.id !== id);

    localStorage.setItem(cartKey, JSON.stringify(updatedCart));

    setCart(updatedCart);

    window.dispatchEvent(new Event("cartUpdated"));
  };

  return (
    <main className={styles.cartContainer}>
      <h1>Kurv</h1>

      {cart.length === 0 && <p>Din kurv er tom.</p>}

      {cart.map((item) => (
        <div key={item.id} className={styles.cartItem}>
          <div className={styles.imageWrapperCart}>
            {item.image_url ? (
              <Image
                src={item.image_url}
                alt={item.title}
                width={400}
                height={500}
                className={styles.imageCart}
              />
            ) : (
              <div className={styles.noImage}>No image available</div>
            )}
          </div>

          <div className={styles.cartInfo}>
            <h3>{item.title}</h3>

            <p>
              <strong>Pris:</strong> {item.price} kr.
            </p>

            <p>
              <strong>Antal:</strong> {item.quantity}
            </p>

            <button
              className={styles.removeButton}
              onClick={() => removeItem(item.id)}
            >
              Fjern fra kurv
            </button>
          </div>
        </div>
      ))}
    </main>
  );
}

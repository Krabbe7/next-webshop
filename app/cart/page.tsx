"use client";

import { useEffect, useState } from "react";
import styles from "./cartPage.module.css";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const [cart, setCart] = useState<any[]>([]);

  const loadCart = async () => {
    let cartKey = "cart_guest";

    try {
      const res = await fetch("http://localhost:5000/api/users/user", {
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();

        cartKey = `cart_${data.user.id}`;
      }
    } catch {
      cartKey = "cart_guest";
    }

    const savedCart = JSON.parse(localStorage.getItem(cartKey) || "[]");

    setCart(savedCart);
  };

  useEffect(() => {
    loadCart();

    window.addEventListener("cartUpdated", loadCart);

    return () => {
      window.removeEventListener("cartUpdated", loadCart);
    };
  }, []);

  const removeItem = async (id: number) => {
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

      <button>
        <Link href="/checkout">Gå til kassen</Link>
      </button>
    </main>
  );
}

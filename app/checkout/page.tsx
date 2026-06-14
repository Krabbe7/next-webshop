"use client";

import { useEffect, useState } from "react";
import styles from "./checkout.module.css";
import Image from "next/image";

type ShippingMethod = {
  id: string;
  name: string;
  price: number;
};

const shippingMethods: ShippingMethod[] = [
  {
    id: "standard",
    name: "Standard levering",
    price: 39,
  },
  {
    id: "express",
    name: "Ekspres levering",
    price: 79,
  },
  {
    id: "pickup",
    name: "Afhentning i butik",
    price: 0,
  },
];

export default function CheckoutPage() {
  const [cart, setCart] = useState<any[]>([]);

  const [shippingMethod, setShippingMethod] = useState<ShippingMethod>(
    shippingMethods[0],
  );

  const getCart = () => {
    const user = JSON.parse(localStorage.getItem("user") || "null");

    const cartKey = user ? `cart_${user.id}` : "cart_guest";

    return JSON.parse(localStorage.getItem(cartKey) || "[]");
  };

  useEffect(() => {
    setCart(getCart());
  }, []);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const total = subtotal + shippingMethod.price;

  return (
    <main className={styles.checkoutContainer}>
      <div className={styles.checkoutGrid}>
        {/* Venstre side */}
        <div className={styles.formSection}>
          <section className={styles.card}>
            <h2>Kundeoplysninger</h2>

            <input type="text" placeholder="Fulde navn" />
            <input type="email" placeholder="Email" />
            <input type="tel" placeholder="Telefon" />
          </section>

          <section className={styles.card}>
            <h2>Leveringsadresse</h2>

            <input type="text" placeholder="Adresse" />
            <input type="text" placeholder="Postnummer" />
            <input type="text" placeholder="By" />
            <input type="text" placeholder="Land" />
          </section>

          <section className={styles.card}>
            <h2>Leveringsmetode</h2>

            {shippingMethods.map((method) => (
              <label
                key={method.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "12px",
                  cursor: "pointer",
                }}
              >
                <input
                  type="radio"
                  name="shipping"
                  checked={shippingMethod.id === method.id}
                  onChange={() => setShippingMethod(method)}
                />

                <span>
                  {method.name}
                  {method.price > 0 ? ` (${method.price} kr.)` : " (Gratis)"}
                </span>
              </label>
            ))}
          </section>

          <section className={styles.card}>
            <h2>Betaling</h2>

            <input type="text" placeholder="Kortnummer" />
            <input type="text" placeholder="MM/ÅÅ" />
            <input type="text" placeholder="CVV" />
          </section>
        </div>

        {/* Højre side */}
        <aside className={styles.summarySection}>
          <div className={styles.orderCard}>
            <div className={styles.orderHeader}>
              <h2>Din ordre</h2>

              <button className={styles.editButton}>Ret din ordre</button>
            </div>

            {cart.map((item) => (
              <div key={item.id} className={styles.orderItem}>
                <div className={styles.orderImage}>
                  {item.image_url && (
                    <Image
                      src={item.image_url}
                      alt={item.title}
                      width={60}
                      height={80}
                    />
                  )}
                </div>

                <div className={styles.orderInfo}>
                  <p>
                    {item.quantity} × {item.title}
                  </p>
                </div>

                <div className={styles.orderPrice}>
                  {(item.price * item.quantity).toFixed(2)} kr.
                </div>
              </div>
            ))}

            <hr />

            <div className={styles.summaryRow}>
              <span>Sub-total</span>
              <span>{subtotal.toFixed(2)} kr.</span>
            </div>

            <div className={styles.summaryRow}>
              <span>Levering</span>
              <span>
                {shippingMethod.price === 0
                  ? "Gratis"
                  : `${shippingMethod.price.toFixed(2)} kr.`}
              </span>
            </div>

            <div className={styles.summaryRow}>
              <span>Metode</span>
              <span>{shippingMethod.name}</span>
            </div>

            <hr />

            <div className={styles.totalRow}>
              <span>I alt:</span>
              <span>{total.toFixed(2)} kr.</span>
            </div>

            <button className={styles.checkoutButton}>Gennemfør køb</button>
          </div>
        </aside>
      </div>
    </main>
  );
}

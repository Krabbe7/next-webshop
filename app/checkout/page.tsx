"use client";

import { useEffect, useState } from "react";
import styles from "./checkout.module.css";
import Image from "next/image";

type DeliveryMethod = {
  id: string;
  name: string;
  price: number;
};

type PickupPoint = {
  id: string;
  provider: string;
  name: string;
  address: string;
  distance?: number;
};

const deliveryMethods: DeliveryMethod[] = [
  { id: "standard", name: "Standard levering", price: 39 },
  { id: "express", name: "Ekspres levering", price: 79 },
  { id: "pickup", name: "Afhentning i pakkeshop", price: 0 },
];

export default function CheckoutPage() {
  const [cart, setCart] = useState<any[]>([]);

  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>(
    deliveryMethods[0],
  );

  const [address, setAddress] = useState("");

  const [pickupPoints, setPickupPoints] = useState<PickupPoint[]>([]);
  const [selectedPickup, setSelectedPickup] = useState<PickupPoint | null>(
    null,
  );

  const [loadingPoints, setLoadingPoints] = useState(false);

  // 🛒 CART
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

  const total = subtotal + deliveryMethod.price;

  // 📦 FETCH PICKUP POINTS (ONLY BACKEND MVC)
  useEffect(() => {
    const fetchPickupPoints = async () => {
      if (deliveryMethod.id !== "pickup") return;
      if (!address || address.length < 5) return;

      setLoadingPoints(true);

      try {
        const res = await fetch(
          "http://localhost:3001/shipping/pickup-points",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              address,
            }),
          },
        );

        const data = await res.json();

        setPickupPoints(data.points || []);
        setSelectedPickup(null);
      } catch (err) {
        console.error("Fejl ved hentning af pakkeshops", err);
      } finally {
        setLoadingPoints(false);
      }
    };

    const timeout = setTimeout(fetchPickupPoints, 500);
    return () => clearTimeout(timeout);
  }, [address, deliveryMethod]);

  return (
    <main className={styles.checkoutContainer}>
      <div className={styles.checkoutGrid}>
        {/* LEFT SIDE */}
        <div className={styles.formSection}>
          <section className={styles.card}>
            <h2>Kundeoplysninger</h2>
            <input type="text" placeholder="Fulde navn" />
            <input type="email" placeholder="Email" />
            <input type="tel" placeholder="Telefon" />
          </section>

          {/* ADDRESS */}
          <section className={styles.card}>
            <h2>Leveringsadresse</h2>

            <input
              type="text"
              placeholder="Adresse"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <input type="text" placeholder="Postnummer" />
            <input type="text" placeholder="By" />
            <input type="text" placeholder="Land" />
          </section>

          {/* DELIVERY METHODS */}
          <section className={styles.card}>
            <h2>Leveringsmetode</h2>

            {deliveryMethods.map((dm) => (
              <label key={dm.id} style={{ display: "flex", gap: 8 }}>
                <input
                  type="radio"
                  name="shipping"
                  checked={dm.id === deliveryMethod.id}
                  onChange={() => setDeliveryMethod(dm)}
                />
                <span>
                  {dm.name} {dm.price > 0 ? `(${dm.price} kr.)` : "(Gratis)"}
                </span>
              </label>
            ))}
          </section>

          {/* PICKUP POINTS */}
          {deliveryMethod.id === "pickup" && (
            <section className={styles.card}>
              <h2>Vælg pakkeshop</h2>

              {!address && <p>Indtast adresse først</p>}

              {loadingPoints && <p>Finder pakkeshops...</p>}

              {!loadingPoints && pickupPoints.length === 0 && address && (
                <p>Ingen pakkeshops fundet</p>
              )}

              {!loadingPoints &&
                pickupPoints.map((point) => (
                  <label
                    key={point.id}
                    style={{
                      display: "flex",
                      gap: 8,
                      marginBottom: 10,
                      cursor: "pointer",
                    }}
                  >
                    <input
                      type="radio"
                      name="pickup"
                      checked={selectedPickup?.id === point.id}
                      onChange={() => setSelectedPickup(point)}
                    />

                    <span>
                      {point.provider.toUpperCase()} – {point.name}
                      <br />
                      {point.address}
                    </span>
                  </label>
                ))}
            </section>
          )}

          {/* PAYMENT */}
          <section className={styles.card}>
            <h2>Betaling</h2>
            <input type="text" placeholder="Kortnummer" />
            <input type="text" placeholder="MM/ÅÅ" />
            <input type="text" placeholder="CVV" />
          </section>
        </div>

        {/* RIGHT SIDE */}
        <aside className={styles.summarySection}>
          <div className={styles.orderCard}>
            <h2>Din ordre</h2>

            {cart.map((item) => (
              <div key={item.id}>
                {item.quantity} × {item.title} – {item.price} kr.
              </div>
            ))}

            <hr />

            <p>Subtotal: {subtotal.toFixed(2)} kr.</p>

            <p>
              Levering:{" "}
              {deliveryMethod.price === 0
                ? "Gratis"
                : `${deliveryMethod.price} kr.`}
            </p>

            {selectedPickup && <p>Pickup: {selectedPickup.name}</p>}

            <hr />

            <h3>Total: {total.toFixed(2)} kr.</h3>

            <button className={styles.checkoutButton}>Gennemfør køb</button>
          </div>
        </aside>
      </div>
    </main>
  );
}

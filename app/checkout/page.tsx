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
};

const deliveryMethods: DeliveryMethod[] = [
  {
    id: "gls",
    name: "GLS Pakkeshop",
    price: 39,
  },
  {
    id: "postnord",
    name: "PostNord Pakkeshop",
    price: 39,
  },
  {
    id: "bring",
    name: "Bring Pakkeshop",
    price: 39,
  },
  {
    id: "home",
    name: "Hjemmelevering",
    price: 59,
  },
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

  useEffect(() => {
    const fetchPickupPoints = async () => {
      const isPickupMethod = ["gls", "postnord", "bring"].includes(
        deliveryMethod.id,
      );

      if (!isPickupMethod) {
        setPickupPoints([]);
        setSelectedPickup(null);
        return;
      }

      if (!address || address.length < 5) {
        return;
      }

      setLoadingPoints(true);

      try {
        const res = await fetch(
          "http://localhost:5000/api/shipping/pickup-points",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              address,
              provider: deliveryMethod.id,
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

          <section className={styles.card}>
            <h2>Leveringsmetode</h2>

            {deliveryMethods.map((dm) => (
              <label
                key={dm.id}
                style={{
                  display: "flex",
                  gap: 8,
                  marginBottom: 8,
                }}
              >
                <input
                  type="radio"
                  name="shipping"
                  checked={dm.id === deliveryMethod.id}
                  onChange={() => setDeliveryMethod(dm)}
                />

                <span>
                  {dm.name}
                  {" - "}
                  {dm.price} kr.
                </span>
              </label>
            ))}
          </section>

          {["gls", "postnord", "bring"].includes(deliveryMethod.id) && (
            <section className={styles.card}>
              <h2>Vælg pakkeshop</h2>

              {!address && <p>Indtast adresse først</p>}

              {loadingPoints && <p>Finder pakkeshops...</p>}

              {!loadingPoints && address && pickupPoints.length === 0 && (
                <p>Ingen pakkeshops fundet</p>
              )}

              {pickupPoints.map((point) => (
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
                    {point.name}
                    <br />
                    {point.address}
                  </span>
                </label>
              ))}
            </section>
          )}

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
                  {item.quantity}× {item.title}
                </div>

                <div className={styles.orderPrice}>
                  {(item.price * item.quantity).toFixed(2)} kr.
                </div>
              </div>
            ))}

            <hr />

            <p>Subtotal: {subtotal.toFixed(2)} kr.</p>

            <p>Levering: {deliveryMethod.price} kr.</p>

            {selectedPickup && <p>Pakkeshop: {selectedPickup.name}</p>}

            <hr />

            <h3>Total: {total.toFixed(2)} kr.</h3>

            <button className={styles.checkoutButton}>Gennemfør køb</button>
          </div>
        </aside>
      </div>
    </main>
  );
}

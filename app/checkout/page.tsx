"use client";

import { useEffect, useState } from "react";
import styles from "./checkout.module.css";
import { useRouter } from "next/navigation";
import {
  isValidEmail,
  formatPostalCode,
  formatCardNumber,
  formatCardExpiry,
  isValidCardExpiry,
  formatCvv,
} from "../components/inputValidation";

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
  { id: "gls", name: "GLS Pakkeshop", price: 39 },
  { id: "postnord", name: "PostNord Pakkeshop", price: 39 },
  { id: "bring", name: "Bring Pakkeshop", price: 39 },
  { id: "home", name: "Hjemmelevering", price: 59 },
];

export default function CheckoutPage() {
  const router = useRouter();
  const [errors, setErrors] = useState({
    customerName: "",
    email: "",
    address: "",
    postalCode: "",
    city: "",
    country: "",
    pickup: "",
    cardNumber: "",
    cardCvv: "",
    cardExpiry: "",
  });

  // CART
  const [cart, setCart] = useState<any[]>([]);

  // CUSTOMER INFO
  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // ADDRESS
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("DK");

  // DELIVERY
  const [deliveryMethod, setDeliveryMethod] = useState(deliveryMethods[0]);

  // PICKUP
  const [pickupPoints, setPickupPoints] = useState<PickupPoint[]>([]);
  const [selectedPickup, setSelectedPickup] = useState<PickupPoint | null>(
    null,
  );
  const [loadingPoints, setLoadingPoints] = useState(false);

  // PAYMENT
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardExpiryError, setCardExpiryError] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  // CART LOAD
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    const cartKey = user ? `cart_${user.id}` : "cart_guest";
    setCart(JSON.parse(localStorage.getItem(cartKey) || "[]"));
  }, []);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const total = subtotal + deliveryMethod.price;

  // PICKUP FETCH
  useEffect(() => {
    const fetchPickupPoints = async () => {
      const isPickup = ["gls", "postnord", "bring"].includes(deliveryMethod.id);

      if (!isPickup) {
        setPickupPoints([]);
        setSelectedPickup(null);
        return;
      }

      if (!address || address.length < 5) return;

      setLoadingPoints(true);

      try {
        const res = await fetch(
          "http://localhost:5000/api/shipping/pickup-points",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
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
        console.error(err);
      } finally {
        setLoadingPoints(false);
      }
    };

    const timeout = setTimeout(fetchPickupPoints, 400);
    return () => clearTimeout(timeout);
  }, [address, deliveryMethod]);

  const validate = () => {
    const newErrors: any = {};

    if (!customerName.trim()) {
      newErrors.customerName = "Indtast dit navn";
    }

    if (!email.trim()) {
      newErrors.email = "Indtast email";
    } else if (!isValidEmail(email)) {
      newErrors.email = "Ugyldig email";
    }

    if (!address.trim()) {
      newErrors.address = "Indtast adresse";
    }

    if (!postalCode || postalCode.length !== 4) {
      newErrors.postalCode = "Postnummer skal være 4 cifre";
    }

    if (!city.trim()) {
      newErrors.city = "Indtast by";
    }

    if (!country.trim()) {
      newErrors.country = "Indtast land";
    }

    if (
      ["gls", "postnord", "bring"].includes(deliveryMethod.id) &&
      !selectedPickup
    ) {
      newErrors.pickup = "Vælg pakkeshop";
    }

    if (cart.length === 0) {
      newErrors.cart = "Din kurv er tom";
    }

    const cleanCard = cardNumber.replace(/\D/g, "");
    if (cleanCard.length !== 16) {
      newErrors.cardNumber = "Kortnummer skal være 16 cifre";
    }

    if (cardCvv.length !== 3) {
      newErrors.cardCvv = "CVV skal være 3 cifre";
    }

    if (!cardExpiry.includes("/")) {
      newErrors.cardExpiry = "Udløbsdato skal være MM/ÅÅ";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // CHECKOUT
  const handleCheckout = async () => {
    const orderData = {
      customerName,
      email,
      phone,

      streetAddress: address,
      postalCode,
      city,
      country,

      deliveryMethod: deliveryMethod.id,

      pickupPoint: selectedPickup
        ? {
            id: selectedPickup.id,
            name: selectedPickup.name,
          }
        : null,

      items: cart.map((item) => ({
        gameId: item.id,
        quantity: item.quantity,
        price: item.price,
      })),

      subtotal,
      shippingPrice: deliveryMethod.price,
      totalPrice: total,
    };

    try {
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;

      const res = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && {
            Authorization: `Bearer ${token}`,
          }),
        },
        body: JSON.stringify(orderData),
      });

      const data = await res.json();

      if (data.orderId) {
        router.push(`/checkout/success/${data.orderId}`);
      } else {
        console.error("Order fejl:", data);
      }
    } catch (err) {
      console.error("Checkout fejl:", err);
    }
  };

  // UI
  return (
    <main className={styles.checkoutContainer}>
      <div className={styles.checkoutGrid}>
        {/* LEFT */}
        <div className={styles.formSection}>
          {/* CUSTOMER */}
          <section className={styles.card}>
            <h2>Kundeoplysninger</h2>

            <input
              placeholder="Fulde navn"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
            <input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className={styles.error}>{errors.email}</p>}
            <input
              placeholder="Telefon"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </section>

          {/* ADDRESS */}
          <section className={styles.card}>
            <h2>Leveringsadresse</h2>

            <input
              placeholder="Adresse"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <input
              placeholder="Postnummer"
              value={postalCode}
              maxLength={4}
              onChange={(e) => setPostalCode(formatPostalCode(e.target.value))}
            />
            {errors.postalCode && (
              <p className={styles.error}>{errors.postalCode}</p>
            )}
            <input
              placeholder="By"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <input
              placeholder="Land"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </section>

          {/* DELIVERY */}
          <section className={styles.card}>
            <h2>Leveringsmetode</h2>

            {deliveryMethods.map((dm) => (
              <label key={dm.id}>
                <input
                  type="radio"
                  checked={dm.id === deliveryMethod.id}
                  onChange={() => setDeliveryMethod(dm)}
                />
                {dm.name} - {dm.price} kr.
              </label>
            ))}
          </section>

          {/* PICKUP */}
          {["gls", "postnord", "bring"].includes(deliveryMethod.id) && (
            <section className={styles.card}>
              <h2>Vælg pakkeshop</h2>

              {loadingPoints && <p>Finder pakkeshops...</p>}

              {pickupPoints.map((p) => (
                <label key={p.id}>
                  <input
                    type="radio"
                    checked={selectedPickup?.id === p.id}
                    onChange={() => setSelectedPickup(p)}
                  />
                  {p.name}
                  <br />
                  {p.address}
                </label>
              ))}
            </section>
          )}

          {/* PAYMENT */}
          <section className={styles.card}>
            <h2>Betaling</h2>

            <input
              placeholder="Kortnummer"
              value={cardNumber}
              maxLength={19}
              onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
            />
            {errors.cardNumber && (
              <p className={styles.error}>{errors.cardNumber}</p>
            )}
            <input
              placeholder="MM/ÅÅ"
              value={cardExpiry}
              maxLength={5}
              onChange={(e) => {
                const formatted = formatCardExpiry(e.target.value);
                setCardExpiry(formatted);

                // live validation
                if (formatted.length === 5 && !isValidCardExpiry(formatted)) {
                  setCardExpiryError("Ugyldig eller udløbet dato");
                } else {
                  setCardExpiryError("");
                }
              }}
            />
            <input
              placeholder="CVV"
              value={cardCvv}
              maxLength={3}
              onChange={(e) => setCardCvv(formatCvv(e.target.value))}
            />
            {errors.cardCvv && <p className={styles.error}>{errors.cardCvv}</p>}
          </section>

          <button className={styles.checkoutButton} onClick={handleCheckout}>
            Gennemfør køb
          </button>
        </div>

        <aside className={styles.summarySection}>
          <h2>Din ordre</h2>

          {cart.map((item) => (
            <div key={item.id}>
              {item.quantity}× {item.title}
              <span>{item.price * item.quantity} kr.</span>
            </div>
          ))}

          <hr />

          <p>Subtotal: {subtotal.toFixed(2)} kr.</p>
          <p>Levering: {deliveryMethod.price} kr.</p>

          {selectedPickup && <p>Pakkeshop: {selectedPickup.name}</p>}

          <h3>Total: {total.toFixed(2)} kr.</h3>
        </aside>
      </div>
    </main>
  );
}

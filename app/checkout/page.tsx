// "use client";

// import { useEffect, useState } from "react";
// import styles from "./checkout.module.css";
// import { useRouter } from "next/navigation";
// import {
//   isValidEmail,
//   formatPostalCode,
//   formatCardNumber,
//   formatCardExpiry,
//   isValidCardExpiry,
//   isValidCardNumber,
//   isValidPhone,
//   isValidCvv,
//   isValidPostalCode,
//   formatCvv,
// } from "./components/inputValidation";

// type DeliveryMethod = {
//   id: string;
//   name: string;
//   price: number;
// };

// type PickupPoint = {
//   id: string;
//   provider: string;
//   name: string;
//   address: string;
// };

// const deliveryMethods: DeliveryMethod[] = [
//   { id: "gls", name: "GLS Pakkeshop", price: 39 },
//   { id: "postnord", name: "PostNord Pakkeshop", price: 39 },
//   { id: "bring", name: "Bring Pakkeshop", price: 39 },
//   { id: "home", name: "Hjemmelevering", price: 59 },
// ];

// export default function CheckoutPage() {
//   const router = useRouter();
//   const [errors, setErrors] = useState<Record<string, string>>({});

//   // CART
//   const [cart, setCart] = useState<any[]>([]);

//   // CUSTOMER INFO
//   const [customerName, setCustomerName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");

//   // ADDRESS
//   const [address, setAddress] = useState("");
//   const [postalCode, setPostalCode] = useState("");
//   const [city, setCity] = useState("");
//   const [country, setCountry] = useState("DK");

//   // DELIVERY
//   const [deliveryMethod, setDeliveryMethod] = useState(deliveryMethods[0]);

//   // PICKUP
//   const [pickupPoints, setPickupPoints] = useState<PickupPoint[]>([]);
//   const [selectedPickup, setSelectedPickup] = useState<PickupPoint | null>(
//     null,
//   );
//   const [loadingPoints, setLoadingPoints] = useState(false);

//   // PAYMENT
//   const [cardNumber, setCardNumber] = useState("");
//   const [cardExpiry, setCardExpiry] = useState("");
//   const [cardExpiryError, setCardExpiryError] = useState("");
//   const [cardCvv, setCardCvv] = useState("");

//   // CART LOAD
//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("user") || "null");
//     const cartKey = user ? `cart_${user.id}` : "cart_guest";
//     setCart(JSON.parse(localStorage.getItem(cartKey) || "[]"));
//   }, []);

//   const subtotal = cart.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0,
//   );

//   const total = subtotal + deliveryMethod.price;

//   // PICKUP FETCH
//   useEffect(() => {
//     const fetchPickupPoints = async () => {
//       const isPickup = ["gls", "postnord", "bring"].includes(deliveryMethod.id);

//       if (!isPickup) {
//         setPickupPoints([]);
//         setSelectedPickup(null);
//         return;
//       }

//       if (!address || address.length < 5) return;

//       setLoadingPoints(true);

//       try {
//         const res = await fetch(
//           "http://localhost:5000/api/shipping/pickup-points",
//           {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//               address,
//               provider: deliveryMethod.id,
//             }),
//           },
//         );

//         const data = await res.json();

//         setPickupPoints(data.points || []);
//         setSelectedPickup(null);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoadingPoints(false);
//       }
//     };

//     const timeout = setTimeout(fetchPickupPoints, 400);
//     return () => clearTimeout(timeout);
//   }, [address, deliveryMethod]);

//   const validate = () => {
//     const newErrors: Record<string, string> = {};

//     if (!customerName.trim()) {
//       newErrors.customerName = "Indtast dit navn";
//     }

//     if (!email.trim()) {
//       newErrors.email = "Indtast email";
//     } else if (!isValidEmail(email)) {
//       newErrors.email = "Ugyldig email";
//     }

//     if (!phone.trim()) {
//       newErrors.phone = "Indtast telefonnummer";
//     } else if (!isValidPhone(phone)) {
//       newErrors.phone = "Telefonnummer skal være 8 cifre";
//     }

//     if (!address.trim()) {
//       newErrors.address = "Indtast adresse";
//     }

//     if (!postalCode.trim()) {
//       newErrors.postalCode = "Indtast postnummer";
//     } else if (!isValidPostalCode(postalCode)) {
//       newErrors.postalCode = "Postnummer skal være 4 cifre";
//     }

//     if (!city.trim()) {
//       newErrors.city = "Indtast by";
//     }

//     if (!country.trim()) {
//       newErrors.country = "Indtast land";
//     }

//     if (
//       ["gls", "postnord", "bring"].includes(deliveryMethod.id) &&
//       !selectedPickup
//     ) {
//       newErrors.pickup = "Vælg en pakkeshop";
//     }

//     if (!isValidCardNumber(cardNumber)) {
//       newErrors.cardNumber = "Ugyldigt kortnummer";
//     }

//     if (!isValidCardExpiry(cardExpiry)) {
//       newErrors.cardExpiry = "Ugyldig udløbsdato";
//     }

//     if (!isValidCvv(cardCvv)) {
//       newErrors.cardCvv = "CVV skal være 3 cifre";
//     }

//     setErrors(newErrors);

//     return Object.keys(newErrors).length === 0;
//   };
//   // CHECKOUT
//   const handleCheckout = async () => {
//     if (!validate()) {
//       return;
//     }

//     const orderData = {
//       customerName,
//       email,
//       phone,

//       streetAddress: address,
//       postalCode,
//       city,
//       country,

//       deliveryMethod: deliveryMethod.id,

//       pickupPoint: selectedPickup
//         ? {
//             id: selectedPickup.id,
//             name: selectedPickup.name,
//           }
//         : null,

//       items: cart.map((item) => ({
//         gameId: item.id,
//         quantity: item.quantity,
//         price: item.price,
//       })),

//       subtotal,
//       shippingPrice: deliveryMethod.price,
//       totalPrice: total,
//     };

//     try {
//       const token =
//         typeof window !== "undefined" ? localStorage.getItem("token") : null;

//       const res = await fetch("http://localhost:5000/api/orders", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           ...(token && {
//             Authorization: `Bearer ${token}`,
//           }),
//         },
//         body: JSON.stringify(orderData),
//       });

//       const data = await res.json();

//       if (data.orderId) {
//         router.push(`/checkout/success/${data.orderId}`);
//       } else {
//         console.error("Order fejl:", data);
//       }
//     } catch (err) {
//       console.error("Checkout fejl:", err);
//     }
//   };

//   // UI
//   return (
//     <main className={styles.checkoutContainer}>
//       <div className={styles.checkoutGrid}>
//         {/* LEFT */}
//         <div className={styles.formSection}>
//           {/* CUSTOMER */}
//           <section className={styles.card}>
//             <h2>Kundeoplysninger</h2>

//             <input
//               placeholder="Fulde navn"
//               value={customerName}
//               onChange={(e) => {
//                 setCustomerName(e.target.value);

//                 setErrors((prev) => ({
//                   ...prev,
//                   customerName: "",
//                 }));
//               }}
//             />
//             {errors.customerName && (
//               <p className={styles.error}>{errors.customerName}</p>
//             )}
//             <input
//               placeholder="Email"
//               value={email}
//               onChange={(e) => {
//                 setEmail(e.target.value);

//                 setErrors((prev) => ({
//                   ...prev,
//                   email: "",
//                 }));
//               }}
//             />

//             {errors.email && <p className={styles.error}>{errors.email}</p>}
//             <input
//               placeholder="Telefon"
//               value={phone}
//               onChange={(e) => {
//                 setPhone(e.target.value);

//                 setErrors((prev) => ({
//                   ...prev,
//                   phone: "",
//                 }));
//               }}
//             />

//             {errors.phone && <p className={styles.error}>{errors.phone}</p>}
//           </section>

//           {/* ADDRESS */}
//           <section className={styles.card}>
//             <h2>Leveringsadresse</h2>

//             <input
//               placeholder="Adresse"
//               value={address}
//               onChange={(e) => {
//                 setAddress(e.target.value);

//                 setErrors((prev) => ({
//                   ...prev,
//                   address: "",
//                 }));
//               }}
//             />

//             {errors.address && <p className={styles.error}>{errors.address}</p>}
//             <input
//               placeholder="Postnummer"
//               value={postalCode}
//               onChange={(e) => setPostalCode(formatPostalCode(e.target.value))}
//             />

//             {errors.postalCode && (
//               <p className={styles.error}>{errors.postalCode}</p>
//             )}
//             <input
//               placeholder="By"
//               value={city}
//               onChange={(e) => {
//                 setCity(e.target.value);

//                 setErrors((prev) => ({
//                   ...prev,
//                   city: "",
//                 }));
//               }}
//             />

//             {errors.city && <p className={styles.error}>{errors.city}</p>}
//             <input
//               placeholder="Land"
//               value={country}
//               onChange={(e) => {
//                 setCountry(e.target.value);

//                 setErrors((prev) => ({
//                   ...prev,
//                   country: "",
//                 }));
//               }}
//             />

//             {errors.country && <p className={styles.error}>{errors.country}</p>}
//           </section>

//           {/* DELIVERY */}
//           <section className={styles.card}>
//             <h2>Leveringsmetode</h2>

//             {deliveryMethods.map((dm) => (
//               <label key={dm.id}>
//                 <input
//                   type="radio"
//                   checked={dm.id === deliveryMethod.id}
//                   onChange={() => setDeliveryMethod(dm)}
//                 />
//                 {dm.name} - {dm.price} kr.
//               </label>
//             ))}
//           </section>

//           {/* PICKUP */}
//           {["gls", "postnord", "bring"].includes(deliveryMethod.id) && (
//             <section className={styles.card}>
//               <h2>Vælg pakkeshop</h2>

//               {loadingPoints && <p>Finder pakkeshops...</p>}

//               {pickupPoints.map((p) => (
//                 <label key={p.id}>
//                   <input
//                     type="radio"
//                     checked={selectedPickup?.id === p.id}
//                     onChange={() => setSelectedPickup(p)}
//                   />
//                   {p.name}
//                   <br />
//                   {p.address}
//                 </label>
//               ))}
//             </section>
//           )}

//           {/* PAYMENT */}
//           <section className={styles.card}>
//             <h2>Betaling</h2>

//             <input
//               placeholder="Kortnummer"
//               value={cardNumber}
//               maxLength={19}
//               onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
//             />

//             {errors.cardNumber && (
//               <p className={styles.error}>{errors.cardNumber}</p>
//             )}
//             <input
//               placeholder="MM/ÅÅ"
//               value={cardExpiry}
//               maxLength={5}
//               onChange={(e) => setCardExpiry(formatCardExpiry(e.target.value))}
//             />

//             {errors.cardExpiry && (
//               <p className={styles.error}>{errors.cardExpiry}</p>
//             )}
//             <input
//               placeholder="CVV"
//               value={cardCvv}
//               onChange={(e) => setCardCvv(formatCvv(e.target.value))}
//             />

//             {errors.cardCvv && <p className={styles.error}>{errors.cardCvv}</p>}
//           </section>

//           <button className={styles.checkoutButton} onClick={handleCheckout}>
//             Gennemfør køb
//           </button>
//         </div>

//         <aside className={styles.summarySection}>
//           <h2>Din ordre</h2>

//           {cart.map((item) => (
//             <div key={item.id}>
//               {item.quantity}× {item.title}
//               <span>{item.price * item.quantity} kr.</span>
//             </div>
//           ))}

//           <hr />

//           <p>Subtotal: {subtotal.toFixed(2)} kr.</p>
//           <p>Levering: {deliveryMethod.price} kr.</p>

//           {selectedPickup && <p>Pakkeshop: {selectedPickup.name}</p>}

//           <h3>Total: {total.toFixed(2)} kr.</h3>
//         </aside>
//       </div>
//     </main>
//   );
// }
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useCart } from "./hooks/useCart";
import { usePickupPoints } from "./hooks/usePickupPoints";
import { useCheckout } from "./hooks/useCheckout";

import { CustomerForm } from "./components/CustomerForm";
import { AddressForm } from "./components/AddressForm";
import { DeliveryMethodSelector } from "./components/DeliveryMethodSelector";
import { PickupPointSelector } from "./components/PickupPointSelector";
import { PaymentForm } from "./components/PaymentForm";
import { OrderSummary } from "./components/OrderSummary";

import { deliveryMethods } from "./constants";
import {
  isValidEmail,
  isValidPhone,
  isValidPostalCode,
  isValidCardNumber,
  isValidCardExpiry,
  isValidCvv,
} from "./components/inputValidation";

import type {
  CustomerFormState,
  AddressFormState,
  PaymentFormState,
  DeliveryMethod,
} from "./types";

import styles from "./checkout.module.css";

type CheckoutErrors = {
  name?: string;
  email?: string;
  phone?: string;

  street?: string;
  postalCode?: string;
  city?: string;
  country?: string;

  cardNumber?: string;
  expiry?: string;
  cvv?: string;

  pickup?: string;
};

export default function CheckoutPage() {
  const router = useRouter();

  const cart = useCart();

  const [errors, setErrors] = useState<CheckoutErrors>({});

  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>(
    deliveryMethods[0],
  );

  const [customer, setCustomer] = useState<CustomerFormState>({
    name: "",
    email: "",
    phone: "",
  });

  const [address, setAddress] = useState<AddressFormState>({
    street: "",
    postalCode: "",
    city: "",
    country: "DK",
  });

  const [payment, setPayment] = useState<PaymentFormState>({
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const { points, loading, selected, setSelected } = usePickupPoints(
    address.street,
    deliveryMethod.id,
  );

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const shipping = deliveryMethod.price;
  const total = subtotal + shipping;

  // ======================
  // VALIDATE
  // ======================
  const validate = (): boolean => {
    const newErrors: CheckoutErrors = {};

    if (!customer.name.trim()) newErrors.name = "Indtast navn";

    if (!customer.email.trim()) {
      newErrors.email = "Indtast email";
    } else if (!isValidEmail(customer.email)) {
      newErrors.email = "Ugyldig email";
    }

    if (!customer.phone.trim()) {
      newErrors.phone = "Indtast telefon";
    } else if (!isValidPhone(customer.phone)) {
      newErrors.phone = "Telefon skal være 8 cifre";
    }

    if (!address.street.trim()) newErrors.street = "Indtast adresse";

    if (!address.postalCode.trim()) {
      newErrors.postalCode = "Indtast postnummer";
    } else if (!isValidPostalCode(address.postalCode)) {
      newErrors.postalCode = "Ugyldigt postnummer";
    }

    if (!address.city.trim()) newErrors.city = "Indtast by";

    if (!address.country.trim()) newErrors.country = "Indtast land";

    if (["gls", "postnord", "bring"].includes(deliveryMethod.id) && !selected) {
      newErrors.pickup = "Vælg en pakkeshop";
    }

    if (!isValidCardNumber(payment.cardNumber)) {
      newErrors.cardNumber = "Ugyldigt kortnummer";
    }

    if (!isValidCardExpiry(payment.expiry)) {
      newErrors.expiry = "Ugyldig udløbsdato";
    }

    if (!isValidCvv(payment.cvv)) {
      newErrors.cvv = "Ugyldig CVV";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // ======================
  // CHECKOUT
  // ======================
  const { submit } = useCheckout({
    cart,
    customer,
    address,
    payment,
    deliveryMethod,
    selectedPickup: selected,
    subtotal,
    shipping,
    total,
    onSuccess: (orderId: string) => {
      router.push(`/checkout/success/${orderId}`);
    },
  });

  const handleCheckout = async () => {
    const ok = validate();
    if (!ok) return;

    await submit();
  };

  return (
    <main className={styles.checkoutContainer}>
      <div className={styles.checkoutGrid}>
        {/* LEFT SIDE */}
        <div className={styles.formSection}>
          <CustomerForm
            value={customer}
            onChange={setCustomer}
            errors={{
              name: errors.name,
              email: errors.email,
              phone: errors.phone,
            }}
          />

          <AddressForm
            value={address}
            onChange={setAddress}
            errors={{
              street: errors.street,
              postalCode: errors.postalCode,
              city: errors.city,
              country: errors.country,
            }}
          />

          <DeliveryMethodSelector
            methods={deliveryMethods}
            selected={deliveryMethod}
            onChange={setDeliveryMethod}
          />

          <PickupPointSelector
            points={points}
            loading={loading}
            selected={selected}
            onSelect={setSelected}
            visible={["gls", "postnord", "bring"].includes(deliveryMethod.id)}
            error={errors.pickup}
          />

          <PaymentForm
            value={payment}
            onChange={setPayment}
            errors={{
              cardNumber: errors.cardNumber,
              expiry: errors.expiry,
              cvv: errors.cvv,
            }}
          />

          <button className={styles.checkoutButton} onClick={handleCheckout}>
            Gennemfør køb
          </button>
        </div>

        {/* RIGHT SIDE */}
        <aside className={styles.summarySection}>
          <OrderSummary
            cart={cart}
            subtotal={subtotal}
            shipping={shipping}
            total={total}
            pickup={selected}
          />
        </aside>
      </div>
    </main>
  );
}

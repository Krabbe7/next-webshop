// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// import { useCart } from "./hooks/useCart";
// import { usePickupPoints } from "./hooks/usePickupPoints";
// import { useCheckout } from "./hooks/useCheckout";

// import { CustomerForm } from "./components/CustomerForm";
// import { AddressForm } from "./components/AddressForm";
// import { DeliveryMethodSelector } from "./components/DeliveryMethodSelector";
// import { PickupPointSelector } from "./components/PickupPointSelector";
// import { PaymentForm } from "./components/PaymentForm";
// import { OrderSummary } from "./components/OrderSummary";

// import { deliveryMethods } from "./constants";
// import {
//   isValidEmail,
//   isValidPhone,
//   isValidPostalCode,
//   isValidCardNumber,
//   isValidCardExpiry,
//   isValidCvv,
// } from "./components/inputValidation";

// import type {
//   CheckoutErrors,
//   CustomerFormState,
//   AddressFormState,
//   PaymentFormState,
//   DeliveryMethod,
// } from "./types";

// import styles from "./checkout.module.css";

// export default function CheckoutPage() {
//   const router = useRouter();

//   const cart = useCart();

//   const [errors, setErrors] = useState<CheckoutErrors>({});

//   const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>(
//     deliveryMethods[0],
//   );

//   const [customer, setCustomer] = useState<CustomerFormState>({
//     name: "",
//     email: "",
//     phone: "",
//   });

//   const [address, setAddress] = useState<AddressFormState>({
//     street: "",
//     postalCode: "",
//     city: "",
//     country: "DK",
//   });

//   const [payment, setPayment] = useState<PaymentFormState>({
//     cardNumber: "",
//     expiry: "",
//     cvv: "",
//   });

//   const { points, loading, selected, setSelected } = usePickupPoints(
//     address.street,
//     deliveryMethod.id,
//   );

//   const subtotal = cart.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0,
//   );

//   const shipping = deliveryMethod.price;
//   const total = subtotal + shipping;

//   // ======================
//   // VALIDATE
//   // ======================
//   const validate = (): boolean => {
//     const newErrors: CheckoutErrors = {};

//     if (!customer.name.trim()) newErrors.name = "Indtast navn";

//     if (!customer.email.trim()) {
//       newErrors.email = "Indtast email";
//     } else if (!isValidEmail(customer.email)) {
//       newErrors.email = "Ugyldig email";
//     }

//     if (!customer.phone.trim()) {
//       newErrors.phone = "Indtast telefon";
//     } else if (!isValidPhone(customer.phone)) {
//       newErrors.phone = "Telefon skal være 8 cifre";
//     }

//     if (!address.street.trim()) newErrors.street = "Indtast adresse";

//     if (!address.postalCode.trim()) {
//       newErrors.postalCode = "Indtast postnummer";
//     } else if (!isValidPostalCode(address.postalCode)) {
//       newErrors.postalCode = "Ugyldigt postnummer";
//     }

//     if (!address.city.trim()) newErrors.city = "Indtast by";

//     if (!address.country.trim()) newErrors.country = "Indtast land";

//     if (["gls", "postnord", "bring"].includes(deliveryMethod.id) && !selected) {
//       newErrors.pickup = "Vælg en pakkeshop";
//     }

//     if (!isValidCardNumber(payment.cardNumber)) {
//       newErrors.cardNumber = "Ugyldigt kortnummer";
//     }

//     if (!isValidCardExpiry(payment.expiry)) {
//       newErrors.expiry = "Ugyldig udløbsdato";
//     }

//     if (!isValidCvv(payment.cvv)) {
//       newErrors.cvv = "Ugyldig CVV";
//     }

//     setErrors(newErrors);

//     return Object.keys(newErrors).length === 0;
//   };

//   // ======================
//   // CHECKOUT
//   // ======================
//   const { submit } = useCheckout({
//     cart,
//     customer,
//     address,
//     payment,
//     deliveryMethod,
//     selectedPickup: selected,
//     subtotal,
//     shipping,
//     total,
//     onSuccess: (orderId: string) => {
//       router.push(`/checkout/success/${orderId}`);
//     },
//   });

//   const handleCheckout = async () => {
//     const ok = validate();
//     if (!ok) return;

//     await submit();
//   };

//   return (
//     <main className={styles.checkoutContainer}>
//       <div className={styles.checkoutGrid}>
//         {/* LEFT SIDE */}
//         <div className={styles.formSection}>
//           <CustomerForm
//             value={customer}
//             onChange={setCustomer}
//             errors={{
//               name: errors.name,
//               email: errors.email,
//               phone: errors.phone,
//             }}
//           />

//           <AddressForm
//             value={address}
//             onChange={setAddress}
//             errors={{
//               street: errors.street,
//               postalCode: errors.postalCode,
//               city: errors.city,
//               country: errors.country,
//             }}
//           />

//           <DeliveryMethodSelector
//             methods={deliveryMethods}
//             selected={deliveryMethod}
//             onChange={setDeliveryMethod}
//           />

//           <PickupPointSelector
//             points={points}
//             loading={loading}
//             selected={selected}
//             onSelect={setSelected}
//             visible={["gls", "postnord", "bring"].includes(deliveryMethod.id)}
//             error={errors.pickup}
//           />

//           <PaymentForm
//             value={payment}
//             onChange={setPayment}
//             errors={{
//               cardNumber: errors.cardNumber,
//               expiry: errors.expiry,
//               cvv: errors.cvv,
//             }}
//           />

//           <button className={styles.checkoutButton} onClick={handleCheckout}>
//             Gennemfør køb
//           </button>
//         </div>

//         {/* RIGHT SIDE */}
//         <aside className={styles.summarySection}>
//           <OrderSummary
//             cart={cart}
//             subtotal={subtotal}
//             shipping={shipping}
//             total={total}
//             pickup={selected}
//           />
//         </aside>
//       </div>
//     </main>
//   );
// }
"use client";

import { useRouter } from "next/navigation";

import { CustomerForm } from "./components/CustomerForm";
import { AddressForm } from "./components/AddressForm";
import { DeliveryMethodSelector } from "./components/DeliveryMethodSelector";
import { PickupPointSelector } from "./components/PickupPointSelector";
import { PaymentForm } from "./components/PaymentForm";
import { OrderSummary } from "./components/OrderSummary";

import { deliveryMethods } from "./constants";

import { useCart } from "./hooks/useCart";
import { useCheckout } from "./hooks/useCheckout";
import { useCheckoutForm } from "./hooks/useCheckoutForm";
import { useCheckoutValidation } from "./hooks/useCheckoutValidation";
import { useOrderTotals } from "./hooks/useOrderTotals";
import { usePickupPoints } from "./hooks/usePickupPoints";

import styles from "./checkout.module.css";

export default function CheckoutPage() {
  const router = useRouter();

  // Cart
  const cart = useCart();

  // Form state
  const {
    customer,
    setCustomer,

    address,
    setAddress,

    payment,
    setPayment,

    deliveryMethod,
    setDeliveryMethod,

    errors,
    setErrors,
  } = useCheckoutForm();

  // Pickup points
  const { points, loading, selected, setSelected } = usePickupPoints(
    address.street,
    deliveryMethod.id,
  );

  // Prices
  const { subtotal, shipping, total } = useOrderTotals(cart, deliveryMethod);

  // Validation
  const { validate } = useCheckoutValidation({
    customer,
    address,
    payment,
    deliveryMethod,
    selectedPickup: selected,
    setErrors,
  });

  // Checkout
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
    if (!validate()) return;

    await submit();
  };

  return (
    <main className={styles.checkoutContainer}>
      <div className={styles.checkoutGrid}>
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
            visible={["gls", "postnord", "bring"].includes(deliveryMethod.id)}
            points={points}
            loading={loading}
            selected={selected}
            onSelect={setSelected}
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

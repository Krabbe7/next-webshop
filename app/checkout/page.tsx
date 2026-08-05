"use client";

import { useRouter } from "next/navigation";

import { CustomerForm } from "./components/CustomerForm";
import { AddressForm } from "./components/AddressForm";
import { ShippingSelector } from "./components/shippingSelector";
import { PickupPointSelector } from "./components/PickupPointSelector";
import { PaymentForm } from "./components/PaymentForm";
import { OrderSummary } from "./components/OrderSummary";

import { shippingMethods } from "./constants";

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

    shipping,
    setShipping,

    errors,
    setErrors,
  } = useCheckoutForm();

  // Pickup points
  const { points, loading, selected, setSelected } = usePickupPoints(
    address.street,
    shipping.id,
  );

  // Prices
  const {
    subtotal,
    shipping: shippingPrice,
    total,
  } = useOrderTotals(cart, shipping);

  // Validation
  const { validate } = useCheckoutValidation({
    customer,
    address,
    payment,
    shipping,
    selectedPickup: selected,
    setErrors,
  });

  // Checkout
  const { submit } = useCheckout({
    cart,
    customer,
    address,
    payment,
    shipping,
    selectedPickup: selected,
    subtotal,
    shippingPrice,
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

          <ShippingSelector
            methods={shippingMethods}
            selected={shipping}
            onChange={setShipping}
          />

          <PickupPointSelector
            visible={["gls", "postnord", "bring"].includes(shipping.id)}
            points={points}
            loading={loading}
            selected={selected}
            onSelect={setSelected}
            error={errors.pickup}
            address={address.street}
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
            shipping={shippingPrice}
            total={total}
            pickup={selected}
          />
        </aside>
      </div>
    </main>
  );
}

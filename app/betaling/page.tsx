"use client";

import { useRouter } from "next/navigation";

import { CustomerForm } from "./components/customerForm/CustomerForm";
import { AddressForm } from "./components/addressForm/AddressForm";
import { ShippingSelector } from "./components/shippingSelector/shippingSelector";
import { PickupPointSelector } from "./components/pickUpPointSelector/PickupPointSelector";
import { PaymentForm } from "./components/paymentForm/PaymentForm";
import { OrderSummary } from "./components/orderSummary/OrderSummary";

import { useEffect, useMemo } from "react";
import { useCart } from "../kurv/hooks/useCart";
import { useCheckout } from "./hooks/useCheckout/useCheckout";
import { useCheckoutForm } from "./hooks/useCheckoutForm";
import { useCheckoutValidation } from "./hooks/useCheckoutValidation/useCheckoutValidation";
import { useOrderTotals } from "./hooks/useOrderTotals";
import { usePickupPoints } from "./hooks/usePickupPoints";
import { useShippingMethods } from "./hooks/useShipping/useShipping";

import styles from "./checkout.module.css";

export default function CheckoutPage() {
  const router = useRouter();

  const { cart, clearCart } = useCart();

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

  const {
    methods: shippingMethods,
    loading: shippingLoading,
    error: shippingError,
  } = useShippingMethods();

  useEffect(() => {
    if (shippingMethods.length === 0) return;

    const match =
      shippingMethods.find((m) => m.id === shipping.id) ?? shippingMethods[0];

    if (
      match.id !== shipping.id ||
      match.price !== shipping.price ||
      match.name !== shipping.name
    ) {
      setShipping(match);
    }
  }, [shippingMethods]);

  const fullAddress = useMemo(() => {
    const street = address.street.trim();
    const postalCode = address.postalCode.trim();
    const city = address.city.trim();

    if (street.length < 3 || postalCode.length !== 4 || !city) return "";

    return `${street}, ${postalCode} ${city}`;
  }, [address.street, address.postalCode, address.city]);

  const { points, loading, selected, setSelected } = usePickupPoints(
    fullAddress,
    shipping.id,
  );

  const {
    subtotal,
    shipping: shippingPrice,
    total,
  } = useOrderTotals(cart, shipping);

  const { validate } = useCheckoutValidation({
    customer,
    address,
    payment,
    shipping,
    selectedPickup: selected,
    setErrors,
  });

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
    onSuccess: async (orderId: string) => {
      await clearCart();
      router.push(`/betaling/success/${orderId}`);
    },
  });

  const handleCheckout = async () => {
    if (!validate()) return;

    await submit();
  };

  return (
    <div className="pageContainer">
      <h1 className="pageTitle">Betaling</h1>

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

          {shippingLoading && <p>Henter fragtmetoder...</p>}
          {shippingError && <p className={styles.error}>{shippingError}</p>}

          <ShippingSelector
            methods={shippingMethods}
            selected={shipping}
            onChange={setShipping}
          />

          <PickupPointSelector
            points={points}
            loading={loading}
            selected={selected}
            onSelect={setSelected}
            error={errors.pickup}
            address={fullAddress}
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
        </div>

        <aside className={styles.summarySection}>
          <OrderSummary
            cart={cart}
            subtotal={subtotal}
            shipping={shippingPrice}
            total={total}
            pickup={selected}
            onCheckout={handleCheckout}
          />
        </aside>
      </div>
    </div>
  );
}

"use client";

import { useRouter } from "next/navigation";

import { CustomerForm } from "./components/customerForm/CustomerForm";
import { AddressForm } from "./components/addressForm/AddressForm";
import { ShippingSelector } from "./components/shippingSelector/shippingSelector";
import { PickupPointSelector } from "./components/pickUpPointSelector/PickupPointSelector";
import { PaymentForm } from "./components/paymentForm/PaymentForm";
import { OrderSummary } from "./components/orderSummary/OrderSummary";

import { shippingMethods } from "./shippingMethods";
import { useMemo } from "react";
import { useCart } from "../kurv/hooks/useCart";
import { useCheckout } from "./hooks/useCheckout/useCheckout";
import { useCheckoutForm } from "./hooks/useCheckoutForm";
import { useCheckoutValidation } from "./hooks/useCheckoutValidation/useCheckoutValidation";
import { useOrderTotals } from "./hooks/useOrderTotals";
import { usePickupPoints } from "./hooks/usePickupPoints";

import styles from "./checkout.module.css";

export default function CheckoutPage() {
  const router = useRouter();

  // Cart
  const { cart } = useCart();

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

  const fullAddress = useMemo(() => {
    const street = address.street.trim();
    const postalCode = address.postalCode.trim();
    const city = address.city.trim();

    if (street.length < 3 || postalCode.length !== 4 || !city) return "";

    return `${street}, ${postalCode} ${city}`;
  }, [address.street, address.postalCode, address.city]);

  // Pickup points
  const { points, loading, selected, setSelected } = usePickupPoints(
    fullAddress,
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

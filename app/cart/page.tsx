"use client";

import { useCart } from "./hooks/usecart";
import { useRemoveFromCart } from "./hooks/useRemoveFromCart";
import CartList from "./components/CartList";
import CartSummary from "./components/CartSummary";
import styles from "./cartPage.module.css";
export default function CartPage() {
  const { cart, loading } = useCart();
  const { remove } = useRemoveFromCart();

  if (loading) return <p>Indlæser...</p>;

  return (
    <main className={styles.cartContainer}>
      <h1>Kurv</h1>
      <div className={styles.cartGrid}>
        <div className={styles.cartListContainer}>
          <CartList cart={cart} onRemove={remove} />
        </div>
        <CartSummary cart={cart} />
      </div>
    </main>
  );
}

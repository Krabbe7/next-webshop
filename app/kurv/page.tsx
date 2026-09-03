"use client";

import { useCart } from "./hooks/useCart";
import { useRemoveFromCart } from "./hooks/useRemoveFromCart";
import CartList from "./components/cartList/CartList";
import CartSummary from "./components/cartSummary/CartSummary";
import styles from "./cartPage.module.css";
export default function CartPage() {
  const { cart, loading } = useCart();
  const { remove } = useRemoveFromCart();

  if (loading) return <p>Indlæser...</p>;

  return (
    <div className="pageContainer">
      <h1 className="pageTitle">Kurv</h1>
      <div className={styles.cartGrid}>
        <div className={styles.cartListContainer}>
          <CartList cart={cart} onRemove={remove} />
        </div>
        <CartSummary cart={cart} />
      </div>
    </div>
  );
}

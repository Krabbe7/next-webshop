"use client";

import Link from "next/link";

import styles from "../cartPage.module.css";

import type { CartItem } from "../types";

type Props = {
  cart: CartItem[];
};

export default function CartSummary({ cart }: Props) {
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <aside className={styles.summary}>
      <h2>Ordresammendrag</h2>

      <div className={styles.summaryRow}>
        <span>Varer</span>

        <span>{cart.length}</span>
      </div>

      <div className={styles.summaryRow}>
        <span>Subtotal</span>

        <span>{subtotal} kr.</span>
      </div>

      <div className={styles.summaryRow}>
        <span>Fragt</span>

        <span>Beregnes ved checkout</span>
      </div>

      <div className={styles.totalRow}>
        <span>Total</span>

        <span>{subtotal} kr.</span>
      </div>

      <Link href="/checkout" className={styles.checkoutButton}>
        Gå til checkout
      </Link>
    </aside>
  );
}

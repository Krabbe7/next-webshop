"use client";

import Link from "next/link";

import styles from "../../cartPage.module.css";

import type { PropsCartSummary } from "../../types";

export default function CartSummary({ cart }: PropsCartSummary) {
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <aside className={styles.summary}>
      <h2>Opsummering</h2>

      <div className={styles.summaryRow}>
        <span>Varer</span>

        <span>{cart.reduce((sum, item) => sum + item.quantity, 0)}</span>
      </div>

      <div className={styles.summaryRow}>
        <span>Subtotal</span>

        <span>{subtotal} kr.</span>
      </div>

      <div className={styles.totalRow}>
        <span>Total</span>

        <span>{subtotal} kr.</span>
      </div>
      <div className="centerButtonContainer">
        <Link
          href="/betaling"
          className={`button ${cart.length === 0 ? "disabled" : ""}`}
          aria-disabled={cart.length === 0}
          onClick={(e) => {
            if (cart.length === 0) {
              e.preventDefault();
            }
          }}
        >
          Gå til betaling
        </Link>
      </div>
    </aside>
  );
}

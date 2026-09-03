"use client";

import Link from "next/link";

import styles from "./emptyCart.module.css";

export default function EmptyCart() {
  return (
    <section className={styles.empty}>
      <h2>Din kurv er tom</h2>

      <p>Du har endnu ikke tilføjet nogle produkter.</p>

      <Link href="/products" className="button">
        Gå til produkter
      </Link>
    </section>
  );
}

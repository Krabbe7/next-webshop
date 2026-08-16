"use client";

import Link from "next/link";

import styles from "../cartPage.module.css";

export default function EmptyCart() {
  return (
    <section className={styles.empty}>
      <h2>Din kurv er tom</h2>

      <p>Du har endnu ikke tilføjet nogle produkter.</p>

      <Link href="/products" className={styles.shopButton}>
        Gå til produkter
      </Link>
    </section>
  );
}

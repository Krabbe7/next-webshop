"use client";

import Link from "next/link";
import styles from "./adminPage.module.css";

export default function AdminPage() {
  return (
    <main className={styles.container}>
      <h1>Admin Panel</h1>

      <div className={styles.cards}>
        <Link href="/admin/edit-games" className={styles.card}>
          🎮 Administrer spil
        </Link>

        <Link href="/admin/edit-delivery-methods" className={styles.card}>
          🚚 Administrer leveringsmetoder
        </Link>
      </div>
    </main>
  );
}

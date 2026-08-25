"use client";

import Link from "next/link";
import styles from "./adminPage.module.css";

export default function AdminPage() {
  return (
    <main className={styles.container}>
      <div className={styles.header}>
        <h1 className="title">Admin Dashboard</h1>
      </div>

      <section className={styles.cards}>
        <Link href="/admin/games" className={styles.card}>
          <div className={styles.icon}>🎮</div>

          <h2>Spil</h2>

          <p>Opret, rediger og slet spil i webshoppen.</p>

          <span className={styles.button}>Administrer →</span>
        </Link>

        <Link href="/admin/shipping" className={styles.card}>
          <div className={styles.icon}>🚚</div>

          <h2>Leveringsmetoder</h2>

          <p>Opret, rediger og slet leveringsmetoder.</p>

          <span className={styles.button}>Administrer →</span>
        </Link>

        <Link href="/admin/employees" className={styles.card}>
          <div className={styles.icon}>🚚</div>

          <h2>Ansatte</h2>

          <p>Opret, rediger og slet ansatte.</p>

          <span className={styles.button}>Administrer →</span>
        </Link>
      </section>
    </main>
  );
}

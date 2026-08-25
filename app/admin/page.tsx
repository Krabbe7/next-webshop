"use client";

import Link from "next/link";
import { FaGamepad, FaTruck, FaUsers, FaArrowRight } from "react-icons/fa";

import styles from "./adminPage.module.css";

export default function AdminPage() {
  return (
    <div className="pageContainer">
      <div className={styles.header}>
        <h1 className="pageTitle">Admin Dashboard</h1>
      </div>

      <section className={styles.cards}>
        <Link href="/admin/games" className={styles.card}>
          <div className={styles.icon}>
            <FaGamepad />
          </div>

          <h2>Spil</h2>

          <p>Opret, rediger og slet spil i webshoppen.</p>

          <span className={styles.button}>
            Administrer <FaArrowRight />
          </span>
        </Link>

        <Link href="/admin/shipping" className={styles.card}>
          <div className={styles.icon}>
            <FaTruck />
          </div>

          <h2>Leveringsmetoder</h2>

          <p>Opret, rediger og slet leveringsmetoder.</p>

          <span className={styles.button}>
            Administrer <FaArrowRight />
          </span>
        </Link>

        <Link href="/admin/employees" className={styles.card}>
          <div className={styles.icon}>
            <FaUsers />
          </div>

          <h2>Ansatte</h2>

          <p>Opret, rediger og slet ansatte.</p>

          <span className={styles.button}>
            Administrer <FaArrowRight />
          </span>
        </Link>
      </section>
    </div>
  );
}

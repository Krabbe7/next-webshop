"use client";

import Link from "next/link";

import styles from "./featuredProducts.module.css";

import { useFeaturedProducts } from "./hooks/useFeaturedProducts";
import ProductGrid from "../../produkter/components/ProductGrid";

export default function FeaturedProducts() {
  const { games, loading } = useFeaturedProducts();

  return (
    <section className={styles.featured}>
      <div className={styles.header}>
        <div>
          <p className={styles.eyebrow}>PIXELVAULT</p>

          <h2>Populære spil</h2>

          <p className={styles.description}>
            Se de bedst ratede spil hos Pixelvault.
          </p>
        </div>

        <Link href="/produkter/spil" className={styles.viewAll}>
          Se alle produkter →
        </Link>
      </div>

      {loading ? <p>Henter populære spil...</p> : <ProductGrid games={games} />}
    </section>
  );
}

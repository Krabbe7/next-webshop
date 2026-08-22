"use client";

import Link from "next/link";

import styles from "./featuredProducts.module.css";

import { useFeaturedProducts } from "./hooks/useFeaturedProducts";
import ProductGrid from "@/app/produkter/components/productGrid/ProductGrid";

export default function FeaturedProducts() {
  const { games, loading } = useFeaturedProducts();

  return (
    <section className={styles.featured}>
      <h2 className={styles.featuredTitle}>Populære spil</h2>

      {loading ? <p>Henter populære spil...</p> : <ProductGrid games={games} />}

      <Link href="/produkter/spil" className="button">
        Se alle produkter
      </Link>
    </section>
  );
}

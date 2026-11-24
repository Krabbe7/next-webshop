import Link from "next/link";

import ProductGrid from "./components/productGrid/ProductGrid";

import styles from "./products.module.css";

import type { Game, Category } from "./types";

export default async function ProdukterPage() {
  const [categoriesResponse, gamesResponse] = await Promise.all([
    fetch("http://localhost:5000/api/productCategories"),
    fetch("http://localhost:5000/api/games"),
  ]);

  if (!categoriesResponse.ok || !gamesResponse.ok) {
    throw new Error("Kunne ikke hente produkter og kategorier");
  }

  const categories: Category[] = await categoriesResponse.json();
  const games: Game[] = await gamesResponse.json();

  return (
    <div className="pageContainer">
      <h1 className="pageTitle">Produkter</h1>

      {categories.map((category) => {
        const categoryProducts = games
          .filter((game) => game.category_id === Number(category.id))
          .slice(0, 5);

        if (categoryProducts.length === 0) return null;

        return (
          <section key={category.id} className={styles.categorySection}>
            <div className={styles.categorySectionHeader}>
              <h2 className="header">{category.name}</h2>
            </div>

            <ProductGrid games={categoryProducts} />

            <button className="button">
              <Link
                href={`/produkter/${category.slug}`}
                className={styles.categoryMoreButton}
              >
                Se alle {category.name.toLowerCase()}
              </Link>
            </button>
          </section>
        );
      })}
    </div>
  );
}

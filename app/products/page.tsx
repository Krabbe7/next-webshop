import ProductSearch from "./components/ProductSearch";
import styles from"./products.module.css";

export async function getGames() {
  const res = await fetch("http://localhost:5000/api/games", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch games");
  }

  return res.json();
}

export default async function ProductsPage() {
  const games = await getGames();

  return (
    <main className={styles.productPage_Container}>
      <ProductSearch games={games} />
    </main>
  );
}

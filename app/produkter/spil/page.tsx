import ProductSearch from "../components/productSearch/ProductSearch";
import styles from "../products.module.css";

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
    <div className="pageContainer">
      <h1 className="pageTitle">Spil</h1>
      <ProductSearch games={games} />
    </div>
  );
}

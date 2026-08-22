import styles from "./productGrid.module.css";

import ProductCard from "../productCard/ProductCard";
import { PropsProductGrid } from "./types";

export default function ProductGrid({ games }: PropsProductGrid) {
  return (
    <div className={styles.gamesGrid}>
      {games.map((game) => (
        <ProductCard key={game.id} game={game} />
      ))}
    </div>
  );
}

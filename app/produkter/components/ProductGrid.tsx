import styles from "../products.module.css";

import ProductCard from "./ProductCard";

import type { Game } from "../types";

type Props = {
  games: Game[];
};

export default function ProductGrid({ games }: Props) {
  return (
    <div className={styles.gamesGrid}>
      {games.map((game) => (
        <ProductCard key={game.id} game={game} />
      ))}
    </div>
  );
}

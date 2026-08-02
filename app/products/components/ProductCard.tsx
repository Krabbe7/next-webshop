import Link from "next/link";
import Image from "next/image";

import AddToCartButton from "../../components/addToCartButton/addToCartButton";
import FavoriteButton from "./favorite/favoriteButtonComponent";

import styles from "../products.module.css";

import type { Game } from "../types";

type Props = {
  game: Game;
  onFavoriteRemove?: (id: number) => void;
};

export default function ProductCard({ game, onFavoriteRemove }: Props) {
  return (
    <Link href={`/game/${game.id}`} className={styles.cardLink}>
      <div className={styles.card}>
        <div className={styles.imageWrapper}>
          <FavoriteButton
            gameId={game.id}
            onToggle={(isFavorite) => {
              if (!isFavorite) {
                onFavoriteRemove?.(game.id);
              }
            }}
          />

          {game.image_url ? (
            <Image
              src={game.image_url}
              alt={game.title}
              width={400}
              height={500}
              className={styles.image}
            />
          ) : (
            <div className={styles.noImage}>No image available</div>
          )}
        </div>

        <div className={styles.content}>
          <h3 className={styles.gameTitle}>{game.title}</h3>

          <p className={styles.meta}>{game.genre}</p>

          <p className={styles.meta}>{game.platform}</p>

          <p className={styles.price}>{game.price} kr.</p>

          <AddToCartButton game={game} />
        </div>
      </div>
    </Link>
  );
}

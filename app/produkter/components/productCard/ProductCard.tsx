"use client";
import Link from "next/link";
import Image from "next/image";

import AddToCartButton from "../../../components/addToCartButton/addToCartButton";
import FavoriteButton from "../favorite/favoriteButtonComponent";

import styles from "./productCard.module.css";
import { PropsProductCard } from "./types";

export default function ProductCard({
  game,
  onFavoriteRemove,
}: PropsProductCard) {
  const genres = game.genres ?? [];
  const platforms = game.platforms ?? [];

  return (
    <Link href={`/produkter/spil/${game.id}`} className={styles.cardLink}>
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

          {genres.length > 0 && (
            <div className={styles.tags}>
              {genres.map((genre) => (
                <span key={genre.id} className={styles.tag}>
                  {genre.name}
                </span>
              ))}
            </div>
          )}

          {platforms.length > 0 && (
            <div className={styles.tags}>
              {platforms.map((platform) => (
                <span key={platform.id} className={styles.tag}>
                  {platform.name}
                </span>
              ))}
            </div>
          )}

          <p className={styles.price}>{game.price} kr.</p>

          <div className="centerButtonContainer">
            <div className={styles.productAction}>
              {game.stock === 0 ? (
                <div className={styles.noStock}>Ikke på lager</div>
              ) : (
                <AddToCartButton game={game} />
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

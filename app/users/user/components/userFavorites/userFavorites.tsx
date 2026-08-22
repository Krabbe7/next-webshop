"use client";

import { useEffect, useState } from "react";

import ProductCard from "@/app/produkter/components/productCard/ProductCard";

import { useFavorites } from "../../hooks/favoriteHook/useFavorite";

import styles from "./favoriteList.module.css";

export default function FavoriteList() {
  const { favorites, loading } = useFavorites();

  const [favoriteGames, setFavoriteGames] = useState(favorites);

  useEffect(() => {
    setFavoriteGames(favorites);
  }, [favorites]);

  function handleRemoveFavorite(gameId: number) {
    setFavoriteGames((current) => current.filter((game) => game.id !== gameId));
  }

  if (loading) {
    return <p className={styles.loading}>Indlæser...</p>;
  }

  if (favoriteGames.length === 0) {
    return <p className={styles.empty}>Du har ingen favoritter endnu.</p>;
  }

  return (
    <section className={styles.container}>
      <h2 className={styles.favoriteTitle}>Mine favoritter</h2>

      <div className={styles.gamesGrid}>
        {favoriteGames.map((game) => (
          <ProductCard
            key={game.id}
            game={game}
            onFavoriteRemove={handleRemoveFavorite}
          />
        ))}
      </div>
    </section>
  );
}

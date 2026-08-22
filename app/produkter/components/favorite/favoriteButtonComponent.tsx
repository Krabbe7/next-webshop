"use client";

import { FaHeart, FaRegHeart } from "react-icons/fa";

import styles from "./favoriteButton.module.css";

import { useFavorite } from "./hooks/useFavorite";
import { PropsFavorite } from "./types";

export default function FavoriteButton({ gameId, onToggle }: PropsFavorite) {
  const { favorite, loading, toggleFavorite } = useFavorite(gameId);

  if (loading) return null;

  async function handleToggle() {
    await toggleFavorite();

    onToggle?.(!favorite);
  }

  return (
    <button
      className={styles.button}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleToggle();
      }}
    >
      {favorite ? <FaHeart className={styles.active} /> : <FaRegHeart />}
    </button>
  );
}

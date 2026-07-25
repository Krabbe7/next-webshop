"use client";

import { FaHeart, FaRegHeart } from "react-icons/fa";

import styles from "./favoriteButton.module.css";

import { useFavorite } from "../../hooks/favoriteHook/useFavorite";

type Props = {
  gameId: number;
};

export default function FavoriteButton({ gameId }: Props) {
  const { favorite, loading, toggleFavorite } = useFavorite(gameId);

  if (loading) return null;

  return (
    <button
      className={styles.button}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite();
      }}
    >
      {favorite ? <FaHeart className={styles.active} /> : <FaRegHeart />}
    </button>
  );
}

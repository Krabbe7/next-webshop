"use client";

import { useEffect, useState } from "react";

export function useFavorite(gameId: number) {
  const [favorite, setFavorite] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFavorite();
  }, [gameId]);

  async function loadFavorite() {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    const res = await fetch(`http://localhost:5000/api/favorites/${gameId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      setLoading(false);
      return;
    }

    const data = await res.json();

    setFavorite(data.favorite);
    setLoading(false);
  }

  async function toggleFavorite() {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Du skal være logget ind.");
      return;
    }

    if (favorite) {
      await fetch(`http://localhost:5000/api/favorites/${gameId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFavorite(false);
    } else {
      await fetch(`http://localhost:5000/api/favorites/${gameId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFavorite(true);
    }
  }

  return {
    favorite,
    loading,
    toggleFavorite,
  };
}

"use client";

import { useCallback, useEffect, useState } from "react";
import type { FavoriteGame } from "../../types";

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteGame[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFavorites = useCallback(async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/favorites/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Kunne ikke hente favoritter");
      }

      const data: FavoriteGame[] = await res.json();

      setFavorites(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  return {
    favorites,
    loading,
    refetch: fetchFavorites,
  };
}

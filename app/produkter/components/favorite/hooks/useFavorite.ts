"use client";

import { useEffect, useState } from "react";

export function useFavorite(gameId: number) {
  const [favorite, setFavorite] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadFavorite() {
      setLoading(true);

      try {
        const res = await fetch(
          `http://localhost:5000/api/favorites/${gameId}`,
          { credentials: "include" },
        );

        if (!res.ok) {
          console.error("Kunne ikke hente favorit:", res.status);
          return;
        }

        const data = await res.json();

        if (!cancelled) {
          setFavorite(data.favorite);
        }
      } catch (error) {
        console.error("Fejl ved hentning af favorit:", error);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadFavorite();

    return () => {
      cancelled = true;
    };
  }, [gameId]);

  async function toggleFavorite() {
    try {
      const res = await fetch(`http://localhost:5000/api/favorites/${gameId}`, {
        method: favorite ? "DELETE" : "POST",
        credentials: "include",
      });

      if (!res.ok) {
        console.error("Kunne ikke ændre favorit:", res.status);
        return;
      }

      setFavorite(!favorite);
    } catch (error) {
      console.error("Fejl ved ændring af favorit:", error);
    }
  }

  return {
    favorite,
    loading,
    toggleFavorite,
  };
}

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

        if (cancelled) return;

        if (!res.ok) {
          setFavorite(false);
          return;
        }

        const data = await res.json();

        if (!cancelled) {
          setFavorite(Boolean(data.favorite));
        }
      } catch (error) {
        console.error("Fejl ved hentning af favorit:", error);
        if (!cancelled) setFavorite(false);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadFavorite();

    window.addEventListener("authChanged", loadFavorite);

    return () => {
      cancelled = true;
      window.removeEventListener("authChanged", loadFavorite);
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

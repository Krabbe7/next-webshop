"use client";

import { useEffect, useState } from "react";

export function useGetUserRating(gameId: number) {
  const [rating, setRating] = useState<number | null>(null);

  useEffect(() => {
    async function load() {
      const res = await fetch(`http://localhost:5000/api/rating/${gameId}/me`, {
        credentials: "include",
      });

      if (!res.ok) return;

      const data = await res.json();

      setRating(data?.rating ?? null);
    }

    load();
  }, [gameId]);

  return {
    rating,
    setRating,
  };
}

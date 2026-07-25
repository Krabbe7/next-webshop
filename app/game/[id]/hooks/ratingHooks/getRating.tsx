"use client";

import { useCallback, useEffect, useState } from "react";

type Rating = {
  average: number | null;
  total: number;
};

export function useGetRating(gameId: number) {
  const [rating, setRating] = useState<Rating | null>(null);

  const [loading, setLoading] = useState(true);

  const fetchRating = useCallback(async () => {
    try {
      setLoading(true);

      const res = await fetch(`http://localhost:5000/api/rating/${gameId}`);

      const data = await res.json();

      setRating({
        average: data.average ? Number(data.average) : null,
        total: Number(data.total),
      });
    } finally {
      setLoading(false);
    }
  }, [gameId]);

  useEffect(() => {
    fetchRating();
  }, [fetchRating]);

  return {
    rating,
    loading,
    refetch: fetchRating,
  };
}

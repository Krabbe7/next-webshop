import { useEffect, useState } from "react";
import type { PickupPoint } from "../types";

export function usePickupPoints(
  address: string,
  providerId: number, // ÆNDRET: tal-id fra databasen
) {
  const [points, setPoints] = useState<PickupPoint[]>([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<PickupPoint | null>(null);

  useEffect(() => {
    if (!address || address.length < 5) {
      setPoints([]);
      setSelected(null);
      return;
    }

    const timeout = setTimeout(async () => {
      setLoading(true);

      try {
        const res = await fetch(
          "http://localhost:5000/api/shipping/pickup-points",
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ address, provider: providerId }), // ÆNDRET
          },
        );

        const data = await res.json();

        setPoints(data.points || []);
        setSelected(null);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(timeout);
  }, [address, providerId]); // ÆNDRET

  return { points, loading, selected, setSelected };
}

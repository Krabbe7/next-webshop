import { useEffect, useState } from "react";
import type { PickupPoint } from "../types";

export function usePickupPoints(address: string, provider: string) {
  const [points, setPoints] = useState<PickupPoint[]>([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<PickupPoint | null>(null);

  useEffect(() => {
    const isPickup = ["gls", "postnord", "bring"].includes(provider);

    if (!isPickup || !address || address.length < 5) return;

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
            body: JSON.stringify({ address, provider }),
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
  }, [address, provider]);

  return { points, loading, selected, setSelected };
}

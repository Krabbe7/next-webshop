import { useEffect, useState } from "react";
import type { Shipping } from "../../types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

export function useShippingMethods() {
  const [methods, setMethods] = useState<Shipping[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch(`${API_URL}/api/shipping`);

        if (!res.ok) throw new Error(`Shipping API fejl: ${res.status}`);

        const rows = await res.json();

        if (cancelled) return;

        setMethods(
          rows.map((row: any) => ({
            id: row.id,
            name: row.name,
            price: Number(row.price),
          })),
        );
      } catch (err) {
        if (cancelled) return;

        console.error("Fejl ved hentning af fragtmetoder:", err);
        setError("Fragtmetoder kunne ikke hentes.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  return { methods, loading, error };
}

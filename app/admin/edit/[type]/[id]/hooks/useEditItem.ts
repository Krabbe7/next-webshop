"use client";

import { useEffect, useState } from "react";
import type { FormData } from "@/app/admin/types";
import type { EditConfig } from "../types";

export function useEditItem(config: EditConfig | undefined, id: string) {
  const [item, setItem] = useState<FormData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!config) return;

    const load = async () => {
      setLoading(true);

      const res = await fetch(`http://localhost:5000/api/${config.api}/${id}`);

      const data = await res.json();

      console.log("EDIT DATA:", data);

      setItem(data);
      setLoading(false);
    };

    load();
  }, [config, id]);

  return { item, setItem, loading };
}

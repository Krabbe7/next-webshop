"use client";

import { useRouter } from "next/navigation";
import type { FormData, EditConfig } from "../types";

type Props = {
  config: EditConfig;
  item: FormData;
  id: string;
  type: string;
};

export function useEditSubmit({ config, item, id, type }: Props) {
  const router = useRouter();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    await fetch(`http://localhost:5000/api/${config.api}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(token && {
          Authorization: `Bearer ${token}`,
        }),
      },
      body: JSON.stringify(item),
    });

    router.push(`/admin/${type}`);
  };

  return { submit };
}

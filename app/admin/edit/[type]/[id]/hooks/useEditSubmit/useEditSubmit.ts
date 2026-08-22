"use client";

import { useRouter } from "next/navigation";
import { PropsUseEditSubmit } from "./types";

export function useEditSubmit({ config, item, id, type }: PropsUseEditSubmit) {
  const router = useRouter();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    await fetch(`http://localhost:5000/api/${config.api}/${id}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });

    router.push(`/admin/${type}`);
  };

  return { submit };
}

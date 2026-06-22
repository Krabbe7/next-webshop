"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import editConfig from "./editConfig";
export default function EditPage({
  params,
}: {
  params: Promise<{
    type: string;
    id: string;
  }>;
}) {
  const { type, id } = use(params);

  const router = useRouter();

  const [item, setItem] = useState<any>(null);

  const config = editConfig[type as keyof typeof editConfig];

  useEffect(() => {
    async function loadItem() {
      const res = await fetch(`http://localhost:5000/api/${config.api}/${id}`);

      const data = await res.json();

      setItem(data);
    }

    loadItem();
  }, [id, type]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItem({
      ...item,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    await fetch(`http://localhost:5000/api/${config.api}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(item),
    });

    router.push(`/admin/${type}`);
  };

  if (!item) {
    return <p>Loading...</p>;
  }

  return (
    <main>
      <h1>Rediger</h1>

      <form onSubmit={handleSave}>
        {config.fields.map((field) => (
          <input
            key={field}
            name={field}
            value={item[field] ?? ""}
            onChange={handleChange}
            placeholder={field}
          />
        ))}

        <button type="submit">Gem ændringer</button>
      </form>
    </main>
  );
}

"use client";

import { use } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import createConfig from "./createConfig";

export default function CreatePage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = use(params);

  const config = createConfig[type as keyof typeof createConfig];

  const router = useRouter();

  const [formData, setFormData] = useState<any>({});

  if (!config) {
    return <h1>Ukendt type</h1>;
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    await fetch(`http://localhost:5000/api/${config.api}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    router.push(`/admin/${type}`);
  };

  return (
    <main style={{ padding: "2rem" }}>
      <h1>{config.createTitle}</h1>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          maxWidth: "600px",
        }}
      >
        {config.fields.map((field) => (
          <div key={field}>
            {field === "description" ? (
              <textarea
                name={field}
                placeholder={field}
                value={formData[field] || ""}
                onChange={handleChange}
              />
            ) : (
              <input
                name={field}
                placeholder={field}
                value={formData[field] || ""}
                onChange={handleChange}
              />
            )}
          </div>
        ))}

        <button type="submit">Opret</button>
      </form>
    </main>
  );
}

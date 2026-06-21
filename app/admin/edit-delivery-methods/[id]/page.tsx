"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function EditDeliveryMethodPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();

  const { id } = use(params);

  const [deliveryMethod, setdeliveryMethod] = useState<any>(null);

  useEffect(() => {
    async function fetchDeliveryMethod() {
      const res = await fetch(
        `http://localhost:5000/api/deliveryMethods/${id}`,
      );

      const data = await res.json();
      setdeliveryMethod(data);
    }

    fetchDeliveryMethod();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setdeliveryMethod({
      ...deliveryMethod,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    await fetch(`http://localhost:5000/api/deliveryMethods/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(deliveryMethod),
    });

    router.push("/admin");
  };

  if (!deliveryMethod) return <p>Loading...</p>;

  return (
    <main>
      <h1>Rediger leveringsmetode</h1>

      <form onSubmit={handleSave}>
        <input
          name="name"
          value={deliveryMethod.name}
          onChange={handleChange}
        />

        <input
          name="price"
          value={deliveryMethod.price}
          onChange={handleChange}
        />

        <button type="submit">Gem ændringer</button>
      </form>
    </main>
  );
}

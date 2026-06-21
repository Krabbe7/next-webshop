"use client";

import { useState } from "react";

export default function CreateDeliveryPage() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    await fetch("http://localhost:5000/api/deliveryMethods", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        price: Number(price),
      }),
    });

    alert("Leveringsmetode oprettet");
  };

  return (
    <main>
      <h1>Opret levering</h1>

      <form onSubmit={handleSubmit}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Leveringsnavn"
        />

        <input
          type="number"
          step="0.01"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Pris"
        />

        <button type="submit">Opret</button>
      </form>
    </main>
  );
}

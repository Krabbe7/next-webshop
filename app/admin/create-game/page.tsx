"use client";

import { useState } from "react";

export default function CreateGamePage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [genre, setGenre] = useState("");
  const [platform, setPlatform] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [releaseYear, setReleaseYear] = useState<number | "">("");
  const [stock, setStock] = useState<number | "">("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    await fetch("http://localhost:5000/api/games", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        description,
        price: Number(price),
        genre,
        platform,
        image_url: imageUrl,
        release_year: Number(releaseYear),
        stock: Number(stock),
      }),
    });
  };

  return (
    <main>
      <h1>Opret spil</h1>

      <form onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Titel"
        />
        <textarea
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Beskrivelse"
        />
        <input
          name="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Pris"
        />
        <input
          name="genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          placeholder="Genre"
        />
        <input
          name="platform"
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
          placeholder="Enhed"
        />
        <input
          name="image_url"
          value={imageUrl || ""}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="Billedesti"
        />
        <input
          type="number"
          value={releaseYear}
          onChange={(e) => setReleaseYear(Number(e.target.value))}
          placeholder="Udgivelsesår"
        />

        <input
          type="number"
          value={stock}
          onChange={(e) => setStock(Number(e.target.value))}
          placeholder="Lagerantal"
        />

        <button type="submit">Opret</button>
      </form>
    </main>
  );
}

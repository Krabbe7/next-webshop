"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./editGame.module.css";

export default function EditGamePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();

  // ✅ korrekt unwrap i React 19 / Next nyere version
  const { id } = use(params);

  const [game, setGame] = useState<any>(null);

  useEffect(() => {
    async function fetchGame() {
      const res = await fetch(`http://localhost:5000/api/games/${id}`);

      const data = await res.json();
      setGame(data);
    }

    fetchGame();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setGame({
      ...game,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    await fetch(`http://localhost:5000/api/games/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(game),
    });

    router.push("/admin");
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("token");

    await fetch(`http://localhost:5000/api/games/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    router.push("/admin");
  };

  if (!game) return <p>Loading...</p>;

  return (
    <main className={styles.editGamePageContainer}>
      <h1>Rediger spil</h1>

      <form onSubmit={handleSave}>
        <input name="title" value={game.title} onChange={handleChange} />
        <textarea
          name="description"
          value={game.description}
          onChange={handleChange}
        />
        <input name="price" value={game.price} onChange={handleChange} />
        <input name="genre" value={game.genre} onChange={handleChange} />
        <input name="platform" value={game.platform} onChange={handleChange} />
        <input
          name="image_url"
          value={game.image_url || ""}
          onChange={handleChange}
        />
        <input name="stock" value={game.stock} onChange={handleChange} />

        <button type="submit">Gem ændringer</button>
        <button type="button" onClick={handleDelete}>
          Slet spil
        </button>
      </form>
    </main>
  );
}

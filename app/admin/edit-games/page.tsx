"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./editGamesPage.module.css";
import Image from "next/image";

export default function AdminPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();

  const { id } = use(params);

  const [games, setGames] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserAndLoad = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.replace("/");
        return;
      }

      const res = await fetch("http://localhost:5000/api/users/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok || data.user.role !== "admin") {
        router.replace("/");
        return;
      }

      // 👇 Hent games EFTER auth er godkendt
      const gamesRes = await fetch("http://localhost:5000/api/games");
      const gamesData = await gamesRes.json();

      setGames(gamesData);
      setLoading(false);
    };

    checkUserAndLoad();
  }, []);

  const handleDelete = async (gameId: string) => {
    const token = localStorage.getItem("token");

    await fetch(`http://localhost:5000/api/games/${gameId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setGames((prev) => prev.filter((g) => g.id !== gameId));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <main className={styles.editGamesPageContainer}>
      <h1>Spil</h1>

      <Link href="/admin/create-game" className={styles.createButton}>
        Opret nyt spil
      </Link>

      <div className={styles.gamesGrid}>
        {games.map((game) => (
          <div key={game.id} className={styles.card}>
            <div className={styles.imageWrapper}>
              {game.image_url ? (
                <Image
                  src={game.image_url}
                  alt={game.title}
                  width={400}
                  height={500}
                  className={styles.image}
                />
              ) : (
                <div className={styles.noImage}>No image available</div>
              )}
            </div>

            <div className={styles.content}>
              <h3 className={styles.gameTitle}>{game.title}</h3>

              <p className={styles.meta}>{game.platform}</p>

              <p className={styles.price}>{game.price} kr.</p>

              <Link
                href={`/admin/edit-game/${game.id}`}
                className={styles.editButton}
              >
                Rediger
              </Link>
              <button
                type="button"
                onClick={() => handleDelete(game.id)}
                className={styles.deleteButton}
              >
                Slet spil
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

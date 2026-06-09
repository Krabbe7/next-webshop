"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./editGamesPage.module.css";

export default function AdminPage() {
  const router = useRouter();

  const [games, setGames] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserAndLoad = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.replace("/");
        return;
      }

      const res = await fetch("http://localhost:5000/api/users/me", {
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

  if (loading) return <p>Loading...</p>;

  return (
    <main className={styles.editGamesPageContainer}>
      <h1>Admin Panel</h1>

      <Link href="/admin/create">➕ Opret nyt spil</Link>

      <br />
      <br />

      {games.map((game) => (
        <div key={game.id} className={styles.editGameContainer}>
          <h3>{game.title}</h3>

          <Link href={`/admin/edit/${game.id}`}>✏️ Edit</Link>
        </div>
      ))}
    </main>
  );
}

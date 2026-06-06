import Link from "next/link";
import styles from "./editGamesPage.module.css";

async function getGames() {
  const res = await fetch("http://localhost:5000/api/games", {
    cache: "no-store",
  });

  return res.json();
}

export default async function AdminPage() {
  const games = await getGames();

  return (
    <main className={styles.editGamesPageContainer}>
      <h1>Admin Panel</h1>

      <Link href="/admin/create">➕ Opret nyt spil</Link>

      <br />
      <br />

      {games.map((game: any) => (
        <div key={game.id} className={styles.editGameContainer}>
          <h3>{game.title}</h3>

          <Link href={`/admin/edit/${game.id}`}>✏️ Edit</Link>
        </div>
      ))}
    </main>
  );
}

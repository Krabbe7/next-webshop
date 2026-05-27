import NavBar from "./components/navbar-component";
import Link from "next/link";
async function getGames() {
  const res = await fetch("http://localhost:5000/api/games", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch games");
  }

  return res.json();
}

export default async function Home() {
  const games = await getGames();

  return (
    <>
      <main style={{ padding: "2rem" }}>
        <h1>Game Store</h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "1rem",
          }}
        >
          {games.map((game: any) => (
            <Link key={game.id} href={`/game/${game.id}`}>
              <div
                key={game.id}
                style={{
                  border: "1px solid #ccc",
                  padding: "1rem",
                  borderRadius: "8px",
                }}
              >
                <h3>{game.title}</h3>
                <p>{game.genre}</p>
                <p>{game.platform}</p>
                <b>{game.price} kr.</b>
                <button>Tilføj til kurv</button>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}

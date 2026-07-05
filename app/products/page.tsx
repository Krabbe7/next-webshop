import NavBar from "../components/navBar/navbar-component";
import Link from "next/link";
import styles from "./products.module.css";
import Image from "next/image";
import AddToCartButton from "../components/addToCartButton/addToCartButton";

export async function getGames() {
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
    <main className={styles.page}>
      <h1 className={styles.title}>Game Store</h1>

      <div className={styles.gamesGrid}>
        {games.map((game: any) => (
          <Link
            key={game.id}
            href={`/game/${game.id}`}
            className={styles.cardLink}
          >
            <div className={styles.card}>
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

                <p className={styles.meta}>{game.genre}</p>

                <p className={styles.meta}>{game.platform}</p>

                <p className={styles.price}>{game.price} kr.</p>

                <AddToCartButton game={game} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}

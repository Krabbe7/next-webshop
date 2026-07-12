import styles from "./gamepage.module.css";
import Image from "next/image";
import RatingSection from "./components/ratingComponent";
export async function getGame(id: string) {
  const response = await fetch(`http://localhost:5000/api/games/${id}`, {
    next: {
      revalidate: 3600, // 1 time cache
    },
  });

  if (!response.ok) {
    throw new Error("Spil ikke fundet");
  }

  return response.json();
}

export default async function GamePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const game = await getGame(id);
  console.log(game.image_url);

  return (
    <main className={styles.page}>
      <div className={styles.gameContainer}>
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
          <h1 className={styles.title}>{game.title}</h1>

          <p className={styles.description}>{game.description}</p>

          <div className={styles.meta}>
            <p>
              <b>Genre:</b> {game.genre}
            </p>

            <p>
              <b>Platform:</b> {game.platform}
            </p>

            <p className={styles.price}>{game.price} kr.</p>
            <RatingSection gameId={game.id} />
          </div>

          <button className={styles.button}>Tilføj til kurv</button>
        </div>
      </div>
    </main>
  );
}

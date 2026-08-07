import styles from "./gamepage.module.css";
import Image from "next/image";
import { FaCircle } from "react-icons/fa";
import RatingSection from "./components/rating/ratingComponent";
import FavoriteButton from "@/app/products/components/favorite/favoriteButtonComponent";
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
          <FavoriteButton gameId={game.id} />
          {game.image_url ? (
            <Image
              src={game.image_url}
              alt={game.title}
              fill
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
            <div className={styles.genrePlatformContainer}>
              <p>
                <b>Genre:</b> {game.genre}
              </p>

              <p>
                <b>Platform:</b> {game.platform}
              </p>
            </div>
            <p className={styles.price}>{game.price} kr.</p>

            <p className={styles.stock}>
              {game.stock === 0 ? (
                <div className={styles.stockStatus}>
                  <b>Udsolgt</b> <FaCircle color="red" size={16} />
                </div>
              ) : game.stock < 5 ? (
                <div className={styles.stockStatus}>
                  <b>Kun {game.stock} tilbage</b>{" "}
                  <FaCircle color="gold" size={16} />
                </div>
              ) : (
                <div className={styles.stockStatus}>
                  <b>På lager</b> <FaCircle color="green" size={16} />
                </div>
              )}
            </p>
            <RatingSection gameId={game.id} />
          </div>
          {game.stock === 0 ? (
            <div className={styles.noStock}> Ikke på lager</div>
          ) : (
            <button className={styles.button}>Tilføj til kurv</button>
          )}
        </div>
      </div>
    </main>
  );
}

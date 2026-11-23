import styles from "./gamepage.module.css";
import Image from "next/image";
import { FaCircle } from "react-icons/fa";
import RatingSection from "./components/rating/ratingComponent";
import FavoriteButton from "@/app/produkter/components/favorite/favoriteButtonComponent";

type Tag = { id: number; name: string };

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

          <p className={`description ${styles.gameDescription}`}>
            {game.description}
          </p>

          <div className={styles.meta}>
            <div className={styles.genrePlatformContainer}>
              {game.genres?.length > 0 && (
                <div className={styles.tagGroup}>
                  <b>Genre:</b>
                  <div className={styles.tags}>
                    {game.genres.map((genre: Tag) => (
                      <span key={genre.id} className={styles.tag}>
                        {genre.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {game.platforms?.length > 0 && (
                <div className={styles.tagGroup}>
                  <b>Platform:</b>
                  <div className={styles.tags}>
                    {game.platforms.map((platform: Tag) => (
                      <span key={platform.id} className={styles.tag}>
                        {platform.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <p className={styles.price}>{game.price} kr.</p>

            <div className={styles.stock}>
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
            </div>

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

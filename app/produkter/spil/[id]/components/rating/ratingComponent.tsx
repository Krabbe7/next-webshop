"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useGetRating } from "../../hooks/ratingHooks/getRating";
import { useGetUserRating } from "../../hooks/ratingHooks/useGetUserRating";
import { useSaveRating } from "../../hooks/ratingHooks/useSaveRating";
import { FaStar, FaRegStar } from "react-icons/fa";
import styles from "./rating.module.css";

type Props = {
  gameId: number;
};

type User = {
  id: number;
  username: string;
  role: string;
};

export default function RatingSection({ gameId }: Props) {
  const { rating, loading, refetch } = useGetRating(gameId);

  const { rating: userRating, setRating: setUserRating } =
    useGetUserRating(gameId);

  const { saveRating } = useSaveRating();

  const [user, setUser] = useState<User | null>(null);
  const [userLoading, setUserLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/users/user", {
          credentials: "include",
        });

        if (!res.ok) {
          setUser(null);
          return;
        }

        const data = await res.json();

        setUser(data.user);
      } catch (error) {
        console.error("Kunne ikke hente bruger:", error);
        setUser(null);
      } finally {
        setUserLoading(false);
      }
    };

    getUser();
  }, []);

  async function handleRate(value: number) {
    await saveRating(gameId, value);

    setUserRating(value);

    refetch();
  }

  if (loading || userLoading) {
    return <p>Indlæser rating...</p>;
  }

  return (
    <section className={styles.ratingSection}>
      <h3 className={styles.ratingHeading}>Bedømmelse</h3>

      <div className={styles.ratingTextContainer}>
        <p>
          <FaStar className="icon" />{" "}
          {rating?.average !== null
            ? rating?.average.toFixed(1)
            : "Ingen ratings endnu"}
        </p>

        <p>{rating?.total} anmeldelser</p>
      </div>

      {!user ? (
        <p className={styles.ratingLoginText}>
          <Link className="textLink" href="/login">
            Log ind
          </Link>
          for at bedømme
        </p>
      ) : (
        <>
          <h4 className={styles.yourRatingHeading}>Din vurdering</h4>

          <div>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                className={styles.ratingButton}
                key={star}
                onClick={() => handleRate(star)}
              >
                {star <= (userRating ?? 0) ? (
                  <FaStar color="#DF0909" />
                ) : (
                  <FaRegStar color="#DF0909" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </section>
  );
}

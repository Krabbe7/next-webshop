"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useGetRating } from "../hooks/getRating";
import { useGetUserRating } from "../hooks/useGetUserRating";
import { useSaveRating } from "../hooks/useSaveRating";
import { FaStar, FaRegStar } from "react-icons/fa";
import styles from "./rating.module.css";

type Props = {
  gameId: number;
};

export default function RatingSection({ gameId }: Props) {
  const { rating, loading, refetch } = useGetRating(gameId);

  const { rating: userRating, setRating: setUserRating } =
    useGetUserRating(gameId);

  const { saveRating } = useSaveRating();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  async function handleRate(value: number) {
    await saveRating(gameId, value);

    setUserRating(value);

    refetch();
  }

  if (loading) {
    return <p>Indlæser rating...</p>;
  }

  return (
    <section className={styles.ratingSection}>
      {" "}
      <h3 className={styles.ratingHeading}>Bedømmelse</h3>
      <div className={styles.ratingTextContainer}>
        <p>
          <FaStar color="#DF0909" />{" "}
          {rating?.average !== null
            ? rating?.average.toFixed(1)
            : "Ingen ratings endnu"}
        </p>
        <p>{rating?.total} anmeldelser</p>{" "}
      </div>
      {!user ? (
        <p className={styles.ratingLoginText}>
          <Link className={styles.ratingLogin} href="/login">
            Log ind{" "}
          </Link>
          for at bedømme
        </p>
      ) : (
        <>
          <h4>Din vurdering</h4>

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

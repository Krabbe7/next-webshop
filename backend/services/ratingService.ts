import { pool } from "../db";

export const saveRating = async (
  gameId: number,
  userId: number,
  rating: number,
) => {
  const result = await pool.query(
    `
    INSERT INTO rating (game_id, user_id, rating)
    VALUES ($1, $2, $3)
    ON CONFLICT (game_id, user_id)
    DO UPDATE
    SET rating = EXCLUDED.rating
    RETURNING *;
    `,
    [gameId, userId, rating],
  );

  return result.rows[0];
};

export const getGameRating = async (gameId: number) => {
  const result = await pool.query(
    `
    SELECT
      ROUND(AVG(rating), 1) AS average,
      COUNT(*) AS total
    FROM rating
    WHERE game_id = $1;
    `,
    [gameId],
  );

  return result.rows[0];
};

export const getUsersRating = async (gameId: number, userId: number) => {
  const result = await pool.query(
    `
    SELECT rating
    FROM rating
    WHERE game_id = $1
      AND user_id = $2;
    `,
    [gameId, userId],
  );

  return result.rows[0] ?? null;
};

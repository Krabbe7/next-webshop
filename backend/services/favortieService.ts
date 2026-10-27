import { pool } from "../db";

export const saveFavorite = async (gameId: number, userId: number) => {
  const result = await pool.query(
    `
    INSERT INTO favorites (game_id, user_id)
    VALUES ($1, $2)
    ON CONFLICT (game_id, user_id)
    DO NOTHING
    RETURNING *;
    `,
    [gameId, userId],
  );

  return result.rows[0];
};

export const removeFavorite = async (gameId: number, userId: number) => {
  await pool.query(
    `
    DELETE FROM favorites
    WHERE game_id = $1
      AND user_id = $2;
    `,
    [gameId, userId],
  );
};

export const getFavorite = async (gameId: number, userId: number) => {
  const result = await pool.query(
    `
    SELECT *
    FROM favorites
    WHERE game_id = $1
      AND user_id = $2;
    `,
    [gameId, userId],
  );

  return result.rows[0] ?? null;
};

export const getFavoritesByUser = async (userId: number) => {
  const result = await pool.query(
    `
    SELECT
      g.*,

      COALESCE(
        (
          SELECT json_agg(
            json_build_object(
              'id', p.id,
              'name', p.name
            )
            ORDER BY p.name
          )
          FROM game_platforms gp
          JOIN platforms p ON p.id = gp.platform_id
          WHERE gp.game_id = g.id
        ),
        '[]'::json
      ) AS platforms,

      COALESCE(
        (
          SELECT json_agg(p.id ORDER BY p.id)
          FROM game_platforms gp
          JOIN platforms p ON p.id = gp.platform_id
          WHERE gp.game_id = g.id
        ),
        '[]'::json
      ) AS "platformIds",

      COALESCE(
        (
          SELECT json_agg(
            json_build_object(
              'id', ge.id,
              'name', ge.name
            )
            ORDER BY ge.name
          )
          FROM game_genres gg
          JOIN genres ge ON ge.id = gg.genre_id
          WHERE gg.game_id = g.id
        ),
        '[]'::json
      ) AS genres,

      COALESCE(
        (
          SELECT json_agg(ge.id ORDER BY ge.id)
          FROM game_genres gg
          JOIN genres ge ON ge.id = gg.genre_id
          WHERE gg.game_id = g.id
        ),
        '[]'::json
      ) AS "genreIds"

    FROM favorites f
    JOIN games g ON g.id = f.game_id
    WHERE f.user_id = $1
    ORDER BY f.created_at DESC;
    `,
    [userId],
  );

  return result.rows;
};

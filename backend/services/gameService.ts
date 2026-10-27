import { pool } from "../db";

async function getAllGames() {
  const result = await pool.query(`
    SELECT
      g.*,

      -- Platforms as objects
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
          JOIN platforms p
            ON p.id = gp.platform_id
          WHERE gp.game_id = g.id
        ),
        '[]'::json
      ) AS platforms,

      -- Platform IDs
      COALESCE(
        (
          SELECT json_agg(p.id ORDER BY p.id)
          FROM game_platforms gp
          JOIN platforms p
            ON p.id = gp.platform_id
          WHERE gp.game_id = g.id
        ),
        '[]'::json
      ) AS "platformIds",

      -- Genres as objects
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
          JOIN genres ge
            ON ge.id = gg.genre_id
          WHERE gg.game_id = g.id
        ),
        '[]'::json
      ) AS genres,

      -- Genre IDs
      COALESCE(
        (
          SELECT json_agg(ge.id ORDER BY ge.id)
          FROM game_genres gg
          JOIN genres ge
            ON ge.id = gg.genre_id
          WHERE gg.game_id = g.id
        ),
        '[]'::json
      ) AS "genreIds"

    FROM games g
    ORDER BY g.id;
  `);

  return result.rows;
}

async function getGameById(id: number) {
  const result = await pool.query(
    `
    SELECT
      g.*,

      -- Platforms as objects
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
          JOIN platforms p
            ON p.id = gp.platform_id
          WHERE gp.game_id = g.id
        ),
        '[]'::json
      ) AS platforms,

      -- Platform IDs
      COALESCE(
        (
          SELECT json_agg(p.id ORDER BY p.id)
          FROM game_platforms gp
          JOIN platforms p
            ON p.id = gp.platform_id
          WHERE gp.game_id = g.id
        ),
        '[]'::json
      ) AS "platformIds",

      -- Genres as objects
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
          JOIN genres ge
            ON ge.id = gg.genre_id
          WHERE gg.game_id = g.id
        ),
        '[]'::json
      ) AS genres,

      -- Genre IDs
      COALESCE(
        (
          SELECT json_agg(ge.id ORDER BY ge.id)
          FROM game_genres gg
          JOIN genres ge
            ON ge.id = gg.genre_id
          WHERE gg.game_id = g.id
        ),
        '[]'::json
      ) AS "genreIds"

    FROM games g
    WHERE g.id = $1;
    `,
    [id],
  );

  return result.rows[0] ?? null;
}

async function createGame(game: any) {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const gameResult = await client.query(
      `
      INSERT INTO games (
        title,
        description,
        price,
        image_url,
        release_year,
        stock
      )
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
      `,
      [
        game.title,
        game.description,
        game.price,
        game.image_url,
        game.release_year,
        game.stock,
      ],
    );

    const newGame = gameResult.rows[0];

    if (Array.isArray(game.platformIds) && game.platformIds.length > 0) {
      await client.query(
        `
        INSERT INTO game_platforms (
          game_id,
          platform_id
        )
        SELECT
          $1,
          UNNEST($2::BIGINT[])
        ON CONFLICT DO NOTHING;
        `,
        [newGame.id, game.platformIds],
      );
    }

    if (Array.isArray(game.genreIds) && game.genreIds.length > 0) {
      await client.query(
        `
        INSERT INTO game_genres (
          game_id,
          genre_id
        )
        SELECT
          $1,
          UNNEST($2::BIGINT[])
        ON CONFLICT DO NOTHING;
        `,
        [newGame.id, game.genreIds],
      );
    }

    await client.query("COMMIT");

    return await getGameById(newGame.id);
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

async function updateGame(id: number, game: any) {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const result = await client.query(
      `
      UPDATE games
      SET
        title = $1,
        description = $2,
        price = $3,
        image_url = $4,
        release_year = $5,
        stock = $6
      WHERE id = $7
      RETURNING *;
      `,
      [
        game.title,
        game.description,
        game.price,
        game.image_url,
        game.release_year,
        game.stock,
        id,
      ],
    );

    if (result.rows.length === 0) {
      await client.query("ROLLBACK");
      return null;
    }

    // Update platforms
    if (Array.isArray(game.platformIds)) {
      await client.query(
        `
        DELETE FROM game_platforms
        WHERE game_id = $1;
        `,
        [id],
      );

      if (game.platformIds.length > 0) {
        await client.query(
          `
          INSERT INTO game_platforms (
            game_id,
            platform_id
          )
          SELECT
            $1,
            UNNEST($2::BIGINT[])
          ON CONFLICT DO NOTHING;
          `,
          [id, game.platformIds],
        );
      }
    }

    // Update genres
    if (Array.isArray(game.genreIds)) {
      await client.query(
        `
        DELETE FROM game_genres
        WHERE game_id = $1;
        `,
        [id],
      );

      if (game.genreIds.length > 0) {
        await client.query(
          `
          INSERT INTO game_genres (
            game_id,
            genre_id
          )
          SELECT
            $1,
            UNNEST($2::BIGINT[])
          ON CONFLICT DO NOTHING;
          `,
          [id, game.genreIds],
        );
      }
    }

    await client.query("COMMIT");

    return await getGameById(id);
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

async function deleteGame(id: number) {
  const result = await pool.query(
    `
    DELETE FROM games
    WHERE id = $1
    RETURNING *;
    `,
    [id],
  );

  return result.rows[0] ?? null;
}

export default {
  getAllGames,
  getGameById,
  createGame,
  updateGame,
  deleteGame,
};

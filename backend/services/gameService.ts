import { pool } from "../db";

async function getAllGames() {
  const result = await pool.query("SELECT * FROM games ORDER BY id");

  return result.rows;
}

async function createGame(game: any) {
  const result = await pool.query(
    `
    INSERT INTO games (
      title,
      description,
      price,
      genre,
      platform,
      image_url,
      release_year,
      stock
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
    RETURNING *
    `,
    [
      game.title,
      game.description,
      game.price,
      game.genre,
      game.platform,
      game.image_url,
      game.release_year,
      game.stock,
    ],
  );

  return result.rows[0];
}

async function getGameById(id: number) {
  const result = await pool.query("SELECT * FROM games WHERE id = $1", [id]);

  return result.rows[0];
}

async function deleteGame(id: number) {
  const result = await pool.query("SELECT * FROM games WHERE id = $1", [id]);

  return result.rows[0];
}

export default {
  getAllGames,
  getGameById,
  createGame,
  deleteGame,
};

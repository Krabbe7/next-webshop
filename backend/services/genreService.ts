import { pool } from "../db";

export const getAllGenres = async () => {
  const result = await pool.query(`
    SELECT id, name
    FROM genres
    ORDER BY name ASC;
  `);

  return result.rows;
};

export const getGenreById = async (id: number) => {
  const result = await pool.query(
    `
    SELECT id, name
    FROM genres
    WHERE id = $1;
    `,
    [id],
  );

  return result.rows[0] ?? null;
};

export const createGenre = async (name: string) => {
  const result = await pool.query(
    `
    INSERT INTO genres (name)
    VALUES ($1)
    RETURNING *;
    `,
    [name],
  );

  return result.rows[0];
};

export const updateGenre = async (id: number, name: string) => {
  const result = await pool.query(
    `
    UPDATE genres
    SET name = $1
    WHERE id = $2
    RETURNING *;
    `,
    [name, id],
  );

  return result.rows[0] ?? null;
};

export const deleteGenre = async (id: number) => {
  const result = await pool.query(
    `
    DELETE FROM genres
    WHERE id = $1
    RETURNING *;
    `,
    [id],
  );

  return result.rows[0] ?? null;
};

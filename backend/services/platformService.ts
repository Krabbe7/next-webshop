import { pool } from "../db";

export const getAllPlatforms = async () => {
  const result = await pool.query(`
    SELECT id, name
    FROM platforms
    ORDER BY name ASC;
  `);

  return result.rows;
};

export const getPlatformById = async (id: number) => {
  const result = await pool.query(
    `
    SELECT id, name
    FROM platforms
    WHERE id = $1;
    `,
    [id],
  );

  return result.rows[0] ?? null;
};

export const createPlatform = async (name: string) => {
  const result = await pool.query(
    `
    INSERT INTO platforms (name)
    VALUES ($1)
    RETURNING *;
    `,
    [name],
  );

  return result.rows[0];
};

export const updatePlatform = async (id: number, name: string) => {
  const result = await pool.query(
    `
    UPDATE platforms
    SET name = $1
    WHERE id = $2
    RETURNING *;
    `,
    [name, id],
  );

  return result.rows[0] ?? null;
};

export const deletePlatform = async (id: number) => {
  const result = await pool.query(
    `
    DELETE FROM platforms
    WHERE id = $1
    RETURNING *;
    `,
    [id],
  );

  return result.rows[0] ?? null;
};

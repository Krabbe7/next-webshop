import { pool } from "../db";

export const getAllProductCategories = async () => {
  const result = await pool.query(`
    SELECT id, name
    FROM product_Categories
    ORDER BY name ASC;
  `);

  return result.rows;
};

export const getProductCategoryById = async (id: number) => {
  const result = await pool.query(
    `
    SELECT id, name
    FROM product_Categories
    WHERE id = $1;
    `,
    [id],
  );

  return result.rows[0] ?? null;
};

export const createProductCategory = async (name: string) => {
  const result = await pool.query(
    `
    INSERT INTO product_categories(name)
    VALUES ($1)
    RETURNING *;
    `,
    [name],
  );

  return result.rows[0];
};

export const updateProductCategory = async (id: number, name: string) => {
  const result = await pool.query(
    `
    UPDATE product_categories
    SET name = $1
    WHERE id = $2
    RETURNING *;
    `,
    [name, id],
  );

  return result.rows[0] ?? null;
};

export const deleteProductCategory = async (id: number) => {
  const result = await pool.query(
    `
    DELETE FROM product_categories
    WHERE id = $1
    RETURNING *;
    `,
    [id],
  );

  return result.rows[0] ?? null;
};

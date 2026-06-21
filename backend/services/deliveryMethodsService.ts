import { pool } from "../db";

async function getDeliveryMethods() {
  const result = await pool.query("SELECT * FROM delivery ORDER BY id");
  return result.rows;
}
async function createDeliveryMethod(deliveryMethod: any) {
  const result = await pool.query(
    `
    INSERT INTO delivery (
      id,
      name,
      price
    )
    VALUES ($1,$2,$3)
    RETURNING *
    `,
    [deliveryMethod.id, deliveryMethod.name, deliveryMethod.price],
  );

  return result.rows[0];
}

async function updateDeliveryMethod(id: number, deliveryMethod: any) {
  const result = await pool.query(
    `
    UPDATE delivery
    SET
      name = $1,
      price = $2
    WHERE id = $3
    RETURNING *
    `,
    [deliveryMethod.name, deliveryMethod.price, id],
  );

  return result.rows[0];
}

async function getDeliveryMethodId(id: number) {
  const result = await pool.query("SELECT * FROM delivery WHERE id = $1", [id]);

  return result.rows[0];
}

async function deleteDeliveryMethod(id: number) {
  const result = await pool.query(
    "DELETE FROM delivery WHERE id = $1 RETURNING *",
    [id],
  );

  return result.rows[0];
}
export default {
  getDeliveryMethods,
  createDeliveryMethod,
  updateDeliveryMethod,
  getDeliveryMethodId,
  deleteDeliveryMethod,
};

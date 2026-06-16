import { pool } from "../db";

async function getDeliveryCouriers() {
  const result = await pool.query("SELECT * FROM delivery ORDER BY id");
  return result.rows;
}

export default {
  getDeliveryCouriers,
};

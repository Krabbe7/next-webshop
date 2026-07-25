import { pool } from "../db";

async function createOrder(orderData: any) {
  const orderResult = await pool.query(
    `
    INSERT INTO orders (
      user_id,
      customer_name,
      email,
      street_address,
      postal_code,
      city,
      country,
      delivery_method,
      pickup_point_id,
      pickup_point_name,
      pickup_point_address,
      subtotal,
      shipping_price,
      total_price
    )
    VALUES (
      $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14
    )
    RETURNING id
    `,
    [
      orderData.userId,
      orderData.customerName,
      orderData.email,
      orderData.streetAddress,
      orderData.postalCode,
      orderData.city,
      orderData.country,
      orderData.shipping,
      orderData.pickupPoint?.id ?? null,
      orderData.pickupPoint?.name ?? null,
      orderData.pickupPoint?.address ?? null,
      orderData.subtotal,
      orderData.shippingPrice,
      orderData.totalPrice,
    ],
  );

  const orderId = orderResult.rows[0].id;

  for (const item of orderData.items) {
    await pool.query(
      `
      INSERT INTO order_items (
        order_id,
        game_id,
        quantity,
        price
      )
      VALUES ($1,$2,$3,$4)
      `,
      [orderId, item.gameId, item.quantity, item.price],
    );
  }

  return orderId;
}

async function getOrdersByUser(userId: number) {
  const result = await pool.query(
    `
    SELECT
      o.id,
      o.customer_name,
      o.total_price,
      o.delivery_method,
      o.pickup_point_name,
      o.pickup_point_address,
      o.created_at,

      oi.quantity,
      oi.price,

      g.id AS game_id,
      g.title,
      g.image_url

    FROM orders o

    JOIN order_items oi
      ON oi.order_id = o.id

    JOIN games g
      ON g.id = oi.game_id

    WHERE o.user_id = $1

    ORDER BY o.created_at DESC;
    `,
    [userId],
  );

  const ordersMap = new Map();

  for (const row of result.rows) {
    if (!ordersMap.has(row.id)) {
      ordersMap.set(row.id, {
        id: row.id,
        created_at: row.created_at,
        total_price: row.total_price,
        delivery_method: row.delivery_method,

        pickup_point_name: row.pickup_point_name,
        pickup_point_address: row.pickup_point_address,

        items: [],
      });
    }

    ordersMap.get(row.id).items.push({
      gameId: row.game_id,
      title: row.title,
      image_url: row.image_url,
      quantity: row.quantity,
      price: row.price,
    });
  }

  return [...ordersMap.values()];
}

export default { createOrder, getOrdersByUser };

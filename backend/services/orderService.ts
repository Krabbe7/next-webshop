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
      subtotal,
      shipping_price,
      total_price
    )
    VALUES (
      $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13
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
      orderData.pickupPoint?.id || null,
      orderData.pickupPoint?.name || null,
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

export default { createOrder };

import { pool } from "../db";

async function createOrder(orderData: any) {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    if (!Array.isArray(orderData.items) || orderData.items.length === 0) {
      throw new Error("Ordren har ingen varer");
    }

    // Slå priserne op i databasen i stedet for at stole på klienten
    const gameIds = orderData.items.map((i: any) => Number(i.gameId));

    const gamesResult = await client.query(
      "SELECT id, price FROM games WHERE id = ANY($1)",
      [gameIds],
    );

    const priceById = new Map<number, number>(
      gamesResult.rows.map((g: any) => [Number(g.id), Number(g.price)]),
    );

    let subtotal = 0;

    for (const item of orderData.items) {
      const quantity = Number(item.quantity);
      const price = priceById.get(Number(item.gameId));

      if (
        price === undefined ||
        !Number.isInteger(quantity) ||
        quantity < 1 ||
        quantity > 10
      ) {
        throw new Error("Ugyldig vare");
      }

      item.price = price;
      subtotal += price * quantity;
    }

    const shippingId = Number(orderData.shippingId);

    const shippingResult = await client.query(
      "SELECT id, name, price FROM shipping WHERE id = $1",
      [shippingId],
    );

    if (shippingResult.rows.length === 0) {
      throw new Error("Ugyldig leveringsmetode");
    }

    const shippingName = shippingResult.rows[0].name;
    const shippingPrice = Number(shippingResult.rows[0].price);
    const total = subtotal + shippingPrice;

    const orderResult = await client.query(
      `
      INSERT INTO orders (
        user_id,
        customer_name,
        email,
        street_address,
        postal_code,
        city,
        country,
        shipping_id,
        delivery_method,
        pickup_point_id,
        pickup_point_name,
        pickup_point_address,
        subtotal,
        shipping_price,
        total_price
      )
      VALUES (
        $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15
      )
      RETURNING id, public_id
      `,
      [
        orderData.userId,
        orderData.customerName,
        orderData.email,
        orderData.streetAddress,
        orderData.postalCode,
        orderData.city,
        orderData.country,
        shippingId, // NY: fremmednøgle
        shippingName,
        orderData.pickupPoint?.id ?? null,
        orderData.pickupPoint?.name ?? null,
        orderData.pickupPoint?.address ?? null,
        subtotal,
        shippingPrice,
        total,
      ],
    );

    const orderId = orderResult.rows[0].id;
    const publicId = orderResult.rows[0].public_id;

    for (const item of orderData.items) {
      await client.query(
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

      const stockResult = await client.query(
        `
        UPDATE games
        SET stock = stock - $1
        WHERE id = $2
          AND stock >= $1
        RETURNING stock
        `,
        [item.quantity, item.gameId],
      );

      if (stockResult.rows.length === 0) {
        throw new Error("Ikke nok på lager.");
      }
    }

    await client.query("COMMIT");

    return publicId;
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
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

async function getOrderById(publicId: string) {
  const orderResult = await pool.query(
    "SELECT * FROM orders WHERE public_id = $1",
    [publicId],
  );

  const order = orderResult.rows[0];

  if (!order) return null;

  const itemsResult = await pool.query(
    `
    SELECT
      oi.id,
      oi.game_id,
      oi.quantity,
      oi.price,
      g.title,
      g.image_url
    FROM order_items oi
    JOIN games g
      ON g.id = oi.game_id
    WHERE oi.order_id = $1
    ORDER BY oi.id
    `,
    [order.id],
  );

  return { ...order, items: itemsResult.rows };
}

export default { createOrder, getOrdersByUser, getOrderById };

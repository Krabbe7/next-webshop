import { pool } from "../db";
export type PickupPoint = {
  id: string;
  provider: string;
  name: string;
  address: string;
};

async function getAllShipping() {
  const result = await pool.query("SELECT * FROM shipping ORDER BY id");

  return result.rows;
}

async function getShippingById(id: number) {
  const result = await pool.query("SELECT * FROM shipping WHERE id = $1", [id]);

  return result.rows[0];
}

async function updateShipping(id: number, shipping: any) {
  const result = await pool.query(
    `
    UPDATE shipping
    SET
      name = $1,
      price = $2
    WHERE id = $3
    RETURNING *
    `,
    [shipping.name, shipping.price, id],
  );

  return result.rows[0];
}

async function createShipping(shipping: any) {
  const result = await pool.query(
    `
    INSERT INTO shipping (name, price)
    VALUES ($1, $2)
    RETURNING *
    `,
    [shipping.name, shipping.price],
  );

  return result.rows[0];
}

async function deleteShipping(id: number) {
  const result = await pool.query(
    "DELETE FROM shipping WHERE id = $1 RETURNING *",
    [id],
  );

  return result.rows[0];
}

async function geocodeAddress(address: string) {
  const key = process.env.GOOGLE_MAPS_API_KEY;

  if (!key) {
    throw new Error("Missing GOOGLE_MAPS_API_KEY");
  }

  const res = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address,
    )}&key=${key}`,
  );

  const data = await res.json();

  if (data.status !== "OK" || !data.results?.length) {
    console.error("Google geocode error:", data);
    throw new Error("Address not found or API error");
  }

  return {
    lat: data.results[0].geometry.location.lat,
    lng: data.results[0].geometry.location.lng,
  };
}

async function getPickupPoints(address: string, provider: string) {
  const { lat, lng } = await geocodeAddress(address);

  let keyword = "";

  switch (provider) {
    case "gls":
      keyword = "GLS PakkeShop";
      break;

    case "postnord":
      keyword = "PostNord";
      break;

    case "bring":
      keyword = "Bring Pickup Point";
      break;

    default:
      keyword = "parcel shop";
  }

  const res = await fetch(
    `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&rankby=distance&keyword=${encodeURIComponent(
      keyword,
    )}&key=${process.env.GOOGLE_MAPS_API_KEY}`,
  );

  const data = await res.json();

  return (data.results || []).slice(0, 5).map((place: any) => ({
    id: place.place_id,
    provider,
    name: place.name,
    address: place.vicinity,
  }));
}

export default {
  getAllShipping,
  getShippingById,
  updateShipping,
  createShipping,
  deleteShipping,
  getPickupPoints,
};

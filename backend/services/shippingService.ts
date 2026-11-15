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
  if (!address?.trim()) {
    throw new Error("Address is required");
  }

  const key = process.env.GOOGLE_MAPS_API_KEY;

  if (!key) {
    throw new Error("Missing GOOGLE_MAPS_API_KEY");
  }

  const keyword = (() => {
    switch (provider?.trim().toLowerCase()) {
      case "gls":
        return "GLS PakkeShop";

      case "postnord":
        return "PostNord";

      case "bring":
        return "Bring Pickup Point";

      default:
        return "pakkeshop";
    }
  })();

  const textQuery = `${keyword} nær ${address.trim()}`;
  console.log("Places textQuery:", textQuery);

  const res = await fetch(
    "https://places.googleapis.com/v1/places:searchText",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": key,
        "X-Goog-FieldMask":
          "places.id,places.displayName,places.formattedAddress",
      },
      body: JSON.stringify({
        textQuery,
        languageCode: "da",
        regionCode: "DK",
        maxResultCount: 5,
      }),
    },
  );

  if (!res.ok) {
    const body = await res.text();

    console.error("Places (New) error:", res.status, body);

    throw new Error(`Google Places API error: ${res.status}`);
  }

  const data = await res.json();

  return (data.places || []).map((place: any) => ({
    id: place.id,
    provider,
    name: place.displayName?.text ?? "",
    address: place.formattedAddress ?? "",
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

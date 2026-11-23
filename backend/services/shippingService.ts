import { pool } from "../db";
export type PickupPoint = {
  id: string;
  provider: string;
  name: string;
  address: string;
};

import { ExpiringCache } from "../utils/cache/expiringCache";

const geocodeCache = new ExpiringCache<{ lat: number; lng: number }>(
  24 * 60 * 60 * 1000,
  1000,
);

const pickupCache = new ExpiringCache<any[]>(60 * 60 * 1000, 500);

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
function cleanAddress(address: string): string {
  const parts = address
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);

  return parts
    .filter((part, i) => part.toLowerCase() !== parts[i - 1]?.toLowerCase())
    .join(", ");
}

async function getPickupPoints(address: string, provider: number | string) {
  if (!address?.trim()) {
    throw new Error("Address is required");
  }

  const key = process.env.GOOGLE_MAPS_API_KEY;

  if (!key) {
    throw new Error("Missing GOOGLE_MAPS_API_KEY");
  }

  const providerId = Number(provider);

  if (!Number.isInteger(providerId) || providerId <= 0) {
    throw new Error("Invalid provider");
  }

  const providerResult = await pool.query(
    "SELECT name FROM shipping WHERE id = $1",
    [providerId],
  );

  const providerName = providerResult.rows[0]?.name;

  if (!providerName) {
    throw new Error("Unknown provider");
  }

  const keyword = `${providerName} PakkeShop`;

  // Normaliser, så "Vej 1,  9000 Aalborg" og "vej 1, 9000 aalborg" rammer samme nøgle
  const normalizedAddress = address.trim().toLowerCase().replace(/\s+/g, " ");

  const { lat, lng } = await geocodeCache.getOrLoad(normalizedAddress, () => {
    console.log("Geocode (Google):", normalizedAddress);
    return geocodeAddress(address.trim());
  });

  // ~100 m: naboer deler resultat
  const cacheKey = `${providerId}|${lat.toFixed(3)}|${lng.toFixed(3)}`;

  return pickupCache.getOrLoad(cacheKey, async () => {
    console.log("Places search (Google):", keyword, lat, lng);

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
          textQuery: keyword,
          languageCode: "da",
          regionCode: "DK",
          maxResultCount: 5,
          rankPreference: "DISTANCE",
          locationBias: {
            circle: {
              center: { latitude: lat, longitude: lng },
              radius: 5000,
            },
          },
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
      provider: providerName,
      name: place.displayName?.text ?? "",
      address: place.formattedAddress ?? "",
    }));
  });
}

export default {
  getAllShipping,
  getShippingById,
  updateShipping,
  createShipping,
  deleteShipping,
  getPickupPoints,
};

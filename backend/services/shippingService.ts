import bringService from "./providers/bringService";
import glsService from "./providers/glsService";
import postnordService from "./providers/postnordService";

export type PickupPoint = {
  id: string;
  provider: "bring" | "gls" | "postnord";
  name: string;
  address: string;
  distance?: number;
};

async function geocodeAddress(address: string) {
  const res = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address,
    )}&key=${process.env.GOOGLE_MAPS_API_KEY}`,
  );

  if (!res.ok) {
    throw new Error("Google Geocoding failed");
  }

  const data = await res.json();

  if (!data.results?.length) {
    throw new Error("Address not found");
  }

  return {
    lat: data.results[0].geometry.location.lat,
    lng: data.results[0].geometry.location.lng,
  };
}

async function getPickupPoints(address: string) {
  const { lat, lng } = await geocodeAddress(address);

  const results = await Promise.allSettled([
    bringService.getPoints(lat, lng),
    glsService.getPoints(lat, lng),
    postnordService.getPoints(address),
  ]);

  const bring = results[0].status === "fulfilled" ? results[0].value : [];

  const gls = results[1].status === "fulfilled" ? results[1].value : [];

  const postnord = results[2].status === "fulfilled" ? results[2].value : [];

  return [...bring, ...gls, ...postnord].sort(
    (a, b) => (a.distance ?? 999999) - (b.distance ?? 999999),
  );
}

export default {
  getPickupPoints,
};

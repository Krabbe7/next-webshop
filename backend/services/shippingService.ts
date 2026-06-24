export type PickupPoint = {
  id: string;
  provider: string;
  name: string;
  address: string;
};

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
    `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=5000&keyword=${encodeURIComponent(
      keyword,
    )}&key=${process.env.GOOGLE_MAPS_API_KEY}`,
  );

  const data = await res.json();

  return (data.results || []).map((place: any) => ({
    id: place.place_id,
    provider,
    name: place.name,
    address: place.vicinity,
  }));
}

export default {
  getPickupPoints,
};

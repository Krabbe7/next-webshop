import { PickupPoint } from "../shippingService";

async function getPoints(lat: number, lng: number): Promise<PickupPoint[]> {
  const res = await fetch(process.env.GLS_API_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.GLS_API_KEY}`,
    },
    body: JSON.stringify({
      latitude: lat,
      longitude: lng,
    }),
  });

  if (!res.ok) {
    throw new Error("GLS API failed");
  }

  const data = await res.json();

  return (data.shops || []).map((shop: any) => ({
    id: `gls_${shop.id}`,
    provider: "gls",
    name: shop.name,
    address: shop.address,
    distance: shop.distance,
  }));
}

export default {
  getPoints,
};

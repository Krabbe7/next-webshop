import { PickupPoint } from "../shippingService";

async function getPoints(lat: number, lng: number): Promise<PickupPoint[]> {
  const res = await fetch(
    `https://api.bring.com/pickuppoint/api/pickuppoints/dk?latitude=${lat}&longitude=${lng}&radius=5000`,
    {
      headers: {
        "X-MyBring-API-Uid": process.env.BRING_UID!,
        "X-MyBring-API-Key": process.env.BRING_API_KEY!,
      },
    },
  );

  if (!res.ok) {
    throw new Error("Bring API failed");
  }

  const data = await res.json();

  return (data.pickupPoints || []).map((point: any) => ({
    id: `bring_${point.id}`,
    provider: "bring",
    name: point.name,
    address: `${point.visitingAddress?.streetName ?? ""} ${
      point.visitingAddress?.streetNumber ?? ""
    }`,
    distance: point.distance,
  }));
}

export default {
  getPoints,
};

import { PickupPoint } from "../shippingService";

async function getPoints(address: string): Promise<PickupPoint[]> {
  const res = await fetch(
    "https://api2.postnord.com/rest/businesslocation/v5/servicepoints/nearest/byaddress",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": process.env.POSTNORD_API_KEY!,
      },
      body: JSON.stringify({
        address,
        countryCode: "DK",
        numberOfServicePoints: 10,
      }),
    },
  );

  if (!res.ok) {
    throw new Error("PostNord API failed");
  }

  const data = await res.json();

  return (data.servicePoints || []).map((point: any) => ({
    id: `postnord_${point.servicePointId}`,
    provider: "postnord",
    name: point.name,
    address: point.deliveryAddress?.streetName || "",
    distance: point.distance,
  }));
}

export default {
  getPoints,
};

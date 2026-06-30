import type { DeliveryMethod } from "./types";

export const deliveryMethods: DeliveryMethod[] = [
  {
    id: "gls",
    name: "GLS Pakkeshop",
    price: 39,
  },
  {
    id: "postnord",
    name: "PostNord Pakkeshop",
    price: 39,
  },
  {
    id: "bring",
    name: "Bring Pakkeshop",
    price: 39,
  },
  {
    id: "home",
    name: "Hjemmelevering",
    price: 59,
  },
] as const;

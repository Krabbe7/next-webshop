import type { PickupPoint } from "../../types";
import type { CartItem } from "@/app/types";

export type PropsOrderSummary = {
  cart: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  pickup: Pick<PickupPoint, "name"> | null;
  onCheckout?: () => void | Promise<void>;
};

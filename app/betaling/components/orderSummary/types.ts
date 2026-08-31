import type { PickupPoint } from "../../types";
import type { CartItem } from "@/app/types";

export type PropsOrderSummary = {
  cart: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  pickup: PickupPoint | null;
  onCheckout: () => void | Promise<void>;
};

import type { Shipping } from "../types";
import type { CartItem } from "@/app/types";

export function useOrderTotals(cart: CartItem[], shipping: Shipping) {
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const shippingPrice = shipping.price;

  const total = subtotal + shippingPrice;

  return {
    subtotal,
    shipping: shippingPrice,
    total,
  };
}

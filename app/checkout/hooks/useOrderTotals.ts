import type { CartItem, DeliveryMethod } from "../types";

export function useOrderTotals(
  cart: CartItem[],
  deliveryMethod: DeliveryMethod,
) {
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const shipping = deliveryMethod.price;

  const total = subtotal + shipping;

  return {
    subtotal,
    shipping,
    total,
  };
}

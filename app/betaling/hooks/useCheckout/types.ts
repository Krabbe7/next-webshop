// import type {
//   CartItem,
//   CustomerFormState,
//   AddressFormState,
//   PaymentFormState,
//   Shipping,
//   PickupPoint,
// } from "../../types";
import type { CartItem, PickupPoint } from "../../types";
import type { CustomerFormState } from "../../types";
import type { AddressFormState } from "../../types";
import type { PaymentFormState } from "../../types";
import type { Shipping } from "../../types";
export type UseCheckoutArgs = {
  cart: CartItem[];

  customer: CustomerFormState;
  address: AddressFormState;
  payment: PaymentFormState;

  shipping: Shipping;
  selectedPickup: PickupPoint | null;

  subtotal: number;
  shippingPrice: number;
  total: number;

  onSuccess: (orderId: string) => void;
};

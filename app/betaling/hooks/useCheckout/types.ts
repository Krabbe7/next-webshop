// import type {
//   CartItem,
//   CustomerFormState,
//   AddressFormState,
//   PaymentFormState,
//   Shipping,
//   PickupPoint,
// } from "../../types";
import type {
  PickupPoint,
  CustomerFormState,
  AddressFormState,
  PaymentFormState,
  Shipping,
} from "../../types";

import type { CartItem } from "@/app/types";
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

import type {
  AddressFormState,
  CheckoutErrors,
  CustomerFormState,
  Shipping,
  PaymentFormState,
  PickupPoint,
} from "../../types";

export type PropsCheckoutValidation = {
  customer: CustomerFormState;
  address: AddressFormState;
  payment: PaymentFormState;

  shipping: Shipping;

  selectedPickup: PickupPoint | null;

  setErrors: React.Dispatch<React.SetStateAction<CheckoutErrors>>;
};

import { useState } from "react";

import { deliveryMethods } from "../constants";

import type {
  AddressFormState,
  CheckoutErrors,
  CustomerFormState,
  DeliveryMethod,
  PaymentFormState,
} from "../types";

export function useCheckoutForm() {
  const [errors, setErrors] = useState<CheckoutErrors>({});

  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>(
    deliveryMethods[0],
  );

  const [customer, setCustomer] = useState<CustomerFormState>({
    name: "",
    email: "",
    phone: "",
  });

  const [address, setAddress] = useState<AddressFormState>({
    street: "",
    postalCode: "",
    city: "",
    country: "",
  });

  const [payment, setPayment] = useState<PaymentFormState>({
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  return {
    customer,
    setCustomer,

    address,
    setAddress,

    payment,
    setPayment,

    deliveryMethod,
    setDeliveryMethod,

    errors,
    setErrors,
  };
}

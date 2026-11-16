import { useState } from "react";

import type {
  AddressFormState,
  CheckoutErrors,
  CustomerFormState,
  Shipping,
  PaymentFormState,
} from "../types";

export function useCheckoutForm() {
  const [errors, setErrors] = useState<CheckoutErrors>({});

  const [shipping, setShipping] = useState<Shipping>({
    id: 0,
    name: "",
    price: 0,
  });

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

    shipping,
    setShipping,

    errors,
    setErrors,
  };
}

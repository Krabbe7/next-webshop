import {
  isValidCardExpiry,
  isValidCardNumber,
  isValidCvv,
  isValidEmail,
  isValidPhone,
  isValidPostalCode,
} from "../../components/inputValidation/inputValidation";

import type { CheckoutErrors } from "../../types";
import { PropsCheckoutValidation } from "./types";

export function useCheckoutValidation({
  customer,
  address,
  payment,
  shipping,
  selectedPickup,
  setErrors,
}: PropsCheckoutValidation) {
  const validate = () => {
    const errors: CheckoutErrors = {};

    // CUSTOMER

    if (!customer.name.trim()) {
      errors.name = "Indtast navn";
    }

    if (!customer.email.trim()) {
      errors.email = "Indtast email";
    } else if (!isValidEmail(customer.email)) {
      errors.email = "Ugyldig email";
    }

    if (!customer.phone.trim()) {
      errors.phone = "Indtast telefon";
    } else if (!isValidPhone(customer.phone)) {
      errors.phone = "Telefon skal være 8 cifre";
    }

    // ADDRESS

    if (!address.street.trim()) {
      errors.street = "Indtast adresse";
    }

    if (!address.postalCode.trim()) {
      errors.postalCode = "Indtast postnummer";
    } else if (!isValidPostalCode(address.postalCode)) {
      errors.postalCode = "Ugyldigt postnummer";
    }

    if (!address.city.trim()) {
      errors.city = "Indtast by";
    }

    if (!address.country.trim()) {
      errors.country = "Indtast land";
    }

    // PICKUP

    if (["gls", "postnord", "bring"].includes(shipping.id) && !selectedPickup) {
      errors.pickup = "Vælg en pakkeshop";
    }

    // PAYMENT

    if (!isValidCardNumber(payment.cardNumber)) {
      errors.cardNumber = "Ugyldigt kortnummer";
    }

    if (!isValidCardExpiry(payment.expiry)) {
      errors.expiry = "Ugyldig udløbsdato";
    }

    if (!isValidCvv(payment.cvv)) {
      errors.cvv = "Ugyldig CVV";
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  return {
    validate,
  };
}

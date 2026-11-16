export type CheckoutErrors = {
  name?: string;
  email?: string;
  phone?: string;

  street?: string;
  postalCode?: string;
  city?: string;
  country?: string;

  cardNumber?: string;
  expiry?: string;
  cvv?: string;

  pickup?: string;
};

export type FormProps<T> = {
  value: T;
  onChange: (value: T) => void;
  errors?: Partial<Record<keyof T, string>>;
};

export type AddressFormState = {
  street: string;
  postalCode: string;
  city: string;
  country: string;
};

export type CustomerFormState = {
  name: string;
  email: string;
  phone: string;
};

export type PaymentFormState = {
  cardNumber: string;
  expiry: string;
  cvv: string;
};

export type PickupPoint = {
  id: string;
  name: string;
  address: string;
  provider: string;
};

export type Shipping = {
  id: number;
  name: string;
  price: number;
};

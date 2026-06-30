export type DeliveryMethod = {
  id: string;
  name: string;
  price: number;
};

export type PickupPoint = {
  id: string;
  name: string;
  address: string;
  provider: string;
};

export type CustomerFormState = {
  name: string;
  email: string;
  phone: string;
};

export type AddressFormState = {
  street: string;
  postalCode: string;
  city: string;
  country: string;
};

export type PaymentFormState = {
  cardNumber: string;
  expiry: string;
  cvv: string;
};

export type CartItem = {
  id: string;
  title: string;
  price: number;
  quantity: number;
};
export type FormProps<T> = {
  value: T;
  onChange: (value: T) => void;
  errors?: Partial<Record<keyof T, string>>;
};

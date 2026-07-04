import type {
  CartItem,
  CustomerFormState,
  AddressFormState,
  PaymentFormState,
  shipping,
  PickupPoint,
} from "../types";

type Args = {
  cart: CartItem[];
  customer: CustomerFormState;
  address: AddressFormState;
  payment: PaymentFormState;
  shipping: shipping;
  selectedPickup: PickupPoint | null;
  subtotal: number;
  shipping: number;
  total: number;
  onSuccess: (orderId: string) => void;
};

export function useCheckout(args: Args) {
  const submit = async () => {
    const payload = {
      customerName: args.customer.name,
      email: args.customer.email,
      phone: args.customer.phone,

      streetAddress: args.address.street,
      postalCode: args.address.postalCode,
      city: args.address.city,
      country: args.address.country,

      shipping: args.shipping.id,

      pickupPoint: args.selectedPickup
        ? {
            id: args.selectedPickup.id,
            name: args.selectedPickup.name,
          }
        : null,

      items: args.cart.map((item) => ({
        gameId: item.id,
        quantity: item.quantity,
        price: item.price,
      })),

      subtotal: args.subtotal,
      shippingPrice: args.shipping,
      totalPrice: args.total,
    };

    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

    const res = await fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (data.orderId) {
      args.onSuccess(data.orderId);
    }
  };

  return { submit };
}

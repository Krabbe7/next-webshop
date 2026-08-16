import type {
  CartItem,
  CustomerFormState,
  AddressFormState,
  PaymentFormState,
  Shipping,
  PickupPoint,
} from "../types";

type Args = {
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
            address: args.selectedPickup.address,
          }
        : null,

      items: args.cart.map((item) => ({
        gameId: item.id,
        quantity: item.quantity,
        price: item.price,
      })),

      subtotal: args.subtotal,

      shippingPrice: args.shipping.price,

      totalPrice: args.total,
    };

    const res = await fetch("http://localhost:5000/api/orders", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (data.orderId) {
      // Find korrekt kurv
      const user = JSON.parse(localStorage.getItem("user") || "null");

      const cartKey = user ? `cart_${user.id}` : "cart_guest";

      // Slet kurven
      localStorage.removeItem(cartKey);

      // Opdater alle komponenter der viser kurven
      window.dispatchEvent(new Event("cartUpdated"));

      // Gå til success-siden
      args.onSuccess(data.orderId);
    }
  };

  return { submit };
}

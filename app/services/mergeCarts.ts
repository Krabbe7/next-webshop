import type { CartItem } from "@/app/checkout/types";

export function mergeGuestCart(userId: number) {
  const guestCart: CartItem[] = JSON.parse(
    localStorage.getItem("cart_guest") || "[]",
  );

  const userCart: CartItem[] = JSON.parse(
    localStorage.getItem(`cart_${userId}`) || "[]",
  );

  const merged = [...userCart];

  guestCart.forEach((guestItem) => {
    const existing = merged.find((item) => item.id === guestItem.id);

    if (existing) {
      existing.quantity += guestItem.quantity;
    } else {
      merged.push(guestItem);
    }
  });

  localStorage.setItem(`cart_${userId}`, JSON.stringify(merged));

  localStorage.removeItem("cart_guest");

  window.dispatchEvent(new Event("cartUpdated"));
}

export function clearCart() {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const cartKey = user ? `cart_${user.id}` : "cart_guest";

  localStorage.removeItem(cartKey);

  window.dispatchEvent(new Event("cartUpdated"));
}

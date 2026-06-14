import { CartItem } from "./cartHelper";

function getCartKey() {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  return user ? `cart_${user.id}` : "cart_guest";
}

export function getCart(): CartItem[] {
  const cart = localStorage.getItem(getCartKey());

  return cart ? JSON.parse(cart) : [];
}

export function addToCart(item: CartItem) {
  const cart = getCart();

  const existingItem = cart.find((cartItem) => cartItem.id === item.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push(item);
  }

  localStorage.setItem(getCartKey(), JSON.stringify(cart));

  window.dispatchEvent(new Event("cartUpdated"));
}

export function removeFromCart(id: number) {
  const cart = getCart().filter((item) => item.id !== id);

  localStorage.setItem(getCartKey(), JSON.stringify(cart));

  window.dispatchEvent(new Event("cartUpdated"));
}

export function clearCart() {
  localStorage.removeItem(getCartKey());

  window.dispatchEvent(new Event("cartUpdated"));
}

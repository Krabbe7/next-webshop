import { CartItem } from "./cartHelper";

export function getCart(): CartItem[] {
  const cart = localStorage.getItem("cart");

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

  localStorage.setItem("cart", JSON.stringify(cart));
}

export function removeFromCart(id: number) {
  const cart = getCart().filter((item) => item.id !== id);

  localStorage.setItem("cart", JSON.stringify(cart));
}

export function clearCart() {
  localStorage.removeItem("cart");
}

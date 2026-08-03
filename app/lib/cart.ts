import type { CartItem } from "./cartHelper";

async function getCartKey() {
  try {
    const res = await fetch("http://localhost:5000/api/users/user", {
      credentials: "include",
    });

    if (res.ok) {
      const data = await res.json();

      return `cart_${data.user.id}`;
    }
  } catch (err) {
    console.error("Could not get user", err);
  }

  return "cart_guest";
}

export async function getCart(): Promise<CartItem[]> {
  const cartKey = await getCartKey();

  const cart = localStorage.getItem(cartKey);

  return cart ? JSON.parse(cart) : [];
}

export async function addToCart(item: CartItem) {
  const cartKey = await getCartKey();

  const cart = JSON.parse(localStorage.getItem(cartKey) || "[]");

  const existingItem = cart.find(
    (cartItem: CartItem) => cartItem.id === item.id,
  );

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push(item);
  }

  localStorage.setItem(cartKey, JSON.stringify(cart));

  window.dispatchEvent(new Event("cartUpdated"));
}

export async function removeFromCart(id: number) {
  const cartKey = await getCartKey();

  const cart = JSON.parse(localStorage.getItem(cartKey) || "[]");

  const updatedCart = cart.filter((item: CartItem) => item.id !== id);

  localStorage.setItem(cartKey, JSON.stringify(updatedCart));

  window.dispatchEvent(new Event("cartUpdated"));
}

export async function clearCart() {
  const cartKey = await getCartKey();

  localStorage.removeItem(cartKey);

  window.dispatchEvent(new Event("cartUpdated"));
}

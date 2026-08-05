"use client";

export function useCartQuantity() {
  async function updateQuantity(gameId: number, change: number) {
    let cartKey = "cart_guest";

    try {
      const res = await fetch("http://localhost:5000/api/users/user", {
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        cartKey = `cart_${data.user.id}`;
      }
    } catch {}

    const cart = JSON.parse(localStorage.getItem(cartKey) || "[]");

    const updated = cart.map((item: any) => {
      if (item.id !== gameId) return item;

      return {
        ...item,
        quantity: Math.max(1, item.quantity + change),
      };
    });

    localStorage.setItem(cartKey, JSON.stringify(updated));

    window.dispatchEvent(new Event("cartUpdated"));
  }

  return {
    updateQuantity,
  };
}

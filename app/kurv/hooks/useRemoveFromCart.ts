"use client";

export function useRemoveFromCart() {
  async function remove(gameId: number) {
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

    const updated = cart.filter((item: any) => item.id !== gameId);

    localStorage.setItem(cartKey, JSON.stringify(updated));

    window.dispatchEvent(new Event("cartUpdated"));
  }

  return {
    remove,
  };
}

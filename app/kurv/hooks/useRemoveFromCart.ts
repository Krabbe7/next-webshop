"use client";

export function useRemoveFromCart() {
  async function remove(gameId: number | string) {
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

    try {
      const cart = JSON.parse(localStorage.getItem(cartKey) || "[]");

      const updated = cart.filter(
        (item: any) => String(item.id) !== String(gameId),
      );

      localStorage.setItem(cartKey, JSON.stringify(updated));

      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      console.error("Kunne ikke fjerne vare fra kurven:", error);
    }
  }

  return {
    remove,
  };
}

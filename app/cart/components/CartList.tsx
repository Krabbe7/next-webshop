"use client";

import CartItem from "./CartItem";

import type { CartItem as CartItemType } from "../types";

type Props = {
  cart: CartItemType[];
  onRemove: (id: number) => void;
};

export default function CartList({ cart, onRemove }: Props) {
  return (
    <>
      {cart.map((item) => (
        <CartItem key={item.id} item={item} onRemove={onRemove} />
      ))}
    </>
  );
}

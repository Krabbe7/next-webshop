"use client";

import CartItem from "./CartItem";

import type { CartItem as CartItemType } from "../types";
import styles from "../cartPage.module.css";

type Props = {
  cart: CartItemType[];
  onRemove: (id: number) => void;
};

export default function CartList({ cart, onRemove }: Props) {
  return (
    <div className={styles.cartListContainer}>
      {cart.map((item) => (
        <CartItem key={item.id} item={item} onRemove={onRemove} />
      ))}
    </div>
  );
}

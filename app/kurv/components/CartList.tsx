"use client";

import CartItem from "./CartItem";

import type { PropsCartList } from "../types";
import styles from "../cartPage.module.css";

export default function CartList({ cart, onRemove }: PropsCartList) {
  return (
    <div className={styles.cartListContainer}>
      {cart.map((item) => (
        <CartItem key={item.id} item={item} onRemove={onRemove} />
      ))}
    </div>
  );
}

"use client";

import CartItem from "../cartItem/CartItem";

import type { PropsCartList } from "../../types";
import styles from "./cartList.module.css";
import EmptyCart from "../emptyCart/EmptyCart";

export default function CartList({ cart, onRemove }: PropsCartList) {
  return (
    <div className={styles.cartListContainer}>
      {cart.length > 0 ? (
        cart.map((item) => (
          <CartItem key={item.id} item={item} onRemove={onRemove} />
        ))
      ) : (
        <EmptyCart />
      )}
    </div>
  );
}

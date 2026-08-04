"use client";

import Image from "next/image";

import styles from "../cartPage.module.css";

import type { CartItem as CartItemType } from "../types";

type Props = {
  item: CartItemType;
  onRemove: (id: number) => void;
};

export default function CartItem({ item, onRemove }: Props) {
  return (
    <article className={styles.cartItem}>
      <div className={styles.imageWrapper}>
        <Image
          src={item.image_url}
          alt={item.title}
          width={120}
          height={150}
          className={styles.image}
        />
      </div>

      <div className={styles.info}>
        <h3 className={styles.title}>{item.title}</h3>

        <p className={styles.price}>{item.price} kr.</p>

        <p className={styles.quantity}>
          Antal: <strong>{item.quantity}</strong>
        </p>

        <p className={styles.subtotal}>
          Delsum: {item.price * item.quantity} kr.
        </p>

        <button
          className={styles.removeButton}
          onClick={() => onRemove(item.id)}
        >
          Fjern fra kurv
        </button>
      </div>
    </article>
  );
}

"use client";

import Image from "next/image";

import styles from "../cartPage.module.css";

import type { CartItem as CartItemType } from "../types";
import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import { useCartQuantity } from "../hooks/useCartQuantity";
import { PropsCartItem } from "../types";

export default function CartItem({ item, onRemove }: PropsCartItem) {
  const { updateQuantity } = useCartQuantity();
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

        <div className={styles.quantityBox}>
          <button
            className={styles.quantityButton}
            onClick={() => updateQuantity(item.id, -1)}
          >
            <FiMinus />
          </button>

          <span>{item.quantity}</span>

          <button
            className={styles.quantityButton}
            onClick={() => updateQuantity(item.id, 1)}
          >
            <FiPlus />
          </button>
        </div>

        <p className={styles.subtotal}>
          I alt: {item.price * item.quantity} kr.
        </p>

        <button
          className={styles.removeButton}
          onClick={() => onRemove(item.id)}
        >
          <FiTrash2 />
          Fjern
        </button>
      </div>
    </article>
  );
}

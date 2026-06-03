"use client";

import styles from "../page.module.css";
import { addToCart } from "../lib/cart";

type Props = {
  game: {
    id: number;
    title: string;
    price: number;
    image_url?: string;
  };
};

export default function AddToCartButton({ game }: Props) {
  return (
    <button
      className={styles.button}
      onClick={(e) => {
        e.preventDefault();

        addToCart({
          id: game.id,
          title: game.title,
          price: game.price,
          image_url: game.image_url,
          quantity: 1,
        });

        window.dispatchEvent(new Event("cartUpdated"));
      }}
    >
      Tilføj til kurv
    </button>
  );
}

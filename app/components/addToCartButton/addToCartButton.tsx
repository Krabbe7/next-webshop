"use client";

import { addToCart } from "../../lib/cart";
import styles from "./addToCartButton.module.css";

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
      onClick={async (e) => {
        e.preventDefault();

        await addToCart({
          id: game.id,
          title: game.title,
          price: game.price,
          image_url: game.image_url,
          quantity: 1,
        });
      }}
    >
      Tilføj til kurv
    </button>
  );
}

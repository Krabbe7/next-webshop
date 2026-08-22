"use client";

import { addToCart } from "../../lib/cart";
import styles from "./addToCartButton.module.css";
import { PropsAadToCart } from "./types";

export default function AddToCartButton({ game }: PropsAadToCart) {
  return (
    <button
      className="button"
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

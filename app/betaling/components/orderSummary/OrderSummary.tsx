import Image from "next/image";
import styles from "../../checkout.module.css";
import { PropsOrderSummary } from "./types";

export function OrderSummary({
  cart,
  subtotal,
  shipping,
  total,
  pickup,
  onCheckout,
}: PropsOrderSummary) {
  return (
    <aside className={styles.summarySection}>
      <div className={styles.orderCard}>
        <div className={styles.orderHeader}>
          <h2>Din ordre</h2>
        </div>

        {cart.map((item) => (
          <div className={styles.orderItem} key={item.id}>
            <div className={styles.orderProduct}>
              <Image
                src={item.image_url}
                alt={item.title}
                width={60}
                height={80}
                className={styles.orderImage}
              />

              <div className={styles.orderInfo}>
                <p>{item.title}</p>
              </div>
            </div>

            <div className={styles.orderPrice}>{item.price} kr.</div>
          </div>
        ))}

        <div className={styles.summaryRow}>
          <span>Subtotal</span>
          <span>{subtotal} kr</span>
        </div>

        <div className={styles.summaryRow}>
          <span>Levering</span>
          <span>{shipping} kr</span>
        </div>

        {pickup && (
          <div className={styles.summaryRow}>
            <span>Pakkeshop</span>
            <span>{pickup.name}</span>
          </div>
        )}

        <div className={styles.totalRow}>
          <span>I alt</span>
          <span>{total} kr</span>
        </div>

        {onCheckout && (
          <div className="centerButtonContainer">
            <button
              className={`button ${cart.length === 0 ? "disabled" : ""}`}
              disabled={cart.length === 0}
              onClick={onCheckout}
            >
              Gennemfør køb
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}

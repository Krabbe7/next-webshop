import type { CartItem, PickupPoint } from "../types";
import styles from "../checkout.module.css";

type Props = {
  cart: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  pickup: PickupPoint | null;
};

export function OrderSummary({
  cart,
  subtotal,
  shipping,
  total,
  pickup,
}: Props) {
  return (
    <aside className={styles.summarySection}>
      <div className={styles.orderCard}>
        <div className={styles.orderHeader}>
          <h2>Din ordre</h2>
        </div>

        {cart.map((item) => (
          <div className={styles.orderItem} key={item.id}>
            <div className={styles.orderInfo}>
              <p>{item.title}</p>
            </div>

            <div className={styles.orderPrice}>{item.price}</div>
          </div>
        ))}

        <div className={styles.summaryRow}>
          <span>Subtotal</span>
          <span>{subtotal}</span>
        </div>

        <div className={styles.summaryRow}>
          <span>Levering</span>
          <span>{shipping}</span>
        </div>

        {pickup && (
          <div className={styles.summaryRow}>
            <span>Pakkeshop</span>
            <span>{pickup.name}</span>
          </div>
        )}

        <div className={styles.totalRow}>
          <span>Total</span>
          <span>{total}</span>
        </div>
      </div>
    </aside>
  );
}

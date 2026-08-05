import type { Shipping } from "../types";
import styles from "../checkout.module.css";
type Props = {
  methods: Shipping[];
  selected: Shipping;
  onChange: (m: Shipping) => void;
};

export function ShippingSelector({ methods, selected, onChange }: Props) {
  return (
    <section className={styles.card}>
      <h2>Levering</h2>

      {methods.map((m) => (
        <label key={m.id} className={styles.shippingName}>
          {m.name} - {m.price} kr.
          <input
            className={styles.radio}
            type="radio"
            checked={selected.id === m.id}
            onChange={() => onChange(m)}
          />
        </label>
      ))}
    </section>
  );
}

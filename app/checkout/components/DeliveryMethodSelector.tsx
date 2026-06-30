import type { DeliveryMethod } from "../types";
import styles from "../checkout.module.css";
type Props = {
  methods: DeliveryMethod[];
  selected: DeliveryMethod;
  onChange: (m: DeliveryMethod) => void;
};

export function DeliveryMethodSelector({ methods, selected, onChange }: Props) {
  return (
    <section className={styles.card}>
      <h2>Levering</h2>

      {methods.map((m) => (
        <label key={m.id}>
          <input
            className={styles.input}
            type="radio"
            checked={selected.id === m.id}
            onChange={() => onChange(m)}
          />
          {m.name} - {m.price} kr.
        </label>
      ))}
    </section>
  );
}

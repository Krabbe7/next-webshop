import type { PickupPoint } from "../types";
import styles from "../checkout.module.css";

type Props = {
  points: PickupPoint[];
  loading: boolean;
  selected: PickupPoint | null;
  onSelect: (p: PickupPoint) => void;
  visible: boolean;
  error?: string;
};

export function PickupPointSelector({
  points,
  loading,
  selected,
  onSelect,
  visible,
  error,
}: Props) {
  if (!visible) return null;

  return (
    <section className={styles.card}>
      <h2>Vælg pakkeshop</h2>

      {loading && <p>Finder pakkeshops...</p>}

      {points.map((p) => (
        <label key={p.id}>
          <input
            className={styles.input}
            type="radio"
            checked={selected?.id === p.id}
            onChange={() => onSelect(p)}
          />

          <div>
            <strong>{p.name}</strong>
            <br />
            <small>{p.address}</small>
          </div>
        </label>
      ))}

      {/* ERROR DISPLAY */}
      {error && <p className="error">{error}</p>}
    </section>
  );
}

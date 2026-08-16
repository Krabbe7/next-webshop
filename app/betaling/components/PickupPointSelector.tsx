import type { PickupPoint } from "../types";
import styles from "../checkout.module.css";

type Props = {
  points: PickupPoint[];
  loading: boolean;
  selected: PickupPoint | null;
  onSelect: (p: PickupPoint) => void;
  visible: boolean;
  error?: string;
  address: string;
};

export function PickupPointSelector({
  points,
  loading,
  selected,
  onSelect,
  visible,
  error,
  address,
}: Props) {
  if (!visible) return null;

  return (
    <section className={styles.card}>
      <h2>Vælg pakkeshop</h2>

      {address.trim() === "" ? (
        <p className={styles.typeAdressText}>
          Indtast adresse for at vælge afhentingssted
        </p>
      ) : (
        <>
          {loading && (
            <p className={styles.typeAdressText}>Finder pakkeshops...</p>
          )}

          {points.map((p) => (
            <label key={p.id} className={styles.pickUpPointName}>
              <div className={styles.pickUpPointContainer}>
                <div className={styles.pickUpPointAddress}>
                  <strong>{p.name}</strong>
                  <br />
                  <small>{p.address}</small>
                </div>

                <input
                  className={styles.radio}
                  type="radio"
                  checked={selected?.id === p.id}
                  onChange={() => onSelect(p)}
                />
              </div>
            </label>
          ))}

          {error && <p className="error">{error}</p>}
        </>
      )}
    </section>
  );
}

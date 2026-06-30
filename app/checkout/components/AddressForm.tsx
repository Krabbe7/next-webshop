import type { FormProps } from "../types";
import styles from "../checkout.module.css";

export type AddressFormState = {
  street: string;
  postalCode: string;
  city: string;
  country: string;
};

export function AddressForm({
  value,
  onChange,
  errors,
}: FormProps<AddressFormState>) {
  return (
    <section className={styles.card}>
      <h2>Adresse</h2>

      <input
        className={styles.input}
        placeholder="Adresse"
        value={value.street}
        onChange={(e) => onChange({ ...value, street: e.target.value })}
      />
      {errors?.street && <p>{errors.street}</p>}

      <input
        className={styles.input}
        placeholder="Postnummer"
        value={value.postalCode}
        onChange={(e) => onChange({ ...value, postalCode: e.target.value })}
      />
      {errors?.postalCode && <p>{errors.postalCode}</p>}

      <input
        className={styles.input}
        placeholder="By"
        value={value.city}
        onChange={(e) => onChange({ ...value, city: e.target.value })}
      />
      {errors?.city && <p>{errors.city}</p>}

      <input
        className={styles.input}
        placeholder="Land"
        value={value.country}
        onChange={(e) => onChange({ ...value, country: e.target.value })}
      />
      {errors?.country && <p>{errors.country}</p>}
    </section>
  );
}

import type { FormProps, AddressFormState } from "../../types";
import styles from "../../checkout.module.css";

export function AddressForm({
  value,
  onChange,
  errors,
}: FormProps<AddressFormState>) {
  return (
    <section className={styles.card}>
      <h2>Adresse</h2>

      <input
        className="input"
        placeholder="Adresse"
        value={value.street}
        onChange={(e) => onChange({ ...value, street: e.target.value })}
      />
      {errors?.street && <p>{errors.street}</p>}

      <input
        className="input"
        placeholder="Postnummer"
        value={value.postalCode}
        maxLength={4}
        onChange={(e) => onChange({ ...value, postalCode: e.target.value })}
      />
      {errors?.postalCode && <p>{errors.postalCode}</p>}

      <input
        className="input"
        placeholder="By"
        value={value.city}
        onChange={(e) => onChange({ ...value, city: e.target.value })}
      />
      {errors?.city && <p>{errors.city}</p>}

      <input
        className="input"
        placeholder="Land"
        value={value.country}
        onChange={(e) => onChange({ ...value, country: e.target.value })}
      />
      {errors?.country && <p>{errors.country}</p>}
    </section>
  );
}

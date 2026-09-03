import type { FormProps, AddressFormState } from "../../types";
import styles from "../../checkout.module.css";

import ErrorMessage from "@/app/components/errorMessage/errorMessage";

export function AddressForm({
  value,
  onChange,
  errors,
}: FormProps<AddressFormState>) {
  return (
    <section className={styles.card}>
      <h2>Adresse</h2>

      <div className={styles.field}>
        <input
          className="input"
          placeholder="Adresse"
          value={value.street}
          onChange={(e) =>
            onChange({
              ...value,
              street: e.target.value,
            })
          }
        />

        <ErrorMessage message={errors?.street} />
      </div>

      <div className={styles.field}>
        <input
          className="input"
          placeholder="Postnummer"
          value={value.postalCode}
          maxLength={4}
          onChange={(e) =>
            onChange({
              ...value,
              postalCode: e.target.value,
            })
          }
        />

        <ErrorMessage message={errors?.postalCode} />
      </div>

      <div className={styles.field}>
        <input
          className="input"
          placeholder="By"
          value={value.city}
          onChange={(e) =>
            onChange({
              ...value,
              city: e.target.value,
            })
          }
        />

        <ErrorMessage message={errors?.city} />
      </div>

      <div className={styles.field}>
        <input
          className="input"
          placeholder="Land"
          value={value.country}
          onChange={(e) =>
            onChange({
              ...value,
              country: e.target.value,
            })
          }
        />

        <ErrorMessage message={errors?.country} />
      </div>
    </section>
  );
}

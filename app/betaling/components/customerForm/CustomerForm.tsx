import type { FormProps, CustomerFormState } from "../../types";
import styles from "../../checkout.module.css";

import ErrorMessage from "@/app/components/errorMessage/errorMessage";
export function CustomerForm({
  value,
  onChange,
  errors,
}: FormProps<CustomerFormState>) {
  return (
    <section className={styles.card}>
      <h2>Kundeoplysninger</h2>

      <div className={styles.field}>
        <input
          className="input"
          placeholder="Fulde navn"
          value={value.name}
          onChange={(e) =>
            onChange({
              ...value,
              name: e.target.value,
            })
          }
        />

        <ErrorMessage message={errors?.name} />
      </div>

      <div className={styles.field}>
        <input
          className="input"
          placeholder="Email"
          value={value.email}
          onChange={(e) =>
            onChange({
              ...value,
              email: e.target.value,
            })
          }
        />

        <ErrorMessage message={errors?.email} />
      </div>

      <div className={styles.field}>
        <input
          className="input"
          placeholder="Telefon"
          value={value.phone}
          onChange={(e) =>
            onChange({
              ...value,
              phone: e.target.value,
            })
          }
        />

        <ErrorMessage message={errors?.phone} />
      </div>
    </section>
  );
}

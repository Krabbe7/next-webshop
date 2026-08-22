import type { FormProps, CustomerFormState } from "../../types";
import styles from "../../checkout.module.css";

export function CustomerForm({
  value,
  onChange,
  errors,
}: FormProps<CustomerFormState>) {
  return (
    <section className={styles.card}>
      <h2>Kundeoplysninger</h2>

      <input
        className={styles.input}
        placeholder="Fulde navn"
        value={value.name}
        onChange={(e) => onChange({ ...value, name: e.target.value })}
      />
      {errors?.name && <p>{errors.name}</p>}

      <input
        className={styles.input}
        placeholder="Email"
        value={value.email}
        onChange={(e) => onChange({ ...value, email: e.target.value })}
      />
      {errors?.email && <p>{errors.email}</p>}

      <input
        className={styles.input}
        placeholder="Telefon"
        value={value.phone}
        onChange={(e) => onChange({ ...value, phone: e.target.value })}
      />
      {errors?.phone && <p>{errors.phone}</p>}
    </section>
  );
}

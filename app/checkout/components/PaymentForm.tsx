import type { FormProps } from "../types";
import styles from "../checkout.module.css";
export type PaymentFormState = {
  cardNumber: string;
  expiry: string;
  cvv: string;
};

export function PaymentForm({
  value,
  onChange,
  errors,
}: FormProps<PaymentFormState>) {
  return (
    <section className={styles.card}>
      <h2>Betaling</h2>

      <input
        className={styles.input}
        placeholder="Kortnummer"
        value={value.cardNumber}
        onChange={(e) => onChange({ ...value, cardNumber: e.target.value })}
      />
      {errors?.cardNumber && <p>{errors.cardNumber}</p>}

      <input
        className={styles.input}
        placeholder="MM/ÅÅ"
        value={value.expiry}
        onChange={(e) => onChange({ ...value, expiry: e.target.value })}
      />
      {errors?.expiry && <p>{errors.expiry}</p>}

      <input
        className={styles.input}
        placeholder="CVV"
        value={value.cvv}
        onChange={(e) => onChange({ ...value, cvv: e.target.value })}
      />
      {errors?.cvv && <p>{errors.cvv}</p>}
    </section>
  );
}

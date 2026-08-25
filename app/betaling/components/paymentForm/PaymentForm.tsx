import type { FormProps, PaymentFormState } from "../../types";
import styles from "../../checkout.module.css";
import {
  formatCardNumber,
  formatCardExpiry,
  formatCvv,
} from "../inputValidation/inputValidation";

export function PaymentForm({
  value,
  onChange,
  errors,
}: FormProps<PaymentFormState>) {
  return (
    <section className={styles.card}>
      <h2>Betaling</h2>

      <input
        className="input"
        placeholder="Kortnummer"
        value={value.cardNumber}
        onChange={(e) =>
          onChange({
            ...value,
            cardNumber: formatCardNumber(e.target.value),
          })
        }
      />
      {errors?.cardNumber && (
        <p className={styles.error}>{errors.cardNumber}</p>
      )}

      <input
        className="input"
        placeholder="MM/ÅÅ"
        value={value.expiry}
        onChange={(e) =>
          onChange({
            ...value,
            expiry: formatCardExpiry(e.target.value),
          })
        }
      />
      {errors?.expiry && <p className={styles.error}>{errors.expiry}</p>}

      <input
        className="input"
        placeholder="CVV"
        value={value.cvv}
        onChange={(e) =>
          onChange({
            ...value,
            cvv: formatCvv(e.target.value),
          })
        }
      />
      {errors?.cvv && <p className={styles.error}>{errors.cvv}</p>}
    </section>
  );
}

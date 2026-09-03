import type { FormProps, PaymentFormState } from "../../types";
import styles from "../../checkout.module.css";

import ErrorMessage from "@/app/components/errorMessage/errorMessage";

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

      <div className={styles.field}>
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

        <ErrorMessage message={errors?.cardNumber} />
      </div>

      <div className={styles.field}>
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

        <ErrorMessage message={errors?.expiry} />
      </div>

      <div className={styles.field}>
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

        <ErrorMessage message={errors?.cvv} />
      </div>
    </section>
  );
}

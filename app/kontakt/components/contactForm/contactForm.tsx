"use client";

import { FormEvent, useState } from "react";
import styles from "./contactForm.module.css";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSubmitted(true);
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label htmlFor="name">Navn</label>

        <input
          id="name"
          name="name"
          type="text"
          placeholder="Dit navn"
          required
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="email">E-mail</label>

        <input
          id="email"
          name="email"
          type="email"
          placeholder="Din Mail"
          required
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="subject">Emne</label>

        <select id="subject" name="subject" defaultValue="" required>
          <option value="" disabled>
            Vælg emne
          </option>

          <option value="product">Spørgsmål om produkt</option>
          <option value="order">Min ordre</option>
          <option value="shipping">Levering</option>
          <option value="return">Returnering</option>
          <option value="other">Andet</option>
        </select>
      </div>

      <div className={styles.field}>
        <label htmlFor="message">Besked</label>

        <textarea
          id="message"
          name="message"
          rows={6}
          placeholder="Skriv din besked..."
          required
        />
      </div>

      <button type="submit" className={styles.button}>
        Send besked
      </button>

      {submitted && (
        <p className={styles.success}>
          Tak for din besked! Vi vender tilbage hurtigst muligt.
        </p>
      )}
    </form>
  );
}

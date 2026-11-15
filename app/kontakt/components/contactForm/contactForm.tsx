"use client";

import { FormEvent, useState } from "react";
import styles from "./contactForm.module.css";

import ErrorMessage from "@/app/components/errorMessage/errorMessage";
import { isValidEmail } from "@/app/betaling/components/inputValidation/inputValidation";

type ContactErrors = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const [errors, setErrors] = useState<ContactErrors>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const name = formData.get("name")?.toString().trim() || "";
    const email = formData.get("email")?.toString().trim() || "";
    const subject = formData.get("subject")?.toString() || "";
    const message = formData.get("message")?.toString().trim() || "";

    const newErrors: ContactErrors = {
      name: "",
      email: "",
      subject: "",
      message: "",
    };

    if (!name) {
      newErrors.name = "Navn skal udfyldes.";
    }

    if (!email) {
      newErrors.email = "E-mail skal udfyldes.";
    } else if (!isValidEmail(email)) {
      newErrors.email = "Indtast en gyldig e-mail.";
    }

    if (!subject) {
      newErrors.subject = "Vælg venligst et emne.";
    }

    if (!message) {
      newErrors.message = "Besked skal udfyldes.";
    } else if (message.length < 10) {
      newErrors.message = "Beskeden skal være mindst 10 tegn.";
    }

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((error) => error !== "");

    if (hasErrors) {
      setSubmitted(false);
      return;
    }

    setSubmitted(true);
    event.currentTarget.reset();
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
          onChange={() =>
            setErrors((prev) => ({
              ...prev,
              name: "",
            }))
          }
        />

        <ErrorMessage message={errors.name} />
      </div>

      <div className={styles.field}>
        <label htmlFor="email">E-mail</label>

        <input
          id="email"
          name="email"
          type="email"
          placeholder="Din mail"
          onChange={() =>
            setErrors((prev) => ({
              ...prev,
              email: "",
            }))
          }
        />

        <ErrorMessage message={errors.email} />
      </div>

      <div className={styles.field}>
        <label htmlFor="subject">Emne</label>

        <select
          id="subject"
          className={styles.select}
          name="subject"
          defaultValue=""
          onChange={() =>
            setErrors((prev) => ({
              ...prev,
              subject: "",
            }))
          }
        >
          <option value="" disabled>
            Vælg emne
          </option>

          <option value="product">Spørgsmål om produkt</option>
          <option value="order">Min ordre</option>
          <option value="shipping">Levering</option>
          <option value="return">Returnering</option>
          <option value="other">Andet</option>
        </select>

        <ErrorMessage message={errors.subject} />
      </div>

      <div className={styles.field}>
        <label htmlFor="message">Besked</label>

        <textarea
          id="message"
          name="message"
          rows={6}
          placeholder="Skriv din besked..."
          onChange={() =>
            setErrors((prev) => ({
              ...prev,
              message: "",
            }))
          }
        />

        <ErrorMessage message={errors.message} />
      </div>

      <div className="centerButtonContainer">
        <button type="submit" className="button">
          Send besked
        </button>
      </div>

      {submitted && (
        <p className={styles.success}>
          Tak for din besked! Vi vender tilbage hurtigst muligt.
        </p>
      )}
    </form>
  );
}

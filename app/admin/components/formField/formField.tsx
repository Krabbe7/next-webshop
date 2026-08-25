import React from "react";
import styles from "./form.module.css";
import { PropsFormField } from "./types";

export function FormField({ name, value, onChange }: PropsFormField) {
  const labels: Record<string, string> = {
    title: "Spiltitel",
    description: "Beskrivelse",
    price: "Pris",
    genre: "Genre",
    platform: "Platform",
    image_url: "Spil poster",
    release_year: "Udgivelsesår",
    stock: "Antal på lager",
    name: "Navn",
    role: "Rolle",
    email: "Email",
    phone_number: "Telefonnummer",
    employee_img: "Billede af ansat",
  };

  const placeholders: Record<string, string> = {
    title: "Spiltitel",
    description: "Beskrivelse",
    price: "Pris",
    genre: "Genre",
    platform: "Platform",
    image_url: "Filnavn på billede (fx GTA6)",
    release_year: "Udgivelsesår",
    stock: "Antal på lager",
    name: "Navn",
    role: "Rolle",
    email: "Email",
    phone_number: "Telefonnummer",
    employee_img: "Filnavn på billede (brug ansats navn f.eks John)",
  };

  const inputTypes: Record<string, string> = {
    price: "number",
    stock: "number",
    release_year: "number",
  };

  const label = labels[name] ?? name;
  const placeholder = placeholders[name] ?? "";
  const type = inputTypes[name] ?? "text";

  if (name === "description") {
    return (
      <div className={styles.field}>
        <label className={styles.label} htmlFor={name}>
          {label}
        </label>

        <textarea
          className={styles.textarea}
          id={name}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          rows={6}
        />
      </div>
    );
  }

  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>

      <input
        className="input"
        id={name}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
}

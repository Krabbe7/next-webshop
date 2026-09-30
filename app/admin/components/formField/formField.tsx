import React from "react";
import styles from "./form.module.css";
import { PropsFormField } from "./types";

export function FormField({ name, value, onChange, options }: PropsFormField) {
  const labels: Record<string, string> = {
    title: "Spiltitel",
    description: "Beskrivelse",
    genreIds: "Genrer",
    platformIds: "Platforme",
    image_url: "Spil poster",
    price: "Pris",
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
    image_url: "Filnavn på billede (fx GTA6)",
    price: "Pris",
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

  /*
   * Genre- og platformfelter
   */
  if (name === "genreIds" || name === "platformIds") {
    const selectedIds: number[] = Array.isArray(value) ? value : [];

    const handleCheckboxChange = (id: number) => {
      const newValue = selectedIds.includes(id)
        ? selectedIds.filter((selectedId) => selectedId !== id)
        : [...selectedIds, id];

      onChange(name, newValue);
    };

    return (
      <div className={styles.field}>
        <label className={styles.label}>{label}</label>

        <div className={styles.checkboxGroup}>
          {(options ?? []).map((option) => (
            <label key={option.id} className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={selectedIds.includes(option.id)}
                onChange={() => handleCheckboxChange(option.id)}
              />

              <span className={styles.checkboxName}>{option.name}</span>
            </label>
          ))}
        </div>
      </div>
    );
  }

  /*
   * Beskrivelse
   */
  if (name === "description") {
    const textValue = typeof value === "string" ? value : "";

    return (
      <div className={styles.field}>
        <label className={styles.label} htmlFor={name}>
          {label}
        </label>

        <textarea
          className={styles.textarea}
          id={name}
          name={name}
          value={textValue}
          placeholder={placeholder}
          onChange={(e) => onChange(name, e.target.value)}
          rows={6}
        />
      </div>
    );
  }

  /*
   * Almindelige inputs
   */
  const inputValue =
    typeof value === "number" || typeof value === "string" ? value : "";

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
        value={inputValue}
        placeholder={placeholder}
        onChange={(e) => {
          const newValue =
            type === "number" ? Number(e.target.value) : e.target.value;

          onChange(name, newValue);
        }}
      />
    </div>
  );
}

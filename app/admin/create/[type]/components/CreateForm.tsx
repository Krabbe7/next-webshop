import React from "react";
import { FormField } from "@/app/admin/components/formField/formField";
import styles from "../create.module.css";
import { PropsCreateForm } from "./types";

export function CreateForm({
  config,
  formData,
  platforms,
  genres,
  onChange,
  onSubmit,
}: PropsCreateForm) {
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      {config.fields.map((field) => {
        let options = undefined;

        if (field === "platformIds") {
          options = platforms;
        }

        if (field === "genreIds") {
          options = genres;
        }

        return (
          <FormField
            key={field}
            name={field}
            value={formData[field]}
            onChange={onChange}
            options={options}
          />
        );
      })}

      <button className={styles.submitButton} type="submit">
        Opret
      </button>
    </form>
  );
}

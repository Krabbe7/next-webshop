import React from "react";

import { FormField } from "@/app/admin/components/formField/formField";

import styles from "../create.module.css";
import { PropsCreateForm } from "./types";

export function CreateForm({
  config,
  formData,
  onChange,
  onSubmit,
}: PropsCreateForm) {
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      {config.fields.map((field) => (
        <FormField
          key={field}
          name={field}
          value={formData[field] || ""}
          onChange={onChange}
        />
      ))}
      <button className={styles.submitButton} type="submit">
        Opret
      </button>
    </form>
  );
}

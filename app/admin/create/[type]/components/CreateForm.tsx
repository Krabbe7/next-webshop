import React from "react";

import { FormField } from "@/app/admin/components/formField";

import type { CreateConfig, FormData } from "../types";
import styles from "../create.module.css";

type Props = {
  config: CreateConfig;
  formData: FormData;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onSubmit: (e: React.FormEvent) => void;
};

export function CreateForm({ config, formData, onChange, onSubmit }: Props) {
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

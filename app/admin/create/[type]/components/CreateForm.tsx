import React from "react";

import type { CreateConfig, FormData } from "../types";

import { FormField } from "./FormField";

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
    <form
      onSubmit={onSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        maxWidth: "600px",
      }}
    >
      {config.fields.map((field) => (
        <FormField
          key={field}
          name={field}
          value={formData[field] || ""}
          onChange={onChange}
        />
      ))}

      <button type="submit">Opret</button>
    </form>
  );
}

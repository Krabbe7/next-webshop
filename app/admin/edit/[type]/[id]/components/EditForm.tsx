import styles from "../edit.module.css";

import { FormField } from "@/app/admin/components/formField/formField";

import type { PropsEditForm } from "./types";

export function EditForm({ config, item, onChange, onSubmit }: PropsEditForm) {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    onChange((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form onSubmit={onSubmit}>
      {config.fields.map((field) => (
        <FormField
          key={field}
          name={field}
          value={item[field] ?? ""}
          onChange={handleChange}
        />
      ))}

      <button className={styles.submitButton} type="submit">
        Gem ændringer
      </button>
    </form>
  );
}

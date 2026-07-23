import styles from "../edit.module.css";

import { FormField } from "../components/FormField";

import type { EditConfig, FormData } from "../types";

type Props = {
  config: EditConfig;
  item: FormData;
  onChange: React.Dispatch<React.SetStateAction<FormData | null>>;
  onSubmit: (e: React.FormEvent) => void;
};

export function EditForm({ config, item, onChange, onSubmit }: Props) {
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

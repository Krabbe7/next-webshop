import styles from "../edit.module.css";
import { FormField } from "@/app/admin/components/formField/formField";
import type { FormData, FormFieldValue } from "@/app/admin/types";
import type { PropsEditForm } from "./types";

export function EditForm({
  config,
  item,
  platforms,
  genres,
  onChange,
  onSubmit,
}: PropsEditForm) {
  const handleChange = (name: string, value: FormFieldValue) => {
    onChange((prev) => ({
      ...(prev ?? {}),
      [name]: value,
    }));
  };

  return (
    <form onSubmit={onSubmit}>
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
            value={item[field]}
            onChange={handleChange}
            options={options}
          />
        );
      })}

      <button className={styles.submitButton} type="submit">
        Gem ændringer
      </button>
    </form>
  );
}

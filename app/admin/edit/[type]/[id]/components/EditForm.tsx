import type { EditConfig, FormData } from "../types";
import { FormField } from "./FormField";

type Props = {
  config: EditConfig;
  item: FormData;
  onChange: (item: FormData) => void;
  onSubmit: (e: React.FormEvent) => void;
};

export function EditForm({ config, item, onChange, onSubmit }: Props) {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    onChange({
      ...item,
      [name]: value,
    });
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

      <button type="submit">Gem ændringer</button>
    </form>
  );
}

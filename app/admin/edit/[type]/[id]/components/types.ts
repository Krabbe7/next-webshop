import type { EditConfig, FormData } from "../types";

export type PropsEditForm = {
  config: EditConfig;
  item: FormData;
  onChange: React.Dispatch<React.SetStateAction<FormData | null>>;
  onSubmit: (e: React.FormEvent) => void;
};

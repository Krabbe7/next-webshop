import type { EditConfig } from "../types";

import type { FormData } from "@/app/admin/types";

export type SelectOption = {
  id: number;
  name: string;
};

export type PropsEditForm = {
  config: EditConfig;
  item: FormData;
  platforms: SelectOption[];
  genres: SelectOption[];
  onChange: React.Dispatch<React.SetStateAction<FormData | null>>;
  onSubmit: (e: React.FormEvent) => void;
};

import type { CreateConfig } from "../types";

import type { FormData, FormFieldValue } from "@/app/admin/types";

export type SelectOption = {
  id: number;
  name: string;
};

export type PropsCreateForm = {
  config: CreateConfig;
  formData: FormData;
  platforms: SelectOption[];
  genres: SelectOption[];
  onChange: (name: string, value: FormFieldValue) => void;
  onSubmit: (e: React.FormEvent) => void;
};

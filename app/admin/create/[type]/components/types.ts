import type { CreateConfig, FormData } from "../types";
export type PropsCreateForm = {
  config: CreateConfig;
  formData: FormData;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onSubmit: (e: React.FormEvent) => void;
};

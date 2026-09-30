import type { FormFieldValue } from "@/app/admin/types";

export type SelectOption = {
  id: number;
  name: string;
};

export type PropsFormField = {
  name: string;
  value: FormFieldValue;
  onChange: (name: string, value: FormFieldValue) => void;
  options?: SelectOption[];
};

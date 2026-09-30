import type { FormData } from "@/app/admin/types";

export type CreateConfig = {
  title: string;
  api: string;
  createTitle: string;
  fields: string[];
};

export type CreateParams = {
  type: string;
};

export type SelectOption = {
  id: number;
  name: string;
};

export type CreateFormData = FormData;

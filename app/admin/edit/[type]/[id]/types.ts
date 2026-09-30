import type { FormData } from "@/app/admin/types";

export type EditConfig = {
  title: string;
  api: string;
  fields: string[];
};

export type EditParams = {
  type: string;
  id: string;
};

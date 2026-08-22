import type { FormData, EditConfig } from "../../types";

export type PropsUseEditSubmit = {
  config: EditConfig;
  item: FormData;
  id: string;
  type: string;
};

// ======================
// FORM DATA (EDIT/CREATE)
// ======================

export type FormData = Record<string, string>;

// ======================
// EDIT CONFIG
// ======================

export type EditConfig = {
  title: string;
  api: string;
  fields: string[];
};

// ======================
// ROUTE PARAMS (EDIT PAGE)
// ======================

export type EditParams = {
  type: string;
  id: string;
};

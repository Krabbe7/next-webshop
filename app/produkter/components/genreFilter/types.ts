export type FilterOption = {
  id: number;
  name: string;
};

export type PropsGenreFilter = {
  value: string;
  onChange: (value: string) => void;
  options: FilterOption[];
};

export type FilterOption = {
  id: number;
  name: string;
};

export type PropsPlatformFilter = {
  value: string;
  onChange: (value: string) => void;
  options: FilterOption[];
};

export type PropsSortSelected = {
  value: SortOption;
  onChange: (value: SortOption) => void;
};

export type SortOption = "" | "title" | "price-low" | "price-high";

export type Filters = {
  search: string;
  platform: string;
  genre: string;
  sort: SortOption;
};

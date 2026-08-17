export type Game = {
  id: number;
  title: string;
  description: string;
  price: number;
  genre: string;
  platform: string;
  image_url: string;
  release_year: number;
  stock: number;
  
};

export type SortOption = "" | "title" | "price-low" | "price-high";

export type Filters = {
  search: string;
  platform: string;
  genre: string;
  sort: SortOption;
};

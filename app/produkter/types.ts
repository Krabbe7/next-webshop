export type GameRelation = {
  id: number;
  name: string;
};

export type Game = {
  id: number;
  title: string;
  description: string;
  price: number;
  image_url: string;
  release_year: number;
  stock: number;

  platforms: GameRelation[];
  genres: GameRelation[];

  platformIds: number[];
  genreIds: number[];
};

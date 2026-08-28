import { Game } from "@/app/produkter/types";
export type Rating = {
  average: number | null;
  total: number;
};

export type FeaturedGame = Game & {
  rating: number | null;
  ratingTotal: number;
};

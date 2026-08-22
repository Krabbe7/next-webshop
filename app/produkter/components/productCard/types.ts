import type { Game } from "../../types";

export type PropsProductCard = {
  game: Game;
  onFavoriteRemove?: (id: number) => void;
};

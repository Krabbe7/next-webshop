"use client";

import SearchBar from "./SearchBar";
import PlatformFilter from "./PlatformFilter";
import GenreFilter from "./GenreFilter";
import SortSelector from "./SortSelector";
import ProductGrid from "./ProductGrid";
import styles from "../products.module.css";

import { useGameFilters } from "../hooks/useGameFilters";

import type { Game } from "../types";

type Props = {
  games: Game[];
};

export default function ProductSearch({ games }: Props) {
  const platforms = [...new Set(games.map((g) => g.platform))];
  const genres = [...new Set(games.map((g) => g.genre))];

  const {
    search,
    setSearch,
    platform,
    setPlatform,
    genre,
    setGenre,
    sort,
    setSort,
    filteredGames,
  } = useGameFilters(games);

  return (
    <>
      <div className={styles.productsContent}>
        <div className={styles.filters}>
          <SearchBar value={search} onChange={setSearch} />

          <PlatformFilter
            value={platform}
            onChange={setPlatform}
            options={platforms}
          />

          <GenreFilter value={genre} onChange={setGenre} options={genres} />

          <SortSelector value={sort} onChange={setSort} />
        </div>

        <ProductGrid games={filteredGames} />
      </div>
    </>
  );
}

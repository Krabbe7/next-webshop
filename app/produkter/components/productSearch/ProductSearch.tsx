"use client";

import SearchBar from "../searchBar/SearchBar";
import PlatformFilter from "../platformFilter/PlatformFilter";
import GenreFilter from "../genreFilter/GenreFilter";
import SortSelector from "../sortSelected/SortSelector";
import ProductGrid from "../productGrid/ProductGrid";
import styles from "./productSearch.module.css";

import { useGameFilters } from "../../hooks/useGameFilters";
import { PropsProductSearch } from "./types";

export default function ProductSearch({ games }: PropsProductSearch) {
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

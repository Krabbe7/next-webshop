"use client";

import { useMemo, useState } from "react";

import type { Game } from "../types";
import type { Filters } from "../components/sortSelected/types";

export function useGameFilters(games: Game[]) {
  const [search, setSearch] = useState("");
  const [platform, setPlatform] = useState("");
  const [genre, setGenre] = useState("");
  const [sort, setSort] = useState<Filters["sort"]>("");

  const filteredGames = useMemo(() => {
    let result = [...games];

    if (search) {
      result = result.filter((game) =>
        game.title.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (platform) {
      result = result.filter((game) =>
        game.platforms.some((p) => p.name === platform),
      );
    }

    if (genre) {
      result = result.filter((game) =>
        game.genres.some((g) => g.name === genre),
      );
    }

    switch (sort) {
      case "title":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;

      case "price-low":
        result.sort((a, b) => Number(a.price) - Number(b.price));
        break;

      case "price-high":
        result.sort((a, b) => Number(b.price) - Number(a.price));
        break;
    }

    return result;
  }, [games, search, platform, genre, sort]);

  return {
    search,
    setSearch,

    platform,
    setPlatform,

    genre,
    setGenre,

    sort,
    setSort,

    filteredGames,
  };
}

import { useEffect, useState } from "react";
import { Game } from "../../../produkter/types";
import { FeaturedGame, Rating } from "../types";
export function useFeaturedProducts() {
  const [games, setGames] = useState<FeaturedGame[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadGames = async () => {
      try {
        setLoading(true);

        // Hent alle spil
        const productsRes = await fetch("http://localhost:5000/api/games");

        if (!productsRes.ok) {
          throw new Error("Kunne ikke hente spil");
        }

        const data = await productsRes.json();

        const gameList: Game[] = data.products || data;

        // Hent rating for hvert spil
        const gamesWithRatings = await Promise.all(
          gameList.map(async (game) => {
            try {
              const ratingRes = await fetch(
                `http://localhost:5000/api/rating/${game.id}`,
              );

              if (!ratingRes.ok) {
                return {
                  ...game,
                  rating: null,
                  ratingTotal: 0,
                };
              }

              const ratingData: Rating = await ratingRes.json();

              return {
                ...game,
                rating:
                  ratingData.average !== null
                    ? Number(ratingData.average)
                    : null,
                ratingTotal: Number(ratingData.total),
              };
            } catch {
              return {
                ...game,
                rating: null,
                ratingTotal: 0,
              };
            }
          }),
        );

        // Sortér efter højeste gennemsnitsrating
        const popularGames = gamesWithRatings
          .filter((game) => game.rating !== null)
          .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
          .slice(0, 5);

        setGames(popularGames);
      } catch (error) {
        console.error("Kunne ikke hente populære spil:", error);
      } finally {
        setLoading(false);
      }
    };

    loadGames();
  }, []);

  return {
    games,
    loading,
  };
}

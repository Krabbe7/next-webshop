import { Request, Response } from "express";
import {
  saveRating,
  getGameRating,
  getUsersRating,
} from "../services/ratingService";

export const saveRatingController = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const gameId = Number(req.params.gameId);
    const { rating } = req.body;

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        message: "Rating skal være mellem 1 og 5.",
      });
    }

    const result = await saveRating(gameId, req.user.id, rating);

    res.json(result);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Kunne ikke gemme rating",
    });
  }
};

export const getGameRatingController = async (req: Request, res: Response) => {
  try {
    const gameId = Number(req.params.gameId);

    const rating = await getGameRating(gameId);

    res.json(rating);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Kunne ikke hente rating",
    });
  }
};

export const getUsersRatingController = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const gameId = Number(req.params.gameId);

    const rating = await getUsersRating(gameId, req.user.id);

    res.json(rating);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Kunne ikke hente brugerens rating",
    });
  }
};

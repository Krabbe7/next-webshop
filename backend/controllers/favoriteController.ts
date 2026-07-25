import { Request, Response } from "express";

import {
  saveFavorite,
  removeFavorite,
  getFavorite,
  getFavoritesByUser,
} from "../services/favortieService";

export const saveFavoriteController = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const gameId = Number(req.params.gameId);

    const favorite = await saveFavorite(gameId, req.user.id);

    res.status(201).json(favorite);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Kunne ikke gemme favorit",
    });
  }
};

export const removeFavoriteController = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const gameId = Number(req.params.gameId);

    await removeFavorite(gameId, req.user.id);

    res.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Kunne ikke fjerne favorit",
    });
  }
};

export const getFavoriteController = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const gameId = Number(req.params.gameId);

    const favorite = await getFavorite(gameId, req.user.id);

    res.json({
      favorite: !!favorite,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Kunne ikke hente favorit",
    });
  }
};

export const getFavoritesByUserController = async (
  req: Request,
  res: Response,
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const favorites = await getFavoritesByUser(req.user.id);

    res.json(favorites);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Kunne ikke hente favoritter",
    });
  }
};

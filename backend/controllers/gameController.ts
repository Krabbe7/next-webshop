import { Request, Response } from "express";
import { pool } from "../db";
import gameService from "../services/gameService";

export const getGamesController = async (req: Request, res: Response) => {
  try {
    const games = await gameService.getAllGames();

    res.json(games);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "DB error",
    });
  }
};

export const createGameController = async (req: Request, res: Response) => {
  try {
    const game = await gameService.createGame(req.body);

    res.status(201).json(game);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "DB error",
    });
  }
};

export const getGameByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const game = await gameService.getGameById(Number(id));
    if (!game) {
      return res.status(404).json({
        error: "Game not found",
      });
    }

    res.json(game);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "DB error",
    });
  }
};
export const updateGame = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const game = await gameService.updateGame(Number(id), req.body);

    if (!game) {
      return res.status(404).json({
        error: "Game not found",
      });
    }

    res.json(game);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Failed to update game",
    });
  }
};
export const deleteGameController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const game = await gameService.deleteGame(Number(id));
    if (!game) {
      return res.status(404).json({
        error: "Game not found",
      });
    }

    res.json(game);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "DB error",
    });
  }
};

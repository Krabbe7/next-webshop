import express from "express";
import {
  getGamesController,
  getGameByIdController,
  createGameController,
  updateGame,
  deleteGameController,
} from "../controllers/gameController";
import { authMiddleware, requireAdmin } from "../middleware/authMiddleware";

const gameRoute = express.Router();

gameRoute.get("/", getGamesController);

gameRoute.get("/:id", getGameByIdController);

gameRoute.post("/", authMiddleware, requireAdmin, createGameController);

gameRoute.put("/:id", authMiddleware, requireAdmin, updateGame);

gameRoute.delete("/:id", authMiddleware, requireAdmin, deleteGameController);

export default gameRoute;

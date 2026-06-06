import express from "express";
import {
  getGamesController,
  getGameByIdController,
  createGameController,
  updateGame,
  deleteGameController,
} from "../controllers/gameController";

const gameRoute = express.Router();

gameRoute.get("/", getGamesController);

gameRoute.get("/:id", getGameByIdController);

gameRoute.post("/", createGameController);

gameRoute.put("/:id", updateGame);

gameRoute.delete("/:id", deleteGameController);

export default gameRoute;

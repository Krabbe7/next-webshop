import express from "express";
import {
  getGamesController,
  getGameByIdController,
  createGameController,
} from "../controllers/gameController";

const gameRoute = express.Router();

gameRoute.get("/", getGamesController);

gameRoute.get("/:id", getGameByIdController);

gameRoute.post("/", createGameController);

export default gameRoute;

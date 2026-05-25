import express from "express";
import { getGames, getGameById } from "../controllers/gameController";

const gameRoute = express.Router();

gameRoute.get("/", getGames);

gameRoute.get("/:id", getGameById);

export default gameRoute;

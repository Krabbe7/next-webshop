import express from "express";

import {
  saveFavoriteController,
  removeFavoriteController,
  getFavoriteController,
  getFavoritesByUserController,
} from "../controllers/favoriteController";

import { authMiddleware } from "../middleware/authMiddleware";

const favoriteRoute = express.Router();

favoriteRoute.get("/user", authMiddleware, getFavoritesByUserController);

favoriteRoute.get("/:gameId", authMiddleware, getFavoriteController);

favoriteRoute.post("/:gameId", authMiddleware, saveFavoriteController);

favoriteRoute.delete("/:gameId", authMiddleware, removeFavoriteController);

export default favoriteRoute;

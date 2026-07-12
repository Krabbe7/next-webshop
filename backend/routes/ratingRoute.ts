import express from "express";

import {
  saveRatingController,
  getGameRatingController,
  getUsersRatingController,
} from "../controllers/ratingController";

import { authMiddleware } from "../middleware/authMiddleware";

const ratingRoute = express.Router();

// Hent gennemsnitlig rating
ratingRoute.get("/:gameId", getGameRatingController);

// Hent den loggede brugers rating
ratingRoute.get("/:gameId/me", authMiddleware, getUsersRatingController);

// Gem eller opdater rating
ratingRoute.post("/:gameId", authMiddleware, saveRatingController);

export default ratingRoute;

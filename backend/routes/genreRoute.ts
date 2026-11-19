import express from "express";
import {
  getGenresController,
  getGenreByIdController,
  createGenreController,
  updateGenreController,
  deleteGenreController,
} from "../controllers/genreController";
import { authMiddleware, requireAdmin } from "../middleware/authMiddleware";

const genreRoute = express.Router();

genreRoute.get("/", getGenresController);
genreRoute.get("/:id", getGenreByIdController);
genreRoute.post("/", authMiddleware, requireAdmin, createGenreController);
genreRoute.put("/:id", authMiddleware, requireAdmin, updateGenreController);
genreRoute.delete("/:id", authMiddleware, requireAdmin, deleteGenreController);

export default genreRoute;

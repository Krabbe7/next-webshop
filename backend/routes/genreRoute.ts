import express from "express";
import {
  getGenresController,
  getGenreByIdController,
  createGenreController,
  updateGenreController,
  deleteGenreController,
} from "../controllers/genreController";

const genreRoute = express.Router();

genreRoute.get("/", getGenresController);
genreRoute.get("/:id", getGenreByIdController);
genreRoute.post("/", createGenreController);
genreRoute.put("/:id", updateGenreController);
genreRoute.delete("/:id", deleteGenreController);

export default genreRoute;

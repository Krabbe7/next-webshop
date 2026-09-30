import { Request, Response } from "express";
import * as genreService from "../services/genreService";

export const getGenresController = async (req: Request, res: Response) => {
  try {
    const genres = await genreService.getAllGenres();

    res.json(genres);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "DB error",
    });
  }
};

export const getGenreByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const genre = await genreService.getGenreById(Number(id));

    if (!genre) {
      return res.status(404).json({
        error: "Genre not found",
      });
    }

    res.json(genre);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "DB error",
    });
  }
};

export const createGenreController = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    const genre = await genreService.createGenre(name);

    res.status(201).json(genre);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "DB error",
    });
  }
};

export const updateGenreController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const genre = await genreService.updateGenre(Number(id), name);

    if (!genre) {
      return res.status(404).json({
        error: "Genre not found",
      });
    }

    res.json(genre);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Failed to update genre",
    });
  }
};

export const deleteGenreController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const genre = await genreService.deleteGenre(Number(id));

    if (!genre) {
      return res.status(404).json({
        error: "Genre not found",
      });
    }

    res.json(genre);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "DB error",
    });
  }
};

import { Request, Response } from "express";
import { pool } from "../db";

export const getGames = async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM games");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "DB error" });
  }
};

export const getGameById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await pool.query("SELECT * FROM games WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Game not found",
      });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "DB error",
    });
  }
};

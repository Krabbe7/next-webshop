import { Request, Response } from "express";
import * as platformService from "../services/platformService";

export const getPlatformsController = async (req: Request, res: Response) => {
  try {
    const platforms = await platformService.getAllPlatforms();

    res.json(platforms);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "DB error",
    });
  }
};

export const getPlatformByIdController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params;

    const platform = await platformService.getPlatformById(Number(id));

    if (!platform) {
      return res.status(404).json({
        error: "Platform not found",
      });
    }

    res.json(platform);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "DB error",
    });
  }
};

export const createPlatformController = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    const platform = await platformService.createPlatform(name);

    res.status(201).json(platform);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "DB error",
    });
  }
};

export const updatePlatformController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const platform = await platformService.updatePlatform(Number(id), name);

    if (!platform) {
      return res.status(404).json({
        error: "Platform not found",
      });
    }

    res.json(platform);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Failed to update platform",
    });
  }
};

export const deletePlatformController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const platform = await platformService.deletePlatform(Number(id));

    if (!platform) {
      return res.status(404).json({
        error: "Platform not found",
      });
    }

    res.json(platform);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "DB error",
    });
  }
};

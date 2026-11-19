import express from "express";
import {
  getPlatformsController,
  getPlatformByIdController,
  createPlatformController,
  updatePlatformController,
  deletePlatformController,
} from "../controllers/platformController";
import { authMiddleware, requireAdmin } from "../middleware/authMiddleware";

const platformRoute = express.Router();

platformRoute.get("/", getPlatformsController);
platformRoute.get("/:id", getPlatformByIdController);
platformRoute.post("/", authMiddleware, requireAdmin, createPlatformController);
platformRoute.put(
  "/:id",
  authMiddleware,
  requireAdmin,
  updatePlatformController,
);
platformRoute.delete(
  "/:id",
  authMiddleware,
  requireAdmin,
  deletePlatformController,
);

export default platformRoute;

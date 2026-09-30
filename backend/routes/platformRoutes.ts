import express from "express";
import {
  getPlatformsController,
  getPlatformByIdController,
  createPlatformController,
  updatePlatformController,
  deletePlatformController,
} from "../controllers/platformController";

const platformRoute = express.Router();

platformRoute.get("/", getPlatformsController);
platformRoute.get("/:id", getPlatformByIdController);
platformRoute.post("/", createPlatformController);
platformRoute.put("/:id", updatePlatformController);
platformRoute.delete("/:id", deletePlatformController);

export default platformRoute;

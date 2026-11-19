import express from "express";
import {
  getShippingController,
  getShippingByIdController,
  updateShippingController,
  getPickupPointsController,
  createShippingController,
  deleteShippingController,
} from "../controllers/shippingController";
import { authMiddleware, requireAdmin } from "../middleware/authMiddleware";

const shippingRoute = express.Router();

shippingRoute.post("/pickup-points", getPickupPointsController);
shippingRoute.get("/", getShippingController);
shippingRoute.get("/:id", getShippingByIdController);
shippingRoute.put(
  "/:id",
  authMiddleware,
  requireAdmin,
  updateShippingController,
);
shippingRoute.delete(
  "/:id",
  authMiddleware,
  requireAdmin,
  deleteShippingController,
);
shippingRoute.post("/", authMiddleware, requireAdmin, createShippingController);

export default shippingRoute;

import express from "express";
import {
  getShippingController,
  getShippingByIdController,
  updateShippingController,
  getPickupPointsController,
  createShippingController,
  deleteShippingController,
} from "../controllers/shippingController";
import { requireAdmin } from "../middleware/authMiddleware";

const shippingRoute = express.Router();

shippingRoute.post("/pickup-points", getPickupPointsController);
shippingRoute.get("/", getShippingController);
shippingRoute.get("/:id", getShippingByIdController);
shippingRoute.put("/:id", requireAdmin, updateShippingController);
shippingRoute.delete("/:id", requireAdmin, deleteShippingController);
shippingRoute.post("/", requireAdmin, createShippingController);
export default shippingRoute;

import express from "express";
import {
  getShippingController,
  getShippingByIdController,
  updateShippingController,
  getPickupPointsController,
} from "../controllers/shippingController";

const shippingRoute = express.Router();

shippingRoute.post("/pickup-points", getPickupPointsController);
shippingRoute.get("/", getShippingController);
shippingRoute.get("/:id", getShippingByIdController);
shippingRoute.put("/:id", updateShippingController);
export default shippingRoute;

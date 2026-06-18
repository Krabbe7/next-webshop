import express from "express";
import {
  getDeliveryCouriersController,
  createDeliveryMethodcontroller,
  updateDeliveryMethod,
  getDeliveryMethodIdController,
  deleteDeliveryMethodController,
} from "../controllers/deliveryMethodsController";
import { authMiddleware, requireAdmin } from "../middleware/authMiddleware";

const deliveryMethodRoute = express.Router();

deliveryMethodRoute.get("/", getDeliveryCouriersController);

deliveryMethodRoute.get("/:id", getDeliveryMethodIdController);

deliveryMethodRoute.post(
  "/",
  authMiddleware,
  requireAdmin,
  createDeliveryMethodcontroller,
);

deliveryMethodRoute.put(
  "/:id",
  authMiddleware,
  requireAdmin,
  updateDeliveryMethod,
);

deliveryMethodRoute.delete(
  "/:id",
  authMiddleware,
  requireAdmin,
  deleteDeliveryMethodController,
);

export default deliveryMethodRoute;

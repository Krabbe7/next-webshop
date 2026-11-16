import express from "express";

import {
  createOrderController,
  getMyOrdersController,
  getOrderByIdController,
} from "../controllers/orderController";

import { authMiddleware } from "../middleware/authMiddleware";

const orderRoute = express.Router();

orderRoute.post("/", createOrderController);

orderRoute.get("/user", authMiddleware, getMyOrdersController);

orderRoute.get("/:id", getOrderByIdController);

export default orderRoute;

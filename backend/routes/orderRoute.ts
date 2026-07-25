import express from "express";

import {
  createOrderController,
  getMyOrdersController,
} from "../controllers/orderController";

import { authMiddleware } from "../middleware/authMiddleware";

const orderRoute = express.Router();

orderRoute.post("/", createOrderController);

orderRoute.get("/user", authMiddleware, getMyOrdersController);

export default orderRoute;

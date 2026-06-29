import express from "express";
import { createOrderController } from "../controllers/orderController";

const orderRoute = express.Router();

orderRoute.post("/", createOrderController);

export default orderRoute;
